#!/usr/bin/env python3
"""Regenerate src/checklistData.ts from the Phase 1 checklist markdown.

Usage: scripts/gen-checklist.py [path-to-markdown] [as-of label]
Default markdown: ../analysis/2026-09-08-phase-1-checklist.md (relative to the repo).
Parses "## N. Bucket ($total, H hours)[, consulting track]" headers, "- [ ]" line items,
and "  - [ ]" steps. A "##" header without a price becomes an extra bucket outside the estimate.
Everything after the first "\n---" line (review notes) is ignored.
"""
import re, json, sys, pathlib
root = pathlib.Path(__file__).resolve().parent.parent
md_path = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else root.parent / "analysis/2026-09-08-phase-1-checklist.md"
as_of = sys.argv[2] if len(sys.argv) > 2 else "September 8, 2026"
md = md_path.read_text().split("\n---")[0]
buckets, cur, item = [], None, None
for line in md.splitlines():
    m = re.match(r"^## (.+)$", line)
    if m:
        title = m.group(1)
        mm = re.match(r"^(\d+)\. (.+?) \(\$([\d,]+), (\d+) hours\)(, consulting track)?$", title)
        if mm:
            cur = dict(name=mm.group(2), total=int(mm.group(3).replace(",", "")), hrs=int(mm.group(4)), consulting=bool(mm.group(5)), note="", items=[])
        else:
            cur = dict(name=title.replace(" (not in the dashboard)", ""), total=0, hrs=0, consulting=False, note="", items=[], extra=True)
        buckets.append(cur); item = None; continue
    m = re.match(r"^(Target: .+|Work done .+|Gated on .+)$", line)
    if m and cur: cur["note"] = m.group(1); continue
    m = re.match(r"^- \[( |x)\] (.+)$", line)
    if m and cur:
        item = dict(task=m.group(2), done=m.group(1) == "x", steps=[]); cur["items"].append(item); continue
    m = re.match(r"^  - \[( |x)\] (.+)$", line)
    if m and item: item["steps"].append(dict(text=m.group(2), done=m.group(1) == "x")); continue
for b in buckets:
    if b.get("extra"):
        steps = [dict(text=i["task"], done=i["done"]) for i in b["items"]]
        b["items"] = [dict(task="Transition, hardening, and incident response", done=all(s["done"] for s in steps), steps=steps)]
ts = ("// Phase 1 progress checklist. Read-only: status is maintained by LLT in this file.\n"
      f"// Generated from {md_path.name} by scripts/gen-checklist.py\n\n"
      f'export const CHECKLIST_AS_OF = "{as_of}";\n\nexport const CHECKLIST = ' + json.dumps(buckets, indent=2) + ";\n")
(root / "src/checklistData.ts").write_text(ts)
steps = [s for b in buckets for i in b["items"] for s in i["steps"]]
print(f"{len(buckets)} buckets, {sum(len(b['items']) for b in buckets)} items, {sum(s['done'] for s in steps)}/{len(steps)} steps done")
