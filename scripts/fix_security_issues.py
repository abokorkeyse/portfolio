import re, os

def fix_links_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    def replace_link(match):
        tag = match.group(0)
        if 'rel=' in tag:
            if 'noopener' not in tag:
                # Add noopener to existing rel
                tag = re.sub(r'rel="([^"]*)"', r'rel="\1 noopener noreferrer"', tag)
                tag = re.sub(r"rel='([^']*)'", r"rel='\1 noopener noreferrer'", tag)
        else:
            # Add rel="noopener noreferrer" before closing >
            tag = tag[:-1].rstrip() + ' rel="noopener noreferrer">'
        return tag

    new_content = re.sub(r'<a\s+[^>]*target=["\']_blank["\'][^>]*>', replace_link, content)
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated links in: {filepath}")

for f in ['cv.html', 'index.html', 'so/index.html', 'en/index.html', 'privacy.html', 'terms.html', 'n8n-automation.html']:
    if os.path.exists(f):
        fix_links_in_file(f)
