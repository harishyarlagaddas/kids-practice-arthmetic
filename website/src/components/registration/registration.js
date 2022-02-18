import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearStateAction, registrationRequestAction } from '../../actions/actions'
import { registrationError, registrationInProgress, registrationSuccess } from '../../reducers/registrationReducer'
import { isValidEmail } from '../../utils/utils'
import Progressbar from '../progress-bar/Progressbar'
import './registration.css'

function RegistrationLayout() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [kidsName, setKidsName] = useState('')
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
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />

                    <input
                        className='registrationInputTextStyle'
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                    />

                    <input
                        className='registrationInputTextStyle'
                        type='text'
                        placeholder='Name of the kid'
                        value={kidsName}
                        onChange={(event) => setKidsName(event.target.value)}
                    />

                    <input
                        className='registrationInputButtonStyle button'
                        type='button'
                        value='Create Account'
                        onClick={() => {
                            console.log('create account button onClick')
                            if (username.length == 0) {
                                setError('Enter valid email in username section')
                            } else if (!isValidEmail(username)) {
                                setError('Enter the valid email address in the username section')
                            } else if (password.length == 0) {
                                setError('Enter password in the password field.')
                            } else if (password.length < 6) {
                                setError('Password length should be at least 6 characters')
                            } else if (confirmPassword.length == 0) {
                                setError('Enter the same password in confirm password field')
                            } else if (password != confirmPassword) {
                                setError('Both password and confirm passwords should match')
                            } else if (kidsName.length == 0) {
                                setError('Please enter the name of the Kid')
                            } else {
                                dispatch(registrationRequestAction({
                                    userName: username.toLowerCase(),
                                    password: password,
                                    kidsNames: [
                                        kidsName
                                    ]
                                }))
                            }
                        }}
                    />
                </form>
            </div>
        </React.Fragment>
    )
}

function HomePage() {
    // Clear the registration state before moving to another state..
    const dispatch = useDispatch()
	dispatch(clearStateAction())

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
    const dispatch = useDispatch()
    console.log('Registration Component')
    useEffect(() => {
		// Fire the event to clear the registration related states..
		dispatch(clearStateAction())
	}, [])

    if (processing) {
        return <Progressbar />
    } else if (isSuccessful) {
        return <HomePage />
    } else {
        return <RegistrationLayout />
    }

}