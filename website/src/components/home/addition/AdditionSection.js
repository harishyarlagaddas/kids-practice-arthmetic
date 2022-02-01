import React from 'react'
import '../common/ContentSection.css'

class AdditionSection extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    handleAddition(digits) {
        console.log('handleAddition digits: '+digits)
        this.props.handleAddition(digits)
    }

    render() {
        return (
            <div className="contentSectionMain">
                <div className="title">Addition</div>
                <div className="gridItemMain">
                    {/* <div className="contentListSection"> */}
                        <div className="contentListItem" onClick={() => this.handleAddition(1)}><a>One Digit Addition</a></div>
                        <div className="contentListItem" onClick={() => this.handleAddition(2)}><a>Two Digit Addition</a></div>   
                        <div className="contentListItem" onClick={() => this.handleAddition(3)}><a>Three Digit Addition</a></div>
                        <div className="contentListItem" onClick={() => this.handleAddition(4)}><a>Four Digit Addition</a></div>
                    {/* </div> */}
                </div>
            </div>
        )
    }
}

export default AdditionSection