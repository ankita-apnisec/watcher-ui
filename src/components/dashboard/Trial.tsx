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
export const Trial = (props: any) => {
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
                        <br />
                        <MDBIcon far icon="frown" size="2x" fixed style={{ color: "#2bbbad" }} />
                        <p style={{ fontSize: "20px", fontWeight: "bold" }}>Sorry your trial period is over. </p>

                    </div>
                </MDBCol>
                {/* <img src={watermark} style={{ width: "80vw", opacity: 0.1, marginTop: "-40vh", filter: "grayscale(1)"}} /> */}
            </div>
        </>
    )
}