import React, { Component } from "react";

import "../css/Random.css";

export default class Random extends Component {
  state = {
    pexels: false,
    guess: false,
  };

  expand = event => {
    let { pexels, guess } = this.state;
    //   Cheap way to remove event handler as none of the examples I found worked
    if (pexels || guess) return;

    let { id } = event.target;
    let hideId = id === "pexels" ? "guess" : "pexels";
    let expand = document.getElementById(id);
    let hide = document.getElementById(hideId);
    hide.classList.add("random__section--hidden");
    setTimeout(() => {
      document.getElementById("container").removeChild(hide);
      expand.classList.add("random__expanded");
    }, 1000);
    this.setState({ id: true, hideId: false });
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
