import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import "../css/Home.css";

let backend = process.env.REACT_APP_BACKEND || process.env.HEROKU_BACKEND;
console.log("FUCKING BACKEND", backend)

class Home extends Component {
  getrandom = () => {
    let query = "mountains";
    axios
      .get(`${backend}/randompicture/${query}`)
      .then(results => console.log(results))
      .catch(err => console.log(err));
  };
  render() {
    return (
      <div className="home" onClick={this.getrandom}>
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
