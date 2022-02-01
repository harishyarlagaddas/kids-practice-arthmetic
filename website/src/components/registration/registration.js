import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { registrationClearStateAction, registrationRequestAction } from '../../actions/actions'
import { registrationError, registrationInProgress, registrationSuccess } from '../../reducers/registrationReducer'
import './registration.css'

function RegistrationLayout() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const serverError = useSelector(registrationError)
    const dispatch = useDispatch()

    console.log("GetRegistrationLayout")
    return (
        <React.Fragment>
            <div className='registrationComponentStyle'>
                <p className="registrationErrorTextStyle">{error}</p>
                <p className="registrationErrorTextStyle">{serverError}</p>
                <form className='registrationFormStyle'>
                    <input
                        className='registrationInputTextStyle'
                        type='text'
                        placeholder='Username (Email)'
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />

                    <input
                        className='registrationInputTextStyle'
                        type='text'
                        placeholder='Password'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />

                    <input
                        className='registrationInputTextStyle'
                        type='text'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                    />

                    <input
                        className='registrationInputButtonStyle button'
                        type='button'
                        value='Create Account'
                        onClick={() => {
                            console.log('create account button onClick')
                            if (username.length == 0) {
                                setError('Enter valid email in username section')
                            } else if (password.length == 0) {
                                setError('Enter password in the password field.')
                            } else if (password.length < 6) {
                                setError('Password length should be at least 6 characters')
                            } else if (confirmPassword.length == 0) {
                                setError('Enter the same password in confirm password field')
                            } else if (password != confirmPassword) {
                                setError('Both password and confirm passwords should match')
                            } else {
                                dispatch(registrationRequestAction(username, password))
                            }
                        }}
                    />
                </form>
            </div>
        </React.Fragment>
    )
}

function ProgressbarLayout() {
    console.log('GetProgressbarLayout')
	return (
		<div className='registrationProcessing'>
			
		</div>
	)
}

function HomePage() {
    // Clear the registration state before moving to another state..
    const dispatch = useDispatch()
	dispatch(registrationClearStateAction())

    console.log("MoveToHomePage")
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/home")
    }, [])

    return (<div></div>)
}

export default function Registration() {
    const processing = useSelector(registrationInProgress)
    const isSuccessful = useSelector(registrationSuccess)
    console.log('Registration Component')
    if (processing) {
        return <ProgressbarLayout />
    } else if (isSuccessful) {
        return <HomePage />
    } else {
        return <RegistrationLayout />
    }

}