import React, { useState } from "react";
import './Title.css'
import { useDispatch, useSelector } from "react-redux";
import { loggedIn } from "../../reducers/loginReducer";
import { kidsNames, selectedKidInfo } from "../../reducers/accountReducer";
import { useNavigate } from "react-router-dom";
import { clearAccountInformationAction, logoutAction } from "../../actions/actions";
import home from '../../assets/home.png'
import { getKidsDisplayName } from "../../utils/utils";

function Title() {
    const [menu, showMenu] = useState(false)
    const isLoggedIn = useSelector(loggedIn)
    const names = useSelector(kidsNames)
    const selectedKid = useSelector(selectedKidInfo)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // const eventHandler = () => {
    //     showMenu(!menu)
    // }
    var displayName = ''
    if (selectedKid && selectedKid.kidsName) {
        displayName = getKidsDisplayName(selectedKid.kidsName)
    }
    
    
    return (
        <div className="titleHeaderContainer">
            <div className="dummyLeft">
                {
                    isLoggedIn ? (
                        <img className="homeImage" src={home} onClick={() => {
                            navigate('/home')
                        }}></img>
                    ) : (
                        null
                    )
                }
            </div>
            <div className="titleText">
                Practice My Kids
            </div>
            {
                isLoggedIn && displayName ? (
                    <div className="accountInfo">
                        <div className="accountName" onClick={() => {
                                showMenu(!menu)
                                // if (menu) {
                                //     document.addEventListener("mousedown", eventHandler)
                                // } else {
                                //     document.removeEventListener("mousedown", eventHandler)
                                // }
                            }
                        }>{displayName}</div>
                        {
                            menu 
                            ? (
                                <div>
                                    <div className="accountOptions" 
                                        onClick={
                                            () => {
                                                showMenu(!menu)
                                                navigate("my-account")
                                            }
                                        }>
                                            My Account
                                    </div>
                                    <div className="accountOptions" 
                                        onClick={ 
                                            () => {
                                                showMenu(!menu)
                                                navigate("/my-results")
                                            }
                                        }
                                    >
                                        My Results
                                    </div>
                                    <div className="accountOptions" 
                                        onClick={ 
                                            () => {
                                                showMenu(!menu)
                                                navigate("/add-Kid")
                                            }
                                        }
                                    >
                                        Add Kid
                                    </div>
                                    {
                                        names.length > 1 ? (
                                            <div className="accountOptions" 
                                                onClick={
                                                    () => {
                                                        showMenu(!menu)
                                                        navigate("kids-select")
                                                    }
                                                }
                                            >
                                                Change Kid
                                            </div>
                                        ) : (
                                            null
                                        )
                                    }
                                    <div className="accountOptions"
                                         onClick = { () => {
                                            dispatch(logoutAction())
                                            dispatch(clearAccountInformationAction())
                                            showMenu(!menu)
                                            navigate("login")
                                         }}
                                    >
                                        Logout
                                    </div>

                                    
                                </div>
                            )
                            : (
                                null
                            )
                        }
                    </div>
                ) : (
                    <div className="accountInfo"></div>
                )
            }
        </div>
    )
}

export default Title