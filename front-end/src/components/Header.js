import React, { Component } from "react";
import { connect } from "react-redux";

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

    // Store hidden items first click
    let hidden = Array.from(document.getElementsByClassName("dropdown__item--hidden"));

    // Store hidden items every time after
    if (hidden.length < 5) {
      hidden = Array.from(document.getElementsByClassName("dropdown__item--fadeout"));
    }

    // Store visible items
    let shown = Array.from(document.getElementsByClassName("dropdown__item--fadein"));

    console.log("FUCKING HIDDEN", hidden)
    if (this.state.open) {
      // Reverse the fade out order
      shown.slice().reverse().forEach((element,i) => {
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
    } else {
      hidden.forEach((element, i) => {
        if (element.id !== this.state.current) {
          let color = i < 3 ? i : i - 3;
          setTimeout(() => {
            element.className = "dropdown__item--fadein";
            element.style.background = this.state.colors[color];
          }, timer);
          timer += 200;
        }
      });
      this.setState({ open: true });
    }
  };

  render() {
    let { current } = this.state;
    return (
      <div className="header">
        <div className="header__dropdown">
          <div id="controller" className="dropdown__title" onClick={this.handleDropdown}>
            {current}
          </div>
          <div id="Home" className="dropdown__item--hidden">
            Home
          </div>
          <div id="About" className="dropdown__item--hidden">
            About
          </div>
          <div id="Projects" className="dropdown__item--hidden">
            Projects
          </div>
          <div id="Resume" className="dropdown__item--hidden">
            Resume
          </div>
          <div id="Contact" className="dropdown__item--hidden">
            Contact
          </div>
        </div>
      </div>
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
