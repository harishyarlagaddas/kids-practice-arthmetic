import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { accessTokenInvalidAction, clearTestsAction, selectKidAction } from "../../actions/actions";
import { kidsInfo } from "../../reducers/accountReducer";
import { loggedIn } from "../../reducers/loginReducer";
import './KidsSelect.css'

export default function KidsSelect() {
    console.log('KidsSelect')

    const isLoggedIn = useSelector(loggedIn)
    const kids_info = useSelector(kidsInfo)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    console.log(kids_info)
    useEffect(() => {
        if (!kids_info) {
            // If we don't have the kids_info then invalidate the access token so that it goes to login again..
            dispatch(accessTokenInvalidAction())
        }
    })

    if (!isLoggedIn) {
        return <GoToLogin />
    }
    
    return (
        <div className="kidsSelectContainer">
            <div className="kidsSelectTitle"> Select Kid</div>
            <div className="kidsContainer">
            {
                kids_info.map(info => {
                    return (
                        <div 
                            className="kidsName"
                            onClick={() => {
                                console.log('KidsSelect selected kid: '+info.kidsName)
                                dispatch(selectKidAction(info))
                                dispatch(clearTestsAction())
                                navigate("/home")
                            }}
                            > 
                                {info.kidsName.split(' ')[0]}
                        </div>
                    )
                })
            }
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