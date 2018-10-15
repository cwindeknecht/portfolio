import React, { Component } from "react";
import { connect } from "react-redux";

import "../css/Projects.css";

import { projects } from "../data/data.js";

class Projects extends Component {
  state = {
    current: 0,
  };

  handleCurrent = bool => {
    let { current } = this.state;
    if (bool) {
      current === 2 ? (current = 0) : current++;
    } else {
      current === 0 ? (current = 2) : current--;
    }
    this.setState({ current });
  };

  render() {
    let { current } = this.state;
    return (
      <div className="projects">
        <div className="projects__arrow">
          <button className="arrow__button" onClick={this.handleCurrent.bind(this, true)}>
            <i className="fas fa-angle-left fa-3x button__icon" />
          </button>
        </div>
        <div className="projects__project">
          <img alt={projects[current].name} src={projects[current].gif} className="project__gif" />
          <div className="project__info">
            <div className="info__title">
              <a href={projects[current].deployed} className="title__name" target="_blank" rel="noopener noreferrer">
                Deployed --- {projects[current].name}
              </a>
              <a href={projects[current].git} className="title__icon" target="_blank" rel="noopener noreferrer">
                <i style={{ color: "#eec49e" }} className="fab fa-github fa-3x" />
              </a>
            </div>
            <div className="info__description">
              {projects[current].description.map(line => {
                return (
                  <div key={line} className="description__line">
                    {line}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="projects__arrow">
          <button className="arrow__button" onClick={this.handleCurrent.bind(this, true)}>
            <i className="fas fa-angle-right fa-3x button__icon" />
          </button>
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
)(Projects);
