import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from "../components/Home";
import About from "../components/About";
import Contact from "../components/Contact";
import Projects from "../components/Projects";

import "../css/Header.css";

class Header extends Component {
  state = {
    current: "Home",
    open: false,
    colors: ["#262216", "#49412c", "#97743a"],
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
        if (element.id !== this.state.current) {
          let color = i < 3 ? i : i - 3;
          let id = setTimeout(() => {
            element.className = "dropdown__item--fadeout";
            element.style.background = this.state.colors[color];
          }, timer);
          timer += 200;
          ids.push(id);
        }
      });
      this.setState({ open: false });
      // Fade-in
    } else {
      elements.forEach((element, i) => {
        if (element.id !== this.state.current) {
          let color = i < 3 ? i : i - 3;
          setTimeout(() => {
            element.className = "dropdown__item--fadein";
            element.style.background = this.state.colors[color];
          }, timer);
          timer += 200;
        } else {
          element.className = "dropdown__item--hidden";
        }
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
            <Link id="About" className="dropdown__item--hidden" onClick={this.handleChoice} to="/about">
              About
            </Link>
            <Link id="Projects" className="dropdown__item--hidden" onClick={this.handleChoice} to="/projects">
              Projects
            </Link>
            <a
              id="Resume"
              href="https://resume.creddle.io/resume/8bhrij0878e"
              target="_blank"
              rel="noopener noreferrer"
              id="Resume"
              className="dropdown__item--hidden"
              onClick={this.handleChoice}>
              Resume
            </a>
            <Link id="Contact" className="dropdown__item--hidden" onClick={this.handleChoice} to="/contact">
              Contact
            </Link>
          </div>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/projects" component={Projects} />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    current: state.current,
  };
};

export default connect(
  mapStateToProps,
  null,
)(Header);
