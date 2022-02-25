import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addNewKidAction, clearStateAction } from "../actions/actions"
import Progressbar from "../components/progress-bar/Progressbar"
import { apiCallComplete, apiCallFailureMsg, apiCallInProgress, kidsNames } from "../reducers/accountReducer"
import './AddKid.css'

export default function AddKid(props) {
    const [kidsName, setKidsName] = useState('')
    const [error, setError] = useState('')
    const nameOfTheKids = useSelector(kidsNames)
    const isApiCallInProgres = useSelector(apiCallInProgress)
    const isApiCallComplate = useSelector(apiCallComplete)
    const apiError = useSelector(apiCallFailureMsg)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(clearStateAction())
    }, [])


    if (isApiCallInProgres) {
        return < Progressbar />
    } 
    console.log('apiError: '+apiError)
    return (
        <div className="addKidComponent">
            <div className="addKidSuccessText">{(isApiCallComplate && !apiError)? "Successfully added the kid: "+kidsName : ''}</div>
            <div className="addKidErrorText">{error ? error : apiError}</div>
            <input className="addKidInputText"
                type='text'
                placeholder='kidsName'
                value={kidsName}
                onChange={(event) => setKidsName(event.target.value)}
            />
            <input className="addKidButton"
                type='button'
                value='Add Kid'
                onClick={() => {
                    console.log('addKidButton Click')
                    console.log(nameOfTheKids)
                    setError('')
                    if (!kidsName) {
                        setError('Please enter the kids name')
                    } else if (nameOfTheKids.includes(kidsName)) {
                        setError('This kids name alreay exists')
                    } else {
                        dispatch(addNewKidAction(kidsName))
                    }
                }}    
            />
        </div>
    )
}