import glob, re, os

print("=== CODE SECURITY AUDIT ===")

dangerous_patterns = [
    (r'\beval\s*\(', "eval() call"),
    (r'\bnew\s+Function\s*\(', "Function constructor"),
    (r'document\.write', "document.write()"),
    (r'outerHTML', "outerHTML assignment"),
    (r'setTimeout\s*\(\s*["\']', "setTimeout with string argument"),
    (r'setInterval\s*\(\s*["\']', "setInterval with string argument"),
    (r'target="_blank"(?![^>]*rel="[^"]*noopener)', "target=_blank without noopener"),
    (r'(?:api[_-]?key|secret|password|auth[_-]?token)\s*[:=]\s*["\'][a-zA-Z0-9_\-]{16,}["\']', "Hardcoded secret pattern")
]

for root, dirs, files in os.walk('.'):
    if '.git' in root or 'portfolio-review' in root or 'node_modules' in root:
        continue
    for file in files:
        if file.endswith(('.js', '.html', '.php', '.json', '.yml', '.yaml')):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
            for pattern, desc in dangerous_patterns:
                matches = list(re.finditer(pattern, content, re.IGNORECASE))
                if matches:
                    print(f"[!] {path}: {len(matches)} occurrence(s) of {desc}")
                    for m in matches[:3]:
                        line_no = content.count('\n', 0, m.start()) + 1
                        print(f"    Line {line_no}: {content[m.start():m.end()+40].strip()!r}")

print("=== AUDIT COMPLETE ===")
