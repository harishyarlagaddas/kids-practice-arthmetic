import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate
  } from 'react-router-dom'
import { accessTokenInvalidAction, clearAccountInformationAction, clearStateAction, loginFailureAction, selectKidAction, validateAccessTokenAction } from "./actions/actions";

import Home from "./components/home/Home";
import KidsSelect from "./components/kids-select/KidsSelect";
import Login from "./components/login/login";
import MyAccount from "./components/my-account/MyAccount";
import DetailedResults from "./components/my-results/DetailedResults";
import MyResults from "./components/my-results/MyResults";
import Progressbar from "./components/progress-bar/Progressbar";
import Registration from "./components/registration/registration";
import Title from './components/title/Title'
<<<<<<< Updated upstream
import { accessToken, loginInProgress } from "./reducers/loginReducer";
=======
import { accessToken, accessTokenValidationInProgress } from "./reducers/loginReducer";
import AddKid from "./pages/AddKid";
import ChangePassword from "./pages/ChangePassword";
import ForgotPassword from "./pages/ForgotPassword";
>>>>>>> Stashed changes

function App() {
    const token = useSelector(accessToken)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(clearStateAction())
        // dispatch(accessTokenInvalidAction())
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
<<<<<<< Updated upstream
=======
                    <Route path = "/add-kid" element = {<AddKid />} />
                    <Route path = "/change-password" element = {<ChangePassword />} />
                    <Route path = "/forgot-password" element = {<ForgotPassword />} />
>>>>>>> Stashed changes
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