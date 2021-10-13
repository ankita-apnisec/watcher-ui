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
    MDBNotification
} from "mdbreact";
import { useHistory } from "react-router";
import { Chart } from "react-google-charts";
import "./style.css"
export const Alerts = (props: any) => {
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
                <MDBRow >
                    <MDBCol sm="12" md="12" lg="12" style={{ padding: "25px", border: "1px solid #ededef" }}>
                        <MDBRow md="12" lg="12" style={{ display: "inline-flex" }}>
                            <p className='text-dark font-weight-bold' style={{ fontSize: "20px", paddingTop: "10px" }}>Notificatons</p>
                            <span className='text-dark' style={{ fontSize: "12px", marginLeft: "10px", paddingTop: "20px" }}>63 available</span>
                            <br />
                        </MDBRow>
                        <br />
                        <div style={{ maxHeight: "70vh", overflowY: "hidden",  overflowX: "hidden" }}>
                        <br />
                        <MDBContainer fluid>
                        <MDBNotification
                            show
                            fade
                            icon="bell"
                            iconClassName="red-text"
                            className= "notify"
                            title="SubDomain"
                            message="1 new issue [Cras mattis iudicium purus sit amet fermentum. Donec sed odio operae, eu vulputate felis rhoncus.]"
                            text="23 minutes ago"
                            style={{maxWidth: "100vw !important"}}
                        />
                        <MDBNotification
                            show
                            fade
                            icon="bell"
                            iconClassName="blue-text"
                            className= "notify"
                            title="Sensitive endpoint"
                            message="2 new misconfigurations [Cras mattis iudicium purus sit amet fermentum. Donec sed odio operae, eu vulputate felis rhoncus.]"
                            text="42 minutes ago"
                        />
                          <MDBNotification
                            show
                            fade
                            icon="bell"
                            iconClassName="red-text"
                            className= "notify"
                            title="Public GIT repo"
                            message="Alert! GIT repo public [Cras mattis iudicium purus sit amet fermentum. Donec sed odio operae, eu vulputate felis rhoncus.]"
                            text="56 minutes ago"
                        />
                            <MDBNotification
                            show
                            fade
                            icon="bell"
                            iconClassName="blue-text"
                            className= "notify"
                            title="Sensitive endpoint"
                            message="2 new misconfigurations [Cras mattis iudicium purus sit amet fermentum. Donec sed odio operae, eu vulputate felis rhoncus.]"
                            text="1 hour ago"
                        /><MDBNotification
                        show
                        fade
                        icon="bell"
                        iconClassName="blue-text"
                        className= "notify"
                        title="Sensitive endpoint"
                        message="2 new misconfigurations [Cras mattis iudicium purus sit amet fermentum. Donec sed odio operae, eu vulputate felis rhoncus.]"
                        text="1 hour ago"
                    />
                      <MDBNotification
                            show
                            fade
                            icon="bell"
                            iconClassName="red-text"
                            className= "notify"
                            title="Public GIT repo"
                            message="Alert! GIT repo public [Cras mattis iudicium purus sit amet fermentum. Donec sed odio operae, eu vulputate felis rhoncus.]"
                            text="1 hour ago"
                        />
                         <MDBNotification
                            show
                            fade
                            icon="bell"
                            iconClassName="red-text"
                            className= "notify"
                            title="SubDomain"
                            message="1 new issue [Cras mattis iudicium purus sit amet fermentum. Donec sed odio operae, eu vulputate felis rhoncus.]"
                            text="2 hours ago"
                            
                        />
                        <MDBNotification
                            show
                            fade
                            icon="bell"
                            iconClassName="blue-text"
                            className= "notify"
                            title="Sensitive endpoint"
                            message="2 new misconfigurations [Cras mattis iudicium purus sit amet fermentum. Donec sed odio operae, eu vulputate felis rhoncus.]"
                            text="2 hours ago"
                        />
                          <MDBNotification
                            show
                            fade
                            icon="bell"
                            iconClassName="red-text"
                            className= "notify"
                            title="Public GIT repo"
                            message="Alert! GIT repo public [Cras mattis iudicium purus sit amet fermentum. Donec sed odio operae, eu vulputate felis rhoncus.]"
                            text="2 hours ago"
                        />
                        <MDBNotification
                            show
                            fade
                            icon="bell"
                            iconClassName="red-text"
                            className= "notify"
                            title="SubDomain"
                            message="1 new issue [Cras mattis iudicium purus sit amet fermentum. Donec sed odio operae, eu vulputate felis rhoncus.]"
                            text="2 hours ago"
                        />
                        <MDBNotification
                            show
                            fade
                            icon="bell"
                            iconClassName="blue-text"
                            className= "notify"
                            title="Sensitive endpoint"
                            message="2 new misconfigurations [Cras mattis iudicium purus sit amet fermentum. Donec sed odio operae, eu vulputate felis rhoncus.]"
                            text="2 hours ago"
                        />
                          <MDBNotification
                            show
                            fade
                            icon="bell"
                            iconClassName="red-text"
                            className= "notify"
                            title="Public GIT repo"
                            message="Alert! GIT repo public [Cras mattis iudicium purus sit amet fermentum. Donec sed odio operae, eu vulputate felis rhoncus.]"
                            text="2 hours ago"
                        />
                            <MDBNotification
                            show
                            fade
                            icon="bell"
                            iconClassName="blue-text"
                            className= "notify"
                            title="Sensitive endpoint"
                            message="2 new misconfigurations [Cras mattis iudicium purus sit amet fermentum. Donec sed odio operae, eu vulputate felis rhoncus.]"
                            text="3 hours ago"
                        /><MDBNotification
                        show
                        fade
                        icon="bell"
                        iconClassName="blue-text"
                        className= "notify"
                        title="Sensitive endpoint"
                        message="2 new misconfigurations [Cras mattis iudicium purus sit amet fermentum. Donec sed odio operae, eu vulputate felis rhoncus.]"
                        text="3 hours ago"
                    />
                      <MDBNotification
                            show
                            fade
                            icon="bell"
                            iconClassName="red-text"
                            className= "notify"
                            title="Public GIT repo"
                            message="Alert! GIT repo public [Cras mattis iudicium purus sit amet fermentum. Donec sed odio operae, eu vulputate felis rhoncus.]"
                            text="3 hours ago"
                        />
                         <MDBNotification
                            show
                            fade
                            icon="bell"
                            iconClassName="red-text"
                            className= "notify"
                            title="SubDomain"
                            message="1 new issue [Cras mattis iudicium purus sit amet fermentum. Donec sed odio operae, eu vulputate felis rhoncus.]"
                            text="4 hours ago"
                        />
                        <MDBNotification
                            show
                            fade
                            icon="bell"
                            iconClassName="blue-text"
                            className= "notify"
                            title="Sensitive endpoint"
                            message="2 new misconfigurations [Cras mattis iudicium purus sit amet fermentum. Donec sed odio operae, eu vulputate felis rhoncus.]"
                            text="5 hours ago"
                        />
                          <MDBNotification
                            show
                            fade
                            icon="bell"
                            iconClassName="red-text"
                            className= "notify"
                            title="Public GIT repo"
                            message="Alert! GIT repo public [Cras mattis iudicium purus sit amet fermentum. Donec sed odio operae, eu vulputate felis rhoncus.]"
                            text="5 hours ago"
                        />
                    </MDBContainer> 
                
                            {/* <ul className="list-group" style={{ listStyle: "none", fontSize: "15px", marginTop: "2vw" }}>
                                <li className="list-group-item">service.application.in <span className="vbadge">12 issues</span></li>
                                <li className="list-group-item">oooauth.application.in<span className="vbadge">5 issues</span></li>
                                <li className="list-group-item">seller.application.in <span className="vbadge">3 issues</span></li>
                                <li className="list-group-item">invoice-generator.application.in <span className="vbadge">3 issues</span></li>
                                <li className="list-group-item">service.application.in <span className="vbadge">12 issues</span></li>
                                <li className="list-group-item">oooauth.application.in<span className="vbadge">5 issues</span></li>
                                <li className="list-group-item">seller.application.in <span className="vbadge">3 issues</span></li>
                                <li className="list-group-item">invoice-generator.application.in <span className="vbadge">3 issues</span></li><li className="list-group-item">service.application.in <span className="vbadge">12 issues</span></li>
                                <li className="list-group-item">oooauth.application.in<span className="vbadge">5 issues</span></li>
                                <li className="list-group-item">seller.application.in <span className="vbadge">3 issues</span></li>
                                <li className="list-group-item">invoice-generator.application.in <span className="vbadge">3 issues</span></li><li className="list-group-item">service.application.in <span className="vbadge">12 issues</span></li>
                                <li className="list-group-item">oooauth.application.in<span className="vbadge">5 issues</span></li>
                                <li className="list-group-item">seller.application.in <span className="vbadge">3 issues</span></li>
                                <li className="list-group-item">invoice-generator.application.in <span className="vbadge">3 issues</span></li><li className="list-group-item">service.application.in <span className="vbadge">12 issues</span></li>
                                <li className="list-group-item">oooauth.application.in<span className="vbadge">5 issues</span></li>
                                <li className="list-group-item">seller.application.in <span className="vbadge">3 issues</span></li>
                                <li className="list-group-item">invoice-generator.application.in <span className="vbadge">3 issues</span></li><li className="list-group-item">service.application.in <span className="vbadge">12 issues</span></li>
                                <li className="list-group-item">oooauth.application.in<span className="vbadge">5 issues</span></li>
                                <li className="list-group-item">seller.application.in <span className="vbadge">3 issues</span></li>
                                <li className="list-group-item">invoice-generator.application.in <span className="vbadge">3 issues</span></li><li className="list-group-item">service.application.in <span className="vbadge">12 issues</span></li>
                                <li className="list-group-item">oooauth.application.in<span className="vbadge">5 issues</span></li>
                                <li className="list-group-item">seller.application.in <span className="vbadge">3 issues</span></li>
                                <li className="list-group-item">invoice-generator.application.in <span className="vbadge">3 issues</span></li><li className="list-group-item">service.application.in <span className="vbadge">12 issues</span></li>
                                <li className="list-group-item">oooauth.application.in<span className="vbadge">5 issues</span></li>
                                <li className="list-group-item">seller.application.in <span className="vbadge">3 issues</span></li>
                                <li className="list-group-item">invoice-generator.application.in <span className="vbadge">3 issues</span></li><li className="list-group-item">service.application.in <span className="vbadge">12 issues</span></li>
                                <li className="list-group-item">oooauth.application.in<span className="vbadge">5 issues</span></li>
                                <li className="list-group-item">seller.application.in <span className="vbadge">3 issues</span></li>
                                <li className="list-group-item">invoice-generator.application.in <span className="vbadge">3 issues</span></li>
                            </ul> */}
                        </div>
                    </MDBCol>

                </MDBRow>
            </MDBContainer>
        </>
    )
}