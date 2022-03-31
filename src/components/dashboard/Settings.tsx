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
export const Settings = (props: any) => {
    const token = localStorage.getItem("token");
    const [view, setView] = useState(false);
    const [webhook, setWebhook] = useState('');
    const [platform, setPlatform] = useState('');
    const [togglePlatform, setTogglePlatform] = useState('')
    const [whconnected, setWhconnected] = useState(false);
    useEffect(() => {
        fetchData('settings', 'GET').then((res: any) => {
            console.log(res)
            if(res.platform !== undefined && res.platform !== null)  {
                setView(true)
                setWhconnected(true)
                setWebhook(res.value)
                setPlatform(res.platform)
            }
        })
    }, [props]);
    const handleSwitchChange = (id: any) => {
        console.log(id)
        if(platform.length < 1){
            togglePlatform === id ?  setTogglePlatform('') : setTogglePlatform(id)
            console.log(togglePlatform.length)
            if(togglePlatform === id){
                setView(false)
            } else {
                setView(true)
            }
        }
        
    }
    const ConnecttoWebhook = () => {
        console.log("connect")
        togglePlatform.length> 0 ? setPlatform(togglePlatform) : setPlatform(platform)
        fetchData('/alerts', 'POST', { "platform": platform || togglePlatform, "webhook_url": webhook }).then((res: any) => {
            console.log(res.status)
            if(res.status === 204) {
                console.log("found")
                setWhconnected(true)
            } else {
                console.log("not found")
            }
        })
        setWhconnected(true)
    }
    const EditWebhook = () => {
        console.log("edit")
        setView(true)
        setWhconnected(false)
    }
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
                            <p className='text-dark font-weight-bold' style={{ fontSize: "20px", paddingTop: "10px" }}>Configure alert systems</p>
                            <span className='text-dark' style={{ fontSize: "12px", marginLeft: "10px", paddingTop: "20px" }}>3 methods available</span>
                            <br />
                        </MDBRow>
                        <br />
                        <br />
                        <MDBRow>
                            <MDBCol className="awsServices" sm="3" md="3" lg="3" >
                                <MDBRow className="serviceCard">
                                    <MDBCol sm="1" md="4" lg="2" >
                                        <img className="alignleft" src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg" alt="AWS Lambda" width={"50vw"} />
                                    </MDBCol>
                                    <MDBCol sm="11" md="8" lg="3" >
                                        <div className="alertSystem" style={{ display: "inherit !important" }} >
                                            <p className='text-dark font-weight-bold' style={{ fontSize: "30px", marginBlockEnd: "10px" }}>Slack</p>
                                        </div>
                                    </MDBCol>
                                    <MDBCol sm="12" md="12" lg="7" >
                                        <div className="alertSystem" style={{ display: "inherit !important" }} >
                                            <label className="switch">
                                                <input type="checkbox" onChange={() => handleSwitchChange("slack")} checked={(platform === "slack" || togglePlatform === "slack") ? true : false}/>
                                                <span className="slider round"></span>
                                            </label>
                                        </div>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCol>
                            <MDBCol sm="1" md="1" lg="1" ></MDBCol>
                            <MDBCol className="awsServices" sm="3" md="3" lg="3" >
                                <MDBRow className="serviceCard">
                                    <MDBCol sm="1" md="4" lg="2" >
                                        <img className="alignleft" src="data:image/png;base64,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"
                                            alt="AWS Lambda" width={"35vw"} />
                                    </MDBCol>
                                    <MDBCol sm="11" md="8" lg="3" >
                                        <div className="alertSystem" style={{ display: "inherit !important" }} >
                                            <p className='text-dark font-weight-bold' style={{ fontSize: "30px", marginBlockEnd: "10px" }}>Skype</p>
                                        </div>
                                    </MDBCol>
                                    <MDBCol sm="12" md="12" lg="7" >
                                        <div className="alertSystem" style={{ display: "inherit !important" }} >
                                            <label className="switch">
                                                <input type="checkbox" onChange={() => handleSwitchChange("skype")} checked={(platform === "skype" || togglePlatform === "skype" ) ? true : false}/>
                                                <span className="slider round"></span>
                                            </label>
                                        </div>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCol>
                            <MDBCol sm="1" md="1" lg="1" ></MDBCol>
                            <MDBCol className="awsServices" sm="3" md="3" lg="3" >
                                <MDBRow className="serviceCard">
                                    <MDBCol sm="1" md="4" lg="2" >
                                        <img className="alignleft" src="https://gobrolly.com/wp-content/uploads/2020/08/microsoft-teams-logoV2.png" alt="AWS Lambda" width={"50vw"} />
                                    </MDBCol>
                                    <MDBCol sm="11" md="8" lg="3" >
                                        <div className="alertSystem" style={{ display: "inherit !important" }} >
                                            <p className='text-dark font-weight-bold' style={{ fontSize: "30px", marginBlockEnd: "10px" }}>Teams</p>
                                        </div>
                                    </MDBCol>
                                    <MDBCol sm="12" md="12" lg="7" >
                                        <div className="alertSystem" style={{ display: "inherit !important" }} >
                                            <label className="switch">
                                                <input type="checkbox" onChange={() => handleSwitchChange("teams")} checked={(platform === "teams" || togglePlatform === "teams") ? true : false}/>
                                                <span className="slider round"></span>
                                            </label>
                                        </div>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCol>

                            {/* </MDBContainer> */}
                        </MDBRow>
                        {/* </div> */}
                        <br /> <br />
                        {view === true && whconnected === false ?  <div>
                            <MDBRow>
                                <div className="ptest" style={{ cursor: "pointer", border: "1px solid #ededef", width: "72vw" , minHeight: "35vh"}} >
                                    <h4 className="st" style={{ fontWeight: 800, backgroundColor: "rgb(220, 220, 220)" }}>Configurations</h4>
                                    <p style={{ fontSize: "11px", padding: "10px" }}>Watcher provides this pluggable alert system on your business channel. Configure to get real time alerts.
                                 </p>
                                 <MDBCol md="11">
                                    <form style={{marginLeft : "10px"}}>
                                        <div className="grey-text">
                                        <MDBInput label="Enter your platform name" icon="comments"  group type="text" validate error="wrong"
                                                 value={platform || togglePlatform} success="right" />
                                        <MDBInput id="myInput" label="Enter your webhook url (eg: https://hooks.slack.com/services/T09SAJSH109/B01ATRYGU8P/bmy..... )" icon="plug" group type="email" validate error="wrong"
                                                 value={webhook} onChange={e => setWebhook((e.target as any).value)} success="right"/>
                                        </div>
                                        <div className="text-center text-md-right text-white">
                                            <MDBBtn className="saleButton" id="myBtn" onClick={() => ConnecttoWebhook()} >Connect</MDBBtn>
                                        </div>
                                        <br />
                                    </form>
                                    </MDBCol>
                                </div>
                            </MDBRow>
                        </div> : <></>}
                        {view === true && whconnected === true ? <div>
                            <MDBRow>
                                <div className="ptest" style={{ cursor: "pointer", border: "1px solid #ededef", width: "72vw", minHeight: "35vh" }} >
                                    <h4 className="st" style={{ fontWeight: 800, backgroundColor: "rgb(220, 220, 220)" }}>Configurations</h4>
                                    <p style={{ fontSize: "11px", padding: "10px" }}>Watcher provides this pluggable alert system on your business channel. Configure to get real time alerts.
                                 </p>
                                 <MDBCol md="11">
                                    <form style={{marginLeft : "10px"}}>
                                        <div className="grey-text font-weight-bold" >
                                        <MDBInput className="font-weight-bold" icon="comments" group type="text" validate error="wrong"
                                                  value={platform.toUpperCase() || togglePlatform.toUpperCase()} success="right" style={{color: "black"}}/>
                                        <MDBInput className="font-weight-bold" icon="plug" group type="email" validate error="wrong"
                                                 value={webhook}  success="right" style={{color: "black"}}/>
                                        </div>
                                        <div className="text-center text-md-right text-white">
                                            <MDBBtn className="saleButton" id="myBtn" onClick={() => EditWebhook()} >Edit webhook</MDBBtn>
                                        </div>
                                        <br />
                                    </form>
                                    </MDBCol>
                                </div>
                            </MDBRow>
                        </div> : <></>}
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </>
    )
}