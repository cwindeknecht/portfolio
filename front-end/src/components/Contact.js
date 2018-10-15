import React, { Component } from "react";
import { connect } from "react-redux";

import "../css/Contact.css";

class Contact extends Component {
  state = {
    name: "",
    title: "",
    body: "",
    email: "",
    copy: false,
  };

  handleInput = event => {
    console.log("e", event.target.name);
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    let { name, title, body, email, copy } = this.state;
    return (
      <div className="contact">
        <form className="contact__form">
          <input name="name" value={name} className="form__input" placeholder="Your Name" onChange={this.handleInput} />
          <input
            name="email"
            value={email}
            className="form__input"
            placeholder="Your Email"
            onChange={this.handleInput}
          />
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
            <input type="checkbox" name="copy" value={copy} className="check__box" onChange={this.handleInput} />
          </div>
          <button type="submit" className="form__button">
            <i class="fas fa-envelope fa-2x button__icon" />
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
