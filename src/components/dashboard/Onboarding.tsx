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
    MDBProgress
} from "mdbreact";
import { useHistory } from "react-router";
import "./style.css"
import { authToken } from '../../services/auth'
import { fetchData } from '../../services/apiConfig'

export const Onboarding = (props: any) => {
    const [visibility, setVisibility] = useState("none");
    const [connection, setconnection] = useState(0);
    const [checked, setChecked] = useState('');
    const [role, setRole] = useState('');
    const history = useHistory();
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const is_onboarded = localStorage.getItem("is_onboarded");
    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log(token);
        if (token) {
            fetchData('onboard', 'GET')
           
        }
    }, []);
    const Submit = () => {
        authToken()
        setVisibility("")
        setconnection(0)
        fetchData('verify', 'POST', {"role_arn": role, "account_type": checked, "is_sso_account": "false"}).then((res: any) => {
            console.log(res)
           
        })
        for (let i = 0; i <= 100; i++) {
            setTimeout(progress, 2000, i)
        }
    }
    const onChecked = (e:any) => {
        console.log(e)
        if(checked === e){
            setChecked('')
        } else {
        setChecked(e)
        }
    }
    const progress = (i: any) => {
        setTimeout((setconnection(i) as any), 2000)
    }
    const Dashboard = () => {
        console.log("dashboard redirection");
        console.log(history);
        console.log(props)
        const tk = props.UserChange({ user: username, is_onboarded: true })
        history.push("/");
    }
    console.log(props)
    if (props.User === undefined && username === undefined) {
        return <Redirect to={{
            pathname: '/login',
        }} />
    }
    if (props.User !== undefined && props.User.is_onboarded === true) {
        return <Redirect to={{
            pathname: '/',
        }} />
    }

    return (
        <>
            <MDBContainer fluid style={{ padding: "0px" }}>
                <MDBEdgeHeader color="none"></MDBEdgeHeader>
                <MDBFreeBird>
                    <MDBRow>
                        <MDBCol md="8" lg="7" className="mx-auto float-none white z-depth-1 py-2 px-2">
                            <MDBCardBody>
                                <MDBCardTitle>Onboard to Watcher</MDBCardTitle>
                                <p className="pb-4">Follow the steps and submit</p>
                                <form>
                                    <ol>
                                        <li className="onboardSteps">Hi User, Please follow these steps to onboard.</li>
                                        <li className="onboardSteps">Please add following IAM role for cross-account access:
                                        <br /> <span className='text-dark font-weight-bold' style={{ fontSize: "14px" }}>account-id : 339361266834</span> </li>
                                        <li className="onboardSteps">Role with policies :
                                        <br />  <span className='text-dark font-weight-bold' style={{ fontSize: "14px" }}>arn:aws:iam::aws:policy/SecurityAudit</span>
                                            <br /> <span className='text-dark font-weight-bold' style={{ fontSize: "14px" }}> arn:aws:iam::aws:policy/job-function/ViewOnlyAccess</span> </li>
                                        <li className="onboardSteps">Once done, please share the role ARN with us.</li>
                                        <MDBInput value={role} onChange={e => setRole((e.target as any).value)}  label="arn:aws:iam::202298570782:role/apnisec-test-role" icon="user" size="sm" />
                                        <MDBFormInline>
                                            <MDBIcon fab icon="buffer" style={{ fontSize: "25px", color: "black", padding: "0px", paddingRight: "20px" }} />
                                            <MDBInput
                                                onClick={() => onChecked('dev')}
                                                checked={checked === 'dev' ? true : false}
                                                label='dev'
                                                type='radio'
                                                id='radio1'
                                                containerClass='mr-5'
                                            />
                                            <MDBInput
                                                onClick={() => onChecked('uat')}
                                                checked={checked === 'uat' ? true : false}
                                                label='uat'
                                                type='radio'
                                                id='radio2'
                                                containerClass='mr-5'
                                            />
                                            <MDBInput
                                                 onClick={() => onChecked('staging')}
                                                 checked={checked === 'staging' ? true : false}
                                                label='staging'
                                                type='radio'
                                                id='radio3'
                                                containerClass='mr-5'
                                            />
                                            <MDBInput
                                                onClick={() => onChecked('prd')}
                                                checked={checked === 'prd' ? true : false}
                                                label='prd'
                                                type='radio'
                                                id='radio3'
                                                containerClass='mr-5'
                                            />
                                        </MDBFormInline>
                                        <br />
                                        <div className="form-check">
                                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                            <label className="form-check-label">Is cloud SSO enabled on this account</label>
                                        </div>
                                    </ol>
                                    <br />
                                    <MDBBtn color="dark" onClick={() => Submit()} className="text-xs-left">Test Connection</MDBBtn>
                                </form>
                                <div className="my-2">
                                    <p style={{ fontWeight: 300, fontSize: "0.75rem" }}>Never submit before the steps</p>
                                </div>
                                <div style={{ display: visibility }}>
                                    <MDBProgress value={connection} className="my-2" />
                                    {connection === 100 ?
                                        <MDBBtn onClick={() => Dashboard()} style={{ float: "right" }}>Continue to Watcher</MDBBtn> :
                                        <MDBBtn onClick={() => Dashboard()} style={{ float: "right" }} disabled>Continue to Watcher</MDBBtn>}
                                </div>
                            </MDBCardBody>
                        </MDBCol>
                    </MDBRow>
                </MDBFreeBird>
            </MDBContainer>
        </>
    )
}