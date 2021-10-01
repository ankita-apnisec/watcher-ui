import { authToken } from './auth'
import { Redirect } from 'react-router';

export const getHeaders = () => {
    let headers: any;
    headers = {
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authToken(),
    } 
    return headers
}
export const fetchData = async (endpoint: any, method: any, body?: any) => {
    let response: any
   
    if(method === "POST"){
        const config = {
            'method': method,
            'headers': getHeaders(),
            'body': JSON.stringify(body),
        }
    response = await fetch('https://api.thewatcher.live//' + endpoint,  config ).then(res => res.json()).then((data) => {
        return data
    })
    }
 else if(method === "GET" && body !== undefined) {
    const config = {
        'method': method,
        'headers': getHeaders(),
    }
    response = await fetch('https://api.thewatcher.live//' + endpoint + body,  config ).then(res => res.json()).then((data) => {
        return data
    })
 } 
 else {
    const config = {
        'method': method,
        'headers': getHeaders(),
    }
    response = await fetch('https://api.thewatcher.live//' + endpoint ,  config ).then(res => res.json()).then((data) => {
        return data
    })
 }

    return response;
}
