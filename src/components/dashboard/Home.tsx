import React, { useState, useEffect, useLayoutEffect } from "react";
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
    MDBListGroup,
    MDBListGroupItem,
    MDBView,
    MDBMask,
    MDBNotification,
    MDBBadge,
    MDBCardFooter,
    MDBCardGroup,
    MDBNav,
    MDBNavLink,
    MDBNavItem,
    MDBTabContent,
    MDBTabPane,
    MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem

} from "mdbreact";
import { MDBPopover, MDBPopoverBody, MDBPopoverHeader } from 'mdb-react-ui-kit';
import { useHistory } from "react-router";
import "./style.css"
import Charts from "react-apexcharts";
import { Chart } from "../common/VulnChart"
import { CategoryChart } from "../common/VulnCatChart"
import { OrgChart } from "../common/OrgChart"
import { GradeChart } from "../common/GradeChart"
import { fetchData } from '../../services/apiConfig'
import { TimeSeries } from '../common/TimeSeries'
export const Home = (props: any) => {
    const [pentestSeries, setpentestSeries] = useState([])
    const [domainSeries, setdomainSeries] = useState([])
    const [servicesSeries, setservicesSeries] = useState([])
    const [pentestSeriesCategory, setpentestSeriesCategory] = useState([])
    const [domainsSeriesCategory, setdomainsSeriesCategory] = useState([])
    const [servicesSeriesCategory, setservicesSeriesCategory] = useState([])
    const [pentestSeriesCategoryCount, setpentestSeriesCategoryCount] = useState([])
    const [domiansSeriesCategoryCount, setdomiansSeriesCategoryCount] = useState([])
    const [servicesSeriesCategoryCount, setservicesSeriesCategoryCount] = useState([])
    const [activeItem, setactiveItem] = useState("1")
    const [signature, setSignature] = useState('');
    const token = localStorage.getItem("token");
    const [domains, setDomain] = useState({
        availableDomains: 3,
        lastSynced: "July 02 2021, 20:57:13",
        nonReachableDomains: 1,
        domains: [],
        reachableDomains: 2
    });
    const [assets, setAssets] = useState({account: "9911213560",
    accountName: "9911213560@delhivery-prod",
    domains: {totalDomains: 3, misconfiguredDomains: 1, totalMisconfigurations: 273, critical: 2, high: 0, low: 269, medium: 0},
    lastSynced: "July 02 2021, 20:57:13",
    services: {totalDomains: 3, misconfiguredDomains: 1, totalMisconfigurations: 273, critical: 2, high: 0, low: 269, medium: 0}});

console.log(props)

    useEffect(() => {
        fetchData('domain', 'GET', "?accountName=" + props.Kpi.metrics.domains.defaultAccount).then((res: any) => {
            console.log(res)
            setDomain(res)
        })
        fetchData('asset', 'GET').then((res: any) => {
            setAssets(res)
        })
        let pentestSeries: any;
        let domainSeries: any;
        let servicesSeries: any;

        let pentestSeriesCategory: any;
        let pentestSeriesCategoryCount: any;

        let domainsSeriesCategory: any;
        let domiansSeriesCategoryCount: any;

        let servicesSeriesCategory: any;
        let servicesSeriesCategoryCount: any;

        if (props.Kpi.metrics.vapt.count !== undefined) {
            pentestSeries = [props.Kpi.metrics.vapt.count.criticalCount, props.Kpi.metrics.vapt.count.highCount, props.Kpi.metrics.vapt.count.mediumCount, props.Kpi.metrics.vapt.count.lowCount]
            setpentestSeries(pentestSeries)
            let sortable: any = [];
            for (const [key, value] of Object.entries(props.Kpi.metrics.vapt.categories)) {
                sortable.push([key, value]);
            }
            sortable = sortable.sort((a: any, b: any) => {
                return b[1] - a[1];
            });
            if (sortable.length > 0) {
                pentestSeriesCategory = [(sortable[0] as any)[0], (sortable[1] as any)[0], (sortable[2] as any)[0]];
                setpentestSeriesCategory(pentestSeriesCategory);
                pentestSeriesCategoryCount = [(sortable[0] as any)[1], (sortable[1] as any)[1], (sortable[2] as any)[1]];
                setpentestSeriesCategoryCount(pentestSeriesCategoryCount);
            }
        }
        if (props.Kpi.metrics.domains.count !== undefined) {
            domainSeries = [props.Kpi.metrics.domains.count.criticalCount, props.Kpi.metrics.domains.count.highCount, props.Kpi.metrics.domains.count.mediumCount, props.Kpi.metrics.domains.count.lowCount]
            setdomainSeries(domainSeries)
            let sortableDomains: any = [];
            for (const [key, value] of Object.entries(props.Kpi.metrics.domains.categories)) {
                sortableDomains.push([key, value]);
            }
            sortableDomains.sort((a: any, b: any) => {
                return b[1] - a[1];
            });
            domainsSeriesCategory = [(sortableDomains[0] as any)[0], (sortableDomains[1] as any)[0], (sortableDomains[2] as any)[0]];
            setdomainsSeriesCategory(domainsSeriesCategory);
            domiansSeriesCategoryCount = [(sortableDomains[0] as any)[1], (sortableDomains[1] as any)[1], (sortableDomains[2] as any)[1]];
            setdomiansSeriesCategoryCount(domiansSeriesCategoryCount);

        }
        if (props.Kpi.metrics.services.count !== undefined) {
            servicesSeries = [props.Kpi.metrics.services.count.criticalCount, props.Kpi.metrics.services.count.highCount, props.Kpi.metrics.services.count.mediumCount, props.Kpi.metrics.services.count.lowCount]
            setservicesSeries(servicesSeries)
            let sortableServices: any = [];
            for (const [key, value] of Object.entries(props.Kpi.metrics.services.categories)) {
                sortableServices.push([key, value]);
            }
            sortableServices.sort((a: any, b: any) => {
                return b[1] - a[1];
            });
            servicesSeriesCategory = [(sortableServices[0] as any)[0], (sortableServices[1] as any)[0], (sortableServices[2] as any)[0]];
            setservicesSeriesCategory(servicesSeriesCategory);
            servicesSeriesCategoryCount = [(sortableServices[0] as any)[1], (sortableServices[1] as any)[1], (sortableServices[2] as any)[1]];
            setservicesSeriesCategoryCount(servicesSeriesCategoryCount);
        }
    }, [props]);


    const toggle = (e: any, activeTab: any) => {
        console.log(e);
        console.log(activeTab)
        setactiveItem(activeTab)
    }

    if (signature === '0' || token === null || token === undefined || token === 'undefined' || token.length < 0) {
        return <Redirect to={{
            pathname: '/login',
        }} />
    }
    return (
        <>
            <MDBContainer fluid className="pt-5 pb-5" style={{ padding: "20px" }}>
                <MDBRow >
                    <MDBCol sm="12" md="6" lg="6">
                        <h4 style={{ fontWeight: 900, fontSize: "1.6rem", marginLeft: "15px", }}>Welcome back,&nbsp;<span style={{ fontWeight: 200 }}>{(localStorage.getItem("username") as any).toUpperCase()}! </span></h4>
                        <p style={{ fontSize: "11px", marginLeft: "20px", color: "darkgray" }}>Last Login 4:20 AM 11th March 2022</p>

                    </MDBCol>

                    <MDBCol sm="12" md="6" lg="6">
                        <MDBIcon className="float-right" fas icon="ellipsis-v" style={{ padding: "15px" }} />
                        <MDBBtn className="float-right" disabled
                            color="dark"
                            style={{ border: "2px solid blue-grey", borderRadius: "10px" }}>Export Summary&nbsp;&nbsp;
                            <MDBIcon fas icon="book-open" style={{ fontSize: "15px", marginLeft: "3px" }} />
                        </MDBBtn>
                    </MDBCol>


                </MDBRow>
                <hr style={{ margin: "0px 0px 20px 0px" }} />
                {props.iswatcher === true ?
                    <MDBRow>
                        <MDBCol sm="12" md="12" lg="6">
                            {/* <>
                                <div className="ptest">
                                    <MDBRow >
                                        <MDBCol sm="4" md="4" lg="4">
                                            <OrgChart />
                                        </MDBCol>
                                        <MDBCol sm="8" md="8" lg="8">
                                            <div className="gradechart" style={{ display: "inline-flex", minHeight: "130px" }}>
                                                <GradeChart title={"Assets grade"} value={100} />
                                                <GradeChart title={"Domains grade"} value={70} offsetX={-50} />
                                            </div>

                                        </MDBCol>
                                    </MDBRow>
                                </div>
                            </>
                            <br /> */}
                            <>
                                <div className="ptest" style={{ border: "1px solid rgb(237, 237, 239)" }} >
                                    <h6 className="st" style={{ fontWeight: 800, backgroundColor: "rgb(237, 237, 239)" }}>Risk over time
                                    </h6>

                                    <MDBView style={{ border: "1px solid #fff" }}>
                                        <MDBRow
                                            style={{ opacity: 0.5 }}
                                        >
                                            <MDBCol sm="12" md="12" lg="12">
                                            <TimeSeries />
                                        </MDBCol>
                                        </MDBRow>
                                        <MDBMask overlay="white-strong" >
                                            <p><MDBIcon style={{ color: "#2bbbad", cursor: "pointer", fontSize: "25px", padding: "2px" }} size="1x" icon="lock" /></p>
                                        </MDBMask>
                                    </MDBView>
                                    
                                </div>

                            </>
                            <br />

                            <>
                                <div className="ptest" style={{ cursor: "pointer", border: "1px solid rgb(237, 237, 239)" }} >
                                    <h6 className="st" style={{ fontWeight: 800, cursor: "pointer" }}>
                                        <span onClick={() => { props.SwitchView('domains') }}>Domains</span>
                                        {/* <MDBIcon className="float-right" style={{ padding: "0px 5px 0px 10px", fontSize: "13px" }} fas icon="ellipsis-v" /> */}
                                        <MDBIcon fas icon="arrows-alt" onClick={() => { props.SwitchView('domains') }} style={{ fontSize: "13px", marginLeft: "10px", float: "right" }} >&nbsp;&nbsp;
                                        <span style={{ fontWeight: 500 }}>Show Details&nbsp;&nbsp;</span></MDBIcon>
                                    </h6>

                                    <p className="mt-2">
                                            <br />
                                            <MDBRow style={{ padding: "0px 20px" }}>
                                                <MDBCol onClick={() => { props.SwitchView('domains') }} xs="4" sm="4" md="4" lg="4" style={{ display: "grid" }}>
                                                    <div style={{ display: "-webkit-inline-box" }}>
                                                        <MDBIcon style={{ backgroundColor: "#ff8c00", fontSize: "15px", color: "white" }}
                                                            icon="check" />
                                                        <p style={{ fontSize: "12px", marginLeft: "10px" }}> <span style={{ fontSize: "15px", fontWeight: "bold" }}> {domains.availableDomains}</span> <br /> available domains</p>
                                                    </div>
                                                    <div style={{ display: "-webkit-inline-box" }}>
                                                        <MDBIcon style={{ backgroundColor: "#008450", fontSize: "20px", color: "white" }}
                                                            icon="check-double" />
                                                        <p style={{ fontSize: "12px", marginLeft: "10px" }}> <span style={{ fontSize: "15px", fontWeight: "bold" }}> {domains.reachableDomains}</span> <br /> running domains</p>
                                                    </div>
                                                    <div style={{ display: "-webkit-inline-box" }}>
                                                        <MDBIcon style={{ backgroundColor: "#dc3912", fontSize: "20px", color: "white" }}
                                                            icon="exclamation-triangle" />
                                                        <p style={{ fontSize: "12px", marginLeft: "10px" }}> <span style={{ fontSize: "15px", fontWeight: "bold" }}> {domains.nonReachableDomains}</span> <br /> unreachable domains</p>
                                                    </div>
                                                </MDBCol>
                                                <MDBCol xs="1" sm="1" md="1" lg="1" ></MDBCol>
                                                <MDBCol xs="7" sm="7" md="7" lg="7" style={{ display: "grid" }}>
                                                    <MDBBadge onClick={() => { props.SwitchView('domains') }} className="domainissues" style={{ maxHeight: "60px" }}>
                                                        <p style={{ marginTop: "15px", fontSize: "15px", color: "red" }}><span style={{ color: "red", fontWeight: 700, fontSize: "20px" }}> {assets.domains.totalMisconfigurations} </span> &nbsp;&nbsp; ongoing issues</p>
                                                    </MDBBadge>
                                                    <MDBBadge onClick={() => { props.SwitchView('domains') }} className="domainissues" style={{ marginTop: "20px", maxHeight: "60px" }}>
                                                        <p style={{ marginTop: "15px",  fontSize: "15px", color: "green" }}><span style={{ color: "green", fontWeight: 700, fontSize: "20px" }}> 0 </span> &nbsp;&nbsp; resolved issues </p>
                                                    </MDBBadge>
                                                </MDBCol>
                                            </MDBRow>
                                        </p>
                                    <br />
                                </div>
                            </>
                            <br />
                            <>
                                <div className="ptest" style={{ cursor: "pointer", border: "1px solid rgb(237, 237, 239)" }} >
                                    <h6 onClick={() => { props.SwitchView('scmwatcher') }}  className="st" style={{ fontWeight: 900, cursor: "pointer" , margin: "0px"}}>
                                        <span style={{color: "black"}}>SCM WATCHER</span>
                                        {/* <MDBIcon className="float-right" style={{ padding: "0px 5px 0px 10px", fontSize: "18px" }} icon="info-circle" /> */}
                                        {/* <MDBIcon className="float-right" style={{ padding: "0px 5px 0px 10px", fontSize: "13px" }} fas icon="ellipsis-v" /> */}
                                        {/* <MDBIcon fas icon="arrows-alt" onClick={() => { props.SwitchView('pentest') }} style={{ fontSize: "13px", marginLeft: "10px", float: "right" }} >&nbsp;&nbsp; */}
                                        {/* <span style={{ fontWeight: 500 }}>Show Details&nbsp;&nbsp;</span></MDBIcon> */}
                                    </h6>
                                    <p style={{margin: "0px", minHeight: "19.5vh", backgroundColor: "#1B1C1E"}}>
                                    <div style={{ padding: "15px", opacity: 0.15 }}>
                                        <MDBCardGroup deck>
                                            <MDBCard>
                                                <MDBCardBody>
                                                    <MDBCardTitle tag="h7" style={{ color: "white" }}><span style={{ color: "indianred", fontWeight: 700, fontSize: "27px" }}> 13</span> <br /> Code leaks</MDBCardTitle>
                                                </MDBCardBody>
                                            </MDBCard>
                                            <MDBCard>
                                                <MDBCardBody className="text-danger">
                                                    <MDBCardTitle tag="h7" style={{ color: "white" }}><span style={{ color: "indianred", fontWeight: 700, fontSize: "27px" }}> 5</span> <br />  Documents</MDBCardTitle>
                                                </MDBCardBody>
                                            </MDBCard>
                                            <MDBCard>
                                                <MDBCardBody className="text-danger">
                                                    <MDBCardTitle tag="h7" style={{ color: "white" }}><span style={{ color: "indianred", fontWeight: 700, fontSize: "27px" }}> 12</span> <br />  Public board</MDBCardTitle>
                                                </MDBCardBody>
                                            </MDBCard>
                                        </MDBCardGroup>
                                    </div>
                                    <br />
                                </p>
                                  <div style={{marginTop: "-16vh", color: "white", fontWeight: 400, fontSize: "13px"}}>
                                        <p style={{textAlign: "center"}}><MDBIcon fas icon="lock" style={{fontSize: "25px"}} /></p>
                                    
                                        <p style={{textAlign: "center"}}>This tool is used to monitor your public forums for any leaks</p>
                                        <p style={{textAlign: "center"}}> <MDBBtn className="saleButton" onClick={() => { props.SwitchView('scmwatcher') }}
                                                style={{ border: "2px solid blue-grey", borderRadius: "10px", fontWeight: 700, fontSize: "17px"}}>Know more
                                        </MDBBtn> </p>
                                 </div>
                                  
                                    <br />
                                </div>
                            </>
                        </MDBCol>
                        <MDBCol sm="12" md="12" lg="6">
                            {props.isvapt ?
                                <div className="ptest" style={{ cursor: "pointer", border: "1px solid #ededef" }} >
                                    <h6 onClick={() => { props.SwitchView('pentest') }} className="st" style={{ fontWeight: 800, cursor: "pointer" }}>
                                        <span >Vulnerability Assessment</span>
                                        {/* <MDBIcon className="float-right" style={{ padding: "0px 5px 0px 10px", fontSize: "13px" }} fas icon="ellipsis-v" /> */}
                                        <MDBIcon fas icon="arrows-alt" onClick={() => { props.SwitchView('pentest') }} style={{ fontSize: "13px", marginLeft: "10px", float: "right" }} >&nbsp;&nbsp;
                                        <span style={{ fontWeight: 500 }}>Show Details&nbsp;&nbsp;</span></MDBIcon>
                                    </h6>
                                   
                                    <MDBRow>
                                        <MDBCol sm="6" md="6" lg="6">
                                            <Chart series={pentestSeries} width={250} height={150} /> </MDBCol>
                                        {(pentestSeriesCategoryCount.length > 0) ?
                                            <MDBCol sm="6" md="6" lg="6">
                                                <CategoryChart series={pentestSeriesCategoryCount} category={pentestSeriesCategory} width={350} height={200} /></MDBCol> : <></>}
                                    </MDBRow>
                                </div>
                                :
                                <div className="ptest" style={{ cursor: "pointer" }}>
                                    <h6 className="st" style={{ fontWeight: 800, cursor: "pointer" }}>
                                        <span >Vulnerability Assessment</span>
                                        {/* <MDBIcon className="float-right" style={{ padding: "0px 5px 0px 10px", fontSize: "13px" }} fas icon="ellipsis-v" /> */}
                                        {/* <MDBIcon fas icon="arrows-alt" onClick={() => { props.SwitchView('pentest') }} style={{ fontSize: "13px", marginLeft: "10px", float: "right" }} >&nbsp;&nbsp; */}
                                        {/* <span style={{ fontWeight: 500 }}>Show Details&nbsp;&nbsp;</span></MDBIcon> */}
                                    </h6>
                                   

                                    <MDBView style={{ border: "1px solid #fff" }}>
                                        <MDBRow
                                            style={{ opacity: 0.4 }}
                                        >
                                            <MDBCol sm="6" md="6" lg="6"><Chart
                                                // color={['#808080', '#818589', '#71797E', '#899499']}
                                                width={250} height={150} series={[6, 23, 14, 21]} /></MDBCol>
                                            <MDBCol sm="6" md="6" lg="6">  <CategoryChart
                                                // color={['#808080', '#818589', '#71797E', '#899499']}
                                                series={[5, 3, 3]} width={350} height={200}/></MDBCol>
                                        </MDBRow>
                                        {/* <br /><br /> */}
                                        <MDBMask overlay="white-strong" >
                                            <p><MDBIcon style={{ color: "#2bbbad", cursor: "pointer", fontSize: "25px", padding: "2px" }} size="1x" icon="lock" /></p>
                                        </MDBMask>
                                    </MDBView>
                                </div>
                            }
                            <br />

                            <div className="ptest" style={{ cursor: "pointer", border: "1px solid rgb(237, 237, 239)", padding: "0px" }}>
                            <h6 onClick={() => { props.SwitchView('services') }} className="st" style={{ fontWeight: 800, cursor: "pointer" }}>
                                        <span  >Cloud services</span>
                                        {/* <MDBIcon className="float-right" style={{ padding: "0px 5px 0px 10px", fontSize: "13px" }} fas icon="ellipsis-v" /> */}
                                        <MDBIcon fas icon="arrows-alt" onClick={() => { props.SwitchView('services') }} style={{ fontSize: "13px", marginLeft: "10px", float: "right" }} >&nbsp;&nbsp;
                                        <span style={{ fontWeight: 500 }}>Show Details&nbsp;&nbsp;</span></MDBIcon>
                                    </h6>
                                    <p className="mt-2">
                                            <MDBRow>
                                                <MDBCol sm="6" md="6" lg="6">
                                                    <Chart series={servicesSeries}
                                                        color={['#0f3c4c', '#1e7898', '#2596be', '#7cc0d8']} width={250} height={150} />
                                                </MDBCol>
                                                <MDBCol sm="6" md="6" lg="6">  <CategoryChart
                                                    series={servicesSeriesCategoryCount} category={servicesSeriesCategory}
                                                    color={['#0f3c4c', '#1e7898', '#2596be', '#7cc0d8']}
                                                    width={350} height={200}
                                                /></MDBCol>
                                            </MDBRow>
                                        </p>
                                {/* <MDBNav className="nav-tabs" style={{ fontWeight: 800, backgroundColor: "rgb(237, 237, 239)" }}>

                                    <MDBNavItem style={{ padding: "0px", maxHeight: "45px" }}>
                                        <MDBNavLink link to="#" active={activeItem === "1"} onClick={(e: any) => toggle(e, "1")} role="tab" style={{ maxHeight: "45px" }}>
                                            <p style={{ fontWeight: 800, fontSize: "15px", color: "black" }}>Cloud Services</p>
                                        </MDBNavLink>
                                    </MDBNavItem>
                                    <MDBNavItem style={{ padding: "0px" }}>
                                        <MDBNavLink link to="#" active={activeItem === "2"} onClick={(e: any) => toggle(e, "2")} role="tab" style={{ maxHeight: "45px" }}>
                                            <p style={{ fontWeight: 800, fontSize: "15px", color: "black" }}>Organization Domains</p>
                                        </MDBNavLink>
                                    </MDBNavItem>

                                </MDBNav> */}
                                {/* <MDBTabContent activeItem={activeItem} >

                                    <MDBTabPane tabId="1" role="tabpanel">
                                        <p className="mt-2">
                                            <MDBRow>
                                                <MDBCol sm="6" md="6" lg="6">
                                                    <Chart series={servicesSeries}
                                                        color={['#0f3c4c', '#1e7898', '#2596be', '#7cc0d8']} width={250} height={150} />
                                                </MDBCol>
                                                <MDBCol sm="6" md="6" lg="6">  <CategoryChart
                                                    series={servicesSeriesCategoryCount} category={servicesSeriesCategory}
                                                    color={['#0f3c4c', '#1e7898', '#2596be', '#7cc0d8']}
                                                    width={350} height={200}
                                                /></MDBCol>
                                            </MDBRow>
                                        </p>
                                    </MDBTabPane>

                                    <MDBTabPane tabId="2" role="tabpanel">
                                        <p className="mt-2">
                                            <br />
                                            <MDBRow style={{ padding: "0px 20px" }}>
                                                <MDBCol xs="4" sm="4" md="4" lg="4" style={{ display: "grid" }}>
                                                    <div style={{ display: "-webkit-inline-box" }}>
                                                        <MDBIcon style={{ backgroundColor: "#ff8c00", fontSize: "15px", color: "white" }}
                                                            icon="check" />
                                                        <p style={{ fontSize: "12px", marginLeft: "10px" }}> <span style={{ fontSize: "15px", fontWeight: "bold" }}> 5</span> <br /> available domains</p>
                                                    </div>
                                                    <div style={{ display: "-webkit-inline-box" }}>
                                                        <MDBIcon style={{ backgroundColor: "#008450", fontSize: "20px", color: "white" }}
                                                            icon="check-double" />
                                                        <p style={{ fontSize: "12px", marginLeft: "10px" }}> <span style={{ fontSize: "15px", fontWeight: "bold" }}> 4</span> <br /> running domains</p>
                                                    </div>
                                                    <div style={{ display: "-webkit-inline-box" }}>
                                                        <MDBIcon style={{ backgroundColor: "#dc3912", fontSize: "20px", color: "white" }}
                                                            icon="exclamation-triangle" />
                                                        <p style={{ fontSize: "12px", marginLeft: "10px" }}> <span style={{ fontSize: "15px", fontWeight: "bold" }}> 1</span> <br /> unreachable domains</p>
                                                    </div>
                                                </MDBCol>
                                                <MDBCol xs="1" sm="1" md="1" lg="1" ></MDBCol>
                                                <MDBCol xs="7" sm="7" md="7" lg="7" style={{ display: "grid" }}>
                                                    <MDBBadge className="domainissues" style={{ maxHeight: "60px" }}>
                                                        <p style={{ marginTop: "15px" }}><span style={{ color: "indianred", fontWeight: 700, fontSize: "20px" }}> 0 </span> &nbsp;&nbsp; ongoing issues</p>
                                                    </MDBBadge>
                                                    <MDBBadge className="domainissues" style={{ marginTop: "20px", maxHeight: "60px" }}>
                                                        <p style={{ marginTop: "15px" }}><span style={{ color: "rgba(0, 128, 55, 0.75)", fontWeight: 700, fontSize: "20px" }}> 120 </span> &nbsp;&nbsp; resolved issues </p>
                                                    </MDBBadge>
                                                </MDBCol>
                                            </MDBRow>
                                        </p>
                                    </MDBTabPane>
                                </MDBTabContent> */}
                            </div>
                            <br />
                            <>

                                <div className="ptest" style={{ cursor: "pointer", border: "1px solid lightgray" }}>
                                <h6 onClick={() => { props.SwitchView('darkeyewatcher') }} className="st" style={{ fontWeight: 900, cursor: "pointer", margin: "0px" }}>
                                        <span style={{color: "black"}}>DARK EYE WATCHER</span>
                                        {/* <MDBIcon className="float-right" style={{ padding: "0px 5px 0px 10px", fontSize: "18px" }} icon="info-circle" /> */}
                                      
                         


                                        {/* <MDBIcon fas icon="arrows-alt" onClick={() => { props.SwitchView('pentest') }} style={{ fontSize: "13px", marginLeft: "10px", float: "right" }} >&nbsp;&nbsp; */}
                                        {/* <span style={{ fontWeight: 500 }}>Show Details&nbsp;&nbsp;</span></MDBIcon> */}
                                </h6>
                               
                                <p style={{margin: "0px", minHeight: "19.5vh", backgroundColor: "#1B1C1E"}}>
                                    <div style={{ padding: "15px", opacity: 0.15 }}>
                                        <MDBCardGroup deck>
                                            <MDBCard>
                                                <MDBCardBody>
                                                    <MDBCardTitle tag="h7" style={{ color: "white" }}><span style={{ color: "indianred", fontWeight: 700, fontSize: "27px" }}> 9</span> <br /> Password leaks</MDBCardTitle>
                                                </MDBCardBody>
                                            </MDBCard>
                                            <MDBCard>
                                                <MDBCardBody className="text-danger">
                                                    <MDBCardTitle tag="h7" style={{ color: "white" }}><span style={{ color: "indianred", fontWeight: 700, fontSize: "27px" }}> 13</span> <br />  Cookie leaks</MDBCardTitle>
                                                </MDBCardBody>
                                            </MDBCard>
                                            <MDBCard>
                                                <MDBCardBody className="text-danger">
                                                    <MDBCardTitle tag="h7" style={{ color: "white" }}><span style={{ color: "indianred", fontWeight: 700, fontSize: "27px" }}> 6</span> <br />  P-II leaks</MDBCardTitle>
                                                </MDBCardBody>
                                            </MDBCard>
                                        </MDBCardGroup>
                                    </div>
                                    <br />
                                </p>
                                  <div style={{marginTop: "-16vh", color: "white", fontWeight: 400, fontSize: "13px"}}>
                                        <p style={{textAlign: "center"}}><MDBIcon fas icon="lock" style={{fontSize: "25px"}} /></p>
                                    
                                        <p style={{textAlign: "center"}}>This tool is used to monitor dark web for any leaks. </p>
                                        <p style={{textAlign: "center"}}> <MDBBtn className="saleButton" onClick={() => { props.SwitchView('darkeyewatcher') }}
                                                style={{ border: "2px solid blue-grey", borderRadius: "10px", fontWeight: 700, fontSize: "17px"}}>Know more
                                        </MDBBtn> </p>
                                 </div>
                                
                                </div>
                            </>
                        </MDBCol>
                    </MDBRow>
                    :
                    <MDBRow style={{ minHeight: "80vh" }}>
                        <MDBCol sm="12" md="12" lg="6">
                            <>
                                <h5 style={{ fontWeight: 800 }}>Organisation health<span className='text-light' style={{ fontSize: "9px", marginLeft: "10px", paddingTop: "10px" }}>Last synced on September 30 23:04</span></h5>
                                <p style={{ fontSize: "12px", paddingTop: "8px" }}>This pentest is an authorized simulated cyberattack authorized simulated cyberattack on the primary service of the organisation,
                                performed to evaluate the security of the system by identifying vulnerabilities enabling a full risk assessment to be completed.
                                </p>
                                <br />
                                <MDBView >
                                    <MDBRow style={{ opacity: 0.4 }}>
                                        <MDBCol sm="12" md="12" lg="4">
                                            <OrgChart color={['#808080']} />
                                        </MDBCol>
                                        <MDBCol sm="12" md="12" lg="8">
                                            <div className="gradechart" style={{ display: "inline-flex", minHeight: "130px" }}>
                                                <GradeChart color={['#808080']} title={"Assets grade"} value={90} />
                                                <GradeChart color={['#808080']} title={"Domains grade"} value={70} offsetX={-50} />
                                            </div>

                                        </MDBCol>
                                    </MDBRow>
                                    <MDBMask overlay="white-light">
                                        <p><MDBIcon style={{ color: "#2bbbad", cursor: "pointer" }} size="1x" icon="lock" >
                                        </MDBIcon></p>
                                    </MDBMask>
                                </MDBView>
                            </>
                            <br />   <br /><br /><br />
                            <>
                                <MDBRow >
                                    <MDBCol sm="12" md="12" lg="12" style={{ border: "1px solid #fff" }}>

                                        <>
                                            <div className="ptest" style={{ cursor: "pointer" }} onClick={() => {
                                                props.SwitchView('pentest')
                                            }}>
                                                <h6 style={{ fontWeight: 800, }}>Organization Domains</h6>
                                                <p style={{ fontSize: "12px" }}>Watcher checks on all your domains, monitors organisation assets at scale,
                                                regularly checks for misconfigurations for potential hacks and exploits.
                                                 </p>
                                                <MDBView style={{ border: "1px solid #fff" }}>
                                                    <MDBRow
                                                        style={{ opacity: 0.4 }}
                                                    >
                                                        <MDBCol sm="12" md="12" lg="6"><Chart
                                                            color={['#808080', '#818589', '#71797E', '#899499']}
                                                            width={250} height={150} series={[5, 13, 2, 12]} /></MDBCol>
                                                        <MDBCol sm="12" md="12" lg="6">  <CategoryChart
                                                            color={['#808080', '#818589', '#71797E', '#899499']}
                                                            series={[8, 13, 12]} /></MDBCol>
                                                    </MDBRow>
                                                    <br />
                                                    <MDBMask overlay="white-strong" >
                                                        <p><MDBIcon style={{ color: "#2bbbad", cursor: "pointer" }} size="1x" icon="lock" /></p>
                                                    </MDBMask>
                                                </MDBView>
                                            </div>
                                        </>
                                    </MDBCol>
                                </MDBRow>
                            </>
                        </MDBCol>
                        <MDBCol sm="12" md="12" lg="6">
                            {props.isvapt ? <div className="ptest" style={{ cursor: "pointer", border: "1px solid #ededef" }} onClick={() => {
                                props.SwitchView('pentest')
                            }}>
                                <h6 className="st" style={{ fontWeight: 800, cursor: "pointer" }}>Vulnerability Assessment
                            <MDBIcon icon="angle-double-right" style={{ fontSize: "15px", marginLeft: "10px", float: "right" }} />
                                </h6>
                                <p style={{ fontSize: "12px", paddingLeft: "10px" }}>This pentest is an authorized simulated cyberattack on the primary service of the organisation,
                                performed to evaluate the security of the system by identifying vulnerabilities enabling a full risk assessment to be completed.
                        </p>
                                <MDBRow>
                                    <MDBCol sm="12" md="12" lg="6"><Chart series={pentestSeries} width={250} height={150} /> </MDBCol>
                                    {(pentestSeriesCategoryCount.length > 0) ? <MDBCol sm="12" md="12" lg="6">   <CategoryChart series={pentestSeriesCategoryCount} category={pentestSeriesCategory} /></MDBCol> : <></>}
                                </MDBRow>
                                <br />
                            </div> :
                                <div className="ptest" style={{ cursor: "pointer" }} onClick={() => {
                                    props.SwitchView('pentest')
                                }}>
                                    <h6 style={{ fontWeight: 800 }}>Vulnerability Assessment</h6>
                                    <p style={{ fontSize: "12px" }}>This pentest is an authorized simulated cyberattack on the primary service of the organisation,
                                    performed to evaluate the security of the system by identifying vulnerabilities enabling a full risk assessment to be completed.
                                    </p>

                                    <MDBView style={{ border: "1px solid #fff" }}>
                                        <MDBRow
                                            style={{ opacity: 0.4 }}
                                        >
                                            <MDBCol sm="12" md="12" lg="6"><Chart
                                                color={['#808080', '#818589', '#71797E', '#899499']}
                                                width={250} height={150} series={[6, 23, 14, 21]} /></MDBCol>
                                            <MDBCol sm="12" md="12" lg="6">  <CategoryChart
                                                color={['#808080', '#818589', '#71797E', '#899499']}
                                                series={[5, 3, 3]} /></MDBCol>
                                        </MDBRow>
                                        <br />
                                        <MDBMask overlay="white-strong" >
                                            <p><MDBIcon style={{ color: "#2bbbad", cursor: "pointer" }} size="1x" icon="lock" /></p>
                                        </MDBMask>
                                    </MDBView>
                                </div>
                            }
                            <br /><br />
                            <>
                                <div className="ptest" style={{ cursor: "pointer" }} onClick={() => {
                                    props.SwitchView('pentest')
                                }}>
                                    <h6 style={{ fontWeight: 800 }}>Cloud Services</h6>
                                    <p style={{ fontSize: "12px" }}>Watcher keeps eye on all your cloud services, monitors organisation assets at scale,
                                    regularly checks for misconfigurations for potential hacks and exploits.
                        </p>

                                    <MDBView style={{ border: "1px solid #fff" }}>
                                        <MDBRow
                                            style={{ opacity: 0.4 }}
                                        >
                                            <MDBCol sm="12" md="12" lg="6"><Chart
                                                color={['#808080', '#818589', '#71797E', '#899499']}
                                                width={250} height={150} series={[6, 23, 14, 21]} /></MDBCol>
                                            <MDBCol sm="12" md="12" lg="6">  <CategoryChart
                                                color={['#808080', '#818589', '#71797E', '#899499']}
                                                series={[5, 3, 3]} /></MDBCol>
                                        </MDBRow>
                                        <br />
                                        <MDBMask overlay="white-strong" >
                                            <p><MDBIcon style={{ color: "#2bbbad", cursor: "pointer" }} size="1x" icon="lock" /></p>
                                        </MDBMask>
                                    </MDBView>
                                </div>
                            </>
                            <br /><br />
                        </MDBCol>
                    </MDBRow>
                }
            </MDBContainer>
        </>
    )
}