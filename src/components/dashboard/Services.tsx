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
    MDBBadge
} from "mdbreact";
import { useHistory } from "react-router";
import { Chart } from "react-google-charts";
import "./style.css"
import { fetchData } from '../../services/apiConfig'
import { AccountsSelector } from "./AccountsSelector";
export const Services = (props: any) => {
    const token = localStorage.getItem("token");
    console.log(props)
    const [services, setServices] = useState([{
        criticalCount: 0,
        highCount: 0,
        lowCount: 0,
        mediumCount: 0,
        name: "ElasticBeanstalk_Environment",
        rootAccount: "231316253142",
        totalAvailable: 18}]);
    useEffect(() => {
        fetchData('services', 'GET', "?accountName=" + props.Account).then((res: any) => {
            console.log(res)
            if(res.message === "Scanning is in progress.."){
                props.SwitchView('scan')
            } 
            setServices(res)
        })
    }, []);

    useEffect(() => {
        console.log(props.Account)
        if (props.Account.length > 10) {
            fetchData('services', 'GET', "?accountName=" + props.Account).then((res: any) => {
                console.log(res)
            if(res.message === "Scanning is in progress.."){
                props.SwitchView('scan')
            } 
            setServices(res)
            })
        }
    }, [props.Account]);

    const serviceDetail = (service:any) => {
        console.log(service)
        props.SwitchView('subservices', service.name)
        // fetchData('resources', 'GET', "?accountName=" + props.Account + "&resource=" + service.name).then((res: any) => {
        //     console.log(res)
        //     if(res.message === "Scanning is in progress.."){
        //         props.SwitchView('scan')
        //     } 
        // })
    }

    if (token === null || token === undefined || token.length < 0) {
        return <Redirect to={{
            pathname: '/login',
        }} />
    }
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
                            {/* <MDBBtn className="back" onClick={() => props.SwitchView('assets')} color="blue-grey" style={{ border: "2px solid blue-grey", borderRadius: "5px", marginLeft: "0px !important", fontSize: "8px !important" }}>
                                <MDBIcon icon="arrow-left" style={{ fontSize: "8px" }} /> Back</MDBBtn> */}
                              <MDBBreadcrumbItem onClick={() => props.SwitchView('home')} style={{ cursor: "pointer", marginLeft: "20px" }} >dashboard</MDBBreadcrumbItem>
                            <MDBBreadcrumbItem onClick={() => props.SwitchView('assets')} style={{ cursor: "pointer" }}>assets</MDBBreadcrumbItem>
                            <MDBBreadcrumbItem active>services</MDBBreadcrumbItem>
                        </MDBBreadcrumb>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                <AccountsSelector Account={props.Account} AccountToggle={props.AccountToggle} />
                </MDBRow>
                <div style={{ maxHeight: "75vh", overflowY: "auto", overflowX: "hidden" }}>
                    <MDBRow className="awsRow">

                        {
                            services.map((service: any) =>
                                <>
                                    <MDBCol className="awsServices" sm="3" md="3" lg="3" >
                                        <MDBRow className="serviceCard" onClick={() => { serviceDetail(service)}} >
                                            <MDBCol sm="2" md="2" lg="2" >
                                            <img className="alignleft" src="  https://e7.pngegg.com/pngimages/868/302/png-clipart-aws-lambda-amazon-web-services-serverless-computing-anonymous-function-node-js-amazon-web-services-logo-angle-text.png" alt="aws" width={"40vw"} /> 
                                            </MDBCol>
                                            <MDBCol sm="10" md="10" lg="10" >
                                              <MDBBadge className="DomainBadge" color={service.criticalCount + service.highCount + service.lowCount + service.mediumCount > 0 ? "danger" : "success"}> {service.criticalCount + service.highCount + service.lowCount + service.mediumCount} issues</MDBBadge> 
                                                <p className='text-dark font-weight-bold' style={{ fontSize: "15px", marginBlockEnd: "0px" }}>{service.name.replace("_", " ")}</p>
                                                {/* <p className='text-dark' style={{ fontSize: "12px", marginLeft: "10px" }}>{service.totalAvailable} available</p> */}
                                                <span style={{ fontSize: "12px", color: "#0784eb", fontWeight: 600 }}>{ service.totalAvailable} available</span>
                                               <br />
                                                {/* <span style={{ fontSize: "12px", color: "#dc3912", fontWeight: 600 }}>{service.criticalCount} critical issues</span> */}
                                                {/* <br /> */}
                                            </MDBCol>
                                        </MDBRow>
                                    </MDBCol>
                                    <MDBCol sm="1" md="1" lg="1" ></MDBCol>
                                </>
                            )
                        }
                        {/* <img className="alignleft" src={"https://cdn.mindmajix.com/blog/images/aws-" + service.name.split("_")[0].toLowerCase() + "-010621.webp"} alt="Amazon S3" width={"40vw"} /> */}
                    </MDBRow>
                </div>
            </MDBContainer>
        </>
    )
}