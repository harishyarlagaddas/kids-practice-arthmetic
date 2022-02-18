import React, { useState } from 'react'
import './ContentSection.css'

export default function ContentSection(props) {
    const [value1, setValue1] = useState('')
    const [value2, setValue2] = useState('')

    return (
        <div className="contentSectionMain">
            <div className="title">{props.operation}</div>
            <div className='contentSectionLayout'>
                <div className='contentSectionOperandLayout'>
                    <div className='contentSectionOperandText'>Max value of 1st Number: </div>
                    <input className='contentSectionOperandInput'
                        value={value1}
                        onChange = {event => {
                            if (!isNaN(event.target.value)) {
                                setValue1(event.target.value)
                            } else {
                                console.log('It is not a number. Please enter the number')
                            }
                            
                        }}
                    />
                </div>
                <div className='contentSectionOperandLayout'>
                    <div className='contentSectionOperandText'>Max value of 2nd Number: </div>
                    <input className='contentSectionOperandInput'
                        value={value2}
                        onChange = { event => {
                            if (!isNaN(event.target.value)) {
                                setValue2(event.target.value)
                            } else {
                                console.log('It is not a number. Please enter the number')
                            }
                        }}
                    />
                </div>
                <button className='contentSectionSubmitButton'
                    onClick={ () => {
                        props.handleOperation(value1, value2)
                    }}
                >
                    Go
                </button>
            </div>
        </div>
    )
}