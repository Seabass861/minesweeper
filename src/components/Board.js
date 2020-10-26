import React, { Component } from 'react';
import Row from './Row';

class Board extends Component {

    constructor(props) {
        super(props);

        this.state = {
            rows: this.createBoard(props)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (
            this.props.openCells > nextProps.openCells ||
            this.props.columns !== nextProps.columns
        ) {
            this.setState({
                rows: this.createBoard(nextProps)
            });
        }
    }

    createBoard = props => {

        // Create Board

        let board = [];

        // Create Rows & Columns for Board

        for (let i = 0; i < props.rows; i++) {
            board.push([]);

            for (let j = 0; j < props.columns; j++) {
                board[i].push({
                    x: j,
                    y: i,
                    count: 0,
                    isOpen: false,
                    hasMine: false,
                    hasFlag: false

                });
            }

        }

        // Add Mines to Random Cells

        for (let i = 0; i < props.mines; i++) {

            // Choose Random Row & Column & add Mine
            let randomRow = Math.floor(Math.random() * props.rows);
            let randomColumn = Math.floor(Math.random() * props.columns);

            let cell = board[randomRow][randomColumn];

            if (cell.hasMine) {
                i--;
            } else {
                cell.hasMine = true;
            }

        }
        return board;

    }

    // create function to turn on and off flags
    flag = cell => {
        if (this.props.status === "ended") {
            return;
        }
        let rows = this.state.rows;

        cell.hasFlag = !cell.hasFlag;
        this.setState({ rows });
        this.props.changeFlagAmount(cell.hasFlag ? -1 : 1);
    };

    // Open Cell

    open = cell => {

        if (this.props.status === "ended") {
            return;
        }

        let asyncCountMines = new Promise(resolve => {
            let mines = this.findMines(cell);
            resolve(mines);
        });

        asyncCountMines.then(numberOfMines => {

            console.log(numberOfMines);
            let rows = this.state.rows;
            let current = rows[cell.y][cell.x];


            if (current.hasMine && this.props.openCells === 0) {
                console.log('cell already has mine! reset board');
                let newRows = this.createBoard(this.props);
                this.setState({
                    rows: newRows
                }, () => {
                    this.open(cell);
                });
            } else {
                if (!cell.hasFlag && !current.isOpen) {
                    this.props.handleCellClick();

                    current.isOpen = true;
                    current.count = numberOfMines;

                    console.log(current);

                    this.setState({ rows });

                    if (!current.hasMine && numberOfMines === 0) {
                        this.findAroundCell(cell);
                    }

                    if (current.hasMine && this.props.openCells !== 0) {
                        this.props.endGame();
                    }


                }
            }

        })


    };

    // Find Mines in Proximity

    findMines = cell => {
        let minesInProximity = 0;
        for (let row = -1; row <= 1; row++) {
            for (let col = -1; col <= 1; col++) {
                if (cell.y + row >= 0 && cell.x + col >= 0) {
                    if (cell.y + row < this.state.rows.length && cell.x + col < this.state.rows[0].length) {
                        if (this.state.rows[cell.y + row][cell.x + col].hasMine && !(row === 0 && col === 0)) {
                            minesInProximity++;
                        }
                    }

                }
            }
        }
        return minesInProximity;
    }

    // Find Open Cells Around 

    findAroundCell = cell => {

        let rows = this.state.rows;

        for (let row = -1; row <= 1; row++) {
            for (let col = -1; col <= 1; col++) {
                if (cell.y + row >= 0 && cell.x + col >= 0) {
                    if (cell.y + row < rows.length && cell.x + col < rows[0].length) {

                        if (!rows[cell.y + row][cell.x + col].hasMine && !rows[cell.y + row][cell.x + col].isOpen) {
                            this.open(rows[cell.y + row][cell.x + col]);
                        }

                    }

                }
            }
        }

    }


    // Render Board

    render() {

        return (
            <div className="board">

                {this.state.rows.map((row, index) => {

                    return (
                        <Row key={index} cells={row} open={this.open} flag={this.flag} />
                    )
                })}

            </div>

        );

    }

}

export default Board;