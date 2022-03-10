import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from "react-router-dom";
<<<<<<< Updated upstream:website/src/components/login/login.js
import { loginFailureAction, loginRequestAction } from "../../actions/actions";
import './login.css'
import { loggedIn, loginError, loginInProgress } from "../../reducers/loginReducer";
import Progressbar from "../progress-bar/Progressbar";
import { selectedKidInfo } from "../../reducers/accountReducer";
import { isValidEmail } from "../../utils/utils";
=======
import { loginFailureAction, loginRequestAction } from "../actions/actions";
import { authenticationApiError, authenticationApiInProgress, loggedIn } from "../reducers/loginReducer";
import Progressbar from "../components/progress-bar/Progressbar";
import { selectedKidInfo } from "../reducers/accountReducer";
import { isValidEmail } from "../utils/utils";
import './login.css'
import './MyForm.css'
>>>>>>> Stashed changes:website/src/pages/login.js

function LoginLayout() {
    const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
    const errorMessage = useSelector(authenticationApiError)
    const dispatch = useDispatch()

	return (
        <React.Fragment>
            <div className='myFormComponent' id="login">
				<p className="myFormErrorText">{errorMessage}</p>
				
				<form>
					<input
						className='myFormInputText'
						type='text'
						placeholder='Username'
						value={username}
						onChange={(event) => setUsername(event.target.value)}
					/>

					<input
						className='myFormInputText'
						type='password'
						placeholder='Password'
						value={password}
						onChange={(event) => setPassword(event.target.value)}
					/>

					<input
						className='myFormButton button'
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
						<Link className='forgotPasswordStyle' to="/forgot-password">Forgot Password</Link>
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
	let loginInFlight = useSelector(authenticationApiInProgress)
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