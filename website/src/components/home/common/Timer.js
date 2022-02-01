import React from 'react';
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

      return (
          <div>
              {minutes.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}
              :
              {seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}
          </div>
      )
}

export default Timer