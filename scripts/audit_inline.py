import glob, re

print("=== INLINE SCRIPTS AND STYLES AUDIT ===")
for f in sorted(glob.glob('*.html') + glob.glob('*/*.html')):
    if 'portfolio-review' in f:
        continue
    with open(f, 'r', encoding='utf-8') as fh:
        text = fh.read()
    styles = re.findall(r'<style[^>]*>(.*?)</style>', text, re.DOTALL)
    style_attrs = re.findall(r'\sstyle="([^"]*)"', text) + re.findall(r"\sstyle='([^']*)'", text)
    inline_scripts = []
    for m in re.finditer(r'<script([^>]*)>(.*?)</script>', text, re.DOTALL):
        attrs, body = m.group(1), m.group(2)
        if 'src=' not in attrs and 'application/ld+json' not in attrs:
            inline_scripts.append((attrs, body.strip()))
    event_handlers = re.findall(r'\son[a-zA-Z]+="[^"]*"', text)
    for m in re.finditer(r'<[^>]*\son[a-zA-Z]+="[^"]*"[^>]*>', text):
        print(f"  Event handler element: {m.group(0)[:100]}")
    external_scripts = re.findall(r'<script[^>]*src="([^"]*)"[^>]*>', text) + re.findall(r"<script[^>]*src='([^']*)'[^>]*>", text)
    print(f"{f}:")
    print(f"  external scripts: {external_scripts}")
    print(f"  <style> tags: {len(styles)}")
    print(f"  style attributes: {len(style_attrs)}")
    print(f"  inline executable scripts: {len(inline_scripts)}")
    print(f"  inline event handlers (onclick etc): {len(event_handlers)}")
