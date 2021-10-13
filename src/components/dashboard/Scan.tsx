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
    MDBBreadcrumb
} from "mdbreact";
import { useHistory } from "react-router";
import { Chart } from "react-google-charts";
import "./style.css";
import { fetchData } from '../../services/apiConfig'
import watermark from "../../assets/images/watermark.png"
export const Scan = (props: any) => {
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
                props.SwitchView('assets')
            }
        })
    }
    }, [props.Account]);
    const SubDomainSwitch = (e: any) => {
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
            <div>
                <MDBCol style={{ marginTop: "35vh" }}>
                    <div className="d-flex justify-content-center">
                        <p style={{ fontSize: "20px", fontWeight: "bold" }}>Scanning in progress </p>
                        <br />
                        <MDBIcon icon="sync" spin size="2x" fixed style={{ color: "#2bbbad" }} />
                        <span className="sr-only">Loading...</span>
                    </div>
                </MDBCol>
                <img src={watermark} alt="Amazon Glacier" style={{ width: "80vw", opacity: 0.1, marginTop: "-40vh", filter: "grayscale(1)"}} />
            </div>
        </>
    )
}