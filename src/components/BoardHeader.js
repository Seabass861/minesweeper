import React from 'react';
import SmileyBusy from '../images/smiley-busy.svg';
import SmileyComplete from '../images/smiley-complete.svg';
import SmileyLost from '../images/smiley-lost.svg';
import TimerImage from '../images/timer.svg';
import FlagImage from '../images/flag.svg';

const BoardHeader = props => {

    // Timer
    let minutes = Math.floor(props.time / 60);
    let seconds = props.time - minutes * 60 || 0;

    let formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    let time = `${minutes}:${formattedSeconds}`;

    let status = {};

    if (props.status === "running" || props.status === "waiting") {
        status = <img onClick={props.reset} src={SmileyBusy} className="reset-image" alt="smiley complete" />

    } else if (props.status === "ended") {
        status = <img onClick={props.reset} src={SmileyLost} className="reset-image" alt="smiley lost" />

    } else {
        status = <img onClick={props.reset} src={SmileyComplete} className="reset-image" alt="smiley complete" />

    }



    return (
        <div className="board-header">

            <div className="flags">{props.flagsUsed}<img src={FlagImage} className="flag-image" alt="Flag" /></div>
            <div className="reset">{status}</div>

            <div className="timer"><img src={TimerImage} className="timer-image" alt="Timer" />{time}</div>
            <div className="clear"></div>

        </div>
    );

};

export default BoardHeader;