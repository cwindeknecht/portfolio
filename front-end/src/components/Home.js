import React, { Component } from "react";
import { connect } from "react-redux";

import "../css/Home.css";

class Home extends Component {
  render() {
    return (
      <div className="home">
        Home
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
)(Home);
