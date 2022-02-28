import { Helmet } from 'react-helmet'
import { useLocation } from 'react-router-dom'
import { 
    JSON_KEY_OPERAND1_MAX_VALUE, 
    JSON_KEY_OPERAND2_MAX_VALUE, 
    JSON_KEY_OPERATION, 
    JSON_KEY_QUESTIONS, 
    JSON_KEY_TEST_TIME, 
    JSON_KEY_TIME_TAKEN 
} from '../constants/jsonKeys'
import { getDateString } from '../utils/utils'
import ResultsTable from '../components/common/ResultsTable'
import './DetailedResults.css'

export default function DetailedResults(props) {
    console.log(props)
    const location = useLocation()
    console.log(location)
    const date = new Date(location.state.test[JSON_KEY_TEST_TIME])
    return (
        <div className="detailedResultsMainLayout"> 
            <Helmet>
                <style>{'body { background-color: #E9E9E9; }'}</style>
            </Helmet>
            <div className='detailedResultsDescriptionLayoutContainer'>
                <div className="detailedResultsDescriptionLayout">
                    <div className="detailedResultsTitleSection">Type: <span className='detailedResultsTitleValue'>{location.state.test[JSON_KEY_OPERATION]}</span></div>
                    <div className="detailedResultsTitleSection">Date: <span className='detailedResultsTitleValue'>{getDateString(date)}</span></div>
                    <div className="detailedResultsTitleSection">Time Taken: <span className='detailedResultsTitleValue'>{location.state.test[JSON_KEY_TIME_TAKEN]}s</span></div>
                    {
                        location.state.test[JSON_KEY_OPERAND1_MAX_VALUE] ? (
                            <div className='detailedResultsTitleSection'>Max value of 1st operand: <span className='detailedResultsTitleValue'>{location.state.test[JSON_KEY_OPERAND1_MAX_VALUE]}</span></div>
                        ) : (
                            null
                        )
                    }
                    {
                        location.state.test[JSON_KEY_OPERAND2_MAX_VALUE] ? (
                            <div className='detailedResultsTitleSection'>Max value of 2nd operand: <span className='detailedResultsTitleValue'>{location.state.test[JSON_KEY_OPERAND2_MAX_VALUE]}</span></div>
                        ) : (
                            null
                        )
                    }
                </div>
            </div>
            <ResultsTable questions={location.state.test[JSON_KEY_QUESTIONS]} />
        </div>
    )
}
