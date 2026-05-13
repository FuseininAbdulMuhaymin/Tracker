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
        <div className="boddy">
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
                            <h3> My Sav<span>ings</span></h3>
                            <p className="stat-label">Set Target to Period for amount to save.With Reminder which will alert You.</p>
                        </div>
                        </Link>
                        
                          <Link className="link_btn" to='/budget'>
                        <div className="card">
                             <p className="icons_tab"><FontAwesomeIcon icon={faWallet} /></p>
                            <h3>Budget</h3>
                            <p className="card_descp">Record What to Spend on, Where money went</p>
                        </div>
                        </Link>   

                        <Link className="link_btn" to='/Tracker'> 
                        <div className="card">
                           <p className="icons_tab"><FontAwesomeIcon icon={faReceipt} /></p>
                            <h3>Tracking Expenses</h3>
                            <p className="stat-label">Track where money went,How it was Spent</p>
                        </div>
                        </Link> 
                        

                        <div className="card">
                            <p className="icons_tab"><FontAwesomeIcon icon={faCircleQuestion} /></p>
                            <h3>Talk Aistanse</h3>
                            <p className="stat-label">You Can Ask What on your Mind, Anything About Finance</p>

                        </div>
                    </div>

                    <section className="feature-panels">
                        <div className="panel" id="panel-momo">
                            <h3>Get Reports and Summary</h3>      
                            <p>Get Report from all related and forum of spending and Save</p>
                            <p> Report and Summary are based data collected from your Saving , budget ,tracked and Question being ask.</p>
                        </div>

                      
                        <div className="panel" id="panel-offline">
                            <h3>Graph of Expense</h3>
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
