import React from 'react'
import '../common/OperationHandler.css'
import Question from '../common/Question';
import QuestionHeader from '../common/QuestionHeader';
import ResultsTable from '../common/ResultsTable';

class DivisionHandler extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            currentQuestionNum: 1,
            totalQuestions: this.props.totalQuestions,
            digits: this.props.digits,
            questions: []
        }
    }

    handleResult(question) {
        this.setState({
            questions: this.state.questions.concat(question),
            currentQuestionNum: this.state.currentQuestionNum+1
        })
        console.log(this.state.questions)
    }

    handleHomeButtonPress() {
        console.log('handleHomeButtonPress');
        this.props.onHomeButtonPress();
    }

    randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    render() {
        //return this.renderCompleted();
        if (this.state.currentQuestionNum > this.state.totalQuestions) {
            return this.renderCompleted();
        } else {
            return this.renderQuestion();
        }
    }

    renderQuestion() {
        var operand1 = null, operand2 = null;
        if (this.state.digits === 4) {
            operand1 = this.randomIntFromInterval(1000, 9999);
            operand2 = this.randomIntFromInterval(1000, 9999);
        } else if (this.state.digits === 3) {
            operand1 = this.randomIntFromInterval(100, 999);
            operand2 = this.randomIntFromInterval(100, 999);
        } else if (this.state.digits === 2) {
            operand1 = this.randomIntFromInterval(10, 99);
            operand2 = this.randomIntFromInterval(10, 99);
        } else {
            operand1 = this.randomIntFromInterval(2, 9);
            operand2 = this.randomIntFromInterval(2, 9);
        }

        // Make sure operand1 > operand2
        if (operand1 < operand2) {
            var temp = operand1;
            operand1 = operand2;
            operand2 = temp;
        }

        return (
            <div>
                <QuestionHeader 
                    questionType="Division" 
                    questionNum={this.state.currentQuestionNum} 
                    totalQuestions={this.state.totalQuestions}
                />

                <Question 
                    operand1={operand1} 
                    operand2={operand2} 
                    operator="/" 
                    onResult={(question) => {
                        this.handleResult(question);
                    }}
                />
            </div>
        )
    }

    renderCompleted() {
        return (
            <div>
                <div className="completedText">
                &#128079; &#x1F44F; Welldone. You completed the Division practice excercise. &#128079; &#x1F44F;
                </div>
                <button className="button" onClick={() => this.handleHomeButtonPress()}>
                    Go Home
                </button>
                <ResultsTable questions={this.state.questions} />
            </div>
        )
    }
}

export default DivisionHandler
