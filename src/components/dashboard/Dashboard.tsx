import React, { useState, useEffect, useLayoutEffect } from "react";
import { Redirect } from 'react-router';
import { Header } from "../../common/Header";
import { Home } from "./Home";
import { Assets } from "./Assets";
import { Domain } from "./Domain";
import { Subdomains } from "./Subdomains";
import { Services } from "./Services";
import { Alerts } from "./Alerts";
import { Settings } from "./Settings";
import { AccountsSelector } from "./AccountsSelector";
import { PhaseSelector } from "./PhaseSelector";
import { Pentest } from "./Pentest";
import { Scan } from "./Scan"
import { Trial } from "./Trial"
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardText,
    MDBCol,
    MDBContainer,
    MDBFormInline,
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBTable,
    MDBTableBody,
    MDBTableHead,
} from "mdbreact";
import { useHistory } from "react-router";
import logo from '../../assets/images/logo-white-large.png';
import "./style.css"
import { fetchData } from '../../services/apiConfig'

export const Dashboard = (props: any) => {
    const [view, setView] = useState('home');
    const [account, setAccount] = useState('DEV');
    const [parameter, setParameter] = useState();
    const [scan, setScan] = useState('');
    const [dashboardKPI, setDashboardKPI] = useState({ "trial_days_remaining": 15, "metrics": {}, "code": "0" });
    const [signature, setSignature] = useState('');

    const [isvapt, setisvapt] = useState(false);
    const [iswatcher, setiswatcher] = useState(false);
    const [isscmwatcher, setisscmwatcher] = useState(false);


    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    useEffect(() => {
        fetchData('dashboard', 'GET').then((res: any) => {
            if (res.message) {
                if (res.message.indexOf("Error") !== -1) {
                    localStorage.clear();
                    setSignature('0')
                }
            } else {
            setDashboardKPI(res)
            if(res.metrics.domains.defaultAccount){
            setAccount(res.metrics.domains.defaultAccount)}
            console.log(res.code)
            console.log(res.code[0])
            console.log(res.code[1])
            console.log(res.code[2])
            if(res.code[0] === "1"){
                setisvapt(true)
            }
            if(res.code[1] === "1"){
                setiswatcher(true)
            }
            if(res.code[2] === "1"){
                setisscmwatcher(true)
            }
           

            if (res.message != undefined) {
                setScan('scan')
                setView('scan')
            }
            if (res.trial_days_remaining === 0) {
                setView('trial')
            }
        }
        })
    }, [props]);
    const SwitchView = (value: any, e?: any) => {
        setParameter(e)
        setView(value)
    }
    const Account = (e: any) => {
        setAccount(e)
    }
    const Switch = (e: any) => {
        if (scan === 'scan') {
            setView('scan')
        } else {
            setView(e)
        }
    }
    if (signature === '0' || username === undefined || token === null || token === undefined || token === 'undefined' || token.length < 0) {
        return <Redirect to={{
            pathname: '/login',
        }} />
    }
    if (props.User !== undefined && props.User.is_onboarded === false) {
        return <Redirect to={{
            pathname: '/onboarding',
        }} />
    }
    return (
        <>
            <MDBContainer fluid>
                <MDBRow>
                    <MDBCol xs="1" sm='1' md='2'>
                        <MDBRow style={{ backgroundColor: "#29283a", height: "7vh" }}>
                        </MDBRow>
                        <MDBRow style={{ backgroundColor: "#3c3a4f", height: "93vh", justifyContent: "center" }}>
                            <div style={{ marginTop: "35px" }}>
                                <p>
                                    <MDBIcon fab onClick={() => window.open('https://www.facebook.com/apnisec.in')} icon="facebook-f" style={{ fontSize: "20px", color: "#fbfbfd", cursor: "pointer", marginLeft: "20px" }} />
                                    <MDBIcon fab onClick={() => window.open('https://twitter.com/apnisec')} icon="twitter" style={{ fontSize: "20px", color: "#fbfbfd", cursor: "pointer" }} />
                                    <MDBIcon fab onClick={() => window.open('https://www.linkedin.com/company/apnisec')} icon="linkedin-in" style={{ fontSize: "20px", color: "#fbfbfd", cursor: "pointer" }} />
                                </p>
                                <div style={{ marginTop: "10px" }}>
                                    <label className="toolLabel">Watcher<MDBIcon style={{ paddingTop: "5px", marginLeft: "9vw" }} icon="angle-down" /></label>
                                    <p className="side-nav-links" onClick={() => Switch('home')}>
                                        <MDBIcon icon="chart-line" /> &nbsp;&nbsp;Dashboard
                                   </p>


                                   { iswatcher === true ?
                                    <p className="side-nav-links" 
                                        onClick={() => Switch('assets')} 
                                    >
                                        <MDBIcon icon="database" /> &nbsp;&nbsp;Assets
                                  </p> : <p className="side-nav-links" style={{ 
                                        opacity: 0.1, 
                                        cursor: "not-allowed" }}
                                    >
                                        <MDBIcon icon="database" /> &nbsp;&nbsp;Assets
                                  </p>
                                    }

                                    <p className="side-nav-links" style={{ 
                                        opacity: 0.1, 
                                        cursor: "not-allowed" }}
                                    >
                                        <MDBIcon icon="exclamation-circle" /> &nbsp;&nbsp;Alerts
                                  </p>
                                    {/* { dashboardKPI.code === "11000000" ?
                                    <p className="side-nav-links" 
                                        onClick={() => Switch('alerts')} 
                                    >
                                        <MDBIcon icon="exclamation-circle" /> &nbsp;&nbsp;Alerts
                                  </p> : <p className="side-nav-links" style={{ 
                                        opacity: 0.1, 
                                        cursor: "not-allowed" }}
                                    >
                                        <MDBIcon icon="exclamation-circle" /> &nbsp;&nbsp;Alerts
                                  </p>
                                    } */}


                                    <p className="side-nav-links"
                                     onClick={() => Switch('settings')}
                                         >
                                        <MDBIcon icon="wrench" /> &nbsp;&nbsp;Settings
                                  </p>
                                    <label className="toolLabel">SCM Watcher<MDBIcon style={{ paddingTop: "5px", marginLeft: "7.2vw" }} icon="angle-down" /></label>
                                    <p className="side-nav-links" 
                                    style={{ opacity: 0.1, cursor: "not-allowed" }}
                                    >
                                        <MDBIcon icon="chart-line" /> &nbsp;&nbsp;GIT leaks
                                   </p>
                                    <label className="toolLabel">Bizness<MDBIcon style={{ paddingTop: "5px", marginLeft: "9vw" }} icon="angle-down" /></label>
                                    <p className="side-nav-links" style={{ opacity: 0.1, cursor: "not-allowed" }}>
                                        <MDBIcon icon="chart-line" /> &nbsp;&nbsp;LogAI
                                   </p>
                                    <p className="side-nav-links" style={{ opacity: 0.1, cursor: "not-allowed" }}>
                                        <MDBIcon icon="wrench" /> &nbsp;&nbsp;Settings
                                  </p>
                                    <label className="toolLabel">Dark Eye Watcher<MDBIcon style={{ paddingTop: "5px", marginLeft: "5.9vw" }} icon="angle-down" /></label>
                                    <p className="side-nav-links" style={{ opacity: 0.1, cursor: "not-allowed" }}>
                                        <MDBIcon icon="wrench" /> &nbsp;&nbsp;Monitoring
                                  </p>
                                    <div style={{ marginTop: "20vh" }} >
                                        <p className="side-nav-links-bottom">
                                            {(dashboardKPI as any).trial_days_remaining} days left of free trial
                                    <br />
                                        </p>
                                        <p className="side-nav-links-bottom">
                                            <MDBIcon icon="envelope" /> &nbsp;&nbsp;Contact us
                                     </p>
                                    </div>
                                </div>
                            </div>
                        </MDBRow>
                    </MDBCol>
                    <MDBCol xs="11" sm='11' md='10'>
                        <Header User={props.User} SwitchView={SwitchView} />
                        <MDBRow style={{ backgroundColor: "#fbfbfd", height: "93vh", overflowY: "scroll" }}>
                            <MDBContainer fluid style={{ overflowX: "hidden" }}>
                                {(() => {
                                    switch (view) {
                                        case 'scan':
                                            return (
                                                <div>
                                                    <AccountsSelector Account={account} AccountToggle={Account} />
                                                    <Scan User={props.User} SwitchView={SwitchView} Account={account} AccountToggle={Account} />
                                                </div>
                                            )
                                        case 'trial':
                                            return (
                                                <Trial />
                                            )
                                        case 'home':
                                            return (
                                                <Home isvapt={isvapt} iswatcher={iswatcher} User={props.User} SwitchView={SwitchView} Kpi={dashboardKPI}/>
                                            )
                                        case 'assets':
                                            return (
                                                <div>
                                                    <AccountsSelector Account={account} AccountToggle={Account} />
                                                    <Assets User={username} SwitchView={SwitchView} Account={account} AccountToggle={Account} />
                                                </div>
                                            )
                                        case 'pentest':
                                            return (
                                                <div>
                                                    {/* <PhaseSelector Account={account} AccountToggle={Account} Kpi={dashboardKPI}/> */}
                                                    <Pentest User={username} SwitchView={SwitchView} Account={account} AccountToggle={Account} Kpi={dashboardKPI}/>
                                                </div>
                                            )
                                        case 'domains':
                                            return (
                                                <div>
                                                    <AccountsSelector Account={account} AccountToggle={Account} />
                                                    <Domain User={props.User} SwitchView={SwitchView} Account={account} AccountToggle={Account} />
                                                </div>
                                            )
                                        case 'subdomains':
                                            return (
                                                <div>
                                                    <Subdomains User={props.User} SwitchView={SwitchView} Account={account} Domain={parameter} />
                                                </div>
                                            )
                                        case 'services':
                                            return (
                                                <div>
                                                    {/* <MDBContainer fluid style={{ paddingTop: "2vw", paddingLeft: "2vw" }}>
                                                        <MDBRow>
                                                            <div>
                                                                <select className="custom-select" style={{ width: "250px" }} onChange={(e: any) => Account(e)} value={account}>
                                                                    <option value="1" >339361266133@delhivery-prod</option>
                                                                    <option value="2" >339361266134@delhivery-dev</option>
                                                                    <option value="3" >339361266135@delhivery-uat</option>
                                                                </select>
                                                            </div>
                                                        </MDBRow>
                                                    </MDBContainer> */}
                                                    <Services User={props.User} SwitchView={SwitchView} Account={account} />
                                                </div>
                                            )
                                        case 'alerts':
                                            return (
                                                <div>
                                                    <Alerts />
                                                </div>
                                            )
                                        case 'settings':
                                            return (
                                                <div>
                                                    <Settings />
                                                </div>
                                            )
                                        default:
                                            return (
                                                <div>You are a User.</div>
                                            )
                                    }
                                })()}
                            </MDBContainer>
                        </MDBRow>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </>
    )
}