import React, { useState } from "react";
import { MDBRow, MDBCol, MDBBtn, MDBIcon, MDBContainer, MDBNotification, MDBCollapse } from "mdbreact";
import "../components/dashboard/style.css"


export const Header = (props: any) => {
    const [notificationVisibility, setnotificationVisibility] = useState(false);
    const [collapseID, setcollapseID] = useState(false);

    const toggleCollapse = (e: any) => {
        setcollapseID(!collapseID)
    }
    console.log(localStorage.getItem("username"))
    return (
        <MDBRow className="watcherHeader" style={{ backgroundColor: "#dcdcdc", height: "7vh", minHeight: "70px", maxHeight: "7vh" }}>
            <MDBCol sm="3" md="3" lg="3" style={{ maxHeight: "7vh" }}>
                {/* <div className='font-weight-bold' style={{ padding: "1.5vw", display: "inline-flex" }}>
                    <p className='text-dark' style={{ fontSize: "20px" }}>Dashboard
                    </p>
                </div> */}


                <form className="form-inline mt-4 mb-4">
                    <MDBIcon icon="search" />
                    <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search" aria-label="Search" />
                </form>



            </MDBCol>
            <MDBCol sm="9" md="9" lg="9">
                <div style={{ padding: "25px", float: "right", display: "flex" }}>
                    {/* <label className="headertabs">Products&nbsp;<MDBIcon style={{ float: "right", padding: "3px" }} fas icon="caret-down" /></label>
                    <label className="headertabs">Tutorials</label>
                    <label className="headertabs">Pricing</label> */}
                    {/* <label className="headertabs">&nbsp;<MDBIcon style={{ fontSize: "18px" }} fas icon="bell" /><span style={{ backgroundColor: "#00e3aa" }} className="badge">3</span> </label> */}

                    <div style={{ zIndex: 1 }}>
                        <label className="logouttab" onClick={() => toggleCollapse("watcherCollapse")}>
                            <span style={{ fontWeight: 900, fontSize: "16px" }}>&nbsp;&nbsp;&nbsp;{(localStorage.getItem("username") as any).toUpperCase()}</span>&nbsp;&nbsp;&nbsp;
                    <MDBIcon icon="user" style={{ fontSize: "15px", cursor: "pointer", color: "white" }} />&nbsp;
                    <MDBIcon style={{ float: "right", padding: "3px" }} fas icon="caret-down" />
                        </label>

                        <MDBCollapse style={{ backgroundColor: "white", borderRadius: "10px", marginLeft: "35px", paddingBottom: "1px" }} id="logoutCollapse" isOpen={collapseID}>
                            {/* <p className="side-nav-links">
                                        <MDBIcon icon="chart-line"  /> &nbsp;&nbsp;Profile
                                   </p> */}
                            <p className="side-nav-links" onClick={() => { localStorage.clear(); props.SwitchView('ddg') }}>
                                <MDBIcon fas icon="sign-out-alt" /> &nbsp;&nbsp;Logout
                                   </p>
                        </MDBCollapse>
                    </div>
                    {/* <MDBBtn 
                    color="blue-grey" disabled 
                    style={{ border: "2px solid blue-grey", borderRadius: "10px" }}>Export
                    <MDBIcon icon="file-download" style={{ fontSize: "15px", marginLeft: "3px" }} />
                    </MDBBtn> */}


                    {/* <MDBBtn 
                    color="blue-grey" disabled
                    style={{ border: "2px solid blue-grey", borderRadius: "10px" }}>Notifications
                    </MDBBtn> */}
                    {/* {notificationVisibility ? <MDBContainer className="notification">
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
                    /></MDBContainer>} */}
                </div>


            </MDBCol>
            {/* <MDBCol sm="2" md="2" lg="2">
            <div style={{backgroundColor: "white", borderRadius: "10px", marginTop: "20px"}}>
            <label className="logouttab" onClick={() => toggleCollapse("watcherCollapse")}>
                    <span style={{fontWeight: 900}}>&nbsp;&nbsp;&nbsp;LIVSPACE</span>&nbsp;&nbsp;&nbsp;
                    <MDBIcon style={{ float: "right", padding: "3px" }} fas icon="caret-down" />&nbsp;&nbsp;&nbsp;
                    <MDBIcon icon="user" style={{ float: "right", fontSize: "15px",cursor: "pointer", color: "white"}} />&nbsp;
            </label>
            
                <MDBCollapse id="watcherCollapse" isOpen={collapseID}>
                                    <p className="side-nav-links">
                                        <MDBIcon onClick={() => { localStorage.clear(); props.SwitchView('ddg') }} icon="chart-line" /> &nbsp;&nbsp;LogOut
                                   </p>
                    </MDBCollapse>
            </div>
            </MDBCol> */}
        </MDBRow>
    );
}
// }