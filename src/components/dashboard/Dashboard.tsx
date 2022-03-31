import React, { useState, useEffect, useLayoutEffect } from "react";
import { Redirect } from 'react-router';
import { Header } from "../../common/Header";
import { Home } from "./Home";
import { Assets } from "./Assets";
import { Domain } from "./Domain";
import { Subdomains } from "./Subdomains";
import { Services } from "./Services";
import { Subservices } from "./Subservices";
import { Alerts } from "./Alerts";
import { Pricing } from "./Pricing";
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
    MDBCollapse
} from "mdbreact";
import { useHistory } from "react-router";
// import logo from '../../assets/images/logo-white-large.png';
import "./style.css"
import { fetchData } from '../../services/apiConfig'
import logo1 from "../../assets/images/logo-white-large.png"
import { ScmWatcher } from "./ScmWatcher";
import { DarkeyeWatcher } from "./DarkeyeWatcher";

export const Dashboard = (props: any) => {
    const [view, setView] = useState('home');
    const [account, setAccount] = useState('DEV');
    const [parameter, setParameter] = useState("parameter");
    const [scan, setScan] = useState('');
    const [dashboardKPI, setDashboardKPI] = useState({
        "trial_days_remaining": 15, "metrics": {
            "vapt": { "categories": {}, "count": { criticalCount: 0, highCount: 0, mediumCount: 0, lowCount: 0, totalCount: 0 } },
            "domains": {
                "defaultAccount": "657657575", "count": { criticalCount: 0, highCount: 0, mediumCount: 0, lowCount: 0, totalCount: 0 },
                "categories": { CVEs: 12, InputValidation: 2, SensitiveEndpoint: 5, SubdomainTakeover: 4 }
            },
            "services": {
                "defaultAccount": "657657575", "count": { criticalCount: 0, highCount: 0, mediumCount: 0, lowCount: 0, totalCount: 0 },
                "categories": { CVEs: 12, InputValidation: 2, SensitiveEndpoint: 5, SubdomainTakeover: 4 }
            }
        }, "code": "0"
    });
    const [signature, setSignature] = useState('');

    const [isvapt, setisvapt] = useState(false);
    const [iswatcher, setiswatcher] = useState(false);
    const [isscmwatcher, setisscmwatcher] = useState(false);
    const [collapseID, setcollapseID] = useState(true);

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
                if (res.metrics.domains.defaultAccount) {
                    setAccount(res.metrics.domains.defaultAccount)
                }

                if (res.code[0] === "1") {
                    setisvapt(true)
                }
                if (res.code[1] === "1") {
                    setiswatcher(true)
                }
                if (res.code[2] === "1") {
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
        console.log(e)
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
    const toggleCollapse = (e: any) => {
        setcollapseID(!collapseID)
    }

    console.log(props)
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
                        <MDBRow style={{ backgroundColor: "#1B1C1E", height: "7vh" }}>
                        </MDBRow>
                        <MDBRow style={{ backgroundColor: "#1B1C1E", minHeight: "93vh", justifyContent: "center" }}>
                            <div style={{ width: "120%" }}>
                                <div style={{ cursor: "pointer" }} onClick={() => Switch('home')}>
                                    <img src={logo1} alt="logo" style={{ width: "12vw", marginLeft: "20px"}} />
                                </div>

                                {/* <p>
                                    <MDBIcon fab onClick={() => window.open('https://www.facebook.com/apnisec.in')} icon="facebook-f" style={{ fontSize: "20px", color: "#fbfbfd", cursor: "pointer", marginLeft: "20px" }} />
                                    <MDBIcon fab onClick={() => window.open('https://twitter.com/apnisec')} icon="twitter" style={{ fontSize: "20px", color: "#fbfbfd", cursor: "pointer" }} />
                                    <MDBIcon fab onClick={() => window.open('https://www.linkedin.com/company/apnisec')} icon="linkedin-in" style={{ fontSize: "20px", color: "#fbfbfd", cursor: "pointer" }} />
                                </p> */}
                                <div style={{ cursor: "pointer" }} onClick={() => Switch('home')}>
                                    {/* <p style={{ fontSize: "11px", lineHeight: "0px", paddingLeft: "20px", color: "white" }} onClick={() => Switch('home')}>
                                        <h3><span style={{ fontWeight: 900 }}>APNI</span>SEC</h3>

                                    </p> */}
                                    <p style={{ fontSize: "14px", lineHeight: "0px", paddingLeft: "20px", color: "rgb(203, 203, 203)" , marginLeft: "3.7vw", marginTop: "-12px"}}>Security as a Service</p>
                                </div>
                                <div style={{ marginTop: "50px", paddingLeft: "15px", paddingRight: "10px" }}>

                                    <div style={{ marginTop: "50px", backgroundColor: "white", borderRadius: "10px", borderBottom: "2px solid white" }}>
                                        <label className="toolLabel" onClick={() => toggleCollapse("watcherCollapse")}><span onClick={() => Switch('home')}>WATCHER</span><MDBIcon style={{ paddingTop: "5px", float: "right" }} fas icon="caret-down" />
                                            <br />
                                            <span onClick={() => Switch('home')} style={{ fontSize: "11px", fontWeight: 300, color: "2b2b2b" }}>{dashboardKPI.trial_days_remaining} Days left for trial period</span>
                                        </label>
                                        <MDBCollapse id="watcherCollapse" isOpen={collapseID}>
                                            <p>

                                                {iswatcher === true ?
                                                    <div>
                                                        <p className="side-nav-links"
                                                            style={{ textDecoration: view === "assets" ? "underline" : "", color: view === "assets" || view === "domains" || view === "services" || view === "subdomains" || view === "subservices" ? "black" : "#696969" }}
                                                            onClick={() => Switch('assets')}
                                                        ><MDBIcon icon="database" /> &nbsp;&nbsp;ASSETS
                                                    </p>
                                                        <div style={{ display: view === "assets" || view === "domains" || view === "services" || view === "subdomains" || view === "subservices" ? "" : "none"}}>
                                                            <p className="side-subnav-links"
                                                                style={{ textDecoration: view === "domains"  ? "underline" : "", color: view === "domains" || view === "subdomains" ? "black" : "grey" }}
                                                                onClick={() => Switch('domains')}
                                                            ><MDBIcon icon="globe" /> &nbsp;&nbsp;Domains
                                                           </p>
                                                                <div style={{ display: view === "subdomains"  ? "" : "none"}}>
                                                                <p className="side-detailsubnav-links"
                                                                        style={{ textDecoration: view === "subdomains"  ? "underline" : "", color: view === "subdomains"  ? "black" : "grey" }}
                                                                        // onClick={() => Switch('domains')}
                                                                    ><MDBIcon icon="globe" /> &nbsp;&nbsp;{parameter ? parameter.substring(0,15) : ""}
                                                                </p>
                                                                </div>
                                                            <p className="side-subnav-links"
                                                                style={{ textDecoration: view === "services" ? "underline" : "", color: view === "services"|| view === "subservices"  ? "black" : "grey" }}
                                                                onClick={() => Switch('services')}
                                                            ><MDBIcon icon="cloud" /> &nbsp;&nbsp;Services
                                                            </p>
                                                                <div style={{ display: view === "subservices"  ? "" : "none"}}>
                                                                    <p className="side-detailsubnav-links"
                                                                            style={{ textDecoration: view === "subservices"  ? "underline" : "", color: view === "subservices"  ? "black" : "grey" }}
                                                                            // onClick={() => Switch('services')}
                                                                        ><MDBIcon icon="cloud" /> &nbsp;&nbsp;{parameter ? parameter.substring(0,15) : ""}
                                                                    </p>
                                                                </div>
                                                        </div>
                                                    </div>



                                                    :
                                                    <p className="side-nav-links" style={{
                                                        opacity: 0.1,
                                                        cursor: "not-allowed"
                                                    }}
                                                    >
                                                        <MDBIcon icon="database" /> &nbsp;&nbsp;ASSETS
                                                    </p>
                                                }
                                                <p className="side-nav-links"
                                                    onClick={() => Switch('settings')}
                                                >
                                                    <MDBIcon icon="wrench" /> &nbsp;&nbsp;INTEGRATE
                                             </p>
                                            </p>
                                        </MDBCollapse>
                                    </div>


                                    <div style={{ marginTop: "50px", backgroundColor: "white", borderRadius: "10px", borderBottom: "2px solid white" }}>
                                        <label onClick={() => Switch('scmwatcher')} className="toolLabel">SCM WATCHER<MDBIcon style={{ paddingTop: "5px", float: "right" }} fas icon="caret-down" /></label>
                                        <MDBCollapse id="scmwatcherCollapse" isOpen={false}>
                                            <p className="side-nav-links"
                                                style={{ opacity: 0.1, cursor: "not-allowed" }}
                                            >
                                                <MDBIcon icon="chart-line" /> &nbsp;&nbsp;GIT leaks
                                   </p>
                                        </MDBCollapse>
                                    </div>

                                    <div style={{ marginTop: "50px", backgroundColor: "white", borderRadius: "10px", borderBottom: "2px solid white" }}>
                                        <label onClick={() => Switch('darkeyewatcher')} className="toolLabel">DARK EYE WATCHER<MDBIcon style={{ paddingTop: "5px", float: "right" }} fas icon="caret-down" /></label>
                                        <MDBCollapse id="scmwatcherCollapse" isOpen={false}>
                                            <p className="side-nav-links" style={{ opacity: 0.1, cursor: "not-allowed" }}>
                                                <MDBIcon icon="wrench" /> &nbsp;&nbsp;Monitoring
                                  </p>
                                        </MDBCollapse>
                                    </div>

                                    {/* <div style={{ marginTop: "15vh" }} >
                                        <p className="side-nav-links-bottom">
                                            {(dashboardKPI as any).trial_days_remaining ? (dashboardKPI as any).trial_days_remaining : "0"} days left of free trial
                                         <br />
                                        </p>
                                        <p className="side-nav-links">
                                            <MDBIcon icon="envelope" /> &nbsp;&nbsp;Contact us
                                             </p>
                                    </div> */}
                                </div>
                            </div>
                        </MDBRow>
                    </MDBCol>


                    <MDBCol xs="12" sm='12' md='10'>
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
                                                <Home isvapt={isvapt} iswatcher={iswatcher} User={props.User} SwitchView={SwitchView} Kpi={dashboardKPI} />
                                            )
                                        case 'assets':
                                            return (
                                                <div>
                                                    {/* <AccountsSelector Account={account} AccountToggle={Account} /> */}
                                                    <Assets User={username} SwitchView={SwitchView} Account={account} AccountToggle={Account} />
                                                </div>
                                            )
                                        case 'pentest':
                                            return (
                                                <div>
                                                    <Pentest User={username} SwitchView={SwitchView} Account={account} AccountToggle={Account} Kpi={dashboardKPI} />
                                                </div>
                                            )
                                        case 'domains':
                                            return (
                                                <div>
                                                    {/* <AccountsSelector Account={account} AccountToggle={Account} /> */}
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
                                                    <Services User={props.User} SwitchView={SwitchView} Account={account} AccountToggle={Account}/>
                                                </div>
                                            )
                                        case 'subservices':
                                            return (
                                                <div>
                                                    <Subservices User={props.User} SwitchView={SwitchView} Account={account} Service={parameter} />
                                                </div>
                                            )
                                        case 'alerts':
                                            return (
                                                <div>
                                                    <Alerts />
                                                </div>
                                            )
                                        case 'pricing':
                                            return (
                                                <div>
                                                    <Pricing />
                                                </div>
                                            )
                                        case 'settings':
                                            return (
                                                <div>
                                                    <Settings />
                                                </div>
                                            )
                                        case 'scmwatcher':
                                            return (
                                                <div>
                                                    <ScmWatcher User={props.User} SwitchView={SwitchView} Account={account} />
                                                </div>
                                            )
                                        case 'darkeyewatcher':
                                            return (
                                                <div>
                                                    <DarkeyeWatcher User={props.User} SwitchView={SwitchView} Account={account} />
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