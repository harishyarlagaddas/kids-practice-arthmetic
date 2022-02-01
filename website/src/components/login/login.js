import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from "react-router-dom";
import { loginFailureAction, loginRequestAction, registrationClearStateAction, setToValidateAccessTokenAction } from "../../actions/actions";
import './login.css'
import { loggedIn, loginError, loginInProgress, validateAccessToken } from "../../reducers/loginReducer";

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
					type='text'
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
						if (username.length > 0 && password.length > 0) {
							dispatch(loginRequestAction(username, password))
						} else {
							dispatch(loginFailureAction('Pleae enter valid credentials...'))
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

function ProgressbarLayout() {
	return (
		<div className='loginProcessing'>
			
		</div>
	)
}

function LoggedinLayout() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/home")
    }, [])
	return (<div></div>)
}

function MoveToRegistrationPage() {
	const navigate = useNavigate();
	navigate("/register")
}

export default function Login(props) {
	let loginInFlight = useSelector(loginInProgress)
	let isLoggedIn = useSelector(loggedIn)
	let validateToken = useSelector(validateAccessToken)
	if (validateToken || loginInFlight) {
        console.log("rendering progressbar layout. validateToken: "+validateToken+" loginInFlight: "+loginInFlight)
		return <ProgressbarLayout />
	} else if (isLoggedIn) {
        console.log("rendering logged in layout")	
		return <LoggedinLayout />
	}else {
        console.log("rendering login layout")
		return <LoginLayout />
	}
}