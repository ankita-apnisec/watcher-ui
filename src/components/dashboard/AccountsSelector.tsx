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
    MDBBreadcrumb,
    MDBBreadcrumbItem
} from "mdbreact";
import { useHistory } from "react-router";
import { Chart } from "react-google-charts";
import "./style.css";
import domain from '../../assets/images/domain.png'
import { fetchData } from '../../services/apiConfig'
export const AccountsSelector = (props: any) => {
    console.log(props)
    const [AccountList, setAccountList] = useState([props.Account]);
    const accountList: any = new Array();
    useEffect(() => {
        console.log("fetch")
        fetchData('accounts', 'GET').then((res: any) => {
            for(let key in res){
                accountList.push(res[key]);
            }
            setAccountList(accountList)
        })
    }, [props]);
    
    const AccountT = (e: any) => {
        const newAccount = e.target.value;
        props.AccountToggle(newAccount);
    }
    const token = localStorage.getItem("token");
    console.log("accountSelector")
    if (token === null || token === undefined || token.length < 0) {
        return <Redirect to={{
            pathname: '/login',
        }} />
    }
    return (
        <>
            <MDBContainer fluid style={{ paddingTop: "1vw", paddingLeft: "2vw"  }}>
                <MDBRow>
                    <div>
                    <label className="accountSelect">Account:</label>
                        <select className="custom-select" 
                         onChange={(e: any) => AccountT(e)} value={props.Account}>
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