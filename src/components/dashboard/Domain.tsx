import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router';
import { Header } from "../../common/Header";
import {
    MDBBtn,
    MDBFreeBird,
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
    MDBEdgeHeader,
    MDBCardTitle,
    MDBProgress,
    MDBListGroup,
    MDBListGroupItem,
    MDBBreadcrumbItem,
    MDBBreadcrumb,
    MDBBadge
} from "mdbreact";
import { useHistory } from "react-router";
import { Chart } from "react-google-charts";
import "./style.css";
import { fetchData } from '../../services/apiConfig'
import { AccountsSelector } from "./AccountsSelector";
export const Domain = (props: any) => {
    console.log(props)
    const [domains, setDomain] = useState({
        availableDomains: 3,
        lastSynced: "July 02 2021, 20:57:13",
        nonReachableDomains: 1,
        domains: [],
        reachableDomains: 2
    });
    let sortingDomains: any
    const [sortedDomains, setSortedDomains] = useState([])

    useEffect(() => {
        fetchData('domain', 'GET', "?accountName=" + props.Account).then((res: any) => {
            console.log(res)
            sortingDomains= res.domains.sort((a:any, b:any) => {
                if(a.totalIssues > b.totalIssues) {
                    return -1
                } else {
                    return 1
                } 
            })
            setDomain(res)
            setSortedDomains(sortingDomains)
        })
    }, []);
    useEffect(() => {
        console.log(props.Account)
        if (props.Account.length > 10) {
            fetchData('domain', 'GET', "?accountName=" + props.Account).then((res: any) => {
                console.log(res)
                sortingDomains= res.domains.sort((a:any, b:any) => {
                    if(a.totalIssues > b.totalIssues) {
                        return -1
                    } else {
                        return 1
                    } 
                })
                setDomain(res)
                console.log(sortedDomains)
                setSortedDomains(sortingDomains)
            })
        }
    }, [props.Account]);

    const SubDomainSwitch = (e:any) => {
        console.log(e);
        props.SwitchView('subdomains', e)
    }

    const token = localStorage.getItem("token");
    console.log(props)
    if (token === null || token === undefined || token.length < 0) {
        return <Redirect to={{
            pathname: '/login',
        }} />
    }
    return (
        <>
            <MDBContainer fluid className="pb-5" style={{ padding: "2vw" }}>
                <MDBRow>
                    <MDBCol sm="11" md="11" lg="11" style={{ padding: "0px" }}>
                        <MDBBreadcrumb >
                        <MDBBtn className="float-left" 
                            color="dark"
                            onClick={() => props.SwitchView('home')}
                            style={{ border: "2px solid blue-grey", borderRadius: "10px" }}>
                            <MDBIcon fas icon="angle-left" style={{ fontSize: "15px", marginLeft: "3px" }} />
                            &nbsp;&nbsp; Go back to dashboard&nbsp;&nbsp;
                        </MDBBtn>
                            {/* <MDBBtn className="back" onClick={() => props.SwitchView('assets')} color="blue-grey" style={{ border: "2px solid blue-grey", borderRadius: "5px", marginLeft: "0px !important", fontSize: "8px !important" }}>
                                <MDBIcon icon="arrow-left" style={{ fontSize: "8px" }} /> Back</MDBBtn> */}
                            <MDBBreadcrumbItem onClick={() => props.SwitchView('home')} style={{ cursor: "pointer", marginLeft: "20px" }} >dashboard</MDBBreadcrumbItem>
                            <MDBBreadcrumbItem onClick={() => props.SwitchView('assets')} style={{ cursor: "pointer" }}>assets</MDBBreadcrumbItem>
                            <MDBBreadcrumbItem active>domains</MDBBreadcrumbItem>
                        </MDBBreadcrumb>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                <AccountsSelector Account={props.Account} AccountToggle={props.AccountToggle} />
                </MDBRow>
                <br />
                <MDBRow>
                    <MDBCol sm="11" md="11" lg="11" style={{ padding: "10px 25px", border: "1px solid #ededef" }}>
                        <MDBRow md="12" lg="12" style={{ display: "inline-flex" }}>
                            <p className='text-dark font-weight-bold' style={{ fontSize: "22px", paddingTop: "2px" }}>Domains</p>
                            <span className='text-dark' style={{ fontSize: "12px", marginLeft: "10px", paddingTop: "12px" }}>Last synced {domains.lastSynced}</span>
                        </MDBRow>
                        <br />
                        <MDBRow style={{ marginTop: "2vh" }}>
                            <MDBCol xs="4" sm="4" md="4" lg="4">
                                <div style={{ display: "inline-flex" }}>
                                    <MDBIcon style={{ backgroundColor: "#ff8c00", fontSize: "40px", color: "white" }}
                                        icon="check" />
                                    <p style={{ marginLeft: "20px" }}> <span style={{ fontSize: "25px", fontWeight: "bold" }}> {domains.availableDomains}</span> <br /> available domains</p>
                                </div>
                            </MDBCol>
                            <MDBCol xs="4" sm="4" md="4" lg="4">
                                <div style={{ display: "inline-flex" }}>
                                    <MDBIcon style={{ backgroundColor: "#008450", fontSize: "40px", color: "white" }}
                                        icon="check-double" />
                                    <p style={{ marginLeft: "20px" }}> <span style={{ fontSize: "25px", fontWeight: "bold" }}> {domains.reachableDomains}</span> <br /> running</p>
                                </div>
                            </MDBCol>
                            <MDBCol xs="4" sm="4" md="4" lg="4">
                                <div style={{ display: "inline-flex" }}>
                                    <MDBIcon style={{ backgroundColor: "#dc3912", fontSize: "40px", color: "white" }}
                                        icon="exclamation-triangle" />
                                    <p style={{ marginLeft: "20px" }}> <span style={{ fontSize: "25px", fontWeight: "bold" }}> {domains.nonReachableDomains}</span> <br /> not reachable</p>
                                </div>
                            </MDBCol>
                        </MDBRow>
                    </MDBCol>
                </MDBRow>
                <br /> <br />
                <MDBRow >
                    <MDBCol sm="11" md="11" lg="11" style={{ padding: "10px 25px", border: "1px solid #ededef" }}>
                        <div style={{ maxHeight: "48vh", overflowY: "auto", overflowX: "hidden" }}>
                            <MDBRow className="awsRow">

                                {
                                    sortedDomains.map((dom: any) =>
                                        <>
                                            <MDBCol className="domainList" sm="3" md="3" lg="3" onClick={() => SubDomainSwitch(dom.domainName) }>
                                                <div className="domainCard">
                                                <MDBBadge className="DomainBadge" color={dom.totalIssues > 0 ? "danger" : "success"}>{dom.totalIssues} issues</MDBBadge> 
                                                    <p style={{ fontSize: "12px", color: "chocolate" }}></p>
                                                    <p className='text-dark font-weight-bold' style={{ fontSize: "20px", marginBlockEnd: "0px" }}>{dom.domainName}</p>
                                                    {/* <span style={{ fontSize: "12px", color: "#dc3912", fontWeight: 600 }}>{dom.totalCriticalIssues} critical issues</span> */}
                                                </div>
                                            </MDBCol>
                                            <MDBCol sm="1" md="1" lg="1" ></MDBCol>
                                       </>
                                    )
                                }
                            </MDBRow>
                        </div>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </>
    )
}