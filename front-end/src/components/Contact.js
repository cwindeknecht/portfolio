import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import "../css/Contact.css";

let backend = process.env.REACT_APP_BACKEND || process.env.HEROKU_BACKEND;

class Contact extends Component {
  state = {
    name: "",
    title: "",
    body: "",
    email: "",
    copy: false,
    errorEmpty: false,
    errorMessage: "",
  };

  componentDidUpdate = (prevProps, prevState) => {
    let { name, title, body, email, copy } = this.state;
    if (prevState.copy !== this.state.copy) {
      if (copy && !email) {
        this.setState({ errorMessage: "I need an email address if you want a copy." });
      } else {
        this.setState({ errorMessage: "" });
      }
    }
    if (this.state.errorEmpty && (name || title || body || email)) {
      this.setState({ errorMessage: "", errorEmpty: false });
    }
  };

  handleInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleCheck = () => {
    this.setState({ copy: !this.state.copy });
  };

  handleSubmit = event => {
    event.preventDefault();

    let { name, title, body, email, copy, errorMessage } = this.state;
    let message = { name, title, body, email };
    
    if ((name || title || body || email) && !errorMessage) {
      axios
        .post(`${backend}/email/${copy}`, message)
        .then(response => {
          console.log("Response", response);
        })
        .catch(error => {
          console.log("Error", error);
        });
    } else {
      this.setState({ errorMessage: "So... I don't want a blank e-mail.  Sorry to be blunt.", errorEmpty: true });
    }
  };

  render() {
    let { name, title, body, email, copy, errorMessage } = this.state;
    return (
      <div className="contact">
        <form className="contact__form">
          <div className="form__halves">
            <input
              name="name"
              value={name}
              className="form__input--half"
              placeholder="Your Name"
              onChange={this.handleInput}
            />
            <input
              name="email"
              value={email}
              className="form__input--half"
              placeholder="Your Email"
              onChange={this.handleInput}
            />
          </div>
          <input
            name="title"
            value={title}
            className="form__input"
            placeholder="Title of Message"
            onChange={this.handleInput}
          />

          <textarea
            name="body"
            value={body}
            className="form__textarea"
            placeholder="Your Message"
            onChange={this.handleInput}
          />
          <div className="form__check">
            <label className="check__label">Would you like a copy of this message?</label>
            <input type="checkbox" name="copy" value={copy} className="check__box" onChange={this.handleCheck} />
          </div>
          {errorMessage ? <div className="form__error">{errorMessage}</div> : <div className="form__error--empty" />}
          <button
            type="submit"
            className={errorMessage ? "form__button--error" : "form__button"}
            onClick={this.handleSubmit}>
            <i className="fas fa-envelope fa-2x button__icon" />
          </button>
        </form>
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
