import React, { Component } from "react";
import { connect } from "react-redux";

import "../css/Header.css";

class Header extends Component {
  state = {
    current: "Home",
  };

  handleDropdown = () => {};

  render() {
    let { current } = this.state;
    return (
      <div className="header">
        <div className="header__dropdown">
          <div className="dropdown__title">{current}</div>
          <div id="item1" className="dropdown__item--hidden">
            Home
          </div>
          <div id="item2" className="dropdown__item--hidden">
            About
          </div>
          <div id="item3" className="dropdown__item--hidden">
            Projects
          </div>
          <div id="item4" className="dropdown__item--hidden">
            Resume
          </div>
          <div id="item5" className="dropdown__item--hidden">
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
