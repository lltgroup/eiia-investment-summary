import { useState } from "react";
import { CHECKLIST, CHECKLIST_AS_OF } from "./checklistData";

// inline-strip-start (these duplicate App.tsx when the file is inlined for the pipeline)
const NAVY = "#1B3A5C";
const ORANGE = "#C4581D";
const WHITE = "#FFFFFF";
const GREEN = "#1E7E34";
// inline-strip-end
const INK = "#2A3A50";
const MUTED = "#888";

function colorFor(name, bucketColors) {
  const variants = [name, name.replace(" and ", " & "), name.replace(": ", " \u2014 ")];
  for (const v of variants) if (bucketColors[v]) return bucketColors[v];
  return "#5A6B7C";
}

function stepsOf(bucket) {
  return bucket.items.flatMap(i => i.steps);
}

function itemState(item) {
  const done = item.steps.filter(s => s.done).length;
  if (item.steps.length > 0 && done === item.steps.length) return "complete";
  if (done > 0) return "progress";
  return "pending";
}

const STATE_LABEL = { complete: "Complete", progress: "In progress", pending: "Not started" };

function StateDot({ state, color }) {
  const base = { width: 12, height: 12, borderRadius: "50%", flexShrink: 0, boxSizing: "border-box" as const };
  if (state === "complete") return <div style={{ ...base, background: color }} />;
  if (state === "progress") return <div style={{ ...base, border: `2px solid ${color}`, background: `linear-gradient(90deg, ${color} 50%, transparent 50%)` }} />;
  return <div style={{ ...base, border: "2px solid #C5CCD6" }} />;
}

function CheckBox({ done, color }) {
  return (
    <div style={{
      width: 14, height: 14, borderRadius: 3, flexShrink: 0, boxSizing: "border-box",
      border: `1.5px solid ${done ? color : "#C5CCD6"}`, background: done ? color : WHITE,
      display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1,
    }}>
      {done && (
        <svg width="9" height="9" viewBox="0 0 10 10" aria-hidden="true">
          <path d="M1.5 5.2 L4 7.5 L8.5 2.5" fill="none" stroke={WHITE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );
}

function ProgressBar({ done, total, color }) {
  const pct = total ? Math.round((done / total) * 100) : 0;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ flex: 1, height: 6, background: "#E6EAF0", borderRadius: 3, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: color, transition: "width 0.3s" }} />
      </div>
      <span style={{ fontSize: "10px", fontWeight: 700, color, width: 34, textAlign: "right" }}>{pct}%</span>
    </div>
  );
}

