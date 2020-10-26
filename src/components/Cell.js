import React from 'react';
import MineImage from '../images/mine.svg';
import FlagImage from '../images/flag.svg';


const Cell = props => {

    let renderCell = () => {

        if (props.data.isOpen) {
            if (props.data.hasMine) {
                return (
                    <div className="cell open" onContextMenu={e => { e.preventDefault(); }} onClick={() => props.open(props.data)}><img src={MineImage} className="mine-image" alt="Mine" /></div>
                )

            } else if (props.data.count === 0) {
                return (
                    <div className="cell open" onContextMenu={e => { e.preventDefault(); props.flag(props.data); }} onClick={() => props.open(props.data)}></div>
                )

            } else {
                return (
                    <div className="cell open" onContextMenu={e => { e.preventDefault(); }} onClick={() => props.open(props.data)}><p>{props.data.count}</p></div>
                )
            }

        } else if (props.data.hasFlag) {
            return (
                <div className="cell open-flag" onContextMenu={e => { e.preventDefault(); props.flag(props.data); }} onClick={() => props.open(props.data)} >
                    <img src={FlagImage} className="flag-image" alt="Flag" />
                </div>
            );
        }

        else {
            return (
                <div className="cell" onContextMenu={e => { e.preventDefault(); props.flag(props.data); }} onClick={() => props.open(props.data)}></div>
            )

        }

    }


    return renderCell();

};

export default Cell;