import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from "../components/Home";
import Contact from "../components/Contact";
import Projects from "../components/Projects";
import Random from "../components/Random";

import "../css/Header.css";

export default class Header extends Component {
  state = {
    current: "Home",
    open: false,
    colors: ["#111c22", "#424652", "#786352"],
  };

  handleDropdown = () => {
    let timer = 0;
    let ids = [];

    let elements = Array.from(document.getElementById("dropdown").children).filter(element => {
      return element.className !== "dropdown__title";
    });

    // Fade-Out
    if (this.state.open) {
      elements.reverse().forEach((element, i) => {
        let color = i < 3 ? i : i - 3;
        // Fade the elements out
        let fadeout = setTimeout(() => {
          element.className = "dropdown__item--fadeout";
          element.style.background = this.state.colors[color];
        }, timer);
        timer += 100;
        // Hide the elements after they fade-out
        let hidden = setTimeout(() => {
          element.className = "dropdown__item--hidden";
        }, elements.length * 100);
        ids.push(fadeout, hidden);
      });
      this.setState({ open: false });
      // Fade-in
    } else {
      elements.forEach((element, i) => {
        // Originally had it not rendering the current option
        // if (element.id !== this.state.current) {
        let color = i < 3 ? i : i - 3;
        setTimeout(() => {
          element.className = "dropdown__item--fadein";
          element.style.background = this.state.colors[color];
        }, timer);
        timer += 100;
        // } else {
        //   element.className = "dropdown__item--hidden";
        // }
      });
      this.setState({ open: true });
    }
  };

  handleChoice = event => {
    event.target.id === "Resume"
      ? this.setState({ open: false })
      : this.setState({ current: event.target.id, open: false });
    this.handleDropdown(false);
  };

  setHeader = current => {
    this.setState({ current });
  };

  render() {
    let { current } = this.state;
    return (
      <Router>
        <div className="header">
          <div id="dropdown" className="header__dropdown">
            <div id={current} className="dropdown__title" onClick={this.handleDropdown}>
              {current}
            </div>
            <Link id="Home" className="dropdown__item--hidden" onClick={this.handleChoice} exact="true" to="/">
              Home
            </Link>
            <Link id="Projects" className="dropdown__item--hidden" onClick={this.handleChoice} to="/projects">
              Projects
            </Link>
            <a
              id="Resume"
              href="https://resume.creddle.io/resume/8bhrij0878e"
              target="_blank"
              rel="noopener noreferrer"
              className="dropdown__item--hidden"
              onClick={this.handleChoice}>
              Resume
            </a>
            <Link id="Contact" className="dropdown__item--hidden" onClick={this.handleChoice} to="/contact">
              Contact
            </Link>
            <Link id="Random" className="dropdown__item--hidden" onClick={this.handleChoice} to="/random">
              Random
            </Link>
          </div>
          <div className="header__icon">
            <a
              className="icon__container"
              href="https://www.linkedin.com/in/cwindeknecht/"
              target="_blank"
              rel="noopener noreferrer">
              <i style={{ color: "#424652" }} className="fab fa-linkedin fa-2x" />
            </a>
            <a
              className="icon__container"
              href="https://github.com/cwindeknecht"
              target="_blank"
              rel="noopener noreferrer">
              <i style={{ color: "#f1e1b0" }} className="fab fa-github fa-2x" />
            </a>
          </div>
          <Route exact path="/" render={() => <Home setHeader={this.setHeader} />} />
          <Route path="/contact" render={() => <Contact setHeader={this.setHeader} />} />
          <Route path="/projects" render={() => <Projects setHeader={this.setHeader} />} />
          <Route path="/random" render={() => <Random setHeader={this.setHeader} />} />
        </div>
      </Router>
    );
  }
}
