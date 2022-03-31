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
import { fetchData } from '../../services/apiConfig';
import darkweb from "../../assets/images/darkweb.png"
export const DarkeyeWatcher = (props: any) => {
    
    return (
        <>
            <MDBContainer fluid className="pb-5" style={{ padding: "2vw" }}>
                <MDBRow >
                        <MDBBtn className="float-right" 
                            color="dark"
                            onClick={() => props.SwitchView('home')}
                            style={{ border: "2px solid blue-grey", borderRadius: "10px" }}>
                            <MDBIcon fas icon="angle-left" style={{ fontSize: "15px", marginLeft: "3px" }} />
                            &nbsp;&nbsp; Go back to dashboard&nbsp;&nbsp;
                        </MDBBtn>

                        
                   
                </MDBRow>

                <MDBRow style={{display: "flex", justifyContent: "center"}}>
                <h1 style={{fontWeight: 800}}>Dark eye Watcher</h1>
                <br /><br />
                {/* <div>
                    <img src={scm1} style={{ width: "500px", marginLeft: "20px" }} />
                </div> */}
                </MDBRow>
                <br />
                <MDBRow style={{display: "flex", justifyContent: "center"}}>
                {/* <h1 style={{fontWeight: 800}}>SCM Watcher</h1> */}
                <br />

                <div>
                    <img src={darkweb} style={{ width: "50vw", marginLeft: "20px", height: "55vh", opacity: 0.2 }} />
                </div>
                
                </MDBRow>
                <div style={{display: "flex", justifyContent: "center", marginTop: "-34.2vh"}}>
                <MDBIcon icon="cog" spin size="6x" fixed />
                  <span className="sr-only">Loading...</span>
                </div>
            </MDBContainer>
        </>
    )
}