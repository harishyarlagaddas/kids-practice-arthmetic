import React from 'react';
import './Question.css';

class Question extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      result: ''
    }
  }

  updateResult(event) {
    console.log('updateResult result: '+event.target.value);
    this.setState({
      result: event.target.value
    })
  }

  handleKeyPress = (event) => {
    if(event.key === 'Enter' && this.state.result){
      this.handleSubmit();
    }
  }

  handleSubmit() {
    console.log('handleSubmit')
    this.setState({
      result: ''
    });
    this.resultInput.focus();
    this.props.onResult({
      operand1: this.props.operand1,
      operand2: this.props.operand2,
      operation: this.props.operator,
      result: this.state.result,
      actualResult: this.getActualResult()
    });
  }

  getActualResult() {
    var result = 0;
    if (this.props.operator === '+') {
      result = this.props.operand1 + this.props.operand2;
    } else if (this.props.operator === '-') {
      result = this.props.operand1 - this.props.operand2;
    } else if (this.props.operator === 'X') {
      result = this.props.operand1 * this.props.operand2;
    }
    return result.toString();
  }

  render() {
    return (
      <div>
        <div className="question">
          <div className="questionItem questionItemBorder">
            {this.props.operand1}
          </div>

          <div className="questionItem">
            {this.props.operator}
          </div>

          <div className="questionItem questionItemBorder">
            {this.props.operand2}
          </div>

          <div className="questionItem">
            =
          </div>

          <input 
            className="questionItem questionItemBorder questionAnswer"
            autofocus="autofocus"
            ref={(input) => {this.resultInput = input}}
            value={this.state.result}
            onKeyPress={this.handleKeyPress}
            onChange={evt => this.updateResult(evt)}
          />
        </div>


        <button 
          className="submitButton"
          onClick={() => this.handleSubmit()}
          disabled={!this.state.result}>
            Submit
        </button>
      </div>
    );
  }
}

export default Question;
