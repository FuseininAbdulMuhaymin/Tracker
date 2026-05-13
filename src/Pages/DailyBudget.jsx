import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWallet } from '@fortawesome/free-solid-svg-icons'

/* ============================================================
   COLORS & SHARED STYLES
   ============================================================ */
const color = {
  bg:       "#fafaf8",
  white:    "#ffffff",
  border:   "#e2e8f0",
  text:     "#1a202c", 
  muted:    "#718096",
  dim:      "#a0aec0",
  inputBg:  "#edf2f7",
  green:    "#276749",
  greenBg:  "#c6f6d5",
  red:      "#9b2c2c",
  redBg:    "#fed7d7",
  blue:     "#2b6cb0",
  blueBg:   "#bee3f8",
  amber:    "#744210",
  amberBg:  "#fefcbf",
};

const css = {
  page:       { fontFamily: "system-ui, sans-serif", background: color.bg, minHeight: "100vh", color: color.text },
  header:     { background: color.white, borderBottom: `1px solid ${color.border}`, padding: "1.25rem 2rem 0" },
  headerTop:  { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" },
  title:      { fontSize: "20px", fontWeight: "700", margin: 0, color: color.text },
  backBtn:    { display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: color.muted, background: "none", border: `1px solid ${color.border}`, borderRadius: "8px", padding: "6px 14px", cursor: "pointer" },
  tabBar:     { display: "flex", gap: "4px" },
  tab:   (on) => ({ padding: "10px 20px", fontSize: "14px", fontWeight: on ? "600" : "400", color: on ? color.text : color.muted, background: "none", border: "none", borderBottom: on ? `2px solid ${color.text}` : "2px solid transparent", cursor: "pointer", transition: "all 0.15s" }),
  body:       { padding: "1.5rem 2rem" },
  divider:    { border: "none", borderTop: `1px solid ${color.border}`, margin: "1.25rem 0" },

  /* Cards */
  cardRow:    { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "1.5rem" },
  card:       { background: color.white, border: `1px solid ${color.border}`, borderRadius: "12px", padding: "16px" },
  cardLabel:  { fontSize: "11px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.06em", color: color.muted, marginBottom: "6px" },
  cardValue:  { fontSize: "22px", fontWeight: "700", color: color.text },

  /* Form */
  sectionLabel: { fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", color: color.dim, marginBottom: "10px" },
  grid2:   { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "14px" },
  grid3:   { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "14px" },
  grid1:   { display: "grid", gridTemplateColumns: "1fr", gap: "12px", marginBottom: "14px" },
  field:   { display: "flex", flexDirection: "column", gap: "5px" },
  label:   { fontSize: "12px", fontWeight: "600", color: color.muted },
  input:   { background: color.inputBg, border: `1px solid ${color.border}`, borderRadius: "8px", padding: "10px 12px", fontSize: "14px", color: color.text, outline: "none", width: "100%", boxSizing: "border-box" },
  textarea:{ background: color.inputBg, border: `1px solid ${color.border}`, borderRadius: "8px", padding: "10px 12px", fontSize: "14px", color: color.text, outline: "none", width: "100%", boxSizing: "border-box", resize: "vertical", minHeight: "80px" },
  select:  { background: color.inputBg, border: `1px solid ${color.border}`, borderRadius: "8px", padding: "10px 12px", fontSize: "14px", color: color.text, outline: "none", width: "100%", boxSizing: "border-box" },

  /* Buttons */
  btnPrimary: { width: "100%", padding: "12px", fontSize: "15px", fontWeight: "700", background: color.text, color: "#fff", border: "none", borderRadius: "10px", cursor: "pointer" },
  btnOutline: { display: "flex", alignItems: "center", gap: "6px", padding: "10px 18px", fontSize: "13px", fontWeight: "500", color: color.muted, background: "none", border: `1px solid ${color.border}`, borderRadius: "8px", cursor: "pointer" },
  btnAdd:     { padding: "10px 20px", fontSize: "13px", fontWeight: "600", background: color.text, color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", whiteSpace: "nowrap" },

  /* Table */
  table:  { width: "100%", borderCollapse: "collapse", fontSize: "14px" },
  th:     { textAlign: "left", fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.06em", color: color.dim, padding: "0 12px 10px 0", borderBottom: `1px solid ${color.border}` },
  td:     { padding: "12px 12px 12px 0", borderBottom: `1px solid ${color.border}`, verticalAlign: "middle" },

  /* Status badge */
  active:   { display: "inline-block", fontSize: "12px", fontWeight: "600", padding: "3px 10px", borderRadius: "20px", background: color.greenBg, color: color.green },
  inactive: { display: "inline-block", fontSize: "12px", fontWeight: "600", padding: "3px 10px", borderRadius: "20px", background: color.redBg,   color: color.red },
  badge:    { display: "inline-block", fontSize: "12px", fontWeight: "500", padding: "3px 10px", borderRadius: "20px", background: color.blueBg, color: color.blue },

  /* Expense row */
  expRow:   { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: `1px solid ${color.border}` },
  expLeft:  { display: "flex", flexDirection: "column", gap: "3px" },
  expName:  { fontSize: "14px", fontWeight: "600" },
  expDesc:  { fontSize: "12px", color: color.muted },
  expAmt:   { fontSize: "15px", fontWeight: "700", color: color.red },

  /* Total bar */
  totalBar: { display: "flex", alignItems: "center", justifyContent: "space-between", background: color.white, border: `1px solid ${color.border}`, borderRadius: "10px", padding: "14px 18px", marginBottom: "1.25rem" },

  /* Quick add row */
  quickRow: { display: "flex", gap: "10px", marginBottom: "1.25rem", alignItems: "flex-end" },

  /* Empty */
  empty:      { textAlign: "center", padding: "4rem 2rem" },
  emptyTitle: { fontSize: "16px", fontWeight: "600", color: color.muted, marginBottom: "6px" },
  emptyText:  { fontSize: "14px", color:  color.dim },

  /* Flash */
  flash: { marginTop: "10px", fontSize: "13px", color: color.green, textAlign: "center" },
};

/*HELPERS*/
//Unique id generator for budgets and expenses
const makeId    = () => Date.now().toString(36) + Math.random().toString(36).slice(2);

const todayStr  = () => new Date().toISOString().slice(0, 10);
const nowTime   = () => new Date().toTimeString().slice(0, 5);
//number formatter
const fmt       = (n) => isNaN(parseFloat(n)) ? "—" : parseFloat(n).toLocaleString("en-GH", { minimumFractionDigits: 2 });
// date format
const fmtDate   = (d) => d ? new Date(d + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "—";

/* A budget is ACTIVE if it was created within the last 24 hours */
const isActive  = (createdAt) => (Date.now() - new Date(createdAt).getTime()) < 24 * 60 * 60 * 1000;

const CATEGORIES = ["Food & drinks", "Transport", "Shopping", "Utilities", "Health", "Event", "Education", "Other"];

const BLANK_BUDGET = {
  title: "",
  description: "",
  totalAmount: "",
  category: "",
  date: todayStr(),
};

/* ============================================================
   ROOT APP
   ============================================================ */
export default function DailyBudgetApp() {
  const [budgets,    setBudgets]    = useState([]);
  const [view,       setView]       = useState("main");    // "main" | "detail"
  const [tab,        setTab]        = useState("history"); // "history" | "add"
  const [activeId,   setActiveId]   = useState(null);

  /* To add a new budget */
  const addBudget = (form) => {
    const budget = {
      ...form,
      id:        makeId(),
      expenses:  [],
      createdAt: new Date().toISOString(),
    };
    setBudgets(prev => [budget, ...prev]);
    setTab("history");
  };

  /*  To add an expense to a budget */
  const addExpense = (budgetId, expense) => {
    setBudgets(prev => prev.map(b => {
      if (b.id !== budgetId) return b;
      return { ...b, expenses: [expense, ...b.expenses] };
    }));
  };

  /* Open detail view */
  const openBudget = (id) => { setActiveId(id); setView("detail"); };
  const goBack     = ()   => { setView("main"); setActiveId(null); };

  const budget = budgets.find(b => b.id === activeId);

  /* ── Render ── */
  if (view === "detail" && budget) {
    return <DetailView budget={budget} onBack={goBack} onAddExpense={(e) => addExpense(budget.id, e)} />;
  }

  return (
    <div style={css.page}>
      <div style={css.header}>
        <div style={css.headerTop}>
          <h1 style={css.title}><FontAwesomeIcon icon={faWallet}/>Daily Budget</h1>
        </div>
        <div style={css.tabBar}>
          {[["history", "History"], ["add", "Add Budget"]].map(([k, v]) => (
            <button key={k} style={css.tab(tab === k)} onClick={() => setTab(k)}>{v}</button>
          ))}
        </div>
      </div>

      <div style={css.body}>
        {tab === "history"
          ? <HistoryTab budgets={budgets} onOpen={openBudget} />
          : <AddBudgetForm onSave={addBudget} onHistory={() => setTab("history")} />
        }
      </div>
    </div>
  );
}

/* ============================================================
   HISTORY TAB  — shows all budgets in a table
   ============================================================ */
function HistoryTab({ budgets, onOpen }) {
  if (budgets.length === 0) {
    return (
      <div style={css.empty}>
        <p style={css.emptyTitle}>No budgets yet</p>
        <p style={css.emptyText}>Go to "Add Budget" to create your first daily budget.</p>
      </div>
    );
  }

  /* Summary numbers */
  const totalBudgeted = budgets.reduce((s, b) => s + parseFloat(b.totalAmount || 0), 0);
  const totalSpent    = budgets.reduce((s, b) => s + b.expenses.reduce((es, e) => es + parseFloat(e.amount || 0), 0), 0);
  const remaining     = totalBudgeted - totalSpent;

  return (
    <>
      {/* Summary cards */}
      <div style={css.cardRow}>
        <div style={css.card}>
          <p style={css.cardLabel}>Total budgeted</p>
          <p style={css.cardValue}>GH₵ {fmt(totalBudgeted)}</p>
        </div>
        <div style={css.card}>
          <p style={css.cardLabel}>Total spent</p>
          <p style={{ ...css.cardValue, color: color.red }}>GH₵ {fmt(totalSpent)}</p>
        </div>
        <div style={css.card}>
          <p style={css.cardLabel}>Remaining</p>
          <p style={{ ...css.cardValue, color: remaining >= 0 ? color.green : color.red }}>GH₵ {fmt(remaining)}</p>
        </div>
      </div>

      {/* Budgets table */}
      <table style={css.table}>
        <thead>
          <tr>
            {["Title & date", "Category", "Budgeted", "Spent", "Remaining", "Status"].map(h => (
              <th key={h} style={css.th}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {budgets.map(b => {
            const spent = b.expenses.reduce((s, e) => s + parseFloat(e.amount || 0), 0);
            const left  = parseFloat(b.totalAmount || 0) - spent;
            const active = isActive(b.createdAt);
            return (
              <tr key={b.id} style={{ cursor: "pointer" }} onClick={() => onOpen(b.id)}>
                <td style={css.td}>
                  <div style={{ fontWeight: "600", marginBottom: "2px" }}>{b.title || "Untitled"}</div>
                  <div style={{ fontSize: "12px", color: color.muted }}>{fmtDate(b.date)}</div>
                </td>
                <td style={css.td}>
                  <span style={css.badge}>{b.category || "—"}</span>
                </td>
                <td style={css.td}>GH₵ {fmt(b.totalAmount)}</td>
                <td style={{ ...css.td, color: color.red, fontWeight: "600" }}>GH₵ {fmt(spent)}</td>
                <td style={{ ...css.td, color: left >= 0 ? color.green : color.red, fontWeight: "600" }}>GH₵ {fmt(left)}</td>
                <td style={css.td}>
                  {/* STATUS column — active within 24h, inactive after */}
                  <span style={active ? css.active : css.inactive}>
                    {active ? "● Active" : "○ Inactive"}
                  </span>
                  {active && (
                    <div style={{ fontSize: "11px", color: color.muted, marginTop: "3px" }}>
                      Expires in {Math.max(0, Math.floor((24 * 60 * 60 * 1000 - (Date.now() - new Date(b.createdAt).getTime())) / 3600000))}h
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

/* ============================================================
   ADD BUDGET FORM
   ============================================================ */
function AddBudgetForm({ onSave, onHistory }) {
  const [form,  setForm]  = useState(BLANK_BUDGET);
  const [flash, setFlash] = useState(false);

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const handleSave = () => {
    if (!form.title || !form.totalAmount) return;
    onSave(form);
    setForm(BLANK_BUDGET);
    setFlash(true);
    setTimeout(() => setFlash(false), 3000);
  };

  return (
    <>
      <p style={css.sectionLabel}>Budget details</p>

      {/* Row 1: Title + Date */}
      <div style={css.grid2}>
        <div style={css.field}>
          <label style={css.label}>Budget title</label>
          <input style={css.input} type="text" placeholder="e.g. Monday spending" value={form.title} onChange={set("title")} />
        </div>
        <div style={css.field}>
          <label style={css.label}>Date</label>
          <input style={css.input} type="date" value={form.date} onChange={set("date")} />
        </div>
      </div>

      {/* Row 2: Total amount + Category */}
      <div style={css.grid2}>
        <div style={css.field}>
          <label style={css.label}>Total budget amount (GH₵)</label>
          <input style={css.input} type="number" placeholder="e.g. 200.00" value={form.totalAmount} onChange={set("totalAmount")} />
        </div>
        <div style={css.field}>
          <label style={css.label}>Category</label>
          <select style={css.select} value={form.category} onChange={set("category")}>
            <option value="">Select a category</option>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Row 3: Description */}
      <div style={css.grid1}>
        <div style={css.field}>
          <label style={css.label}>Description</label>
          <textarea style={css.textarea} placeholder="What is this budget for?" value={form.description} onChange={set("description")} />
        </div>
      </div>

      {/* Footer buttons */}
      <div style={{ display: "flex", gap: "12px", marginTop: "8px", alignItems: "center" }}>
        <button style={css.btnOutline} onClick={onHistory}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12h18M3 12l6-6M3 12l6 6" />
          </svg>
          History
        </button>
        <button style={{ ...css.btnPrimary, flex: 1 }} onClick={handleSave}>Add Budget</button>
      </div>

      {flash && <p style={css.flash}>✓ Budget created! View it in History.</p>}
    </>
  );
}

/* ============================================================
   DETAIL VIEW  — shows one budget + its expenses
   ============================================================ */
function DetailView({ budget, onBack, onAddExpense }) {
  const [detailTab, setDetailTab] = useState("log");

  /* Totals */
  const totalSpent = budget.expenses.reduce((s, e) => s + parseFloat(e.amount || 0), 0);
  const remaining  = parseFloat(budget.totalAmount || 0) - totalSpent;
  const active     = isActive(budget.createdAt);

  return (
    <div style={css.page}>
      {/* Header */}
      <div style={css.header}>
        <div style={css.headerTop}>
          <button style={css.backBtn} onClick={onBack}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12h18M3 12l6-6M3 12l6 6" />
            </svg>
            Back
          </button>
          <h1 style={{ ...css.title, fontSize: "18px" }}>{budget.title}</h1>
          <span style={active ? css.active : css.inactive}>{active ? "● Active" : "○ Inactive"}</span>
        </div>
        <div style={css.tabBar}>
          {[["log", "Expense log"], ["add", "Add expense"]].map(([k, v]) => (
            <button key={k} style={css.tab(detailTab === k)} onClick={() => setDetailTab(k)}>{v}</button>
          ))}
        </div>
      </div>

      <div style={css.body}>
        {/* Summary cards */}
        <div style={css.cardRow}>
          <div style={css.card}>
            <p style={css.cardLabel}>Daily budget</p>
            <p style={css.cardValue}>GH₵ {fmt(budget.totalAmount)}</p>
          </div>
          <div style={css.card}>
            <p style={css.cardLabel}>Total spent</p>
            <p style={{ ...css.cardValue, color: color.red }}>GH₵ {fmt(totalSpent)}</p>
          </div>
          <div style={css.card}>
            <p style={css.cardLabel}>Remaining</p>
            <p style={{ ...css.cardValue, color: remaining >= 0 ? color.green : color.red }}>GH₵ {fmt(remaining)}</p>
          </div>
        </div>

        {/* Budget meta info */}
        <div style={{ display: "flex", gap: "24px", fontSize: "13px", color: color.muted, marginBottom: "1.25rem", flexWrap: "wrap" }}>
          <span><b style={{ color: color.text }}>Date:</b> {fmtDate(budget.date)}</span>
          <span><b style={{ color: color.text }}>Category:</b> {budget.category || "—"}</span>
          <span><b style={{ color: color.text }}>Description:</b> {budget.description || "—"}</span>
          <span><b style={{ color: color.text }}>Status:</b> <span style={active ? { color: color.green } : { color: color.red }}>{active ? "Active" : "Inactive (expired after 24h)"}</span></span>
        </div>

        <div style={{ ...css.divider }} />

        {/* ── Expense log tab ── */}
        {detailTab === "log" && (
          <ExpenseLog
            expenses={budget.expenses}
            totalSpent={totalSpent}
            onAdd={(e) => { onAddExpense(e); }}
          />
        )}

        {/* ── Add expense tab ── */}
        {detailTab === "add" && (
          <AddExpenseForm onAdd={(e) => { onAddExpense(e); setDetailTab("log"); }} />
        )}
      </div>
    </div>
  );
}

/* ============================================================
   EXPENSE LOG  — list of all expenses + quick-add row
   ============================================================ */
function ExpenseLog({ expenses, totalSpent, onAdd }) {
  const [item,   setItem]   = useState("");
  const [amount, setAmount] = useState("");
  const [desc,   setDesc]   = useState("");
  const [flash,  setFlash]  = useState(false);

  const handleAdd = () => {
    if (!item || !amount) return;
    const now = new Date();
    onAdd({
      id:        makeId(),
      item,
      amount:    parseFloat(amount),
      desc,
      time:      now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      date:      todayStr(),
      createdAt: now.toISOString(),
    });
    setItem(""); setAmount(""); setDesc("");
    setFlash(true);
    setTimeout(() => setFlash(false), 2500);
  };

  return (
    <>
      {/* Total bar */}
      <div style={css.totalBar}>
        <span style={{ fontSize: "13px", color: color.muted }}>Total spent today</span>
        <span style={{ fontSize: "20px", fontWeight: "700", color: color.red }}>GH₵ {fmt(totalSpent)}</span>
      </div>

      {/* Quick-add row — Item / Service, Amount, Description */}
      <p style={{ ...css.sectionLabel, marginBottom: "8px" }}>Record an expense</p>
      <div style={css.grid3}>
        <div style={css.field}>
          <label style={css.label}>Item / service</label>
          <input style={css.input} type="text" placeholder="e.g. Lunch, Taxi..." value={item} onChange={e => setItem(e.target.value)} onKeyDown={e => e.key === "Enter" && handleAdd()} />
        </div>
        <div style={css.field}>
          <label style={css.label}>Amount to spend (GH₵)</label>
          <input style={css.input} type="number" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} onKeyDown={e => e.key === "Enter" && handleAdd()} />
        </div>
        <div style={css.field}>
          <label style={css.label}>Description</label>
          <input style={css.input} type="text" placeholder="Brief note..." value={desc} onChange={e => setDesc(e.target.value)} onKeyDown={e => e.key === "Enter" && handleAdd()} />
        </div>
      </div>
      <button style={{ ...css.btnPrimary, marginBottom: "1rem" }} onClick={handleAdd}>+ Add expense</button>
      {flash && <p style={{ ...css.flash, textAlign: "left", marginBottom: "8px" }}>✓ Expense recorded!</p>}

      <div style={css.divider} />

      {/* List of expenses */}
      {expenses.length === 0 ? (
        <div style={css.empty}>
          <p style={css.emptyTitle}>No expenses yet</p>
          <p style={css.emptyText}>Use the form above to record your first expense.</p>
        </div>
      ) : (
        expenses.map(e => (
          <div key={e.id} style={css.expRow}>
            <div style={css.expLeft}>
              <span style={css.expName}>{e.item}</span>
              <span style={css.expDesc}>{e.desc || "—"} &nbsp;·&nbsp; 🕐 {e.time}</span>
            </div>
            <span style={css.expAmt}>− GH₵ {fmt(e.amount)}</span>
          </div>
        ))
      )}
    </>
  );
}

/*ADD EXPENSE FORM  — full form version (inside "Add expense" tab)*/
function AddExpenseForm({ onAdd }) {
  const [item,   setItem]   = useState("");
  const [amount, setAmount] = useState("");
  const [desc,   setDesc]   = useState("");       
  const [time,   setTime]   = useState(nowTime());
  const [date,   setDate]   = useState(todayStr());

  const handle = () => {
    if (!item || !amount) return;
    onAdd({ id: makeId(), item, amount: parseFloat(amount), desc, time, date, createdAt: new Date(`${date}T${time}`).toISOString() });
  };

  return (
    <div style={{ maxWidth: "520px" }}>
      <p style={css.sectionLabel}>Expense details</p>

      {/* The three required inputs */}
      <div style={css.grid1}>
        <div style={css.field}>
          <label style={css.label}>Item / service</label>
          <input style={css.input} type="text" placeholder="What did you spend on? e.g. Lunch, Bus fare..." value={item} onChange={e => setItem(e.target.value)} />
        </div>
      </div>
      <div style={css.grid2}>
        <div style={css.field}>
          <label style={css.label}>Amount to spend (GH₵)</label>
          <input style={css.input} type="number" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} />
        </div>
        <div style={css.field}>
          <label style={css.label}>Time</label>
          <input style={css.input} type="time" value={time} onChange={e => setTime(e.target.value)} />
        </div>
      </div>
      <div style={css.grid1}>
        <div style={css.field}>
          <label style={css.label}>Description</label>
          <textarea style={css.textarea} placeholder="Add more details about this expense..." value={desc} onChange={e => setDesc(e.target.value)} />
        </div>
      </div>

      <button style={css.btnPrimary} onClick={handle}>Save expense</button>
    </div>
  );
}
