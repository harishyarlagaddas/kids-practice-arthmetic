import React, { useEffect } from 'react';
import { useStopwatch } from 'react-timer-hook';

function Timer(props) {
    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        reset,
      } = useStopwatch({ autoStart: true });

      useEffect(() => {
          let myInterval = setInterval(() => {
            props.setTime(('0'+minutes).slice(-2)+':'+('0'+seconds).slice(-2))
          }, 1000)

          return () => {
              clearInterval(myInterval)
          }
      })
      return (
          <div>
              {minutes.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}
              :
              {seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}
          </div>
      )
}

export default Timer