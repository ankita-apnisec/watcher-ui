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
    MDBNotification
} from "mdbreact";
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
    const [dashboardKPI, setDashboardKPI] = useState({ "trial_days_remaining": 15, "metrics": { "vapt": { "categories": {}, "count": { criticalCount: 0, highCount: 0, mediumCount: 0, lowCount: 0 } } } });
    const [pentestSeries, setpentestSeries] = useState([])
    const [pentestSeriesCategory, setpentestSeriesCategory] = useState([])
    const [pentestSeriesCategoryCount, setpentestSeriesCategoryCount] = useState([])
    const [signature, setSignature] = useState('');
    const token = localStorage.getItem("token");
    useEffect(() => {
        let pentestSeries: any;
        let pentestSeriesCategory: any;
        let pentestSeriesCategoryCount: any;
        fetchData('dashboard', 'GET').then((res: any) => {
            setDashboardKPI(res);

            if (res.message) {
                if (res.message.indexOf("Error") !== -1) {
                    localStorage.clear();
                    setSignature('0')
                }
            }
            else if (JSON.stringify(res) !== JSON.stringify(props.Kpi)) {
                setDashboardKPI(res);
                if (res.metrics.vapt !== undefined) {
                    if (res.metrics.vapt.categories !== undefined) {
                        pentestSeries = [res.metrics.vapt.count.criticalCount, res.metrics.vapt.count.highCount, res.metrics.vapt.count.mediumCount, res.metrics.vapt.count.lowCount]
                        setpentestSeries(pentestSeries)
                        let sortable: any = [];
                        for (const [key, value] of Object.entries(res.metrics.vapt.categories)) {
                            sortable.push([key, value]);
                        }
                        sortable.sort((a: any, b: any) => {
                            return b[1] - a[1];
                        });
                        pentestSeriesCategory = [(sortable[0] as any)[0], (sortable[1] as any)[0], (sortable[2] as any)[0]];
                        setpentestSeriesCategory(pentestSeriesCategory);
                        pentestSeriesCategoryCount = [(sortable[0] as any)[1], (sortable[1] as any)[1], (sortable[2] as any)[1]];
                        setpentestSeriesCategoryCount(pentestSeriesCategoryCount);
                    }
                }
            } else {
                if (props.Kpi.metrics.vapt !== undefined) {
                    if (props.Kpi.metrics.vapt.categories !== undefined) {
                        pentestSeries = [props.Kpi.metrics.vapt.count.criticalCount, props.Kpi.metrics.vapt.count.highCount, props.Kpi.metrics.vapt.count.mediumCount, props.Kpi.metrics.vapt.count.lowCount]
                        setpentestSeries(pentestSeries)
                        let sortable: any = [];
                        for (const [key, value] of Object.entries(props.Kpi.metrics.vapt.categories)) {
                            sortable.push([key, value]);
                        }
                        sortable.sort((a: any, b: any) => {
                            return b[1] - a[1];
                        });
                        pentestSeriesCategory = [(sortable[0] as any)[0], (sortable[1] as any)[0], (sortable[2] as any)[0]];
                        setpentestSeriesCategory(pentestSeriesCategory);
                        pentestSeriesCategoryCount = [(sortable[0] as any)[1], (sortable[1] as any)[1], (sortable[2] as any)[1]];
                        setpentestSeriesCategoryCount(pentestSeriesCategoryCount);
                    }
                }
            }
        })
    }, [props]);

    if (signature === '0' || token === null || token === undefined || token === 'undefined' || token.length < 0) {
        return <Redirect to={{
            pathname: '/login',
        }} />
    }
    return (
        <>
            <MDBContainer fluid className="pt-5 pb-5" style={{ padding: "2vw" }}>
            {/* <MDBRow style={{ minHeight: "80vh" }}>

                    <MDBCol sm="6" md="6" lg="6">
                        <>
                            <h5 style={{ fontWeight: 800 }}>Organisation health<span className='text-light' style={{ fontSize: "9px", marginLeft: "10px", paddingTop: "10px" }}>Last synced on September 10 23:04</span></h5>
                            <MDBRow >
                                <MDBCol sm="12" md="12" lg="4">
                                    <OrgChart />
                                </MDBCol>
                                <MDBCol sm="12" md="12" lg="8">
                                    <div className="gradechart" style={{ display: "inline-flex", minHeight: "130px" }}>
                                        <GradeChart title={"Assets grade"} value={90} />
                                        <GradeChart title={"Domains grade"} value={70} offsetX={-50} />
                                    </div>

                                </MDBCol>
                            </MDBRow>
                        </>
                        <br /> <br />
                        <>


                            <div className="ptest" style={{ cursor: "pointer" }} onClick={() => {
                                props.SwitchView('pentest')
                            }}>
                                <h6 style={{ fontWeight: 800, cursor: "pointer" }}>Risk over time
                                </h6>
                                <MDBRow>
                                    <TimeSeries />

                                </MDBRow>
                            </div>
                            <br />
                            <MDBRow >
                                <MDBCol sm="12" md="12" lg="12" style={{ border: "1px solid #fff"}}>
                                    <div className="ptest" style={{ cursor: "pointer", border: "1px solid #ededef", backgroundColor: "whiteSmoke"  }} onClick={() => {
                                        props.SwitchView('pentest')
                                    }}>

                                        <h6 style={{ fontWeight: 800, padding: "10px"}}>Alerts<span className='text-light' style={{ fontSize: "8px", marginLeft: "10px", paddingTop: "10px" }}>6 available</span></h6>

                                        <div style={{ maxHeight: "65vh", overflowY: "hidden", overflowX: "hidden" }}>
                                            <br />
                                            <MDBContainer>
                                                <MDBNotification
                                                    show
                                                    fade
                                                    icon="bell"
                                                    iconClassName="red-text"
                                                    className="notify"
                                                    title="SubDomain"
                                                    message="1 new issue [Cras mattis iudicium purus sit amet fermentum. Donec sed odio operae, eu vulputate felis rhoncus.]"
                                                    text="23 minutes ago"
                                                    style={{ maxWidth: "100vw !important" }}
                                                />
                                                <MDBNotification
                                                    show
                                                    fade
                                                    icon="bell"
                                                    iconClassName="blue-text"
                                                    className="notify"
                                                    title="Sensitive endpoint"
                                                    message="2 new misconfigurations [Cras mattis iudicium purus sit amet fermentum. Donec sed odio operae, eu vulputate felis rhoncus.]"
                                                    text="42 minutes ago"
                                                />
                                                <MDBNotification
                                                    show
                                                    fade
                                                    icon="bell"
                                                    iconClassName="blue-text"
                                                    className="notify"
                                                    title="Public GIT repo"
                                                    message="Alert! GIT repo public [Cras mattis iudicium purus sit amet fermentum. Donec sed odio operae, eu vulputate felis rhoncus.]"
                                                    text="56 minutes ago"
                                                />
                                                <MDBNotification
                                                    show
                                                    fade
                                                    icon="bell"
                                                    iconClassName="grey-text"
                                                    className="notify"
                                                    title="Public GIT repo"
                                                    message="Alert! GIT repo public [Cras mattis iudicium purus sit amet fermentum. Donec sed odio operae, eu vulputate felis rhoncus.]"
                                                    text="56 minutes ago"
                                                />
                                                <MDBNotification
                                                    show
                                                    fade
                                                    icon="bell"
                                                    iconClassName="grey-text"
                                                    className="notify"
                                                    title="Public GIT repo"
                                                    message="Alert! GIT repo public [Cras mattis iudicium purus sit amet fermentum. Donec sed odio operae, eu vulputate felis rhoncus.]"
                                                    text="56 minutes ago"
                                                />
                                                <MDBNotification
                                                    show
                                                    fade
                                                    icon="bell"
                                                    iconClassName="grey-text"
                                                    className="notify"
                                                    title="Public GIT repo"
                                                    message="Alert! GIT repo public [Cras mattis iudicium purus sit amet fermentum. Donec sed odio operae, eu vulputate felis rhoncus.]"
                                                    text="56 minutes ago"
                                                />
                                                <MDBNotification
                                                    show
                                                    fade
                                                    icon="bell"
                                                    iconClassName="grey-text"
                                                    className="notify"
                                                    title="Public GIT repo"
                                                    message="Alert! GIT repo public [Cras mattis iudicium purus sit amet fermentum. Donec sed odio operae, eu vulputate felis rhoncus.]"
                                                    text="56 minutes ago"
                                                />
                                            </MDBContainer>
                                        </div>
                                    </div>
                                </MDBCol>
                            </MDBRow>

                        </>
                    </MDBCol>
                    <MDBCol sm="6" md="6" lg="6">
                        <div className="ptest" style={{ cursor: "pointer", border: "1px solid #ededef" }} onClick={() => {
                            props.SwitchView('pentest')
                        }}>
                            <h6 className="st" style={{ fontWeight: 800, cursor: "pointer" }}>Vulnerability assessment
                            <MDBIcon icon="angle-double-right" style={{ fontSize: "15px", marginLeft: "10px", float: "right" }} />
                            </h6>
                            <p style={{ fontSize: "11px", padding: "10px" }}>This pentest is an authorized simulated cyberattack on the primary service of the organisation,
                            performed to evaluate the security of the system by identifying vulnerabilities enabling a full risk assessment to be completed.
                        </p>
                            <MDBRow>
                                <MDBCol sm="12" md="12" lg="6"><Chart series={pentestSeries} width={250} height={150} /> </MDBCol>
                                {(pentestSeriesCategoryCount.length > 0) ? <MDBCol sm="12" md="12" lg="6">   <CategoryChart series={pentestSeriesCategoryCount} category={pentestSeriesCategory} /></MDBCol> : <></>}
                            </MDBRow>
                        </div>
                        <br /><br />
                        <>
                            <div className="ptest" style={{ cursor: "pointer", border: "1px solid #ededef" }} onClick={() => {
                                props.SwitchView('pentest')
                            }}>
                                <h6 className="st" style={{ fontWeight: 800, backgroundColor: "mistyrose" }}>Risk by severity and category: Services</h6>
                                <p style={{ fontSize: "11px", padding: "10px" }}>Watcher keeps eye on all your cloud services, monitors organisation assets at scale,
                                regularly checks for misconfigurations for potential hacks and exploits.
                        </p>

                                <MDBRow
                                >
                                    <MDBCol sm="12" md="12" lg="6"><Chart
                                    color={['#6F4242','#A96E6E', '#856363', '#CFAFAF' ]} 
                                        width={250} height={150} series={[6, 23, 14, 21]} /></MDBCol>
                                    <MDBCol sm="12" md="12" lg="6">  <CategoryChart
                                    color={['#CFAFAF', '#A96E6E', '#6F4242']} 
                                        series={[5, 3, 3]} /></MDBCol>
                                </MDBRow>
                               
                            </div>
                        </>
                        <br /><br />
                        <>
                            <div className="ptest" style={{ cursor: "pointer", border: "1px solid #ededef" }} onClick={() => {
                                props.SwitchView('pentest')
                            }}>
                                <h6 className="st" style={{ fontWeight: 800, backgroundColor: "mistyrose" }}>Risk by severity and category: Domains</h6>
                                <p style={{ fontSize: "11px", padding: "10px" }}>Watcher checks on all your domains, monitors organisation assets at scale,
                                regularly checks for misconfigurations for potential hacks and exploits.
                        </p>
                                <MDBRow
                                >
                                    <MDBCol sm="12" md="12" lg="6"><Chart
                                        width={250} height={150} series={[8, 13, 2, 12]} /></MDBCol>
                                    <MDBCol sm="12" md="12" lg="6">  <CategoryChart
                                        series={[8, 13, 12]} /></MDBCol>
                                </MDBRow>
                               
                            </div>
                        </>
                    </MDBCol>
                </MDBRow>  */}



                {/* ---locked---- */}
                <MDBRow style={{ minHeight: "80vh" }}>

                    <MDBCol sm="6" md="6" lg="6">
                        <>
                            <h5 style={{ fontWeight: 800 }}>Organisation health<span className='text-light' style={{ fontSize: "9px", marginLeft: "10px", paddingTop: "10px" }}>Last synced on September 30 23:04</span></h5>
                            <MDBView >
                            <MDBRow  style={{ opacity: 0.4 }}>
                                <MDBCol sm="12" md="12" lg="4">
                                    <OrgChart color={['#808080']} />
                                </MDBCol>
                                <MDBCol sm="12" md="12" lg="8">
                                    <div className="gradechart" style={{ display: "inline-flex", minHeight: "130px" }}>
                                        <GradeChart  color={['#808080']}  title={"Assets grade"} value={90} />
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
                        <br />   <br />                      
                        <>

                            {/* 
                            <div className="ptest" style={{ cursor: "pointer" }} onClick={() => {
                                props.SwitchView('pentest')
                            }}>
                                <h6 style={{ fontWeight: 800, cursor: "pointer" }}>Risk over time
                                </h6>
                                <MDBView >
                                <br/>

                                <MDBRow>
                                    <TimeSeries color={["#787878", "#5a5a5a", "#a6a6a6"]}/>

                                </MDBRow>
                                <MDBMask overlay="white-light">
                                    <p><MDBIcon style={{ color: "#2bbbad", cursor: "pointer" }} size="1x" icon="lock" >
                                    </MDBIcon></p>
                                </MDBMask>
                            </MDBView>
                            </div> */}
                            {/* <br /> */}
                            <MDBRow >
                                <MDBCol sm="12" md="12" lg="12" style={{ border: "1px solid #fff"}}>
                                    <div className="ptest" style={{ cursor: "pointer" }} onClick={() => {
                                        props.SwitchView('pentest')
                                    }}>

                                        <h6 style={{ fontWeight: 800}}>Alerts<span className='text-light' style={{ fontSize: "8px", marginLeft: "10px", paddingTop: "10px" }}>6 available</span></h6>
                                        <MDBView >
                                        <div style={{ maxHeight: "65vh", overflowY: "hidden", overflowX: "hidden",  opacity: 0.4 }}>
                                            <br />
                                            <MDBContainer>
                                                <MDBNotification
                                                    show
                                                    fade
                                                    icon="bell"
                                                    iconClassName="grey-text"
                                                    className="notify"
                                                    title="SubDomain"
                                                    message="1 new issue [Cras mattis iudicium purus sit amet fermentum. Donec sed odio operae, eu vulputate felis rhoncus.]"
                                                    text="23 minutes ago"
                                                    style={{ maxWidth: "100vw !important" }}
                                                />
                                                <MDBNotification
                                                    show
                                                    fade
                                                    icon="bell"
                                                    iconClassName="grey-text"
                                                    className="notify"
                                                    title="Sensitive endpoint"
                                                    message="2 new misconfigurations [Cras mattis iudicium purus sit amet fermentum. Donec sed odio operae, eu vulputate felis rhoncus.]"
                                                    text="42 minutes ago"
                                                />
                                                <MDBNotification
                                                    show
                                                    fade
                                                    icon="bell"
                                                    iconClassName="grey-text"
                                                    className="notify"
                                                    title="Public GIT repo"
                                                    message="Alert! GIT repo public [Cras mattis iudicium purus sit amet fermentum. Donec sed odio operae, eu vulputate felis rhoncus.]"
                                                    text="56 minutes ago"
                                                />
                                                <MDBNotification
                                                    show
                                                    fade
                                                    icon="bell"
                                                    iconClassName="grey-text"
                                                    className="notify"
                                                    title="Public GIT repo"
                                                    message="Alert! GIT repo public [Cras mattis iudicium purus sit amet fermentum. Donec sed odio operae, eu vulputate felis rhoncus.]"
                                                    text="56 minutes ago"
                                                />
                                                <MDBNotification
                                                    show
                                                    fade
                                                    icon="bell"
                                                    iconClassName="grey-text"
                                                    className="notify"
                                                    title="Public GIT repo"
                                                    message="Alert! GIT repo public [Cras mattis iudicium purus sit amet fermentum. Donec sed odio operae, eu vulputate felis rhoncus.]"
                                                    text="56 minutes ago"
                                                />
                                                <MDBNotification
                                                    show
                                                    fade
                                                    icon="bell"
                                                    iconClassName="grey-text"
                                                    className="notify"
                                                    title="Public GIT repo"
                                                    message="Alert! GIT repo public [Cras mattis iudicium purus sit amet fermentum. Donec sed odio operae, eu vulputate felis rhoncus.]"
                                                    text="56 minutes ago"
                                                />
                                                <MDBNotification
                                                    show
                                                    fade
                                                    icon="bell"
                                                    iconClassName="grey-text"
                                                    className="notify"
                                                    title="Public GIT repo"
                                                    message="Alert! GIT repo public [Cras mattis iudicium purus sit amet fermentum. Donec sed odio operae, eu vulputate felis rhoncus.]"
                                                    text="56 minutes ago"
                                                />
                                            </MDBContainer>
                                        </div>
                                        <MDBMask overlay="white-light">
                                    <p><MDBIcon style={{ color: "#2bbbad", cursor: "pointer" }} size="1x" icon="lock" >
                                    </MDBIcon></p>
                                </MDBMask>
                            </MDBView>
                                    </div>
                                </MDBCol>
                            </MDBRow>

                        </>
                    </MDBCol>
                    <MDBCol sm="6" md="6" lg="6">
                        <div className="ptest" style={{ cursor: "pointer", border: "1px solid #ededef" }} onClick={() => {
                            props.SwitchView('pentest')
                        }}>
                            <h6 className="st" style={{ fontWeight: 800, cursor: "pointer" }}>Vulnerability Assessment
                            <MDBIcon icon="angle-double-right" style={{ fontSize: "15px", marginLeft: "10px", float: "right" }} />
                            </h6>
                            <p style={{ fontSize: "11px", padding: "10px" }}>This pentest is an authorized simulated cyberattack on the primary service of the organisation,
                            performed to evaluate the security of the system by identifying vulnerabilities enabling a full risk assessment to be completed.
                        </p>
                            <MDBRow>
                                <MDBCol sm="12" md="12" lg="6"><Chart series={pentestSeries} width={250} height={150} /> </MDBCol>
                                {(pentestSeriesCategoryCount.length > 0) ? <MDBCol sm="12" md="12" lg="6">   <CategoryChart series={pentestSeriesCategoryCount} category={pentestSeriesCategory} /></MDBCol> : <></>}
                            </MDBRow>
                        </div>
                        <br /><br />
                        <>
                            <div className="ptest" style={{ cursor: "pointer"}} onClick={() => {
                                props.SwitchView('pentest')
                            }}>
                                <h6 style={{ fontWeight: 800 }}>Risk by severity and category: Services</h6>
                                <p style={{ fontSize: "11px" }}>Watcher keeps eye on all your cloud services, monitors organisation assets at scale,
                                regularly checks for misconfigurations for potential hacks and exploits.
                        </p>

                                <MDBView style={{ border: "1px solid #fff" }}>
                                <MDBRow
                                style={{ opacity: 0.4 }}
                                >
                                    <MDBCol sm="12" md="12" lg="6"><Chart
                                        color={['#808080','#818589', '#71797E', '#899499' ]} 
                                        width={250} height={150} series={[6, 23, 14, 21]} /></MDBCol>
                                    <MDBCol sm="12" md="12" lg="6">  <CategoryChart
                                        color={['#808080','#818589', '#71797E', '#899499' ]}  
                                        series={[5, 3, 3]} /></MDBCol>
                                </MDBRow>
                                <MDBMask overlay="white-strong" >
                                    <p><MDBIcon style={{ color: "#2bbbad", cursor: "pointer" }} size="1x" icon="lock" /></p>
                                </MDBMask>
                            </MDBView>
                            </div>
                        </>
                        <br /><br />
                        <>
                            <div className="ptest" style={{ cursor: "pointer" }} onClick={() => {
                                props.SwitchView('pentest')
                            }}>
                                <h6 style={{ fontWeight: 800, }}>Risk by severity and category: Domains</h6>
                                <p style={{ fontSize: "11px" }}>Watcher checks on all your domains, monitors organisation assets at scale,
                                regularly checks for misconfigurations for potential hacks and exploits.
                        </p>
                                <MDBView style={{ border: "1px solid #fff" }}>
                                <MDBRow
                                style={{ opacity: 0.4 }}
                                >
                                    <MDBCol sm="12" md="12" lg="6"><Chart
                                         color={['#808080','#818589', '#71797E', '#899499' ]} 
                                        width={250} height={150} series={[8, 13, 2, 12]} /></MDBCol>
                                    <MDBCol sm="12" md="12" lg="6">  <CategoryChart
                                         color={['#808080','#818589', '#71797E', '#899499' ]} 
                                        series={[8, 13, 12]} /></MDBCol>
                                </MDBRow>
                                <MDBMask overlay="white-strong" >
                                    <p><MDBIcon style={{ color: "#2bbbad", cursor: "pointer" }} size="1x" icon="lock" /></p>
                                </MDBMask>
                            </MDBView>
                            </div>
                        </>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </>
    )
}