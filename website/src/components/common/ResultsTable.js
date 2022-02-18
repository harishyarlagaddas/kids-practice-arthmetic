import React from "react";
import './ResultsTable.css'

function ResultsTable(props) {
    return (
        <div className="resultsMain">
            <div className="resultsTitle">
                Your Answers
            </div>
            <table>
                <tbody>
                    <tr>
                        <th>Question</th>
                        <th>Your Answer</th>
                        <th>Correct Answer</th>
                        <th>Result</th>
                    </tr>
                    {
                        props.questions.map((question, i) => (
                            <tr key={i}>
                                <td>{question.operand1} {question.operator} {question.operand2}</td>
                                <td>{question.answer}</td>
                                <td>{question.correctAnswer}</td>
                                <td>{question.answer === question.correctAnswer ? "\u2705" : "\u274C"} </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ResultsTable