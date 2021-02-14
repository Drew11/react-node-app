import React, {useEffect, useState} from 'react';
import Statistic from '../statistic/statistic';
import './main-page.scss';
import axios from 'axios';
import srcCenterImg from './img/card-center.svg';
import srcLeftImg from './img/card-left.svg';
import srcRightImg from './img/card-right.svg';
import srcPhone from './img/phone-screen.svg';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

const MainPage = ()=> {
    return (

            <div className="main-page">
                <header className="header">

                    <div className="header-right-content">

                        <span >
                             AppCo
                        </span>

                        <span >
                            <b>Brainstorming</b> for <br/>desired perfect Usability
                        </span>

                        <span>
                            Our design projects are fresh and simple and will benefit<br/>
                            your business greatly. Learn more about our work!
                        </span>

                        <Link className="link" to="/stats">
                            Views Stats
                        </Link>

                        <Link className="link" to="/csv-parser">
                            Csv Parser
                        </Link>

                    </div>

                    <div className="phone-wrapper">
                        <div className="phone">
                            <img src={srcPhone} alt=""/>
                        </div>
                        <div className="shadow"></div>
                    </div>
                </header>

                <main>

                    <div>
                        <span>
                            Why <b>small business owners</b> <br/> <b>love</b> AppCo?
                        </span>

                            <span>
                          Our design projects are fresh and simple and will benefit your business <br/> greatly. Learn more about our work!
                        </span>
                    </div>

                    <div className="main-content">

                        <div className="card">
                            <img src={srcLeftImg} alt=""/>

                            <h3>
                                Clean Design
                            </h3>
                            <span>
                                Increase sales by showing true dynamics of your website.
                            </span>
                    </div>

                        <div className="card">
                            <img src={srcCenterImg} alt=""/>

                            <h3>
                                Secure Data
                            </h3>

                            <span>
                                Build your online store’s trust using Social Proof & Urgency.
                            </span>
                        </div>

                        <div className="card">
                            <img src={srcRightImg} alt=""/>

                            <h3>
                                Retina Ready
                            </h3>

                            <span>
                                Realize importance of social proof in customer’s purchase decision.
                            </span>
                        </div>

                    </div>

                </main>

                <footer>

                    <div className="subscribe-wrapper">
                        <div className="subscribe">
                            <input type="text"
                                   placeholder="Enter your email"
                            />

                            <button>
                                Subscribe
                            </button>

                        </div>
                    </div>
                </footer>

            </div>
    );
};

export default MainPage;
