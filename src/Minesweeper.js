import React, { Component } from 'react';
import './App.css';
// Import Components
import BoardHeader from './components/BoardHeader';
import Board from './components/Board';
import Instructions from './components/Instructions';


class Minesweeper extends Component {

  constructor() {
    super();

    this.state = {
      gameStatus: "waiting",
      time: 0,
      flagCount: 10,
      openCells: 0,
      mines: 10,
      rows: 10,
      columns: 10
    };

    this.baseState = this.state;
  }

  componentDidUpdate(nextProps, nextState) {
    if (this.state.gameStatus === "running") {
      this.checkForWinner();
    }
  }


  checkForWinner = () => {
    if (this.state.mines + this.state.openCells >= this.state.rows * this.state.columns) {
      this.setState({
        gameStatus: "winner"
      }, alert("you won!"))
    }
  }

  componentWillMount() {
    this.intervals = [];
  }

  tick = () => {
    if (this.state.openCells > 0 && this.state.gameStatus === "running") {
      let time = this.state.time + 1;
      this.setState({ time });
    }
  }

  setInterval = (fn, t) => {
    this.intervals.push(setInterval(fn, t));
  }

  reset = () => {
    this.intervals.map(clearInterval);
    this.setState(Object.assign({}, this.baseState), () => {
      this.intervals = [];
    });
  };

  endGame = () => {
    this.setState({
      gameStatus: "ended"
    });
  };

  changeFlagAmount = amount => {
    this.setState({ flagCount: this.state.flagCount + amount });
  };

  handleCellClick = () => {
    if (this.state.openCells === 0 && this.state.gameStatus !== "running") {
      this.setState({
        gameStatus: "running"
      }, () => {
        this.setInterval(this.tick, 1000);
      })
    }

    this.setState(prevState => {
      return { openCells: prevState.openCells + 1 };
    })
  }

  render() {
    return (
      <div>
        <div className="minesweeper-container">
          <BoardHeader time={this.state.time} flagsUsed={this.state.flagCount} reset={this.reset} status={this.state.gameStatus} />
          <Board rows={this.state.rows} columns={this.state.columns} mines={this.state.mines} status={this.state.gameStatus} openCells={this.state.openCells} handleCellClick={this.handleCellClick} changeFlagAmount={this.changeFlagAmount} endGame={this.endGame} />
        </div>

        <Instructions />
      </div>

    );
  };

};

export default Minesweeper;