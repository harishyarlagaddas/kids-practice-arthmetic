import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Outlet,
    useNavigate
  } from 'react-router-dom'
import { registrationClearStateAction, setToValidateAccessTokenAction } from "./actions/actions";

import Home from "./components/home/Home";
import Login from "./components/login/login";
import Registration from "./components/registration/registration";
import Title from './components/title/Title'

function App() {
    const dispatch = useDispatch()
	//Fire the event to start validating the access token
	dispatch(setToValidateAccessTokenAction())
    dispatch(registrationClearStateAction())

    return (
        <Router>
            <Title />
            <Routes>
                {/* <Route path="/" element={<Login />} > */}
                <Route path = "/" element={<RootRoute />} />
                <Route index path="/login" element={<Login/>} />
                <Route path="/home" element={<Home/>} />
                <Route path="/register" element={<Registration/>} />
                    {/* <Navigate to="/" /> */}
                {/* </Route> */}
            </Routes>
        </Router>
    )
}

function RootRoute() {
    const navigate = useNavigate()
    useEffect(() => {
        navigate("/login")
    }, [])
    return (<div></div>)
}
export default App