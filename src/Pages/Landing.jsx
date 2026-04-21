// src/pages/Landing.jsx

import React, { useState, useEffect } from "react";


/* ============================================================
   CSS STYLES
   ============================================================ */
const css = `

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: system-ui, -apple-system, sans-serif;
    background: #ffffff;
    color: #1a202c;
  }

  /* ── NAVBAR ── */
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background: rgba(255,255,255,0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid #e2e8f0;
    padding: 0 2.5rem;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .nav-logo {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .nav-logo-icon {
    width: 36px;
    height: 36px;
    background: linear-gradient(135deg, #6366f1, #3b82f6);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 16px;
  }

  .nav-logo-name {
    font-size: 18px;
    font-weight: 800;
    color: #1a202c;
  }

  .nav-btn {
    background: #1a202c;
    color: #ffffff;
    border: none;
    padding: 9px 22px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    font-family: inherit;
    transition: opacity 0.15s;
  }

  .nav-btn:hover {
    opacity: 0.85;
  }

  /* ── HERO ── */
  .hero {
    padding: 140px 2rem 100px;
    text-align: center;
    background: linear-gradient(180deg, #f8f7ff 0%, #ffffff 100%);
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    background: #ede9fe;
    color: #6d28d9;
    font-size: 12px;
    font-weight: 700;
    padding: 6px 16px;
    border-radius: 30px;
    margin-bottom: 1.5rem;
    text-transform: uppercase;
    letter-spacing: 0.07em;
  }

  .hero-title {
    font-size: 52px;
    font-weight: 900;
    line-height: 1.15;
    color: #1a202c;
    max-width: 700px;
    margin: 0 auto 1.25rem;
  }

  .hero-title .highlight {
    background: linear-gradient(135deg, #6366f1, #3b82f6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-sub {
    font-size: 18px;
    color: #718096;
    max-width: 520px;
    margin: 0 auto 2.5rem;
    line-height: 1.7;
  }

  .hero-btns {
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .btn-primary {
    background: #1a202c;
    color: #ffffff;
    border: none;
    padding: 14px 32px;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    font-family: inherit;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: transform 0.15s, opacity 0.15s;
  }

  .btn-primary:hover {
    opacity: 0.88;
    transform: translateY(-1px);
  }

  .btn-outline {
    background: transparent;
    color: #1a202c;
    border: 1.5px solid #e2e8f0;
    padding: 14px 32px;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    font-family: inherit;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: background 0.15s;
  }

  .btn-outline:hover {
    background: #f7fafc;
  }

  /* ── STATS STRIP ── */
  .stats-strip {
    display: flex;
    justify-content: center;
    gap: 60px;
    padding: 2.5rem 2rem;
    border-top: 1px solid #e2e8f0;
    border-bottom: 1px solid #e2e8f0;
    flex-wrap: wrap;
  }

  .stat-item {
    text-align: center;
  }

  .stat-number {
    font-size: 28px;
    font-weight: 900;
    color: #1a202c;
    margin-bottom: 4px;
  }

  .stat-label {
    font-size: 13px;
    color: #718096;
  }

  /* ── SECTION WRAPPER ── */
  .section {
    padding: 90px 2rem;
    max-width: 1100px;
    margin: 0 auto;
  }

  .section-tag {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    padding: 5px 14px;
    border-radius: 30px;
    margin-bottom: 1rem;
  }

  .section-title {
    font-size: 34px;
    font-weight: 900;
    color: #1a202c;
    margin-bottom: 1rem;
    line-height: 1.2;
  }

  .section-desc {
    font-size: 16px;
    color: #718096;
    max-width: 480px;
    line-height: 1.7;
    margin-bottom: 2.5rem;
  }

  /* ── FEATURE CARD (each section's visual box) ── */
  .feature-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
  }

  .feature-row.reverse {
    direction: rtl;
  }

  .feature-row.reverse > * {
    direction: ltr;
  }

  .feature-visual {
    border-radius: 20px;
    overflow: hidden;
    border: 1px solid #e2e8f0;
    box-shadow: 0 8px 40px rgba(0,0,0,0.1);
  }

  .feature-visual-inner {
    padding: 32px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  /* Mock UI rows inside the visual box */
  .mock-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 6px;
  }

  .mock-title {
    font-size: 15px;
    font-weight: 700;
    color: #1a202c;
  }

  .mock-badge {
    font-size: 11px;
    font-weight: 600;
    padding: 3px 10px;
    border-radius: 20px;
  }

  .mock-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #f7fafc;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    padding: 12px 16px;
  }

  .mock-row-left {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .mock-icon {
    width: 34px;
    height: 34px;
    border-radius: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    flex-shrink: 0;
  }

  .mock-label {
    font-size: 13px;
    font-weight: 600;
    color: #1a202c;
  }

  .mock-sublabel {
    font-size: 11px;
    color: #718096;
    margin-top: 1px;
  }

  .mock-amount {
    font-size: 14px;
    font-weight: 700;
  }

  .mock-prog-wrap {
    background: #e2e8f0;
    border-radius: 10px;
    height: 7px;
    overflow: hidden;
    margin-top: 4px;
  }

  .mock-prog-fill {
    height: 100%;
    border-radius: 10px;
  }

  /* Feature list beside the visual */
  .feature-list {
    list-style: none;
    margin: 0 0 2rem;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .feature-list li {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    font-size: 15px;
    color: #4a5568;
    line-height: 1.55;
  }

  .feature-list li i {
    margin-top: 3px;
    font-size: 14px;
    flex-shrink: 0;
  }

  /* Section divider */
  .section-divider {
    border: none;
    border-top: 1px solid #e2e8f0;
    max-width: 1100px;
    margin: 0 auto;
  }

  /* ── BOTTOM CTA SECTION ── */
  .cta {
    background: #1a202c;
    padding: 90px 2rem;
    text-align: center;
  }

  .cta-title {
    font-size: 36px;
    font-weight: 900;
    color: #ffffff;
    margin-bottom: 1rem;
  }

  .cta-sub {
    font-size: 16px;
    color: #a0aec0;
    margin-bottom: 2rem;
    max-width: 480px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.7;
  }

  .cta-btn {
    background: #ffffff;
    color: #1a202c;
    border: none;
    padding: 14px 36px;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 800;
    cursor: pointer;
    font-family: inherit;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: opacity 0.15s;
  }

  .cta-btn:hover {
    opacity: 0.9;
  }

  /* ── FOOTER ── */
  .footer {
    background: #f7fafc;
    border-top: 1px solid #e2e8f0;
    padding: 1.5rem 2rem;
    text-align: center;
    font-size: 13px;
    color: #a0aec0;
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 820px) {
    .hero-title       { font-size: 36px; }
    .feature-row      { grid-template-columns: 1fr; gap: 30px; }
    .feature-row.reverse { direction: ltr; }
    .stats-strip      { gap: 30px; }
    .section-title    { font-size: 26px; }
  }

  @media (max-width: 480px) {
    .hero-title       { font-size: 28px; }
    .nav              { padding: 0 1rem; }
    .hero             { padding: 110px 1rem 70px; }
    .section          { padding: 60px 1rem; }
  }
`;

