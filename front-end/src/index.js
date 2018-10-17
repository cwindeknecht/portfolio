import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from 'react-router-dom';

import Header from "./components/Header";

import "./css/index.css";

require('dotenv').config()

ReactDOM.render(
  <Router>
    <Header />
  </Router>,
  document.getElementById('root'),
);