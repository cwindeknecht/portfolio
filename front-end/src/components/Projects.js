import React, { Component } from "react";
import { connect } from "react-redux";

import "../css/Projects.css";

class Projects extends Component {
  render() {
    return <div className="projects">Projects</div>;
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
)(Projects);
