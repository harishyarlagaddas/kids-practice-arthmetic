import React from 'react'
import '../common/ContentSection.css'

class SubtractionSection extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    handleSubtraction(digits) {
        this.props.handleSubtraction(digits)
    }

    render() {
        return (
            <div className="contentSectionMain">
                <div className="title">Subtraction</div>
                <div className="gridItemMain">
                    {/* <div className="contentListSection"> */}
                        <div className="contentListItem" onClick={() => this.handleSubtraction(1)}><a>One Digit Subtraction</a></div>
                        <div className="contentListItem" onClick={() => this.handleSubtraction(2)}><a>Two Digit Subtraction</a></div>
                        <div className="contentListItem" onClick={() => this.handleSubtraction(3)}><a>Three Digit Subtraction</a></div>
                        <div className="contentListItem" onClick={() => this.handleSubtraction(4)}><a>Four Digit Subtraction</a></div>
                    {/* </div> */}
                </div>
            </div>
        )
    }
}

export default SubtractionSection