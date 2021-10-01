import React, { useRef, useState, useEffect } from "react";
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
    MDBBreadcrumb,
    MDBBreadcrumbItem
} from "mdbreact";
import { useHistory } from "react-router";
import { Chart } from "react-google-charts";
import "./style.css";
import domain from '../../assets/images/domain.png'
import { fetchData } from '../../services/apiConfig'
export const PhaseSelector = (props: any) => {
    const [AccountList, setAccountList] = useState(props.Kpi.metrics.vapt.defaultQuarter);
    useEffect(() => {
            props.AccountToggle(AccountList);
    }, [props]);
    
    const AccountT = (e: any) => {
        const newAccount = e.target.value;
        setAccountList(newAccount)
        props.AccountToggle(newAccount);
    }
    const token = localStorage.getItem("token");
    if (token === null || token === undefined || token.length < 0) {
        return <Redirect to={{
            pathname: '/login',
        }} />
    }
    return (
        <>
            <MDBContainer fluid style={{ paddingTop: "2vw", paddingLeft: "2vw" }}>
                <MDBRow>
                    <div>
                        <select className="custom-select" style={{ width: "250px" }} onChange={(e: any) => AccountT(e)} value={AccountList}>
                                 <option value="Quarter-1">Quarter-1</option>
                                 <option value="Quarter-2">Quarter-2</option>
                                 <option value="Quarter-3">Quarter-3</option>
                                 <option value="Quarter-4">Quarter-4</option>
                        </select>
                    </div>
                </MDBRow>
            </MDBContainer>
        </>
    )
}