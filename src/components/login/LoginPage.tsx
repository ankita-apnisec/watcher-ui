import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Redirect } from 'react-router';
import {
    MDBBtn,
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBInput
} from "mdbreact";
import logo from '../../assets/images/loginImage.png';
import { authToken } from '../../services/auth'
import logolarge from "../../assets/images/small-logo.png"
import logo1 from "../../assets/images/logo-large.png"
import loginbck from "../../assets/images/loginbck.png"


export const LoginPage = (props: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState({});
    const [success, setSuccess] = useState('');
    const [validCred, setValidCred] = useState('');

    useEffect(() => {
        if (success === "true") {
            const tk = props.UserChange(response)
            console.log("success", success)
        } else if (success === "false") {
            const tk = props.UserChange(undefined)
        }
    }, [success]);

    useEffect(() => {
        if (validCred === "true") {
            setSuccess("true")
        } else {
            setSuccess("false")
        }
    }, [validCred]);

    const getInTouch = () => {
        window.open('mailto:info@apnisec.com?subject=Unable to login&body=Provide your user details')
    }

    const Login = () => {
        console.log(email)
        console.log(password)
        authToken()
        const requestHeaders = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'mode': 'cors' },
            body: JSON.stringify({ "username": email, "password": password })
        };

        fetch('https://api.thewatcher.live//login', requestHeaders).then(res => res.json()).then((data) => {
             setResponse(data)
            //  console.log(data)
            if(data.message !== undefined){
                setValidCred("false")
                console.log("invald user")
            } else {
                localStorage.setItem("username", data.username)
                localStorage.setItem("is_onboarded", data.is_onboarded)
                localStorage.setItem("token", data.jwt_token)
                data.jwt_token.length > 10 ? setValidCred("true") : setValidCred("false")
            }
          
          })
    }
    if (success === "true") {
        return <Redirect to={{
            pathname: '/',
            state: { data: response }
        }} />
    }
    return (
        <MDBContainer fluid>
            <MDBRow style={{ height: "100vh" }}> 
                <MDBCol xs="1" sm="2" md="3" lg="4" style={{ backgroundColor: "rgb(0 227 170 / 15%)", opacity: "1", height: "100vh"}}>
                    {/* <div>
                        <img src={logo1} alt="Amazon Glacier" style={{ width: "300px", marginLeft: "20px" }} />
                    </div>
                    <div>
                        <img src={loginbck} alt="Amazon Glacier" style={{ width: "300px", marginLeft: "20px" }} />
                    </div> */}
                </MDBCol>
                <MDBCol xs="11" sm="10" md="9" lg="8" >
                    <MDBContainer style={{ marginTop: "15vh", marginLeft: "8vh"  }}>
                    <img src={logolarge} style={{ width: "100px", marginLeft: "20px" }} />
                    <br />
                        <MDBRow>
                        <p style={{ marginBottom: "10vh", fontWeight: 700 }} className="h1 text-center"><span style={{fontWeight: 600, fontSize: "45px" }}>W</span>elcome to Watcher!</p>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol md="6">
                                <form>
                                    <div className="grey-text">
                                        <MDBInput label="Username" icon="user" group type="email" validate error="wrong"
                                            value={email} onChange={e => setEmail((e.target as any).value)} success="right" />
                                        <MDBInput label="Password" icon="lock" group type="password" validate
                                            value={password} onChange={e => setPassword((e.target as any).value)} />
                                    </div>
                                    <div>
                                        <MDBBtn color="dark"
                                            onClick={() => Login()}>Login</MDBBtn>
                                    </div>
                                    {validCred === "false" ? <p style={{fontSize: "12px", color: "red"}}>{(response as any).message}</p> : <p></p>
                                    }
                                    {/* <p style={{ marginTop: "5vh" }} className="mb-4">Unable to login ? <a onClick={getInTouch} style={{ textDecoration: "underline"}}>Contact us</a></p> */}
                                </form>


                                {/* <form>
                                    <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                                    Your email
                                    </label>
                                    <input
                                    type="email"
                                    pattern="[a-z]{2,}$"
                                    id="defaultFormLoginEmailEx"
                                    className="form-control"
                                    value={email} 
                                    onChange={e => setEmail((e.target as any).value)}
                                    />
                                    <br />
                                    <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
                                    Your password
                                    </label>
                                    <input
                                    type="password"
                                    id="defaultFormLoginPasswordEx"
                                    className="form-control"
                                    value={password}
                                    onChange={e => setPassword((e.target as any).value)}
                                    />
                                    <div className="mt-4">
                                    <MDBBtn onClick={() => Login()} className="loginButton" type="submit">
                                        Login
                                    </MDBBtn>
                                    </div>
                                    {validCred === "false" ? <p style={{fontSize: "12px", color: "red"}}>{(response as any).message}</p> : <p></p>
                                    }
                                </form> */}
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </MDBCol>
            </MDBRow>
            </MDBContainer>
    );
}