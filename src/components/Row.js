import React from 'react';
import Cell from './Cell';

const Row = props => {



    let cells = props.cells.map((data, index) => {
        return (
            <Cell data={data} key={index} flag={props.flag} open={props.open} />
        );
    })

    return (
        <div className="row">
            {cells}
        </div>
    );

};

export default Row;