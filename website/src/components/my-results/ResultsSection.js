import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { OPERATION_TYPE_ADDITION, OPERATION_TYPE_DIVISION, OPERATION_TYPE_MULTIPLICATION, OPERATION_TYPE_SUBTRACTION } from '../../constants/consts'
import { JSON_KEY_CORRECT_ANSWERS, JSON_KEY_TEST_TIME, JSON_KEY_TIME_TAKEN, JSON_KEY_TOTAL_QUESTIONS } from '../../constants/jsonKeys'
import { additionTests, divisionTests, multiplicationTests, subtractionTests } from '../../reducers/accountReducer'
import { getDateString } from '../../utils/utils'
import './ResultSection.css'

export default function ResultsSection(props) {
    var addition_tests = useSelector(additionTests)
    var subtraction_tests = useSelector(subtractionTests)
    var multiplication_tests = useSelector(multiplicationTests)
    var division_tests = useSelector(divisionTests)

    var tests = []
    if (props.operation === OPERATION_TYPE_ADDITION) {
        tests = addition_tests
    } else if (props.operation === OPERATION_TYPE_SUBTRACTION) {
        tests = subtraction_tests
    } else if (props.operation === OPERATION_TYPE_MULTIPLICATION) {
        tests = multiplication_tests
    } else if (props.operation === OPERATION_TYPE_DIVISION) {
        tests = division_tests
    }
    return (
        <div className='resultsSection'>
            <div className="resultsSectionName">{props.operation}</div>
            {
                tests.length > 0 ? (
                    <table id="resultsSectionTable">
                        {
                            tests.map(test => {
                                const d = new Date(test[JSON_KEY_TEST_TIME])
                                return (
                                    <tr id="resultsSectionTableRow">
                                        <td id="resultsSectionTableHeader">
                                            <Link to="/detailed-result"
                                                state={{
                                                    test: test
                                                }}
                                            >
                                                {getDateString(d)}
                                            </Link>
                                        </td>
                                        <td id="resultsSectionTableHeader">{test[JSON_KEY_CORRECT_ANSWERS]}/{test[JSON_KEY_TOTAL_QUESTIONS]}</td>
                                        <td id="resultsSectionTableHeader">{test[JSON_KEY_TIME_TAKEN]}s</td>
                                    </tr>        
                                )
                            })
                        }
                    </table>
                ) : (
                    <div className='noResultsSection'>No results</div>
                )
            }
            
        </div>
    )
}