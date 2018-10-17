import React, { Component } from "react";

import "../css/Random.css";

export default class Random extends Component {
  state = {
    pexels: false,
    guess: false,
  };

  expand = event => {
    let { id } = event.target;
    let hide = document.getElementById(id === "pexels" ? "guess" : "pexels");
    hide.classList.add("random__section--hidden");
    setTimeout(() => {
      document.getElementById("container").removeChild(hide);
      document.getElementById(id).classList.add("random__expanded");
    }, 1000);
    this.setState({ [event.target.id]: true });
  };

  render() {
    let { pexels, guess } = this.state;
    return (
      <div id="container" className="random">
        <div id="pexels" className="random__section random__section--left" onClick={this.expand}>
          <div className="section__title">Fun with Words</div>
          {pexels ? <div className="section__search" /> : null}
        </div>
        <div id="guess" className="random__section random__section--right" onClick={this.expand}>
          <div className="section__title">Guessing Game</div>
          {guess ? <div className="section__game" /> : null}
        </div>
      </div>
    );
  }
}
