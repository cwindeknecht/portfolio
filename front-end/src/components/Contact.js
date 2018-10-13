import React, { Component } from "react";
import { connect } from "react-redux";

import "../css/Contact.css";

class Contact extends Component {
  render() {
    return (
      <div className="contact">
        Contact
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
)(Contact);
