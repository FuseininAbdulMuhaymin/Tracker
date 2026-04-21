import { useState, useRef } from "react";

const C = {
  bg: "#fafaf8", white: "#fff", border: "#e4e4e0",
  muted: "#888", dim: "#bbb", text: "#111",
  success: "#2a7a4e", inputBg: "#f2f2f0",
  amber: "#9a6c00", amberBg: "#fdf3e0",
  infoBg: "#e8f0fe", info: "#1a56db",
};

const S = {
  app:         { fontFamily: "'Georgia', serif", background: C.bg, minHeight: "100vh", color: C.text },
  header:      { padding: "1.5rem 2rem 0", borderBottom: `0.5px solid ${C.border}` },
  headerTop:   { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" },
  pageTitle:   { fontSize: "22px", fontWeight: "500", letterSpacing: "-0.4px", margin: 0 },
  backBtn:     { display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: C.muted, background: "none", border: `0.5px solid ${C.border}`, borderRadius: "7px", padding: "7px 14px", cursor: "pointer", fontFamily: "inherit" },
  tabBar:      { display: "flex", gap: "2px" },
  tab:    (a) => ({ padding: "10px 20px", fontSize: "13px", fontWeight: a ? "500" : "400", color: a ? C.text : C.muted, background: "none", border: "none", borderBottom: a ? `2px solid ${C.text}` : "2px solid transparent", cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" }),
  body:        { padding: "1.75rem 2rem" },
  divider:     { border: "none", borderTop: `0.5px solid ${C.border}`, margin: "1.5rem 0" },
  section:     { fontSize: "10px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.09em", color: C.dim, margin: "0 0 10px" },
  row:    (n) => ({ display: "grid", gridTemplateColumns: `repeat(${n}, 1fr)`, gap: "12px", marginBottom: "14px" }),
  field:       { display: "flex", flexDirection: "column", gap: "5px" },
  label:       { fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.06em", color: C.muted },
  input:       { background: C.inputBg, border: `0.5px solid ${C.border}`, borderRadius: "8px", padding: "10px 12px", fontSize: "14px", color: C.text, fontFamily: "inherit", outline: "none", width: "100%", boxSizing: "border-box" },
  inputRO:     { background: "#f8f8f6", border: "0.5px solid #eee", borderRadius: "8px", padding: "10px 12px", fontSize: "14px", color: "#aaa", fontFamily: "inherit", outline: "none", width: "100%", boxSizing: "border-box" },
  toggleRow:   { display: "flex", gap: "10px" },
  toggleBtn:  (a) => ({ flex: 1, padding: "10px 6px", border: `0.5px solid ${C.border}`, borderRadius: "8px", fontSize: "13px", fontFamily: "inherit", cursor: "pointer", background: a ? C.text : C.inputBg, color: a ? "#fff" : C.muted, fontWeight: a ? "500" : "400", transition: "all 0.15s" }),
  footer:      { display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "2rem", gap: "12px" },
  historyBtn:  { display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: C.muted, background: "none", border: `0.5px solid ${C.border}`, borderRadius: "8px", padding: "11px 18px", cursor: "pointer", fontFamily: "inherit" },
  submitBtn:   { flex: 1, padding: "13px", fontSize: "15px", fontWeight: "500", background: C.text, color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontFamily: "inherit" },
  primaryBtn:  { width: "100%", padding: "13px", fontSize: "14px", fontWeight: "500", background: C.text, color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontFamily: "inherit", marginTop: "6px" },
  statGrid:    { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "1.5rem" },
  statCard:    { background: C.white, border: `0.5px solid ${C.border}`, borderRadius: "10px", padding: "14px 16px" },
  statLbl:     { fontSize: "11px", color: C.muted, marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: "600" },
  statVal:     { fontSize: "20px", fontWeight: "500", color: C.text },
  table:       { width: "100%", borderCollapse: "collapse", fontSize: "14px" },
  th:          { textAlign: "left", fontSize: "10px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", color: C.dim, padding: "0 12px 10px 0", borderBottom: `0.5px solid ${C.border}` },
  td:          { padding: "13px 12px 13px 0", borderBottom: `0.5px solid ${C.border}`, verticalAlign: "middle" },
  badge:  (t) => ({ display: "inline-block", fontSize: "11px", padding: "3px 8px", borderRadius: "20px", background: t === "green" ? "#e8f5ee" : t === "amber" ? C.amberBg : t === "info" ? C.infoBg : "#f0f0ee", color: t === "green" ? C.success : t === "amber" ? C.amber : t === "info" ? C.info : C.muted }),
  progressWrap:{ background: "#ebebea", borderRadius: "20px", height: "6px", width: "100%", overflow: "hidden" },
  progressBar: (p) => ({ height: "100%", width: `${Math.min(100, p)}%`, background: p >= 100 ? C.success : C.text, borderRadius: "20px" }),
  empty:       { textAlign: "center", padding: "4rem 2rem" },
  emptyTitle:  { fontSize: "16px", fontWeight: "500", color: C.muted, marginBottom: "8px" },
  emptyText:   { fontSize: "14px", color: C.dim },
  flash:       { marginTop: "12px", fontSize: "14px", color: C.success, textAlign: "center" },
  metaGrid:    { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "1.5rem", fontSize: "13px", color: C.muted },
  // Reminder
  reminderBox:   { background: "#fffbf0", border: `0.5px solid #f0d080`, borderRadius: "10px", padding: "16px", marginBottom: "14px" },
  reminderHead:  { display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" },
  reminderTitle: { fontSize: "13px", fontWeight: "600", color: "#7a5c00" },
  reminderSet:   { background: C.amberBg, border: `0.5px solid #e8c840`, borderRadius: "8px", padding: "12px 14px", fontSize: "13px", color: C.amber, display: "flex", alignItems: "flex-start", gap: "8px", marginTop: "10px", lineHeight: "1.6" },
  reminderNote:  { background: "#fff8e8", border: `0.5px solid #f0d080`, borderRadius: "6px", padding: "8px 12px", fontSize: "12px", color: "#b09040", marginTop: "8px" },
  // Toast
  toast:       { position: "fixed", top: "24px", left: "50%", transform: "translateX(-50%)", background: "#111", color: "#fff", padding: "16px 24px", borderRadius: "10px", fontSize: "14px", fontFamily: "'Georgia', serif", zIndex: 9999, display: "flex", alignItems: "flex-start", gap: "12px", boxShadow: "0 4px 24px rgba(0,0,0,0.22)", minWidth: "320px", maxWidth: "480px" },
  toastBody:   { display: "flex", flexDirection: "column", gap: "4px", flex: 1 },
  toastTitle:  { fontWeight: "600", fontSize: "14px" },
  toastSub:    { fontSize: "12px", color: "#aaa" },
  // Transaction log
  totalBar:    { display: "flex", alignItems: "center", justifyContent: "space-between", background: C.white, border: `0.5px solid ${C.border}`, borderRadius: "10px", padding: "14px 18px", marginBottom: "1.25rem" },
  totalLbl:    { fontSize: "13px", color: C.muted },
  totalVal:    { fontSize: "18px", fontWeight: "500", color: C.text },
  quickAdd:    { display: "flex", gap: "10px", marginBottom: "1.25rem", alignItems: "flex-end" },
  quickInput:  { background: C.inputBg, border: `0.5px solid ${C.border}`, borderRadius: "8px", padding: "10px 12px", fontSize: "14px", color: C.text, fontFamily: "inherit", outline: "none", width: "100%", boxSizing: "border-box" },
  quickBtn:    { padding: "10px 20px", fontSize: "13px", fontWeight: "500", background: C.text, color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" },
  txDay:       { fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", color: C.dim, padding: "16px 0 8px", borderBottom: `0.5px solid ${C.border}` },
  txRow:       { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: `0.5px solid ${C.border}` },
  txLeft:      { display: "flex", flexDirection: "column", gap: "3px" },
  txTitle:     { fontSize: "14px", fontWeight: "500", color: C.text },
  txMeta:      { fontSize: "12px", color: C.muted },
  txAmount:    { fontSize: "15px", fontWeight: "500", color: C.success },
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const genId    = () => Date.now().toString(36) + Math.random().toString(36).slice(2);
const todayStr = () => new Date().toISOString().slice(0, 10);
const nowTime  = () => new Date().toTimeString().slice(0, 5);
const fmtDate  = (d) => d ? new Date(d + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "—";
const fmtAmt   = (n) => { const v = parseFloat(n); return isNaN(v) ? "—" : v.toLocaleString("en-GH", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); };
const calcPct  = (a, t) => (!t || t == 0) ? 0 : Math.min(100, Math.round((parseFloat(a) / parseFloat(t)) * 100));

// Advance a Date by one frequency interval
const advanceByFrequency = (date, frequency) => {
  const d = new Date(date);
  if (frequency === "Daily")   d.setDate(d.getDate() + 1);
  if (frequency === "Weekly")  d.setDate(d.getDate() + 7);
  if (frequency === "Monthly") d.setMonth(d.getMonth() + 1);
  return d;
};

// Given a start datetime and frequency, find the next fire time >= now
const nextFireTime = (reminderDate, reminderTime, frequency) => {
  let fire = new Date(`${reminderDate}T${reminderTime}`);
  const now = Date.now();
  if (!frequency || frequency === "") {
    // One-shot: only fire if in the future
    return fire.getTime() > now ? fire : null;
  }
  // Recurring: advance until we're past now
  while (fire.getTime() <= now) {
    fire = advanceByFrequency(fire, frequency);
  }
  return fire;
};

const freqLabel = (f) => f === "Daily" ? "every day" : f === "Weekly" ? "every week" : f === "Monthly" ? "every month" : "once";
const freqInterval = (f) => f === "Daily" ? "24h" : f === "Weekly" ? "7 days" : f === "Monthly" ? "~30 days" : "—";

const BLANK = { title: "", description: "", frequency: "", method: "Cash", targetAmount: "", actualAmount: "", minRange: "", maxRange: "", startDate: "", endDate: "", reminderDate: "", reminderTime: "" };
const FREQ  = ["Daily", "Weekly", "Monthly"];

// ── Toast ─────────────────────────────────────────────────────────────────────
function Toast({ title, sub, onClose }) {
  return (
    <div style={S.toast}>
      <span style={{ fontSize: "22px", marginTop: "1px" }}>⏰</span>
      <div style={S.toastBody}>
        <span style={S.toastTitle}>{title}</span>
        {sub && <span style={S.toastSub}>{sub}</span>}
      </div>
      <button onClick={onClose} style={{ background: "none", border: "none", color: "#777", cursor: "pointer", fontSize: "18px", padding: "0", marginTop: "1px" }}>✕</button>
    </div>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────
export default function SavingsApp() {
  const [plans, setPlans]           = useState([]);
  const [view, setView]             = useState("main");
  const [tab, setTab]               = useState("history");
  const [selectedId, setSelectedId] = useState(null);
  const [toast, setToast]           = useState(null);
  const timers = useRef({});

  // ── Recurring reminder scheduler ──────────────────────────────────────────
  const scheduleReminder = (plan) => {
    if (!plan.reminderDate || !plan.reminderTime) return;

    // Clear any existing timer for this plan
    if (timers.current[plan.id]) clearTimeout(timers.current[plan.id]);

    const fire = nextFireTime(plan.reminderDate, plan.reminderTime, plan.frequency);
    if (!fire) return;

    const delay = fire.getTime() - Date.now();

    timers.current[plan.id] = setTimeout(() => {
      const isRecurring = !!plan.frequency;
      setToast({
        title: `Time to save! — "${plan.title}"`,
        sub: isRecurring
          ? `This reminder repeats ${freqLabel(plan.frequency)}. Next one in ${freqInterval(plan.frequency)}.`
          : `One-time reminder for your savings plan.`,
      });

      // If recurring, immediately schedule the next occurrence
      if (isRecurring) {
        const nextPlan = { ...plan, reminderDate: fire.toISOString().slice(0, 10), reminderTime: fire.toTimeString().slice(0, 5) };
        scheduleReminder(nextPlan);
      }
    }, delay);
  };

  const addPlan = (form) => {
    const plan = {
      ...form,
      id: genId(),
      contributions: [],
      actualAmount: parseFloat(form.actualAmount) || 0,
      createdAt: new Date().toISOString(),
    };
    setPlans(prev => [plan, ...prev]);
    scheduleReminder(plan);
    setTab("history");
  };

  const addContrib = (planId, contrib) => {
    setPlans(prev => prev.map(p => {
      if (p.id !== planId) return p;
      const contributions = [contrib, ...p.contributions];
      const actualAmount  = contributions.reduce((s, c) => s + parseFloat(c.amount || 0), 0);
      return { ...p, contributions, actualAmount };
    }));
  };

  const openDetail = (id) => { setSelectedId(id); setView("detail"); };
  const goBack     = ()   => { setView("main"); setSelectedId(null); };
  const plan = plans.find(p => p.id === selectedId);

  return (
    <>
      {toast && <Toast title={toast.title} sub={toast.sub} onClose={() => setToast(null)} />}
      {view === "detail" && plan
        ? <DetailView plan={plan} onBack={goBack} onAddContrib={(c) => addContrib(plan.id, c)} />
        : (
          <div style={S.app}>
            <div style={S.header}>
              <div style={S.headerTop}><h1 style={S.pageTitle}>My Savings</h1></div>
              <div style={S.tabBar}>
                {[["history", "History"], ["add", "Add Savings"]].map(([k, v]) => (
                  <button key={k} style={S.tab(tab === k)} onClick={() => setTab(k)}>{v}</button>
                ))}
              </div>
            </div>
            <div style={S.body}>
              {tab === "history"
                ? <HistoryTab plans={plans} onOpen={openDetail} />
                : <AddTab onSave={addPlan} onHistory={() => setTab("history")} />}
            </div>
          </div>
        )
      }
    </>
  );
}

// ── History Tab ───────────────────────────────────────────────────────────────
function HistoryTab({ plans, onOpen }) {
  if (!plans.length) return (
    <div style={S.empty}>
      <p style={S.emptyTitle}>No savings yet</p>
      <p style={S.emptyText}>Switch to "Add Savings" to create your first plan.</p>
    </div>
  );
  const totalTarget = plans.reduce((s, p) => s + parseFloat(p.targetAmount || 0), 0);
  const totalSaved  = plans.reduce((s, p) => s + parseFloat(p.actualAmount  || 0), 0);
  return (
    <>
      <div style={S.statGrid}>
        <div style={S.statCard}><p style={S.statLbl}>Total plans</p><p style={S.statVal}>{plans.length}</p></div>
        <div style={S.statCard}><p style={S.statLbl}>Total target</p><p style={S.statVal}>GH₵ {fmtAmt(totalTarget)}</p></div>
        <div style={S.statCard}><p style={S.statLbl}>Total saved</p><p style={S.statVal}>GH₵ {fmtAmt(totalSaved)}</p></div>
        <div style={S.statCard}><p style={S.statLbl}>Overall progress</p><p style={S.statVal}>{calcPct(totalSaved, totalTarget)}%</p></div>
      </div>
      <table style={S.table}>
        <thead>
          <tr>{["Title & description", "Target", "Saved", "Progress", "Frequency", "Reminder", "Method"].map(h => (
            <th key={h} style={S.th}>{h}</th>
          ))}</tr>
        </thead>
        <tbody>
          {plans.map(p => {
            const prog = calcPct(p.actualAmount, p.targetAmount);
            const hasReminder = p.reminderDate && p.reminderTime;
            return (
              <tr key={p.id} style={{ cursor: "pointer" }} onClick={() => onOpen(p.id)}>
                <td style={S.td}>
                  <div style={{ fontWeight: "500", marginBottom: "2px" }}>{p.title || "Untitled"}</div>
                  <div style={{ fontSize: "12px", color: C.muted }}>{p.description || "—"}</div>
                </td>
                <td style={S.td}>GH₵ {fmtAmt(p.targetAmount)}</td>
                <td style={S.td}>GH₵ {fmtAmt(p.actualAmount || 0)}</td>
                <td style={{ ...S.td, minWidth: "110px" }}>
                  <div style={{ fontSize: "12px", color: C.muted, marginBottom: "4px" }}>{prog}%</div>
                  <div style={S.progressWrap}><div style={S.progressBar(prog)} /></div>
                </td>
                <td style={S.td}>
                  <span style={S.badge("default")}>{p.frequency || "—"}</span>
                </td>
                <td style={S.td}>
                  {hasReminder ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                      <span style={S.badge("amber")}>⏰ {p.reminderTime}</span>
                      {p.frequency && <span style={{ fontSize: "11px", color: C.amber }}>Repeats {freqLabel(p.frequency)}</span>}
                    </div>
                  ) : <span style={{ color: C.dim, fontSize: "12px" }}>—</span>}
                </td>
                <td style={S.td}><span style={S.badge(p.method === "Mobile money" ? "info" : "default")}>{p.method}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

// ── Add Tab ───────────────────────────────────────────────────────────────────
function AddTab({ onSave, onHistory }) {
  const [form, setForm]   = useState(BLANK);
  const [flash, setFlash] = useState(false);
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  const progress = () => {
    const t = parseFloat(form.targetAmount), a = parseFloat(form.actualAmount);
    return (!t || !a) ? "" : `${calcPct(a, t)}% of target`;
  };

  // What the reminder will say based on current form state
  const reminderPreview = () => {
    if (!form.reminderDate || !form.reminderTime) return null;
    const fire = nextFireTime(form.reminderDate, form.reminderTime, form.frequency);
    if (!fire) return { text: "This reminder time has already passed.", warn: true };
    const isRecurring = !!form.frequency;
    if (isRecurring) {
      return {
        text: `You will be reminded ${freqLabel(form.frequency)} at ${form.reminderTime}.`,
        detail: `First reminder: ${fmtDate(fire.toISOString().slice(0, 10))} at ${form.reminderTime}.`,
        warn: false,
      };
    }
    return {
      text: `One-time reminder on ${fmtDate(form.reminderDate)} at ${form.reminderTime}.`,
      detail: `Set a saving frequency above to make this reminder repeat automatically.`,
      warn: false,
    };
  };

  const preview = reminderPreview();

  const handleAdd = () => {
    if (!form.title) return;
    onSave(form); setForm(BLANK); setFlash(true); setTimeout(() => setFlash(false), 3000);
  };

  return (
    <>
      <p style={S.section}>Savings info</p>
      <div style={S.row(2)}>
        <div style={S.field}><label style={S.label}>Savings title</label><input style={S.input} type="text" placeholder="e.g. House deposit" value={form.title} onChange={set("title")} /></div>
        <div style={S.field}><label style={S.label}>Description</label><input style={S.input} type="text" placeholder="What is this savings for?" value={form.description} onChange={set("description")} /></div>
      </div>
      <div style={S.row(2)}>
        <div style={S.field}>
          <label style={S.label}>Saving frequency</label>
          <select style={S.input} value={form.frequency} onChange={set("frequency")}>
            <option value="">Select frequency</option>
            {FREQ.map(f => <option key={f}>{f}</option>)}
          </select>
        </div>
        <div style={S.field}>
          <label style={S.label}>Method of saving</label>
          <div style={S.toggleRow}>
            {["Cash", "Mobile money"].map(m => (
              <button key={m} style={S.toggleBtn(form.method === m)} onClick={() => setForm(f => ({ ...f, method: m }))}>{m}</button>
            ))}
          </div>
        </div>
      </div>

      <hr style={S.divider} />

      {/* ── Reminder Section ── */}
      <div style={S.reminderBox}>
        <div style={S.reminderHead}>
          <span style={{ fontSize: "16px" }}>⏰</span>
          <span style={S.reminderTitle}>Savings reminder</span>
          <span style={{ fontSize: "12px", color: "#b09050", marginLeft: "auto" }}>
            {form.frequency ? `Repeats ${freqLabel(form.frequency)}` : "One-time unless frequency is set"}
          </span>
        </div>
        <div style={S.row(2)}>
          <div style={S.field}>
            <label style={{ ...S.label, color: "#9a8040" }}>Reminder date</label>
            <input style={{ ...S.input, background: "#fffbf0", borderColor: "#e8c840" }} type="date" value={form.reminderDate} onChange={set("reminderDate")} />
          </div>
          <div style={S.field}>
            <label style={{ ...S.label, color: "#9a8040" }}>Reminder time</label>
            <input style={{ ...S.input, background: "#fffbf0", borderColor: "#e8c840" }} type="time" value={form.reminderTime} onChange={set("reminderTime")} />
          </div>
        </div>

        {/* Live preview of what the reminder will do */}
        {preview && (
          <div style={{ ...S.reminderSet, flexDirection: "column", gap: "6px", background: preview.warn ? "#fff0f0" : C.amberBg, borderColor: preview.warn ? "#f0a0a0" : "#e8c840" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span>{preview.warn ? "⚠️" : "⏰"}</span>
              <span style={{ fontWeight: "600", color: preview.warn ? "#c02020" : C.amber }}>{preview.text}</span>
            </div>
            {preview.detail && (
              <span style={{ fontSize: "12px", color: preview.warn ? "#c06060" : "#a08030", paddingLeft: "26px" }}>{preview.detail}</span>
            )}
          </div>
        )}

        {/* Helper note */}
        {!form.frequency && form.reminderDate && form.reminderTime && (
          <div style={S.reminderNote}>
            💡 Tip: Select a saving frequency above (Daily / Weekly / Monthly) to make this reminder repeat automatically on that schedule.
          </div>
        )}
        {form.frequency && (!form.reminderDate || !form.reminderTime) && (
          <div style={S.reminderNote}>
            💡 Tip: Set a reminder date and time above to get alerted {freqLabel(form.frequency)} to save.
          </div>
        )}
      </div>

      <hr style={S.divider} />

      <p style={S.section}>Savings amounts</p>
      <div style={S.row(3)}>
        <div style={S.field}><label style={S.label}>Target amount</label><input style={S.input} type="number" placeholder="0.00" value={form.targetAmount} onChange={set("targetAmount")} /></div>
        <div style={S.field}><label style={S.label}>Actual amount</label><input style={S.input} type="number" placeholder="0.00" value={form.actualAmount} onChange={set("actualAmount")} /></div>
        <div style={{ ...S.field, opacity: .55 }}><label style={S.label}>Progress</label><input style={S.inputRO} type="text" placeholder="Auto-calculated" value={progress()} readOnly /></div>
      </div>
      <div style={S.row(2)}>
        <div style={S.field}><label style={S.label}>Min range amount</label><input style={S.input} type="number" placeholder="e.g. 50.00" value={form.minRange} onChange={set("minRange")} /></div>
        <div style={S.field}><label style={S.label}>Max range amount</label><input style={S.input} type="number" placeholder="e.g. 500.00" value={form.maxRange} onChange={set("maxRange")} /></div>
      </div>

      <hr style={S.divider} />

      <p style={S.section}>Timeline</p>
      <div style={S.row(2)}>
        <div style={S.field}><label style={S.label}>Start date</label><input style={S.input} type="date" value={form.startDate} onChange={set("startDate")} /></div>
        <div style={S.field}><label style={S.label}>End date</label><input style={S.input} type="date" value={form.endDate} onChange={set("endDate")} /></div>
      </div>

      <div style={S.footer}>
        <button style={S.historyBtn} onClick={onHistory}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h18M3 12l6-6M3 12l6 6"/></svg>
          History
        </button>
        <button style={S.submitBtn} onClick={handleAdd}>Add Savings</button>
      </div>
      {flash && <p style={S.flash}>Savings plan added! View it in History.</p>}
    </>
  );
}

// ── Detail View ───────────────────────────────────────────────────────────────
function DetailView({ plan, onBack, onAddContrib }) {
  const [detailTab, setDetailTab] = useState("log");
  const [quickAmt,  setQuickAmt]  = useState("");
  const [quickNote, setQuickNote] = useState("");
  const [flash,     setFlash]     = useState(false);

  const prog       = calcPct(plan.actualAmount, plan.targetAmount);
  const totalSaved = plan.contributions.reduce((s, c) => s + parseFloat(c.amount || 0), 0);

  let running = 0;
  const enriched = [...plan.contributions]
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    .map(c => { running += parseFloat(c.amount || 0); return { ...c, running }; })
    .reverse();

  const grouped = {};
  enriched.forEach(c => {
    const key = c.date || todayStr();
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(c);
  });
  const sortedDays = Object.keys(grouped).sort((a, b) => new Date(b) - new Date(a));

  const handleQuickAdd = () => {
    if (!quickAmt) return;
    const now = new Date();
    onAddContrib({
      id: genId(), amount: parseFloat(quickAmt), note: quickNote,
      date: todayStr(), time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      createdAt: now.toISOString(),
    });
    setQuickAmt(""); setQuickNote("");
    setFlash(true); setTimeout(() => setFlash(false), 2500);
  };

  return (
    <div style={S.app}>
      <div style={S.header}>
        <div style={S.headerTop}>
          <button style={S.backBtn} onClick={onBack}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h18M3 12l6-6M3 12l6 6"/></svg>
            Back
          </button>
          <h1 style={{ ...S.pageTitle, fontSize: "18px" }}>{plan.title}</h1>
        </div>
        <div style={S.tabBar}>
          {[["log", "Savings log"], ["add", "Add to savings"]].map(([k, v]) => (
            <button key={k} style={S.tab(detailTab === k)} onClick={() => setDetailTab(k)}>{v}</button>
          ))}
        </div>
      </div>

      <div style={S.body}>
        <div style={S.statGrid}>
          <div style={S.statCard}><p style={S.statLbl}>Target</p><p style={S.statVal}>GH₵ {fmtAmt(plan.targetAmount)}</p></div>
          <div style={S.statCard}><p style={S.statLbl}>Saved so far</p><p style={S.statVal}>GH₵ {fmtAmt(plan.actualAmount || 0)}</p></div>
          <div style={S.statCard}>
            <p style={S.statLbl}>Progress</p><p style={S.statVal}>{prog}%</p>
            <div style={{ ...S.progressWrap, marginTop: "6px" }}><div style={S.progressBar(prog)} /></div>
          </div>
          <div style={S.statCard}><p style={S.statLbl}>Entries logged</p><p style={S.statVal}>{plan.contributions.length}</p></div>
        </div>

        <div style={S.metaGrid}>
          <span><b style={{ color: C.text }}>Description:</b> {plan.description || "—"}</span>
          <span><b style={{ color: C.text }}>Frequency:</b> {plan.frequency || "—"}</span>
          <span><b style={{ color: C.text }}>Method:</b> {plan.method}</span>
          <span><b style={{ color: C.text }}>Start:</b> {fmtDate(plan.startDate)}</span>
          <span><b style={{ color: C.text }}>End:</b> {fmtDate(plan.endDate)}</span>
          <span><b style={{ color: C.text }}>Min:</b> GH₵ {fmtAmt(plan.minRange)}</span>
          <span><b style={{ color: C.text }}>Max:</b> GH₵ {fmtAmt(plan.maxRange)}</span>
          {plan.reminderDate && plan.reminderTime && (
            <span>
              <b style={{ color: C.text }}>⏰ Reminder:</b> {plan.reminderTime}
              {plan.frequency && <span style={{ color: C.amber }}> · Repeats {freqLabel(plan.frequency)}</span>}
            </span>
          )}
        </div>

        <hr style={S.divider} />

        {/* ── Savings log tab ── */}
        {detailTab === "log" && (
          <>
            <div style={S.totalBar}>
              <span style={S.totalLbl}>Total saved across all transactions</span>
              <span style={S.totalVal}>GH₵ {fmtAmt(totalSaved)}</span>
            </div>

            <div style={S.quickAdd}>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: "0 0 160px" }}>
                <label style={S.label}>Amount (GH₵)</label>
                <input style={S.quickInput} type="number" placeholder="Amount..." value={quickAmt}
                  onChange={e => setQuickAmt(e.target.value)} onKeyDown={e => e.key === "Enter" && handleQuickAdd()} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
                <label style={S.label}>Note</label>
                <input style={S.quickInput} type="text" placeholder="Optional note, e.g. Week 2 deposit..." value={quickNote}
                  onChange={e => setQuickNote(e.target.value)} onKeyDown={e => e.key === "Enter" && handleQuickAdd()} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <label style={{ ...S.label, visibility: "hidden" }}>btn</label>
                <button style={S.quickBtn} onClick={handleQuickAdd}>+ Record</button>
              </div>
            </div>
            {flash && <p style={{ color: C.success, fontSize: "13px", marginBottom: "12px" }}>✓ Transaction recorded!</p>}

            {enriched.length === 0
              ? (
                <div style={S.empty}>
                  <p style={S.emptyTitle}>No transactions yet</p>
                  <p style={S.emptyText}>Enter an amount above and press "+ Record" to log your first saving.</p>
                </div>
              )
              : sortedDays.map(day => (
                <div key={day}>
                  <p style={S.txDay}>{fmtDate(day)}</p>
                  {grouped[day].map(c => (
                    <div key={c.id} style={S.txRow}>
                      <div style={S.txLeft}>
                        <span style={S.txTitle}>{c.note || "Savings deposit"}</span>
                        <span style={S.txMeta}>🕐 {c.time} &nbsp;·&nbsp; Running total: GH₵ {fmtAmt(c.running)}</span>
                      </div>
                      <span style={S.txAmount}>+ GH₵ {fmtAmt(c.amount)}</span>
                    </div>
                  ))}
                </div>
              ))
            }
          </>
        )}

        {/* ── Add to savings tab ── */}
        {detailTab === "add" && (
          <AddContribForm onAdd={(c) => { onAddContrib(c); setDetailTab("log"); }} />
        )}
      </div>
    </div>
  );
}

// ── Add Contribution Form ─────────────────────────────────────────────────────
function AddContribForm({ onAdd }) {
  const [amount, setAmount] = useState("");
  const [note,   setNote]   = useState("");
  const [date,   setDate]   = useState(todayStr());
  const [time,   setTime]   = useState(nowTime());
  const handle = () => {
    if (!amount) return;
    onAdd({ id: genId(), amount: parseFloat(amount), note, date, time, createdAt: new Date(`${date}T${time}`).toISOString() });
  };
  return (
    <div style={{ maxWidth: "480px" }}>
      <p style={S.section}>Log a deposit</p>
      <div style={S.row(2)}>
        <div style={S.field}><label style={S.label}>Amount (GH₵)</label><input style={S.input} type="number" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} /></div>
        <div style={S.field}><label style={S.label}>Date</label><input style={S.input} type="date" value={date} onChange={e => setDate(e.target.value)} /></div>
      </div>
      <div style={S.row(2)}>
        <div style={S.field}><label style={S.label}>Time</label><input style={S.input} type="time" value={time} onChange={e => setTime(e.target.value)} /></div>
        <div style={S.field}><label style={S.label}>Note (optional)</label><input style={S.input} type="text" placeholder="e.g. Week 3 deposit" value={note} onChange={e => setNote(e.target.value)} /></div>
      </div>
      <button style={S.primaryBtn} onClick={handle}>Save deposit</button>
    </div>
  );
}
