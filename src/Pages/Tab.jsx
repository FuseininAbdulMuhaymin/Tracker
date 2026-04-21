import React, { useEffect, useRef, useState } from 'react';
import './Tab.css';
import { Link } from "react-router-dom";

export default function Tab() {

    const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
    const containerRef = useRef(null);
    
    


    useEffect(() => {
        const body = document.body;
        if (darkMode) body.classList.add('dark-mode'); else body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', darkMode ? 'true' : 'false');

        // Update icon filters inside this component only
        const container = containerRef.current;
        if (container) {
            const icons = container.querySelectorAll('img');
            icons.forEach((icon) => {
                icon.style.filter = darkMode ? 'brightness(0) invert(1)' : 'none';
            });
        }
    }, [darkMode]);

    return (
        <div className="boddy">
        <div ref={containerRef} className="tab-root">
            <div className="theme-toggle-container">
                <input
                    type="checkbox"
                    id="dark-mode"
                    className="input"
                    checked={darkMode}
                    onChange={(e) => setDarkMode(e.target.checked)}
                />
                <label htmlFor="dark-mode" className="label">
                    <div className="circle" />
                </label>
            </div>
            <div className="main-container">
                <div className="dashboard-header">
                    <h1>My Finance Tracker</h1>
                </div>

                <div className="dashboard">
                    <div className="card-grid">

                     
                        <div className="card">
                            <h3> My Savings</h3>
                            <p className="stat-number" id="balance-ghs">GHS 0.00</p>
                            <p className="stat-label">Set Target to Period for amount to save.With Reminder which will alert You</p>
                            <div className="card-actions">
                              <Link to='/save'>
                                <a className="link-btn" href="sms.html">Open</a>
                              </Link>
                            </div>
                        </div>
                        

                        <div className="card">
                            <h3>Budget</h3>
                            <p className="stat-number">Daily Budget</p>
                            <p className="stat-label">Record What to Spend on, Where money went</p>
                            <div className="card-actions">
                              <Link to='/budget'>
                                <a className="link-btn" href="momo.html">Open</a>
                              </Link>   
                            </div>
                        </div>
   

                                           
                        <div className="card">
                            <h3>Tracking Expenses</h3>
                            <p className="stat-number" id="sms-count">Track Everthing</p>
                            <p className="stat-label">Track where money went,How it was Spent</p>
                            <div className="card-actions">
                  
                            </div>
                        </div>
                        

                        <div className="card">
                            <h3>Talk Aistanse</h3>
                            <p className="stat-number" id="inflation">Ask</p>
                            <p className="stat-label">You Can Ask What on your Mind, Anything About Finance</p>
                            <div className="card-actions">
                                <a className="link-btn" href="budget.html">Open</a>
                            </div>
                        </div>
                    </div>

                    <section className="feature-panels">
                        <div className="panel" id="panel-momo">
                            <h3></h3>
                            <p>Automated sync with MTN MoMo, Telecel Cash, and AT Money. This is a UI placeholder for CRUD & sync flows.</p>
                        </div>

                        <div className="panel" id="panel-sms">
                            <h3>SMS Transaction Scraper (placeholder)</h3>
                            <p>AI-powered parser to extract amounts, dates, sender, and balances from bank/momo SMS alerts.</p>
                        </div>

                        <div className="panel" id="panel-budget">
                            <h3>Inflation-Adjusted Budgeting</h3>
                            <p>Integrates CPI data (e.g., Ghana Statistical Service) to auto-adjust budgets.</p>
                        </div>

                        <div className="panel" id="panel-offline">
                            <h3>Offline Mode</h3>
                            <p>Record expenses offline; changes sync when connection is restored.</p>
                            <p>Status: <span id="offline-status">online</span></p>
                        </div>

                        <div className="panel" id="panel-public">
                            <h3>Public Expenditure</h3>
                            <p> </p>
                            <ul>
                              
                            </ul>
                        </div>
                    </section>
                </div>
            </div>
        </div>
        </div>
    );
}
