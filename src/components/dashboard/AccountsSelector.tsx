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
export const AccountsSelector = (props: any) => {
    const [AccountList, setAccountList] = useState([props.Account]);
    const accountList: any = new Array();
    useEffect(() => {
        fetchData('accounts', 'GET').then((res: any) => {
            console.log(res)
            for(let key in res){
                console.log(props.Account)
                console.log(res[key]);
                accountList.push(res[key]);
            }
            setAccountList(accountList)
        })
    }, []);
    
    const AccountT = (e: any) => {
        console.log(e.target.value)
        const newAccount = e.target.value;
        props.AccountToggle(newAccount);
    }
    console.log(AccountList)
    console.log(props.account)
    const token = localStorage.getItem("token");
    console.log("accountSelector")
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
                        <select className="custom-select" style={{ width: "250px" }} onChange={(e: any) => AccountT(e)} value={props.account}>
                           {AccountList.map((account: any) => {
                                return <option value={account}>{account}</option>
                           })}
                        </select>
                    </div>
                </MDBRow>
            </MDBContainer>
        </>
    )
}