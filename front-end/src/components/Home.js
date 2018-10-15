import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import DownOpen from "../img/DownOpen.png";
import DownShut from "../img/DownShut.png";
import DownSmile from "../img/DownSmile.png";
import LeftOpen from "../img/LeftOpen.png";
import LeftShut from "../img/LeftShut.png";
import LeftSmile from "../img/LeftSmile.png";
import RightOpen from "../img/RightOpen.png";
import RightShut from "../img/RightShut.png";
import RightSmile from "../img/RightSmile.png";

import { packages } from "../data/data";

import "../css/Home.css";

// let backend = process.env.REACT_APP_BACKEND || process.env.HEROKU_BACKEND;

class Home extends Component {
  state = {
    carousel: 2,
    current: 0,
    currentMessage: "...",
    dude: 0,
    clear: [],
    done: false,
    me: null,
  };

  componentDidMount = () => {
    this.getImages();
    this.determineStartEnd();
    this.getMessages();
    this.enterDude();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.carousel !== this.state.carousel) {
      this.determineStartEnd();
    }
    if (prevState.current !== this.state.current) {
      this.getDude();
    }
  };

  componentWillUnmount = () => {
    this.state.clear.forEach(code => {
      clearTimeout(code);
    });
  };

  getImages = () => {
    packages.forEach(pckg => {
      axios.get(`https://api.github.com/users/${pckg.username}`).then(result => {
        pckg.image = result.data.avatar_url;
      });
    });
    axios.get(`https://api.github.com/users/cwindeknecht`).then(result => {
      this.setState({ me: result.data.avatar_url });
    });
  };

  determineStartEnd = () => {
    let pckgs;
    let length = packages.length;
    let { carousel } = this.state;
    // Probably a far better way to do this...
    // But I'm not using reactstrap or the like.  Not for a quick project where
    // I don't have hours to spend figuring out their garbage custom styling.
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

  getMessages = () => {
    let { current, clear } = this.state;
    const messages = [
      "Hey, I'm pretty creepy right?  Yeah, I'm no artist... But I had an idea and I went with it.",
      "Anywho... Hello!  Welcome to my portfolio website.  Have a look around.  Learn a bit about me.",
      "Above you can see some of the frameworks and languages of which I am familiar.",
      "If you click on the navigation button at the top left of the screen, you can check out my other pages.",
      "The top right has my Github and LinkedIn profiles if that sort of thing interests you.",
      "Maybe you will even contact me and let me know what you think?  I think you should.",
    ];
    const change = () => {
      if (document.getElementById("welcome")) {
        document.getElementById("welcome").className = current % 2 === 1 ? "welcome__text" : "welcome__text--alt";
        this.setState({ currentMessage: messages[current], current: ++current, clear });
        if (current > messages.length - 1) {
          clearInterval(message);
          this.leaveDude();
          this.setState({ currentMessage: "Well, I'm leaving now, I'll stop creepin' you out.  Bye bye." });
          setTimeout(() => {
            let messages = document.getElementById("messages");
            while (messages.firstChild) {
              messages.removeChild(messages.firstChild);
            }
            this.setState({ done: true });
          }, 5000);
        }
      }
    };
    const message = setInterval(change, 7000);
    clear.push(message);
  };

  getDude = () => {
    let down = [DownOpen, DownShut, DownSmile];
    let left = [LeftOpen, LeftShut, LeftSmile];
    let right = [RightOpen, RightShut, RightSmile];
    switch (this.state.current) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 6:
        this.dude(down);
        break;
      case 4:
        this.dude(left);
        break;
      default:
        this.dude(right);
    }
  };

  dude = images => {
    let { clear } = this.state;
    let i = 0;
    let talk = () => {
      let img = document.getElementById("dude");
      if (img) img.src = images[i % 2 === 1 ? 0 : 1];
      i++;
      if (i === 21) {
        clearInterval(speech);
      }
    };
    let smile = () => {
      let img = document.getElementById("dude");
      if (img) img.src = images[2];
      clearInterval(creepy);
    };
    let speech = setInterval(talk, 150);
    let creepy = setInterval(smile, 6000);
    clear.push(speech);
    clear.push(creepy);
    this.setState({ clear });
  };

  // DRY, I know... probably as simple as setting a bool on state
  leaveDude = () => {
    this.dude([DownOpen, DownShut, DownSmile]);
    let img = document.getElementById("dude");
    if (img) img.className = "walk-away";
  };

  enterDude = () => {
    this.dude([DownShut, DownShut, DownSmile]);
    let img = document.getElementById("dude");
    if (img) img.className = "walk-to";
  };

  render() {
    let pckgs = this.determineStartEnd();
    let { currentMessage } = this.state;
    return (
      <div className="home">
        <div className="home__packages">
          {pckgs.map((pckg, i) => {
            return (
              <div key={pckg.name} className={`packages__package packages__package${i}`}>
                <div className="package__name">{pckg.name}</div>
                {pckg.image ? (
                  <img alt={pckg.name} className="package__image" src={pckg.image} />
                ) : (
                  <i className="fa fa-spinner fa-spin package__image" />
                )}
              </div>
            );
          })}
        </div>
        <div className="home__arrows">
          <button className="arrows__button" onClick={this.handleCarousel.bind(this, true)}>
            <i className="fas fa-angle-left fa-3x button__icon" />
          </button>
          <button className="arrows__button" onClick={this.handleCarousel.bind(this, false)}>
            <i className="fas fa-angle-right fa-3x button__icon" />
          </button>
        </div>
        <div id="messages" className="home__home">
          <img id="dude" alt="dude" className="home__dude"/>
          <div className="home__welcome">
            <div id="welcome" className="welcome__text">
              {currentMessage}
            </div>
          </div>
        </div>
        {this.state.done ? (
          <div className="home__done">
            <div className="done__section">
              <img alt="me" className="section__image" src={this.state.me} />
            </div>
            <div className="done__section">
              <div className="section__text">
                <div className="text__segment">
                  Hello, my name is Cody Windeknecht. I am a goofy person if that intro didn't make it apparent. More
                  importantly, I am a recent graduate of Lambda School and a passionate coder. Front-end, back-end, it
                  is all fun and exciting. Except for the Google Places API.
                </div>
                <div className="text__segment">
                  As much as I enjoy web development, I am open and willing to branch out into any variation of coding.
                  Going beyond Lambda's teaching of C and getting a better understanding of languages like C#, C++, and
                  Java are of high importance to me. Even if I were to do web development for the duration of my life, I
                  will still make that a high priority.
                </div>
                <div className="text__segment">
                  After years in retail management and a degree in Philosophy and English, I am looking for a change of
                  pace. I loved building websites in my early teens, so I figured I would give it a shot. My initial plan
                  was the traditional route, so I took the GRE and went to the University of Tennessee at Chattanooga
                  to attend their Master's program. After an enlightening conversation with a professor, I decided to
                  pursue something that was as equally focused on coding as it was on computer science. When I read about
                  Lambda School, I realized how tailor-made it seemed for me. Turns out I still love it at much as I did
                  when I was younger and want to bring that passion to the world.
                </div>
              </div>
            </div>
          </div>
        ) : null}
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
