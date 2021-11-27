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
    const [subDomainfullList, setsubDomainfullList] = useState(["subDomains"]);
    const [subDomains, setSubDomains] = useState(["subDomains"]);
    const [collapseID, setCollapseID] = useState("");
    const [vulnerability, setVulnerability] = useState('all');
    const [isprivate, setisprivate] = useState('all')
    const [isresolved, setisresolved] = useState()
    console.log(props)
    let totalCount = 0;
    totalCount = props.Service.criticalCount + props.Service.highCount + props.Service.lowCount + props.Service.mediumCount;
    console.log(totalCount)
    useEffect(() => {
        fetchData('resources', 'GET', "?accountName=" + props.Account + "&resource=" + props.Service.name).then((res: any) => {
            console.log(res)
            if(res.message === "Scanning is in progress.."){
                props.SwitchView('scan')
            } 
            setSubDomains(res)
            setsubDomainfullList(res)
        })
    },[isresolved]);

    const toggleCollapse = (collapseid: any) => {
        if (collapseid !== collapseID) {
            setCollapseID(collapseid)
        } else {
            setCollapseID("")
        }
    }
    const Vulnerability = async (e: any) => {
        setVulnerability(e.target.value);
        console.log(e.target.value)
        console.log(subDomainfullList)
        let filter = e.target.value
        let filteredSubDomain: any = new Array();
        const response = await subDomainfullList.map((subD: any) => {
            console.log(subD[filter])
            if (subD[filter] !== "0") {
                console.log(subD)
                filteredSubDomain.push(subD)
                console.log(filteredSubDomain)
            }
        })
        setSubDomains(filteredSubDomain)
    }
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
    const markResolved = (e: any) => {
        fetchData('subdomain/bug/', 'GET', e).then((res: any) => {
            setisresolved(e)
            console.log(res)
        })
    }
    const token = localStorage.getItem("token");
    if (token === null || token === undefined || token.length < 0) {
        return <Redirect to={{
            pathname: '/login',
        }} />
    }
    const dummy = ["abc", "cdf"]
    return (
        <>
            <MDBContainer fluid className="pb-5" style={{ padding: "2vw" }}>
                <MDBRow>
                    <MDBCol sm="11" md="11" lg="11" style={{ padding: "0px" }}>
                        <MDBBreadcrumb >
                            <MDBBtn className="back" onClick={() => props.SwitchView('services')} color="blue-grey" style={{ border: "2px solid blue-grey", borderRadius: "5px", marginLeft: "0px !important", fontSize: "8px !important" }}>
                                <MDBIcon icon="arrow-left" style={{ fontSize: "8px" }} /> Back</MDBBtn>
                                <MDBBreadcrumbItem>assets</MDBBreadcrumbItem>
                                 <MDBBreadcrumbItem>services</MDBBreadcrumbItem>
                                  <MDBBreadcrumbItem active>{props.Service.name}</MDBBreadcrumbItem>
                        </MDBBreadcrumb>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol sm="11" md="11" lg="11" style={{ padding: "10px 25px", border: "1px solid #ededef", backgroundColor: "cornsilk" }}>
                        <MDBRow md="12" lg="12" style={{ display: "inline-flex" }}>
                            <p className='text-dark font-weight-bold' style={{ fontSize: "20px", paddingTop: "10px" }}>{props.Service.name}</p>
                            <span className='text-dark' style={{ fontSize: "12px", marginLeft: "10px", paddingTop: "20px" }}>213 available</span>
                        </MDBRow>
                        <MDBRow>

                            {/* <div>
                                <select className="custom-select" style={{ width: "250px" }} >
                                    <option value="all" >All</option>
                                    <option value="Sub domain takeover" >Sub domain takeover</option>
                                    <option value="CVE" >CVE</option>
                                    <option value="Leaky directory" >Leaky directory</option>
                                </select>
                            </div> */}
                            {/* <div>
                                <select className="custom-select" style={{ width: "250px" }} onChange={(e: any) => isPrivate(e)} value={isprivate}>
                                    <option value="all" >All</option>
                                    <option value="true" >Private</option>
                                    <option value="false" >Public</option>
                                </select>
                            </div> */}
                            <div>
                                <select className="custom-select" style={{ width: "250px" }} onChange={(e: any) => Vulnerability(e)} value={vulnerability}>
                                    <option value="totalCount" >All</option>
                                    <option value="criticalCount" >Critical</option>
                                    <option value="highCount" >High</option>
                                    <option value="mediumCount" >Medium</option>
                                    <option value="lowCount" >Low</option>
                                </select>
                            </div>

                            {/* <MDBFormInline className="md-form">
                                    <MDBIcon icon="search" />
                                    <input className="form-control form-control-sm" type="text" placeholder="Search" aria-label="Search" />
                                </MDBFormInline> */}
                        </MDBRow>

                        {/* <MDBRow>
                            <MDBCol md="6">
                                <MDBFormInline className="md-form">
                                    <MDBIcon icon="search" />
                                    <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search" aria-label="Search" />
                                </MDBFormInline>
                            </MDBCol>
                        </MDBRow> */}
                        <div style={{ maxHeight: "65vh", overflowY: "auto", overflowX: "hidden" }}>
                            <ul className="list-group" style={{ listStyle: "none", fontSize: "15px", marginTop: "2vw" }}>
                                <div style={{ backgroundColor: "white" }}>
                                    {subDomains.map((subD: any, index: any) =>
                                        <div className="subDomainVulnearbility">
                                            <li className="list-group-item-pentest" onClick={() =>
                                                toggleCollapse("collapse" + index++)}>{subD.name}
                                                <span className="vbadge">{subD.totalCount}  issues &nbsp;
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