function ItemRow({ item, color, rowBg }) {
  const [open, setOpen] = useState(false);
  const state = itemState(item);
  const done = item.steps.filter(s => s.done).length;
  return (
    <>
      <div onClick={() => setOpen(o => !o)} style={{
        display: "grid", gridTemplateColumns: "20px 1fr 90px 60px 24px", alignItems: "center",
        padding: "8px 16px 8px 28px", background: open ? `${color}08` : rowBg,
        borderBottom: "1px solid #EEF1F5", cursor: "pointer",
      }}>
        <StateDot state={state} color={color} />
        <span style={{ fontSize: "11.5px", fontWeight: open ? 700 : 600, color: state === "pending" ? "#6B7A8C" : INK, textAlign: "left" }}>{item.task}</span>
        <span style={{ fontSize: "10px", fontWeight: 700, color: state === "pending" ? "#9AA5B4" : color, textAlign: "center" }}>{STATE_LABEL[state]}</span>
        <span style={{ fontSize: "10.5px", color: MUTED, textAlign: "center" }}>{done}/{item.steps.length}</span>
        <div style={{ textAlign: "center", color, fontSize: "12px", fontWeight: 700, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▾</div>
      </div>
      {open && (
        <div style={{ background: `${color}06`, borderBottom: "1px solid #EEF1F5", padding: "8px 16px 10px 56px" }}>
          {item.steps.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 9, padding: "4px 0" }}>
              <CheckBox done={s.done} color={color} />
              <span style={{ fontSize: "11px", lineHeight: 1.5, color: s.done ? INK : "#5A6B7C", textAlign: "left" }}>{s.text}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function BucketRow({ bucket, color, rowBg }) {
  const [open, setOpen] = useState(false);
  const steps = stepsOf(bucket);
  const done = steps.filter(s => s.done).length;
  const complete = bucket.items.filter(i => itemState(i) === "complete").length;
  return (
    <>
      <div onClick={() => setOpen(o => !o)} style={{
        display: "grid", gridTemplateColumns: "1fr 110px 90px 180px 28px", alignItems: "center",
        padding: "11px 16px", background: open ? `${color}08` : rowBg,
        borderBottom: "1px solid #EEF1F5", cursor: "pointer",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <div style={{ width: 9, height: 9, borderRadius: "50%", background: color, flexShrink: 0 }} />
          <span style={{ fontSize: "12px", fontWeight: open ? 800 : 700, color: open ? color : INK }}>{bucket.name}</span>
          {bucket.consulting && <span style={{ fontSize: "8.5px", fontWeight: 800, letterSpacing: "1px", color: "#7A5C2A", background: "#F5EEDC", padding: "2px 7px", borderRadius: 9 }}>CONSULTING TRACK</span>}
          {bucket.extra && <span style={{ fontSize: "8.5px", fontWeight: 800, letterSpacing: "1px", color: "#4A5568", background: "#E6EAF0", padding: "2px 7px", borderRadius: 9 }}>NOT IN THE ESTIMATE</span>}
        </div>
        <div style={{ fontSize: "10.5px", color: MUTED, textAlign: "center" }}>{bucket.extra ? "" : `${complete}/${bucket.items.length} items complete`}</div>
        <div style={{ fontSize: "10.5px", color: "#4A5568", textAlign: "center" }}>{done}/{steps.length} steps</div>
        <ProgressBar done={done} total={steps.length} color={color} />
        <div style={{ textAlign: "center", color, fontSize: "12px", fontWeight: 700, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▾</div>
      </div>
      {open && (
        <div style={{ borderBottom: "1px solid #EEF1F5" }}>
          {bucket.note && <div style={{ padding: "8px 16px 8px 28px", fontSize: "10.5px", color: "#4A5568", fontStyle: "italic", background: `${color}06`, textAlign: "left" }}>{bucket.note}</div>}
          {bucket.items.map((item, i) => <ItemRow key={item.task} item={item} color={color} rowBg={i % 2 ? "#FAFBFC" : WHITE} />)}
        </div>
      )}
    </>
  );
}

export default function Checklist({ bucketColors }) {
  const estimate = CHECKLIST.filter(b => !b.extra);
  const allItems = estimate.flatMap(b => b.items);
  const allSteps = CHECKLIST.flatMap(stepsOf);
  const itemsComplete = allItems.filter(i => itemState(i) === "complete").length;
  const itemsProgress = allItems.filter(i => itemState(i) === "progress").length;
  const stepsDone = allSteps.filter(s => s.done).length;

  const tiles = [
    { label: "Line items complete", value: `${itemsComplete} of ${allItems.length}`, color: GREEN },
    { label: "Line items in progress", value: `${itemsProgress}`, color: ORANGE },
    { label: "Work steps done", value: `${stepsDone} of ${allSteps.length}`, color: NAVY },
  ];

  return (
    <div style={{ width: "100%", maxWidth: "900px" }}>
      <div style={{ background: WHITE, borderRadius: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", overflow: "hidden", marginBottom: 12 }}>
        <div style={{ padding: "16px 20px 12px", borderBottom: "1px solid #EEF1F5" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ fontSize: "9px", fontWeight: 800, color: ORANGE, letterSpacing: "2px", marginBottom: 4, textAlign: "left" }}>PHASE 1 PROGRESS</div>
              <div style={{ fontSize: "16px", fontWeight: 800, color: NAVY, textAlign: "left" }}>Where Phase 1 Stands</div>
              <div style={{ fontSize: "10.5px", color: MUTED, marginTop: 4, textAlign: "left" }}>
                Status as of {CHECKLIST_AS_OF}. The line items are the Phase 1 estimate; the steps beneath each are the work LLT has done or knows it needs to do. Maintained by LLT; this view is read-only.
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {tiles.map(t => (
                <div key={t.label} style={{ padding: "8px 14px", borderRadius: 8, background: `${t.color}0D`, borderLeft: `3px solid ${t.color}`, minWidth: 96 }}>
                  <div style={{ fontSize: "15px", fontWeight: 800, color: t.color }}>{t.value}</div>
                  <div style={{ fontSize: "9px", color: MUTED, fontWeight: 600, letterSpacing: "0.5px" }}>{t.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 12, fontSize: "9.5px", color: "#4A5568", alignItems: "center" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}><StateDot state="complete" color={NAVY} /> Complete</span>
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}><StateDot state="progress" color={NAVY} /> In progress</span>
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}><StateDot state="pending" color={NAVY} /> Not started</span>
            <span style={{ marginLeft: "auto", fontStyle: "italic", color: MUTED }}>Click a bucket, then a line item, to see the steps.</span>
          </div>
        </div>
        {CHECKLIST.map((b, i) => <BucketRow key={b.name} bucket={b} color={colorFor(b.name, bucketColors)} rowBg={i % 2 ? "#FAFBFC" : WHITE} />)}
      </div>
    </div>
  );
}
