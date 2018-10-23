import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Route, Link } from "react-router-dom";

import Home from "./Home";

import "../css/Contact.css";

let backend = process.env.HEROKU_BACKEND;

export default class Contact extends Component {
  state = {
    name: "",
    title: "",
    body: "",
    email: "",
    copy: false,
    errorEmpty: false,
    errorMessage: "",
    submitted: false,
    done: false,
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
      this.setState({ submitted: true });
      axios
        .post(`${backend}/email/${copy}`, message)
        .then(response => {
          this.setState({ name: "", title: "", body: "", email: "", done: true });
        })
        .catch(error => {
          console.log("Error", error);
        });
    } else {
      this.setState({ errorMessage: "So... I don't want a blank e-mail.  Sorry to be blunt.", errorEmpty: true });
    }
  };

  handleNope = () => {
    this.props.setHeader("Home");
  };

  render() {
    let { name, title, body, email, copy, errorMessage, done, submitted } = this.state;
    return !done ? (
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
            {submitted ? (
              <i className="fa fa-spinner fa-spin package__image" />
            ) : (
              <i className="fas fa-envelope fa-2x button__icon" />
            )}
          </button>
        </form>
      </div>
    ) : (
      <div className="contact">
        <div className="contact--done">
          <div className="contact--done__title">
            Assuming you provided a legitmate e-mail address, you should see a copy in your inbox! Thanks for trying out
            my messages.
          </div>
          <div className="contact--done__buttons">
            <div className="buttons__title">Want to send another message for some reason?</div>
            <button className="buttons__button" onClick={this.handleNewMessage}>
              Sure
            </button>
            <Link to="/">
              <button className="buttons__button" onClick={this.handleNope}>
                Nope
              </button>
            </Link>
            <Route exact path="/" component={Home} />
          </div>
        </div>
      </div>
    );
  }
}
