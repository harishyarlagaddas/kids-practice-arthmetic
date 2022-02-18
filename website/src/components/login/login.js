import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from "react-router-dom";
import { loginFailureAction, loginRequestAction } from "../../actions/actions";
import './login.css'
import { loggedIn, loginError, loginInProgress } from "../../reducers/loginReducer";
import Progressbar from "../progress-bar/Progressbar";
import { selectedKidInfo } from "../../reducers/accountReducer";
import { isValidEmail } from "../../utils/utils";

function LoginLayout() {
    const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
    const errorMessage = useSelector(loginError)
    const dispatch = useDispatch()

	return (
        <React.Fragment>
            <div className='loginComponentStyle' id="login">
				<p className="errorTextStyle">{errorMessage}</p>
				
				<form className='formStyle'>
					<input
						className='inputTextStyle'
						type='text'
						placeholder='Username'
						value={username}
						onChange={(event) => setUsername(event.target.value)}
					/>

					<input
						className='inputTextStyle'
						type='password'
						placeholder='Password'
						value={password}
						onChange={(event) => setPassword(event.target.value)}
					/>

					<input
						className='inputButtonStyle button'
						type='button'
						value='Login'
						onClick={() => {
							console.log('login button onClick')
							if (!isValidEmail(username)) {
								dispatch(loginFailureAction({
									errorDescription: 'Please enter valid email..'
								}))
							} else if (username.length > 0 && password.length > 0) {
								dispatch(loginRequestAction(username.toLowerCase(), password))
							} else {
								dispatch(loginFailureAction({
									errorDescription: 'Pleae enter valid credentials...'
								}))
							}
						}}
					/>

					<div className='signInContainerStyle'>
						<Link className='createAccountStyle' to="/register">Create Account</Link>
						<div className='forgotPasswordStyle'>Forgot Password</div>
					</div>
				</form>
			</div>
        </React.Fragment>
    )
}

function LoggedinLayout() {
    const navigate = useNavigate();
	const kidSelected = useSelector(selectedKidInfo)
    useEffect(() => {
		if (kidSelected) {
			navigate('/home')
		} else {
			navigate("/kids-select")
		}
    }, [])
	return (<div></div>)
}

export default function Login(props) {
	let loginInFlight = useSelector(loginInProgress)
	let isLoggedIn = useSelector(loggedIn)

	if (loginInFlight) {
        console.log("rendering progressbar layout.")
		return <Progressbar />
	} else if (isLoggedIn) {
        console.log("rendering logged in layout")	
		return <LoggedinLayout />
	}else {
        console.log("rendering login layout")
		return <LoginLayout />
	}
}