/* ============================================================
   LANDING PAGE COMPONENT
   ============================================================ */
export default function Landing() {
  const navigate = useNavigate();

  // Scroll to a section smoothly
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Inject CSS */}
      <style>{css}</style>

      {/* ════════════════════════════════════════
          NAVBAR
      ════════════════════════════════════════ */}
      <nav className="nav">

        <div className="nav-logo">
          <div className="nav-logo-icon">
            <i className="fas fa-coins"></i>
          </div>
          <span className="nav-logo-name">FinanceHub</span>
        </div>

        {/* Clicking Get Started goes to the dashboard */}
        <button className="nav-btn" onClick={() => navigate("/dashboard")}>
          Get Started &nbsp;
          <i className="fas fa-arrow-right"></i>
        </button>

      </nav>

      {/* ════════════════════════════════════════
          HERO SECTION
      ════════════════════════════════════════ */}
      <section className="hero">

        <div className="hero-badge">
          <i className="fas fa-star"></i>
          Personal Finance Tracker
        </div>

        <h1 className="hero-title">
          Take full control of <span className="highlight">your money</span>
        </h1>

        <p className="hero-sub">
          Save smarter, budget better, track every cedi, and get
          instant AI financial advice — all in one simple app.
        </p>

        <div className="hero-btns">
          <button className="btn-primary" onClick={() => navigate("/dashboard")}>
            <i className="fas fa-rocket"></i>
            Open App
          </button>
          <button className="btn-outline" onClick={() => scrollTo("features")}>
            <i className="fas fa-play-circle"></i>
            See Features
          </button>
        </div>

      </section>

      {/* ════════════════════════════════════════
          STATS STRIP
      ════════════════════════════════════════ */}
      <div className="stats-strip">

        {[
          { number: "4",      label: "Finance tools"    },
          { number: "100%",   label: "Private & local"  },
          { number: "Free",   label: "No cost ever"     },
          { number: "AI",     label: "Powered advice"   },
        ].map((s) => (
          <div className="stat-item" key={s.label}>
            <div className="stat-number">{s.number}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}

      </div>

      {/* ════════════════════════════════════════
          FEATURES — each section is one tool
          id="features" lets scrollTo() find it
      ════════════════════════════════════════ */}
      <div id="features">

        {/* ── 1. SAVINGS ── */}
        <section className="section">
          <div className="feature-row">

            {/* Left — text */}
            <div>
              <div className="section-tag" style={{ background: "#ede9fe", color: "#6d28d9" }}>
                <i className="fas fa-piggy-bank"></i>
                Savings
              </div>
              <h2 className="section-title">Build your savings, one goal at a time</h2>
              <p className="section-desc">
                Create saving goals, set reminders to save daily, weekly or
                monthly, and watch your money grow with a clear progress tracker.
              </p>
              <ul className="feature-list">
                <li><i className="fas fa-check-circle" style={{ color: "#6d28d9" }}></i> Create multiple saving goals with a target amount</li>
                <li><i className="fas fa-check-circle" style={{ color: "#6d28d9" }}></i> Log deposits any time and track your running total</li>
                <li><i className="fas fa-check-circle" style={{ color: "#6d28d9" }}></i> Set daily, weekly or monthly reminders to save</li>
                <li><i className="fas fa-check-circle" style={{ color: "#6d28d9" }}></i> See your progress bar fill up as you save more</li>
              </ul>
              <button className="btn-primary" onClick={() => navigate("/savings")}>
                <i className="fas fa-piggy-bank"></i>
                Open Savings
              </button>
            </div>

            {/* Right — mock UI preview */}
            <div className="feature-visual" style={{ background: "#faf8ff" }}>
              <div className="feature-visual-inner">

                <div className="mock-header">
                  <span className="mock-title">My Savings</span>
                  <span className="mock-badge" style={{ background: "#ede9fe", color: "#6d28d9" }}>
                    3 goals
                  </span>
                </div>

                {/* Saving goal rows */}
                {[
                  { label: "New Phone",     sub: "Monthly · Cash",  amount: "GH₵ 850",  pct: 72, color: "#6d28d9" },
                  { label: "Holiday Trip",  sub: "Weekly · Mobile", amount: "GH₵ 1,200", pct: 45, color: "#9333ea" },
                  { label: "Emergency Fund",sub: "Daily · Cash",    amount: "GH₵ 500",  pct: 30, color: "#a855f7" },
                ].map((item) => (
                  <div className="mock-row" key={item.label}>
                    <div className="mock-row-left">
                      <div className="mock-icon" style={{ background: "#ede9fe", color: item.color }}>
                        <i className="fas fa-piggy-bank"></i>
                      </div>
                      <div>
                        <div className="mock-label">{item.label}</div>
                        <div className="mock-sublabel">{item.sub}</div>
                        <div className="mock-prog-wrap" style={{ width: "120px" }}>
                          <div className="mock-prog-fill" style={{ width: `${item.pct}%`, background: item.color }}></div>
                        </div>
                      </div>
                    </div>
                    <span className="mock-amount" style={{ color: item.color }}>{item.amount}</span>
                  </div>
                ))}

              </div>
            </div>

          </div>
        </section>

        <hr className="section-divider" />

        {/* ── 2. DAILY BUDGET ── */}
        <section className="section">
          <div className="feature-row reverse">

            {/* Left — text */}
            <div>
              <div className="section-tag" style={{ background: "#c6f6d5", color: "#276749" }}>
                <i className="fas fa-wallet"></i>
                Daily Budget
              </div>
              <h2 className="section-title">Plan your day before you spend a cedi</h2>
              <p className="section-desc">
                Set a daily budget, log every item you spend on, and always
                know exactly how much you have left before the day ends.
              </p>
              <ul className="feature-list">
                <li><i className="fas fa-check-circle" style={{ color: "#276749" }}></i> Create a budget with a title, category and amount</li>
                <li><i className="fas fa-check-circle" style={{ color: "#276749" }}></i> Record expenses with item, amount and description</li>
                <li><i className="fas fa-check-circle" style={{ color: "#276749" }}></i> Budget goes inactive automatically after 24 hours</li>
                <li><i className="fas fa-check-circle" style={{ color: "#276749" }}></i> See total spent and remaining balance at a glance</li>
              </ul>
              <button className="btn-primary" style={{ background: "#276749" }} onClick={() => navigate("/daily-budget")}>
                <i className="fas fa-wallet"></i>
                Open Daily Budget
              </button>
            </div>

            {/* Right — mock UI preview */}
            <div className="feature-visual" style={{ background: "#f0fff4" }}>
              <div className="feature-visual-inner">

                <div className="mock-header">
                  <span className="mock-title">Daily Budget</span>
                  <span className="mock-badge" style={{ background: "#c6f6d5", color: "#276749" }}>
                    ● Active
                  </span>
                </div>

                {/* Budget summary */}
                <div style={{
                  display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "10px", marginBottom: "6px",
                }}>
                  {[
                    { label: "Budget", val: "GH₵ 200", color: "#1a202c"  },
                    { label: "Spent",  val: "GH₵ 135", color: "#9b2c2c"  },
                    { label: "Left",   val: "GH₵ 65",  color: "#276749"  },
                  ].map((s) => (
                    <div key={s.label} style={{
                      background: "#ffffff", border: "1px solid #e2e8f0",
                      borderRadius: "10px", padding: "10px", textAlign: "center",
                    }}>
                      <div style={{ fontSize: "10px", color: "#718096", marginBottom: "3px", textTransform: "uppercase", fontWeight: "700" }}>{s.label}</div>
                      <div style={{ fontSize: "15px", fontWeight: "800", color: s.color }}>{s.val}</div>
                    </div>
                  ))}
                </div>

                {/* Expense rows */}
                {[
                  { item: "Lunch",     desc: "Rice and stew",  amount: "− GH₵ 25" },
                  { item: "Taxi",      desc: "To work",        amount: "− GH₵ 40" },
                  { item: "Groceries", desc: "Evening market", amount: "− GH₵ 70" },
                ].map((e) => (
                  <div className="mock-row" key={e.item}>
                    <div className="mock-row-left">
                      <div className="mock-icon" style={{ background: "#c6f6d5", color: "#276749" }}>
                        <i className="fas fa-receipt"></i>
                      </div>
                      <div>
                        <div className="mock-label">{e.item}</div>
                        <div className="mock-sublabel">{e.desc}</div>
                      </div>
                    </div>
                    <span className="mock-amount" style={{ color: "#9b2c2c" }}>{e.amount}</span>
                  </div>
                ))}

              </div>
            </div>

          </div>
        </section>

        <hr className="section-divider" />

        {/* ── 3. TRACK FINANCE ── */}
        <section className="section">
          <div className="feature-row">

            {/* Left — text */}
            <div>
              <div className="section-tag" style={{ background: "#bee3f8", color: "#2b6cb0" }}>
                <i className="fas fa-chart-line"></i>
                Track Finance
              </div>
              <h2 className="section-title">Know exactly where every cedi goes</h2>
              <p className="section-desc">
                Log all your income and expenses in one place. See your
                net balance clearly and understand your full financial picture.
              </p>
              <ul className="feature-list">
                <li><i className="fas fa-check-circle" style={{ color: "#2b6cb0" }}></i> Log income with category, date and time</li>
                <li><i className="fas fa-check-circle" style={{ color: "#2b6cb0" }}></i> Log expenses with notes and descriptions</li>
                <li><i className="fas fa-check-circle" style={{ color: "#2b6cb0" }}></i> View all transactions in one clean table</li>
                <li><i className="fas fa-check-circle" style={{ color: "#2b6cb0" }}></i> Net balance updates automatically</li>
              </ul>
              <button className="btn-primary" style={{ background: "#2b6cb0" }} onClick={() => navigate("/tracker")}>
                <i className="fas fa-chart-line"></i>
                Open Tracker
              </button>
            </div>

            {/* Right — mock UI preview */}
            <div className="feature-visual" style={{ background: "#ebf8ff" }}>
              <div className="feature-visual-inner">

                <div className="mock-header">
                  <span className="mock-title">Finance Tracker</span>
                </div>

                {/* Balance row */}
                <div style={{
                  display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "10px", marginBottom: "6px",
                }}>
                  {[
                    { label: "Income",  val: "GH₵ 1,800", color: "#276749" },
                    { label: "Expense", val: "GH₵ 960",   color: "#9b2c2c" },
                    { label: "Balance", val: "GH₵ 840",   color: "#2b6cb0" },
                  ].map((s) => (
                    <div key={s.label} style={{
                      background: "#ffffff", border: "1px solid #e2e8f0",
                      borderRadius: "10px", padding: "10px", textAlign: "center",
                    }}>
                      <div style={{ fontSize: "10px", color: "#718096", marginBottom: "3px", textTransform: "uppercase", fontWeight: "700" }}>{s.label}</div>
                      <div style={{ fontSize: "15px", fontWeight: "800", color: s.color }}>{s.val}</div>
                    </div>
                  ))}
                </div>

                {/* Transaction rows */}
                {[
                  { icon: "fas fa-arrow-up",   label: "Salary",         sub: "Income · Today",      amount: "+ GH₵ 1,800", color: "#276749", iconBg: "#c6f6d5" },
                  { icon: "fas fa-arrow-down",  label: "Rent",           sub: "Expense · Yesterday", amount: "− GH₵ 600",  color: "#9b2c2c", iconBg: "#fed7d7" },
                  { icon: "fas fa-arrow-down",  label: "Electricity",    sub: "Expense · Yesterday", amount: "− GH₵ 120",  color: "#9b2c2c", iconBg: "#fed7d7" },
                ].map((t) => (
                  <div className="mock-row" key={t.label}>
                    <div className="mock-row-left">
                      <div className="mock-icon" style={{ background: t.iconBg, color: t.color }}>
                        <i className={t.icon}></i>
                      </div>
                      <div>
                        <div className="mock-label">{t.label}</div>
                        <div className="mock-sublabel">{t.sub}</div>
                      </div>
                    </div>
                    <span className="mock-amount" style={{ color: t.color }}>{t.amount}</span>
                  </div>
                ))}

              </div>
            </div>

          </div>
        </section>

        <hr className="section-divider" />

        {/* ── 4. ASK AI ── */}
        <section className="section">
          <div className="feature-row reverse">

            {/* Left — text */}
            <div>
              <div className="section-tag" style={{ background: "#fefcbf", color: "#744210" }}>
                <i className="fas fa-robot"></i>
                Ask AI
              </div>
              <h2 className="section-title">Your personal finance advisor, always available</h2>
              <p className="section-desc">
                Ask any question about money and get clear, simple advice
                powered by AI — whether you are saving for a goal,
                trying to budget, or learning to invest.
              </p>
              <ul className="feature-list">
                <li><i className="fas fa-check-circle" style={{ color: "#d69e2e" }}></i> Ask anything — budgeting, saving, investing</li>
                <li><i className="fas fa-check-circle" style={{ color: "#d69e2e" }}></i> Get beginner-friendly answers instantly</li>
                <li><i className="fas fa-check-circle" style={{ color: "#d69e2e" }}></i> Use quick suggestion chips to get started</li>
                <li><i className="fas fa-check-circle" style={{ color: "#d69e2e" }}></i> Powered by Claude AI — smart and accurate</li>
              </ul>
              <button className="btn-primary" style={{ background: "#d69e2e" }} onClick={() => navigate("/ask-ai")}>
                <i className="fas fa-robot"></i>
                Open Ask AI
              </button>
            </div>

            {/* Right — mock chat UI */}
            <div className="feature-visual" style={{ background: "#fffff0" }}>
              <div className="feature-visual-inner" style={{ gap: "10px" }}>

                <div className="mock-header">
                  <span className="mock-title">Ask AI</span>
                  <span className="mock-badge" style={{ background: "#fefcbf", color: "#744210" }}>
                    <i className="fas fa-circle" style={{ fontSize: "8px", marginRight: "4px" }}></i>
                    Online
                  </span>
                </div>

                {/* Chat bubbles */}
                {[
                  { from: "ai",   text: "Hi! Ask me anything about your money. I am here to help 💰" },
                  { from: "user", text: "How do I save GH₵500 a month?" },
                  { from: "ai",   text: "Start by tracking all expenses this week. Then cut the top 2 non-essential spending areas. Automate a transfer on pay day so savings happen first 💡" },
                ].map((m, i) => (
                  <div key={i} style={{
                    display:        "flex",
                    justifyContent: m.from === "user" ? "flex-end" : "flex-start",
                  }}>
                    <div style={{
                      maxWidth:     "78%",
                      padding:      "10px 14px",
                      borderRadius: m.from === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                      background:   m.from === "user" ? "#1a202c" : "#ffffff",
                      color:        m.from === "user" ? "#ffffff" : "#1a202c",
                      fontSize:     "12px",
                      lineHeight:   "1.55",
                      border:       m.from === "ai" ? "1px solid #e2e8f0" : "none",
                    }}>
                      {m.text}
                    </div>
                  </div>
                ))}

                {/* Fake input bar */}
                <div style={{
                  display:      "flex",
                  gap:          "8px",
                  marginTop:    "6px",
                  background:   "#ffffff",
                  border:       "1px solid #e2e8f0",
                  borderRadius: "10px",
                  padding:      "8px 12px",
                  alignItems:   "center",
                }}>
                  <span style={{ fontSize: "12px", color: "#a0aec0", flex: 1 }}>
                    Ask a finance question...
                  </span>
                  <div style={{
                    background: "#d69e2e", color: "#fff",
                    borderRadius: "7px", padding: "5px 10px",
                    fontSize: "11px", fontWeight: "700",
                  }}>
                    Ask →
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

      </div>

      {/* ════════════════════════════════════════
          BOTTOM CTA
      ════════════════════════════════════════ */}
      <section className="cta">
        <h2 className="cta-title">Ready to take control of your money?</h2>
        <p className="cta-sub">
          Everything you need to save, budget, track and get advice —
          completely free and private.
        </p>
        <button className="cta-btn" onClick={() => navigate("/dashboard")}>
          <i className="fas fa-rocket"></i>
          Get Started Now
        </button>
      </section>

      {/* ════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════ */}
      <footer className="footer">
        <i className="fas fa-lock" style={{ marginRight: "5px" }}></i>
        FinanceHub — All data stays local on your device &nbsp;·&nbsp;
        <i className="fas fa-heart" style={{ color: "#e53e3e", margin: "0 4px" }}></i>
        Built with React
      </footer>

    </>
  );
}