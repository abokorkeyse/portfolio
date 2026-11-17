import { mkdir, readFile, writeFile } from "node:fs/promises";
import { runInNewContext } from "node:vm";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const [template, appSource] = await Promise.all([
  readFile(path.join(root, "index.html"), "utf8"),
  readFile(path.join(root, "app.js"), "utf8")
]);

const dictionaryStart = appSource.indexOf("const translations = {");
const dictionaryEnd = appSource.indexOf("\n    // Current State Settings", dictionaryStart);
if (dictionaryStart < 0 || dictionaryEnd < 0) {
  throw new Error("Could not find the language dictionaries in app.js.");
}

const dictionaryLiteral = appSource
  .slice(dictionaryStart + "const translations = ".length, dictionaryEnd)
  .trim()
  .replace(/;\s*$/, "");
const translations = runInNewContext(`(${dictionaryLiteral})`, Object.create(null), {
  timeout: 1000
});

const pages = {
  so: {
    title: "Abokor Keyse | Full-Stack Developer iyo AI Automation, Hargeysa",
    description:
      "Portfolio-ga Abokor Keyse, Full-Stack Developer iyo AI Automation Specialist jooga Hargeysa, Somaliland. Web apps, cloud solutions, ERP/CRM, n8n automation, iyo UI/UX design.",
    websiteDescription:
      "Portfolio-ga Abokor Keyse, Full-Stack Developer iyo AI Automation Specialist jooga Hargeysa, Somaliland.",
    locale: "so_SO",
    alternateLocale: "en_US",
    projectListName: "Mashaariicda software-ka ee Abokor Keyse"
  },
  en: {
    title: "Abokor Keyse | Full-Stack Developer & AI Automation in Hargeisa",
    description:
      "Portfolio of Abokor Keyse, a Full-Stack Developer and AI Automation Specialist in Hargeisa, Somaliland. Web apps, cloud solutions, ERP/CRM, n8n automation, and UI/UX design.",
    websiteDescription:
      "Portfolio of Abokor Keyse, a Full-Stack Developer and AI Automation Specialist in Hargeisa, Somaliland.",
    locale: "en_US",
    alternateLocale: "so_SO",
    projectListName: "Selected software projects by Abokor Keyse"
  }
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function findMatchingEndTag(source, tagName, searchFrom) {
  const tokenPattern = /<\/?([a-z][\w:-]*)\b[^>]*>/gi;
  tokenPattern.lastIndex = searchFrom;
  let depth = 1;
  let token;

  while ((token = tokenPattern.exec(source))) {
    const name = token[1].toLowerCase();
    const closing = token[0].startsWith("</");
    if (name === "script" || name === "style") {
      if (!closing) {
        const closingIndex = source.toLowerCase().indexOf(`</${name}`, tokenPattern.lastIndex);
        if (closingIndex < 0) return null;
        tokenPattern.lastIndex = closingIndex;
      }
      continue;
    }

    if (name !== tagName) continue;
    if (closing) {
      depth -= 1;
      if (depth === 0) {
        return { start: token.index, end: tokenPattern.lastIndex };
      }
    } else if (!token[0].endsWith("/>")) {
      depth += 1;
    }
  }

  return null;
}

function translateMarkedElements(html, dictionary) {
  const openingTagPattern =
    /<([a-z][\w:-]*)\b[^>]*\bdata-i18n=(?:"([^"]+)"|'([^']+)')[^>]*>/gi;
  const replacements = [];
  let match;

  while ((match = openingTagPattern.exec(html))) {
    const key = match[2] || match[3];
    if (!Object.hasOwn(dictionary, key)) {
      throw new Error(`Missing translation for data-i18n="${key}".`);
    }

    const endTag = findMatchingEndTag(html, match[1].toLowerCase(), openingTagPattern.lastIndex);
    if (!endTag) {
      throw new Error(`Could not find closing tag for data-i18n="${key}".`);
    }

    replacements.push({
      start: openingTagPattern.lastIndex,
      end: endTag.start,
      value: escapeHtml(dictionary[key])
    });
  }

  const outermost = replacements.filter((candidate) =>
    !replacements.some(
      (other) =>
        other !== candidate &&
        other.start <= candidate.start &&
        other.end >= candidate.end &&
        (other.start < candidate.start || other.end > candidate.end)
    )
  );

  for (const replacement of outermost.sort((a, b) => b.start - a.start)) {
    html =
      html.slice(0, replacement.start) +
      replacement.value +
      html.slice(replacement.end);
  }

  html = html.replace(
    /(<[a-z][\w:-]*\b[^>]*\bdata-i18n-placeholder=(?:"([^"]+)"|'([^']+)')[^>]*>)/gi,
    (tag, _fullTag, doubleKey, singleKey) => {
      const key = doubleKey || singleKey;
      if (!Object.hasOwn(dictionary, key)) {
        throw new Error(`Missing translation for data-i18n-placeholder="${key}".`);
      }
      return tag.replace(/\bplaceholder=(["'])[^"']*\1/i, `placeholder="${escapeHtml(dictionary[key])}"`);
    }
  );

  const placeholders = {
    form_name_input: dictionary === translations.so
      ? "Gali magacaaga oo buuxa"
      : "Enter your full name",
    form_msg_input: dictionary === translations.so
      ? "Maxaan kaa caawin karnaa?"
      : "How can we help you?"
  };
  for (const [id, value] of Object.entries(placeholders)) {
    const elementPattern = new RegExp(`<([a-z][\\w:-]*)([^>]*\\bid="${id}"[^>]*)>`, "gi");
    html = html.replace(elementPattern, (tag) =>
      tag.replace(/\bplaceholder=(["'])[^"']*\1/i, `placeholder="${escapeHtml(value)}"`)
    );
  }

  return html;
}

function updateMeta(html, attribute, selector, value) {
  const tags = html.match(/<meta\b[^>]*>/gi) || [];
  const tag = tags.find((candidate) =>
    new RegExp(`\\b${attribute}=["']${selector}["']`, "i").test(candidate)
  );
  if (!tag) throw new Error(`Could not find meta ${attribute}="${selector}".`);
  const updated = tag.replace(/\bcontent=(["'])[^"']*\1/i, `content="${escapeHtml(value)}"`);
  return html.replace(tag, updated);
}

function updateStructuredData(html, lang, page, canonical) {
  return html.replace(
    /<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/gi,
    (_match, json) => {
      const graph = JSON.parse(json);
      for (const entity of graph["@graph"] || []) {
        if (entity["@type"] === "WebSite") {
          entity.inLanguage = lang;
          entity.description = page.websiteDescription;
        }
        if (entity["@type"] === "WebPage") {
          entity["@id"] = `${canonical}#webpage`;
          entity.url = canonical;
          entity.name = page.title;
          entity.inLanguage = lang;
        }
        if (entity["@type"] === "ItemList") entity.name = page.projectListName;
      }
      return `<script type="application/ld+json">\n    ${JSON.stringify(graph, null, 2)}\n    </script>`;
    }
  );
}

for (const [lang, page] of Object.entries(pages)) {
  const canonical = `https://abokor.shop/${lang}/`;
  let html = translateMarkedElements(template, translations[lang]);

  html = html
    .replace('<html lang="so">', `<html lang="${lang}">`)
    .replace(
      /<title>[\s\S]*?<\/title>/i,
      `<title>${escapeHtml(page.title)}</title>`
    )
    .replace(
      /<link rel="canonical" href="[^"]*">/,
      `<link rel="canonical" href="${canonical}">`
    );

  html = updateMeta(html, "name", "description", page.description);
  html = updateMeta(html, "property", "og:title", page.title);
  html = updateMeta(html, "property", "og:description", page.description);
  html = updateMeta(html, "property", "og:url", canonical);
  html = updateMeta(html, "property", "og:locale", page.locale);
  html = updateMeta(
    html,
    "property",
    "og:locale:alternate",
    page.alternateLocale
  );
  html = updateMeta(html, "name", "twitter:title", page.title);
  html = updateMeta(html, "name", "twitter:description", page.description);

  html = updateStructuredData(html, lang, page, canonical)
    .replace(/\b(href|src)="\.\//g, '$1="../')
    .replace(/\burl\((["']?)\.\//g, "url($1../");

  const directory = path.join(root, lang);
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, "index.html"), html);
}
