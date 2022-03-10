import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate
  } from 'react-router-dom'
import { 
    accessTokenInvalidAction,
    clearAccountInformationAction, 
    clearStateAction,
    validateAccessTokenAction 
} from "./actions/actions";

import Home from "./pages/Home";
import KidsSelect from "./pages/KidsSelect";
import Login from "./pages/login";
import MyAccount from "./pages/MyAccount";
import DetailedResults from "./pages/DetailedResults";
import MyResults from "./pages/MyResults";
import Progressbar from "./components/progress-bar/Progressbar";
import Registration from "./pages/registration";
import Title from './components/title/Title'
import { accessToken, accessTokenValidationInProgress } from "./reducers/loginReducer";
import AddKid from "./pages/AddKid";
import ChangePassword from "./pages/ChangePassword";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
    const token = useSelector(accessToken)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(clearStateAction())
        dispatch(accessTokenInvalidAction())
        console.log('current accessToken: '+token)
        if (token) {
            console.log('sending validateAccessTokenAction')
            dispatch(validateAccessTokenAction(token))
        } else {
            console.log('No need to send validateAccessTokenAction.')
            dispatch(clearAccountInformationAction())
        }
    },[])
    
    console.log('App Component In')
    var inProgress = useSelector(accessTokenValidationInProgress)
    
    if (inProgress) {
        return (
            <div>
                <Progressbar />
            </div>
        )
    } else {
        return (
            <Router>
                <Title />
                <Routes>
                    {/* <Route path="/" element={<Login />} > */}
                    <Route path = "/" element = {<RootRoute />} />
                    <Route index path = "/login" element = {<Login/>} />
                    <Route path = "/home" element = {<Home/>} />
                    <Route path = "/register" element = {<Registration/>} />
                    <Route path = "/my-account" element = {<MyAccount />} />
                    <Route path = "/my-results" element = {<MyResults />} />
                    <Route path = "/kids-select" element = {<KidsSelect />} />
                    <Route path = "/detailed-result" element = {<DetailedResults />} />
                    <Route path = "/add-kid" element = {<AddKid />} />
                    <Route path = "/change-password" element = {<ChangePassword />} />
                    <Route path = "/forgot-password" element = {<ForgotPassword />} />
                        {/* <Navigate to="/" /> */}
                    {/* </Route> */}
                </Routes>
            </Router>
        )
    }
}

function RootRoute() {
    const navigate = useNavigate()
    useEffect(() => {
        navigate("/login")
    }, [])
    return (<div></div>)
}
export default App