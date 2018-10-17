import React, { Component } from "react";
import axios from "axios";

import "../css/Contact.css";

export default class Contact extends Component {
  state = {
    pexels: false,
    guess: false,
  };

  render() {
    let { pexels, guess } = this.state;
    return (
      <div className="random">
        <div className="random__section">
          <div className="section__title">Fun with Words</div>
          {pexels ? <div className="section__search" /> : null}
        </div>
        <div className="random__section">
          <div className="section__title">Guessing Game</div>
          {guess ? <div className="section__game" /> : null}
        </div>
      </div>
    );
  }
}
