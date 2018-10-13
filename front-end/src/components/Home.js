import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import { packages } from "../data/data";

import "../css/Home.css";

let backend = process.env.REACT_APP_BACKEND || process.env.HEROKU_BACKEND;

class Home extends Component {
  state = {
    carousel: 2,
  };

  componentDidMount = () => {
    this.determineStartEnd();
  };

  componentDidUpdate = prevState => {
    if (prevState.carousel !== this.state.carousel) {
      this.determineStartEnd();
    }
  };

  determineStartEnd = () => {
    let pckgs;
    let length = packages.length;
    let { carousel } = this.state;
    // Probably a far better way to do this...
    // But I'm not using reactstrap or the like.  Not for a quick project where
    // I don't have hours to spend figuring out their garbage custom styling abilities
    switch (carousel) {
      case 0:
        pckgs = [packages[length - 2], packages[length - 1], packages[0], packages[1], packages[2]];
        break;
      case 1:
        pckgs = [packages[length - 1], packages[0], packages[1], packages[2], packages[3]];
        break;
      case length - 1:
        pckgs = [packages[length - 3], packages[length - 2], packages[length - 1], packages[0], packages[1]];
        break;
      case length - 2:
        pckgs = [packages[length - 4], packages[length - 3], packages[length - 2], packages[length - 1], packages[0]];
        break;
      default:
        pckgs = [
          packages[carousel - 2],
          packages[carousel - 1],
          packages[carousel],
          packages[carousel + 1],
          packages[carousel + 2],
        ];
    }
    return pckgs;
  };

  handleCarousel = left => {
    let { carousel } = this.state;
    if (left) {
      carousel === 0 ? (carousel = packages.length - 1) : carousel--;
      this.setState({ carousel });
    } else {
      carousel === packages.length - 1 ? (carousel = 0) : carousel++;
      this.setState({ carousel });
    }
  };

  render() {
    let pckgs = this.determineStartEnd();
    return (
      // <div className="home" onClick={this.getrandom}>
      <div className="home" onClick={this.getrandom}>
        <div className="home__packages">
          <i className="fas fa-angle-left packages__arrow" onClick={this.handleCarousel.bind(this, true)} />
          {pckgs.map((pckg, i) => {
            return (
              <div key={pckg.name} className="packages__package">
                <div className="package__name">{pckg.name}</div>
                <img alt={pckg.name} className="package__image" src={pckg.image} />
              </div>
            );
          })}
          <i className="fas fa-angle-right packages__arrow" onClick={this.handleCarousel.bind(this, false)} />
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
)(Home);
