import React, { useState} from "react";
import { MDBRow, MDBCol, MDBBtn, MDBIcon, MDBContainer, MDBNotification } from "mdbreact";
import "../components/dashboard/style.css"


export const Header = (props: any) => {
    const [notificationVisibility, setnotificationVisibility] = useState(false);
    return (
        <MDBRow className="watcherHeader" style={{ backgroundColor: "white", height: "7vh", minHeight: "70px", maxHeight: "7vh" }}>
            <MDBCol sm="3" md="4" lg="4" style={{ maxHeight: "7vh" }}>
                <div className='font-weight-bold' style={{ padding: "1.5vw", display: "inline-flex" }}>
                    <p className='text-dark' style={{ fontSize: "20px" }}>Dashboard
                    </p>
                </div>
            </MDBCol>
            <MDBCol sm="7" md="7" lg="7">
                <div style={{ padding: "10px", float: "right" }}>
                    <MDBBtn 
                    color="blue-grey" disabled 
                    style={{ border: "2px solid blue-grey", borderRadius: "10px" }}>Export
                    <MDBIcon icon="file-download" style={{ fontSize: "15px", marginLeft: "3px" }} /></MDBBtn>
                    <MDBBtn 
                    color="blue-grey" disabled
                    // onClick={() => setnotificationVisibility(!notificationVisibility)} 
                    style={{ border: "2px solid blue-grey", borderRadius: "10px" }}>Notifications
                    {/* <MDBIcon icon="bell" style={{ fontSize: "15px", marginLeft: "3px" }} /><span className="badge">3</span> */}
                    </MDBBtn>
                    {notificationVisibility ? <MDBContainer className="notification">
                        <MDBNotification
                            show
                            fade
                            icon="bell"
                            iconClassName="red-text"
                            title="SubDomain"
                            message="1 new issue"
                            text="23 minutes ago"
                            onClick={() => {
                                setnotificationVisibility(!notificationVisibility); props.SwitchView('alerts')
                            }}
                        />
                        <MDBNotification
                            show
                            fade
                            icon="bell"
                            iconClassName="blue-text"
                            title="Sensitive endpoint"
                            message="2 new misconfigurations"
                            text="42 minutes ago"
                        />
                        <MDBNotification
                            show
                            fade
                            icon="bell"
                            iconClassName="red-text"
                            title="Public GIT repo"
                            message="Alert! GIT repo public"
                            text="56 minutes ago"
                        />
                        <a 
                        style={{ fontSize: "12px", textDecoration: "underline", color: "red" }} 
                        onClick={() => {
                            setnotificationVisibility(!notificationVisibility); props.SwitchView('alerts')
                        }}>
                            See all</a>
                    </MDBContainer> : <MDBContainer style={{ visibility: "hidden" }} className="notification"><MDBNotification
                        show
                        fade
                        icon="bell"
                        iconClassName="red-text"
                        title="Sensitive endpoint "
                        message="2 new misconfigurations"
                        text=" 42 minutes ago"
                    /></MDBContainer>}
                </div>


            </MDBCol>
            <MDBCol sm="1" md="1" lg="1">
                <div style={{ paddingTop: "20px" }}>
                    <MDBIcon onClick={() => { localStorage.clear(); props.SwitchView('ddg') }} icon="user-circle" style={{ fontSize: "25px", marginLeft: "20px", cursor: "pointer" }} />
                </div>
            </MDBCol>
        </MDBRow>
    );
}
// }