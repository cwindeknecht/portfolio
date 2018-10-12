import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from './components/Header.js'

import './css/App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        Yeuh
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    current: state.current,
  };
};

export default connect(
  mapStateToProps,
  null,
)(App);