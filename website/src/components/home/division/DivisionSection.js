import React from 'react'
import '../common/ContentSection.css'

class DivisionSection extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    handleDivision(digits) {
        this.props.handleDivision(digits)
    }

    render() {
        return (
            <div className="contentSectionMain">
                <div className="title">Division</div>
                <div className="gridItemMain">
                    {/* <div className="contentListSection"> */}
                        <div className="contentListItem" onClick={() => this.handleDivision(1)}><a>One Digit Division</a></div>
                        <div className="contentListItem" onClick={() => this.handleDivision(2)}><a>Two Digit Division</a></div>
                        <div className="contentListItem" onClick={() => this.handleDivision(3)}><a>Three Digit Division</a></div>
                        <div className="contentListItem" onClick={() => this.handleDivision(4)}><a>Four Digit Division</a></div>
                    {/* </div> */}
                </div>
            </div>
        )
    }
}

export default DivisionSection