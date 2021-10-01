import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { LoginPage } from "../components/login/LoginPage";
import { Dashboard } from "../components/dashboard/Dashboard";
import { Onboarding } from "../components/dashboard/Onboarding"

const App: React.FC = () => {
    const [user, setUser] = useState();
    const UserChange = (value: any) => {
        // console.log(value)
        setUser(value)
    }
    useEffect(() => {
        if (user !== undefined) {
            console.log("success")
        } else {
            console.log(user)
        }
    }, [user]);
    return (
        <Router>
            <switch>
                <Route exact path="/login" component={() => <LoginPage User={user} UserChange={UserChange} />} />
                <Route exact path="/" component={() => <Dashboard User={user} UserChange={UserChange} />} />
                <Route exact path="/onboarding" component={() => <Onboarding User={user} UserChange={UserChange} />} />
            </switch>
        </Router>
    );
}
export default App;