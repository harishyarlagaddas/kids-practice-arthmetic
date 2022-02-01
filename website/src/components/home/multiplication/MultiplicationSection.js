import React from 'react'
import '../common/ContentSection.css'

class MultiplicationSection extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    handleMultiplication(digits) {
        this.props.handleMultiplication(digits)
    }

    render() {
        return (
            <div className="contentSectionMain">
                <div className="title">Multiplication</div>
                <div className="gridItemMain">
                    {/* <div className="contentListSection"> */}
                        <div className="contentListItem" onClick={() => this.handleMultiplication(1)}><a>One Digit Multiplication</a></div>
                        <div className="contentListItem" onClick={() => this.handleMultiplication(2)}><a>Two Digit Multiplication</a></div>
                        <div className="contentListItem" onClick={() => this.handleMultiplication(3)}><a>Three Digit Multiplication</a></div>
                        <div className="contentListItem" onClick={() => this.handleMultiplication(4)}><a>Four Digit Multiplication</a></div>
                    {/* </div> */}
                </div>
            </div>
        )
    }
}

export default MultiplicationSection