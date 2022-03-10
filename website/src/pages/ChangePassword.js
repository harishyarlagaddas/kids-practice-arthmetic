import { memo, useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { changePasswordAction, clearStateAction } from '../actions/actions'
import Progressbar from '../components/progress-bar/Progressbar'
import { accessToken, authenticationApiCompleted, authenticationApiError, authenticationApiInProgress } from '../reducers/loginReducer'
import './MyForm.css'

function ChangePassword(props) {
    const location = useLocation()

    const [userName, setUserName] = useState(location.state.userName)
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const isApiCallInProgres = useSelector(authenticationApiInProgress)
    const isApiCallComplate = useSelector(authenticationApiCompleted)
    const apiError = useSelector(authenticationApiError)
    const dispatch = useDispatch()
    
    var currPassowrdHint = 'Current Password'
    if (location.state.useCode) {
        currPassowrdHint = 'Authrozation Code'
    }

    useEffect(() => {
        dispatch(clearStateAction())
    }, [])

    if (!(location.state.userName || location.state.accessToken)) {
        console.log('No username or accesstoken specified. Hence going to login page')
        return <GotoLogin />
    }

    if (isApiCallInProgres) {
        return < Progressbar />
    } 
    
    if (isApiCallComplate && !apiError) {
        console.log('api completed flag is true. hence going to login page')
        return <GotoLogin />
    }

    return (
        <div className="myFormComponent">
            <div className="myFormSuccessText">{(isApiCallComplate && !apiError)? 'Successfully changed the password..': ''}</div>
            <div className="myFormErrorText">{error ? error : apiError}</div>
            {
                location.state.useCode ? (
                    userName ? (
                        <div className='myFormInputText'>
                            {userName}
                        </div>
                    ) : (
                        <input className="myFormInputText"
                            type='text'
                            placeholder='Username'
                            value={userName}
                            onChange={(event) => setUserName(event.target.value)}
                        />
                    )
                ) : null
            }
            <input className="myFormInputText"
                type='password'
                placeholder={currPassowrdHint}
                value={currentPassword}
                onChange={(event) => setCurrentPassword(event.target.value)}
            />
            <input className="myFormInputText"
                type='password'
                placeholder='New Password'
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
            />
            <input className="myFormInputText"
                type='password'
                placeholder='Confirm New Password'
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
            />
            <input className="myFormButton"
                type='button'
                value='Change Password'
                onClick={() => {
                    console.log('Change Password button Click')
                    setError('')
                    if (currentPassword.length < 6) {
                        if (location.state.useCode) {
                            setError('Enter the temporary authorization code..')
                        } else {
                            setError('Enter current password')
                        }
                    } else if (newPassword.length < 6) {
                        setError('New password length should be at least 6 characters')
                    } else if (newPassword != confirmPassword) {
                        setError('Both new password and confirm passwords should match')
                    } else {
                        dispatch(changePasswordAction(location.state.accessToken, currentPassword, newPassword, location.state.userName, location.state.useCode))
                        setCurrentPassword('')
                        setNewPassword('')
                        setConfirmPassword('')
                    }
                }}    
            />
        </div>
    )
}

function GotoLogin() {
    const navigate = useNavigate()
    useEffect(() => {
        navigate('/login')
    })
    return <div></div>
}

export default memo(ChangePassword)