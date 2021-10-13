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
    MDBBreadcrumb,
    MDBBreadcrumbItem
} from "mdbreact";
import { useHistory } from "react-router";
import { Chart } from "react-google-charts";
import "./style.css";
import domain from '../../assets/images/domain.png'
import { fetchData } from '../../services/apiConfig';
import {AccountsSelector} from "./AccountsSelector";
export const Assets = (props: any) => {
    const [assets, setAssets] = useState({account: "9911213560",
    accountName: "9911213560@delhivery-prod",
    domains: {totalDomains: 3, misconfiguredDomains: 1, totalMisconfigurations: 273, critical: 2, high: 0, low: 269, medium: 0},
    lastSynced: "July 02 2021, 20:57:13",
    services: {}});

    useEffect(() => {
        fetchData('asset', 'GET').then((res: any) => {
            console.log(props.account)
            props.AccountToggle(res.accountName)
            console.log(res)
            setAssets(res)
        })
    }, []);
    useEffect(() => {
        console.log(props)
        console.log(props.Account)
        if(props.Account.length > 10) {
        fetchData('asset', 'GET', '?accountName=' + props.Account).then((res: any) => {
            console.log(props)
            console.log("account changed")
            if(res.message === "Scanning is in progress.."){
                props.SwitchView('scan')
            } else {
            setAssets(res)
            }
        })
    }
    }, [props.Account]);

    const token = localStorage.getItem("token");
    console.log(props)
    if (token === null || token === undefined || token.length <0) {
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
                            <MDBBtn className="back" onClick={() => props.SwitchView('home')} color="blue-grey" style={{ border: "2px solid blue-grey", borderRadius: "5px", marginLeft: "0px !important", fontSize: "8px !important" }}>
                                <MDBIcon icon="arrow-left" style={{ fontSize: "8px" }} /> Back</MDBBtn>
                            <MDBBreadcrumbItem active>assets</MDBBreadcrumbItem>
                        </MDBBreadcrumb>
                    </MDBCol>
                </MDBRow>
                <br />
                <MDBRow >
                    <MDBCol className="services" sm="5" md="5" lg="5" style={{ padding: "15px 40px", minHeight: "50vh", cursor: "pointer" }} onClick={() => props.SwitchView("services")}>
                        <MDBRow md="12" lg="12" style={{ display: "inline-flex" }}>
                            <p className='text-dark font-weight-bold' style={{ fontSize: "22px", paddingTop: "10px" }}>Services</p>
                            <span className='text-dark' style={{ fontSize: "12px", marginLeft: "10px", paddingTop: "20px" }}>Scanning in progress..</span>
                            <div style={{ float: "right", width: "29vw" }}>
                                <div>
                                    <ul className="list-group" style={{ listStyle: "none", fontSize: "15px", marginTop: "30px" }}>
                                        <li className="list-group-item-rating">Overall rating
                                    <span style={{ float: "right", padding: "6px 15px", backgroundColor: "#008450", border: "1px solid #008450", borderRadius: "10px", color: "white", fontWeight: "bold" }}>A</span></li>
                                        <li className="list-group-item-rating"><span>Misconfigurations</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <span style={{ float: "right", padding: "6px 15px", fontWeight: "bold", color: "#dc3912", fontSize: "40px", marginTop: "-30px" }}>--
                                    <span style={{ float: "right", fontWeight: "bold", color: "grey", padding: "30px 5px", fontSize: "15px" }}>/ --</span></span></li>
                                    <br />
                                    </ul>
                                    <p className='text-dark font-weight-bold' style={{ fontSize: "15px", paddingTop: "10px" }}>Risk severity classification</p>
                                    <ul className="list-group" style={{ listStyle: "none", fontSize: "15px", marginTop: "2vw" }}>
                                        <li className="list-group-item"><MDBIcon icon="battery-full" style={{ color: "#dc3912", fontSize: "18px" }} /> &nbsp;&nbsp;Critical <span className="vbadge">-- issues</span></li>
                                        <li className="list-group-item"><MDBIcon icon="battery-three-quarters" style={{ color: "#dc3912", fontSize: "18px" }} /> &nbsp;&nbsp;High <span className="vbadge">-- issues</span></li>
                                        <li className="list-group-item"><MDBIcon icon="battery-half" style={{ color: "#dc3912", fontSize: "18px" }} /> &nbsp;&nbsp;Medium <span className="vbadge">-- issues</span></li>
                                        <li className="list-group-item"><MDBIcon icon="battery-quarter" style={{ color: "#dc3912", fontSize: "18px" }} /> &nbsp;&nbsp;Low <span className="vbadge">-- issues</span></li>
                                    </ul>
                                </div>
                            </div>
                        </MDBRow>
                        <br />
                    </MDBCol>
                    <MDBCol sm="1" md="1" lg="1" ></MDBCol>
                    <MDBCol className="domains" sm="5" md="5" lg="5" style={{ padding: "15px 40px", cursor: "pointer" }} onClick={() => props.SwitchView("domains")}>
                        <MDBRow md="12" lg="12" style={{ display: "inline-flex" }}>
                            <p className='text-dark font-weight-bold' style={{ fontSize: "22px", paddingTop: "10px" }}>Domains</p>
                            <span className='text-dark' style={{ fontSize: "12px", marginLeft: "10px", paddingTop: "20px" }}>Last synced {assets.lastSynced}</span>
                        </MDBRow>
                        <MDBRow>
                            <div style={{ float: "right", width: "29vw" }}>
                                <div>
                                    <ul className="list-group" style={{ listStyle: "none", fontSize: "15px", marginTop: "30px" }}>
                                        <li className="list-group-item-rating">Overall rating
                                    <span style={{ float: "right", padding: "6px 15px", backgroundColor: "#ff8c00", border: "1px solid #ff8c00",  borderRadius: "10px", color: "white", fontWeight: "bold" }}>B</span></li>
                                        <li className="list-group-item-rating"><span>Misconfigurations</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <span style={{ float: "right", padding: "6px 15px", fontWeight: "bold", color: "#dc3912", fontSize: "40px", marginTop: "-30px" }}>{assets.domains.misconfiguredDomains}
                                    <span style={{ float: "right", fontWeight: "bold", color: "grey", padding: "30px 5px", fontSize: "15px" }}>/ {assets.domains.totalDomains}</span></span></li>
                                    <br />
                                    </ul>
                                    <p className='text-dark font-weight-bold' style={{ fontSize: "15px", paddingTop: "10px" }}>Risk severity classification</p>
                                    <ul className="list-group" style={{ listStyle: "none", fontSize: "15px", marginTop: "2vw" }}>
                                        <li className="list-group-item"><MDBIcon icon="battery-full" style={{ color: "#dc3912", fontSize: "18px" }} /> &nbsp;&nbsp;Critical <span className="vbadge">{assets.domains.critical} issues</span></li>
                                        <li className="list-group-item"><MDBIcon icon="battery-three-quarters" style={{ color: "#dc3912", fontSize: "18px" }} /> &nbsp;&nbsp;High <span className="vbadge">{assets.domains.high} issues</span></li>
                                        <li className="list-group-item"><MDBIcon icon="battery-half" style={{ color: "#dc3912", fontSize: "18px" }} /> &nbsp;&nbsp;Medium <span className="vbadge">{assets.domains.medium} issues</span></li>
                                        <li className="list-group-item"><MDBIcon icon="battery-quarter" style={{ color: "#dc3912", fontSize: "18px" }} /> &nbsp;&nbsp;Low <span className="vbadge">{assets.domains.low} issues</span></li>
                                    </ul>
                                </div>
                            </div>
                        </MDBRow>
                        <br />
                    </MDBCol>
                </MDBRow>
                <br /> <br />
            </MDBContainer>
        </>
    )
}