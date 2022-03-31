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
    MDBCollapse,
    MDBNotification,
    MDBBadge,
} from "mdbreact";
import "./style.css";
import { fetchData } from '../../services/apiConfig'
import { useWatch } from "react-hook-form";

export const Subservices = (props: any) => {
    const [subDomainfullList, setsubDomainfullList] = useState([]);
    const [subDomains, setSubDomains] = useState([]);
    const [collapseID, setCollapseID] = useState("");
    const [vulnerability, setVulnerability] = useState('all');
    const [isprivate, setisprivate] = useState('all')
    const [isresolved, setisresolved] = useState()
    console.log(props)
    let totalCount = 0;
    console.log(props.Account)
    console.log(props.Service)
    console.log(subDomains)
    // totalCount = props.Service.criticalCount + props.Service.highCount + props.Service.lowCount + props.Service.mediumCount;
    console.log(totalCount)
    useEffect(() => {
        console.log("sub-service")
        fetchData('resources', 'GET', "?accountName=" + props.Account + "&resource=" + props.Service).then((res: any) => {
            console.log(res)
            if(res.message === "Scanning is in progress.."){
                props.SwitchView('scan')
            } 
            setSubDomains(res)
            setsubDomainfullList(res)
        })
    }, [isresolved]);

    const toggleCollapse = (collapseid: any) => {
        if (collapseid !== collapseID) {
            setCollapseID(collapseid)
        } else {
            setCollapseID("")
        }
    }
    // const Vulnerability = async (e: any) => {
    //     setVulnerability(e.target.value);
    //     console.log(e.target.value)
    //     console.log(subDomainfullList)
    //     let filter = e.target.value
    //     let filteredSubDomain: any = new Array();
    //     const response = await subDomainfullList.map((subD: any) => {
    //         console.log(subD[filter])
    //         if (subD[filter] !== "0") {
    //             console.log(subD)
    //             filteredSubDomain.push(subD)
    //             console.log(filteredSubDomain)
    //         }
    //     })
    //     setSubDomains(filteredSubDomain)
    // }
    // const isPrivate = async (e: any) => {
    //     setisprivate(e.target.value);
    //     let filter = e.target.value
    //     let filteredSubDomain: any = new Array();
    //     const response = await subDomainfullList.map((subD: any) => {
    //         console.log(subD[filter])
    //         if (subD.isPrivate === filter && filter !== 'all') {
    //             console.log(subD)
    //             filteredSubDomain.push(subD)
    //             console.log(filteredSubDomain)
    //         }
    //     })
    //     if (filter === "all") {
    //         filteredSubDomain = subDomainfullList
    //     }
    //     setSubDomains(filteredSubDomain)
    // }
    // const markResolved = (e: any) => {
    //     fetchData('subdomain/bug/', 'GET', e).then((res: any) => {
    //         setisresolved(e)
    //         console.log(res)
    //     })
    // }
    const token = localStorage.getItem("token");
    if (token === null || token === undefined || token.length < 0) {
        return <Redirect to={{
            pathname: '/login',
        }} />
    }
    // const dummy = ["abc", "cdf"]
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
                                <MDBBreadcrumbItem onClick={() => props.SwitchView('home')} style={{ cursor: "pointer", marginLeft: "20px" }} >home</MDBBreadcrumbItem>
                                 <MDBBreadcrumbItem onClick={() => props.SwitchView('assets')} style={{ cursor: "pointer" }}>assets</MDBBreadcrumbItem>
                                 <MDBBreadcrumbItem onClick={() => props.SwitchView('services')} style={{ cursor: "pointer" }}>services</MDBBreadcrumbItem>
                                  <MDBBreadcrumbItem active>{props.Service}</MDBBreadcrumbItem>
                        </MDBBreadcrumb>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol sm="11" md="11" lg="11" style={{ padding: "10px 25px", border: "1px solid #ededef", backgroundColor: "rgb(237, 237, 239)" }}>
                        <MDBRow md="12" lg="12" style={{ display: "inline-flex" }}>
                            <p className='text-dark font-weight-bold' style={{ fontSize: "20px", paddingTop: "10px" }}>{props.Service}</p>
                            <span className='text-dark' style={{ fontSize: "12px", marginLeft: "10px", paddingTop: "20px" }}>213 available</span>
                        </MDBRow>
                        <MDBRow>

                         
                        </MDBRow>

                        <div style={{ maxHeight: "72vh", overflowY: "auto", overflowX: "hidden" }}>
                            <ul className="list-group" style={{ listStyle: "none", fontSize: "15px", marginTop: "2vw" }}>
                                <div style={{ backgroundColor: "white" }}>
                                    {subDomains.map((subD: any, index: any) =>
                                        <div className="subDomainVulnearbility">
                                            <li className={subD.totalCount > 0 ? "red-text list-group-item-pentest" : "green-text list-group-item-pentest"} 
                                             onClick={() =>
                                                toggleCollapse("collapse" + index++)}>{subD.name}
                                                <span className={subD.totalCount > 0 ? "red-text vbadge" : "green-text vbadge"}>{subD.totalCount}  issues &nbsp;
                                                    <i className={collapseID !== "" ? "fa fa-angle-right" : "fa fa-angle-down"} /></span>
                                            </li>


                                            <MDBCollapse id={"collapse" + index} isOpen={collapseID}>

                                                {subD.critical ?
                                                    <div>
                                                    <MDBRow style={{ backgroundColor: "#f5c6cb", color: "darkred" }} className="subDomainVulnearbility">
                                                        <MDBBadge className="subDomainBadge" color="danger">High</MDBBadge>
                                                        {(Object.keys(subD.critical)).map((key: any) => {
                                                            return <div style={{ width: "100%", marginLeft: "2vw", fontSize: "12px" }}>
                                                            <br />
                                                            <MDBRow>
                                                                    {subD.critical[key]}
                                                                <br /> <br />
                                                            </MDBRow>
                                                        </div>
                                                        })}
                                                    </MDBRow><br /></div> : <div />
                                                }
                                                {subD.high ?
                                                    <div>
                                                        <MDBRow style={{ backgroundColor: "#f5c6cb", color: "darkred" }} className="subDomainVulnearbility">
                                                            <MDBBadge className="subDomainBadge" color="danger">High</MDBBadge>
                                                            {(Object.keys(subD.high)).map((key: any) => {
                                                                return <div style={{ width: "100%", marginLeft: "2vw", fontSize: "12px" }}>
                                                                <br />
                                                                <MDBRow>
                                                                        {subD.high[key]}
                                                                    <br /> <br />
                                                                </MDBRow>
                                                            </div>
                                                            })}
                                                        </MDBRow><br /></div> : <div />
                                                }
                                                {subD.medium ?
                                                    <div>
                                                    <MDBRow style={{ backgroundColor: "#ffeeba", color: "chocolate" }} className="subDomainVulnearbility">
                                                    <MDBBadge className="subDomainBadge" color="warning">Medium</MDBBadge>
                                                        {(Object.keys(subD.medium)).map((key: any) => {
                                                            return <div style={{ width: "100%", marginLeft: "2vw", fontSize: "12px" }}>
                                                                <br />
                                                                <MDBRow>
                                                                        {subD.medium[key]}
                                                                    <br /> <br />
                                                                </MDBRow>
                                                            </div>
                                                        })}
                                                    </MDBRow><br /></div> : <div />
                                                }
                                                {subD.low ?
                                                    <div>
                                                        <MDBRow style={{ backgroundColor: "#c3e6cb", color: "darkgreen" }} className="subDomainVulnearbility">
                                                            <MDBBadge className="subDomainBadge" color="success">Low</MDBBadge>
                                                            {(Object.keys(subD.low)).map((key: any) => {
                                                               return <div style={{ width: "100%", marginLeft: "2vw", fontSize: "12px" }}>
                                                               <br />
                                                               <MDBRow>
                                                                       {subD.low[key]}
                                                                   <br /> <br />
                                                               </MDBRow>
                                                           </div>
                                                            })}
                                                        </MDBRow><br /></div> : <div />
                                                }
                                                {totalCount === 0 ?
                                                    <div>
                                                    <MDBRow style={{ color: "black"}} >
                                                        {/* <MDBBadge className="subDomainBadge" color="info">Low</MDBBadge> */}
                                                           <div style={{ width: "100%", marginLeft: "2vw", fontSize: "12px", fontWeight: "bold", display: "flex", justifyContent: "center" }}>
                                                           <br />
                                                           <MDBRow>
                                                                 ! No issues found
                                                               <br /> 
                                                           </MDBRow>
                                                       </div>
                                                    </MDBRow><br /></div> : <div />
                                                }
                                            </MDBCollapse>
                                        </div>
                                    )}
                                </div>
                            </ul>
                        </div>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </>
    )
}