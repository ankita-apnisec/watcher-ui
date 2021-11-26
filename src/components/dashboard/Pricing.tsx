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
    MDBNotification,
    MDBLink
} from "mdbreact";
import { useHistory } from "react-router";
import { Chart } from "react-google-charts";
import "./style.css"
import { fetchData } from '../../services/apiConfig'
export const Pricing = (props: any) => {
    const token = localStorage.getItem("token");
    
   
    if (token === null || token === undefined || token.length < 0) {
        return <Redirect to={{
            pathname: '/login',
        }} />
    }

    return (
        <>
            <MDBContainer fluid className="pb-5" style={{ padding: "2vw" }}>
                <MDBRow >
                    <MDBCol sm="12" md="12" lg="12" style={{ padding: "25px" }}>
                        <MDBRow md="12" lg="12" style={{ display: "inline-flex" }}>
                            <p className='text-dark font-weight-bold' style={{ fontSize: "25px", paddingTop: "10px" }}>Choose your plan</p>
                            {/* <span className='text-dark' style={{ fontSize: "12px", marginLeft: "10px", paddingTop: "20px" }}>3 methods available</span> */}
                            <br />
                        </MDBRow>
                        <br />
                        <br />
                        <MDBRow>
                            <MDBCol className="awsServices" sm="3" md="3" lg="3" >
                                <MDBRow>
                                <div>
                                    <h4 className="st" style={{ fontWeight: 800, backgroundColor: "mistyrose", display: "flex", justifyContent: "center"}}>3 months</h4>
                                    <p style={{ fontSize: "11px", padding: "10px" }}>Watcher provides this pluggable alert system on your business channel. Configure to get real time alerts.
                                 </p>
                                 <p style={{ fontSize: "11px", padding: "10px", display: "flex", justifyContent: "center" }}> Some info...
                                 </p>
                                 <p style={{ fontSize: "11px", padding: "10px", display: "flex", justifyContent: "center" }}> Some info...
                                 </p>
                                 <MDBCol md="11">
                                    
                                        <div className="text-center text-md-center text-white">
                                            <MDBBtn id="myBtn" color="indigo">Choose plan</MDBBtn>
                                        </div>
                                        <br />
                                    </MDBCol>
                                </div>
                                </MDBRow>
                            </MDBCol>
                            <MDBCol sm="1" md="1" lg="1" ></MDBCol>
                            <MDBCol className="awsServices" sm="4" md="4" lg="4" >
                            <MDBRow>
                                <div>
                                    <h3 className="st" style={{ fontWeight: 800, backgroundColor: "mistyrose", display: "flex", justifyContent: "center"}}>12 months</h3>
                                    <p style={{ fontSize: "11px", padding: "10px" }}>Watcher provides this pluggable alert system on your business channel. Configure to get real time alerts.
                                 </p>
                                 <p style={{ fontSize: "11px", padding: "10px", display: "flex", justifyContent: "center" }}> Some info...
                                 </p>
                                 <p style={{ fontSize: "11px", padding: "10px", display: "flex", justifyContent: "center" }}> Some info...
                                 </p>
                                 <p style={{ fontSize: "11px", padding: "10px", display: "flex", justifyContent: "center" }}> Some info...
                                 </p>
                                 <MDBCol md="11">
                                  
                                        <div className="text-center text-md-center text-white">
                                            <MDBBtn id="myBtn" color="indigo">Choose plan</MDBBtn>
                                        </div>
                                        <br />
                                    </MDBCol>
                                </div>
                                </MDBRow>
                            </MDBCol>
                            <MDBCol sm="1" md="1" lg="1" ></MDBCol>
                            <MDBCol className="awsServices" sm="3" md="3" lg="3" >
                            <MDBRow>
                                <div>
                                    <h4 className="st" style={{ fontWeight: 800, backgroundColor: "mistyrose", display: "flex", justifyContent: "center" }}>6 months</h4>
                                    <p style={{ fontSize: "11px", padding: "10px" }}>Watcher provides this pluggable alert system on your business channel. Configure to get real time alerts.
                                 </p>
                                 <p style={{ fontSize: "11px", padding: "10px", display: "flex", justifyContent: "center" }}> Some info...
                                 </p>
                                 <p style={{ fontSize: "11px", padding: "10px", display: "flex", justifyContent: "center" }}> Some info...
                                 </p>
                                 <MDBCol md="11">
                                  
                                        <div className="text-center text-md-center text-white">
                                            <MDBBtn id="myBtn" color="indigo">Choose plan</MDBBtn>
                                        </div>
                                        <br />
                                    </MDBCol>
                                </div>
                                </MDBRow>
                            </MDBCol>
                        </MDBRow>
                        <br /> <br />
                     
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </>
    )
}