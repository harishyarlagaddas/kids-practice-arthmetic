import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loggedIn } from "../reducers/loginReducer";
import './MyAccount.css'

export default function MyAccount(props) {
    const isLoggedIn = useSelector(loggedIn)

    if (!isLoggedIn) {
        return <GoToLogin />
    }

    return (
        <div className="myAccountContainer">My Account page comming soon ...</div>
    )
}

function GoToLogin() {
    console.log("GoToLogin")
    const navigate = useNavigate()
    useEffect(() => {
        navigate("/login")
    }, [])
    return (<div></div>)
}