import React, { useEffect, useRef, useState } from 'react';
import './Tab.css';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandHoldingDollar} from '@fortawesome/free-solid-svg-icons'
import { faReceipt} from '@fortawesome/free-solid-svg-icons'
import { faWallet} from '@fortawesome/free-solid-svg-icons'
import {faCircleQuestion} from '@fortawesome/free-solid-svg-icons'



export default function Tab() {

    const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
    const containerRef = useRef(null);
    
   

    return (
        <div className="body">
        <div ref={containerRef} className="tab-root">
          
            <div className="main-container">
                <div className="dashboard-header">
                    <h1>My Finance <span>Tracker</span></h1>
                </div>

                <div className="dashboard">
                    <div className="card-grid">

                                                <Link className="link_btn" to='/save'>
                                                <div className="card">
                                                            <p className="icons_tab"><FontAwesomeIcon icon={faHandHoldingDollar} /></p>
                                                        <h3>My Savings</h3>
                                                        <p className="stat-label">Set a target amount and saving period, with reminders to alert you.</p>
                                                </div>
                                                </Link>
                        
                        <Link className="link_btn" to='/budget'>
                        <div className="card">
                             <p className="icons_tab"><FontAwesomeIcon icon={faWallet} /></p>
                            <h3>Budget</h3>
                            <p className="card_descp">Record what you spent and where the money went.</p>
                        </div>
                        </Link>   

                        <Link className="link_btn" to='/Tracker'> 
                        <div className="card">
                           <p className="icons_tab"><FontAwesomeIcon icon={faReceipt} /></p>
                            <h3>Track Expenses</h3>
                            <p className="stat-label">Track where the money went and how it was spent.</p>
                        </div>
                        </Link> 
                        

                        <div className="card">
                            <p className="icons_tab"><FontAwesomeIcon icon={faCircleQuestion} /></p>
                            <h3>Ask for Assistance</h3>
                            <p className="stat-label">You can ask anything on your mind about finance.</p>

                        </div>
                    </div>

                    <section className="feature-panels">
                        <div className="panel" id="panel-momo">
                            <h3>Get reports and summaries</h3>
                            <p>Get reports and summaries for all your spending and savings.</p>
                            <p>Reports and summaries are based on data collected from your savings, budgets, tracked transactions, and questions asked.</p>
                        </div>

                      
                        <div className="panel" id="panel-offline">
                            <h3>Expense Chart</h3>
                            <p>Record expenses offline; changes sync when connection is restored.</p>
                            <p>Status: <span id="offline-status">online</span></p>
                        </div>
                     
                    </section>
                </div>  
            </div>
        </div>
        </div>
    );
}
