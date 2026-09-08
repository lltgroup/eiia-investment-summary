#!/usr/bin/env python3
"""Emit a single-file TSX for the llt-dashboards pipeline.

Usage: scripts/build-submission.py <default-view> <output-path>
  default-view: p1-overview (investment summary) or p1-checklist (progress)
Inlines src/Checklist.tsx and src/checklistData.ts into src/App.tsx.
"""
import re, sys, pathlib
root = pathlib.Path(__file__).resolve().parent.parent
view, out = sys.argv[1], pathlib.Path(sys.argv[2])
app = (root / "src/App.tsx").read_text()
comp = (root / "src/Checklist.tsx").read_text()
data = (root / "src/checklistData.ts").read_text()

comp = comp.replace('import { useState } from "react";\n', "")
comp = comp.replace('import { CHECKLIST, CHECKLIST_AS_OF } from "./checklistData";\n', "")
comp = re.sub(r"// inline-strip-start.*?// inline-strip-end\n", "", comp, flags=re.S)
comp = comp.replace("export default function Checklist(", "function Checklist(")
data = data.replace("export const ", "const ")

app = app.replace('import Checklist from "./Checklist";\n', "", 1)
app = app.replace('const DEFAULT_VIEW = "p1-overview";', f'const DEFAULT_VIEW = "{view}";', 1)
marker = "export default function FinalCostBreakdown()"
assert marker in app
app = app.replace(marker, "// ─── PHASE 1 PROGRESS (inlined from src/Checklist.tsx and src/checklistData.ts) ───\n\n" + data + "\n" + comp + "\n" + marker, 1)
out.write_text(app)
print(f"wrote {out} ({len(app.splitlines())} lines, default view {view})")
