import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearStateAction, requestTemporaryAuthCodeAction } from '../actions/actions'
import Progressbar from '../components/progress-bar/Progressbar'
import { authenticationApiCompleted, authenticationApiError, authenticationApiInProgress } from '../reducers/loginReducer'
import { isValidEmail } from '../utils/utils'
import './MyForm.css'

function ForgotPassword() {
    const [username, setUsername] = useState('')
    const [error, setError] = useState('')
    const isApiCallInProgres = useSelector(authenticationApiInProgress)
    const isApiCallComplate = useSelector(authenticationApiCompleted)
    const apiError = useSelector(authenticationApiError)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(clearStateAction())
    }, [])

    if (isApiCallInProgres) {
        return < Progressbar />
    } else if (isApiCallComplate && !apiError) {
        return <GoToChangePassword userName={username}/>
    }

    return (
        <div className="myFormComponent">
            <div className="myFormErrorText">{error ? error : apiError}</div>
            <input className="myFormInputText"
                type='text'
                placeholder='Username'
                value={username}
                onChange={(event) => setUsername(event.target.value)}
            />
            <input className="myFormButton"
                type='button'
                value='Get Code'
                onClick={() => {
                    console.log('Request Authorization Code Click')
                    setError('')
                    if (username.length < 6) {
                        setError('Enter username')
                    } else if (!isValidEmail(username)) {
                        setError('Enter the valid Email in the userName section')
                    } else {
                        dispatch(requestTemporaryAuthCodeAction(username))
                    }
                }}    
            />
        </div>
    )
}

function GoToChangePassword(props) {
    console.log('Going to change password...')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(clearStateAction())
        navigate('/change-password', {
            state: {
                userName: props.userName,
            useCode: true
            }
        })
    })
    return <div></div>
}
export default ForgotPassword