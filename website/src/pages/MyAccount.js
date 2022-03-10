import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { kidsNames, userName } from "../reducers/accountReducer";
import { accessToken, loggedIn } from "../reducers/loginReducer";
import './MyAccount.css'

export default function MyAccount(props) {
    const isLoggedIn = useSelector(loggedIn)
    const user = useSelector(userName)
    const kids = useSelector(kidsNames)
    const token = useSelector(accessToken)
    if (!isLoggedIn) {
        return <GoToLogin />
    }

    return (
        <div className="myAccountContainer">
            <div className="myAccountItemContainer">
                <div className="myAccountItem">Username (Email)</div>
                <div className="myAccountItemSeperator"></div>
                <div className="myAccountItem myAccountMultipleValues">{user}</div>
            </div>
            <div className="myAccountItemContainer">
                <div className="myAccountItem">Password</div>
                <div className="myAccountItemSeperator"></div>
                <div className="myAccountItem">
                    <div className="myAccountMultipleValues">******</div>
                    <Link 
                        className='myAccountMultipleValues' 
                        to='/change-password' 
                        state = {
                            {
                                useCode: false,
                                accessToken: token
                            }
                        }
                    >change password</Link>
                </div>
            </div>
            <div className="myAccountItemContainer">
                <div className="myAccountItem">Registered Kids</div>
                <div className="myAccountItemSeperator"></div>
                <div className="myAccountItem">
                    {
                        kids.map(kidName => {
                            return (<div className="myAccountMultipleValues">{kidName}</div>)
                        })
                    }
                    <Link className="myAccountMultipleValues" to='/add-kid'>add new kid</Link>
                </div>
            </div>
        </div>
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