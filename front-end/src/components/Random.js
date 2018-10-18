import React, { Component } from "react";
import axios from "axios";

import "../css/Random.css";

let backend = process.env.REACT_APP_BACKEND || process.env.HEROKU_BACKEND;

// This class turned ugly / large.  Definetly needs to be refactored and
// pieced out to various components.
export default class Random extends Component {
  state = {
    search: "",
    submitted: false,
    photos: [],
    error: false,
    errorMessage: "",
    errorTen: false,
    types: [],
    selectedRadio: "Choose",
    guess: false,
    pexels: false,
    answer: "",
    showHint: false,
    showAnswer: false,
    correct: {},
    numberCorrect: 0,
    hintsUsed: 0,
    guessed: false,
  };

  componentDidMount = () => {
    this.getTypes();
  };

  expand = event => {
    let { pexels, guess } = this.state;
    //   Cheap way to remove event handler as none of the examples I found worked
    if (pexels || guess) return;

    let { id } = event.target;
    let hideId = id === "pexels" ? "guess" : "pexels";
    let expand = document.getElementById(id);
    let hide = document.getElementById(hideId);
    hide.classList.add("random__section--hidden");

    // Hide Title, Expand Choice
    setTimeout(() => {
      document.getElementById("container").removeChild(hide);
      expand.classList.add(id === "guess" ? "random__expanded--guess" : "random__expanded");
      expand.firstChild.classList.add("hidden");
    }, 1000);
    // Show the hidden element
    setTimeout(() => {
      expand.lastChild.classList.remove("hidden");
      expand.lastChild.classList.add("show");
    }, 2000);
    this.setState({ [id]: true, [hideId]: false });
  };

  handleInput = event => {
    if (event.target.value.length > 10) {
      this.setState({
        errorTen: true,
        boring: true,
        errorMessage:
          "Greater than 10 characters may be slow to load.  I blame the giant pictures and them not having a low resolution version...",
      });
    } else if (event.target.value.length > 40) {
      this.setState({ error: true, errorMessage: "40 characters is the max." });
    } else {
      this.setState({ errorTen: false, error: false, errorMessage: "" });
    }
    this.setState({ [event.target.name]: event.target.value });
  };

  handleBoring = event => {
    event.preventDefault();
    let { search } = this.state;

    if (!search) {
      return this.setState({
        errorMessage: "Definitely need to type something to search for something...",
      });
    }

    axios.get(`${backend}/pexelssingle/${search}`).then(response => {
      let url = response.data.photos[0].src.original;
      if (response.data.photos < 1) {
        return this.setState({
          error: true,
          errorMessage: `Yeah, this uses Pexels API, so ${search} won't find much`,
        });
      }
      let section = document.getElementById(search);

      let width =
        search.length > 10 ? section.offsetWidth / search.length : (section.offsetWidth / search.length) * 1.5;

      this.style(section, width, url);
    });
    let form = document.getElementById("form");
    form.classList.remove("show");
    form.classList.add("hidden");
    this.setState({ submitted: true, boring: true });
  };

  handleSearch = event => {
    event.preventDefault();
    let { search } = this.state;

    if (!search) {
      return this.setState({
        errorMessage: "Definitely need to type something to search for something...",
      });
    }

    axios
      .get(`${backend}/pexels/${search}`)
      .then(response => {
        let photos = response.data.photos.map(photo => {
          return photo.src.original;
        });
        if (photos.length < search.length) {
          return this.setState({
            error: true,
            errorMessage: `Yeah, this uses Pexels API, so ${search} won't find much`,
          });
        }

        let section = document.getElementById("wordSection");
        let width =
          search.length > 10 ? section.offsetWidth / search.length : (section.offsetWidth / search.length) * 1.5;

        // Assign each letter a different picture
        this.state.search.split("").forEach((letter, i) => {
          let word = document.getElementById(`${letter}${i}`);
          this.style(word, width, photos[i]);
        });
      })
      .catch(error => {
        console.log(error);
      });
    // remove the form
    let form = document.getElementById("form");
    form.classList.remove("show");
    form.classList.add("hidden");
    this.setState({ submitted: true });
  };

  getPicture = (url, event) => {
    window.open(url, "_blank");
  };

  style = (element, fontSize, url) => {
    // Background has to be added first to work, so no way to do via sheets that I knew
    element.style.backgroundImage = `url(${url})`;
    element.style.backgroundAttachment = "fixed";
    element.style.webkitTextFillColor = "transparent";
    element.style.webkitBackgroundClip = "text";
    element.style.backgroundClip = "text";
    element.style.fontSize = `${fontSize}rem`;
    element.onclick = this.getPicture.bind(this, url);
  };

  getTypes = () => {
    axios
      .get(`${backend}/types`)
      .then(results => {
        this.setState({ types: results.data });
      })
      .catch(error => {
        console.log("Error", error);
      });
  };

  handleRadioChange = type => {
    this.setState({
      selectedRadio: type.type,
      selectedType: type,
      showHint: false,
      showAnswer: false,
      answer: "",
      guessed: false,
    });
  };

  // Eventually have a hints counter
  handleHint = (type, showHint) => {
    let { hintsUsed } = this.state;
    hintsUsed++;
    this.setState({ hintsUsed, showHint: !showHint });
  };

  // Eventually have a guess counter
  // An object that only lets them guess 3 times per question
  // Need to work on Lambda / Python stuff
  // This is done enough for the time being
  handleGuess = (type, event) => {
    event.preventDefault();
    let { answer, selectedType } = this.state;
    axios
      .get(`${backend}/guess/${type}`)
      .then(response => {
        let results = response.data.choice.filter(choice => {
          choice = choice.toLowerCase();
          answer = answer.toLowerCase();
          return answer === choice;
        });
        // Put the answers on the selected type
        selectedType.choice = response.data.choice;
        this.setState({ selectedType });

        // Handle whether or not incorrect/correct & answers shown
        this.handleCorrect(type, results.length ? true : false);
      })
      .catch(error => {
        console.log("Error", error);
      });
  };

  // Call if the answer is correct
  handleCorrect = (type, bool) => {
    let { correct } = this.state;
    bool ? (correct[type] = true) : (correct[type] = false);
    bool ? this.setState({ correct, showAnswer: true }) : this.setState({ guessed: true, correct, showAnswer: false });
  };

  render() {
    let {
      search,
      submitted,
      error,
      errorMessage,
      errorTen,
      boring,
      types,
      selectedRadio,
      selectedType,
      showHint,
      showAnswer,
      correct,
      answer,
      guessed,
    } = this.state;
    return (
      <div id="container" className="random">
        <div id="pexels" className="random__section random__section--left" onClick={this.expand}>
          {/* Wierd occurrence if you click on the title it would not return an id
            Probably not the ideal solution, but a quick fix nonetheless
            Better alternative would be to get by classnames left/right */}
          <div id="pexels" className="section__title">
            Fun with Words
          </div>
          <form id="form" className="section__search hidden">
            <div className="search__inner">
              <label className="search__label">
                What do you want to see?
                <input
                  name="search"
                  value={search}
                  className="label__input"
                  placeholder="Trees, Mountains, etc..."
                  onChange={this.handleInput}
                />
              </label>
              {!errorTen ? (
                <button type="submit" className="search__button" onClick={this.handleSearch}>
                  {submitted ? (
                    <i className="fa fa-spinner fa-spin button__icon" />
                  ) : (
                    <i className="fas fa-search button__icon" />
                  )}
                </button>
              ) : (
                <div className="button__error-ten" />
              )}
              <button type="submit" style={{ minWidth: "10vw" }} className="search__button" onClick={this.handleBoring}>
                {submitted ? (
                  <i className="fa fa-spinner fa-spin button__icon" />
                ) : (
                  <div className="button__icon">Boring, Faster</div>
                )}
              </button>
            </div>
            {errorMessage ? <div className="search__error">{errorMessage}</div> : <div className="search__error" />}
          </form>
          {submitted ? (
            <div id="wordSection" className="section__word show">
              {error || boring ? (
                error ? (
                  errorMessage
                ) : (
                  <div className="word__letter" href={search.url} id={search}>
                    {search}
                  </div>
                )
              ) : (
                search.split("").map((letter, i) => {
                  return (
                    <div className="word__letter" href={letter.url} key={letter + Math.random()} id={letter + i}>
                      {letter}
                    </div>
                  );
                })
              )}
            </div>
          ) : null}
        </div>
        <div id="guess" className="random__section random__section--right" onClick={this.expand}>
          {/* Wierd occurrence if you click on the title it would not return an id
            Probably not the ideal solution, but a quick fix nonetheless
            Better alternative would be to get by classnames left/right */}
          <div id="guess" className="section__title">
            Guess Some Stuff and Junk
          </div>
          <form id="form" className="expanded-guess__radios hidden">
            <div className="radios__list">
              <div className="list__title">{selectedRadio}</div>
              {types.map(type => {
                return (
                  <div
                    className="list__radio"
                    id={type}
                    key={type._id}
                    onChange={this.handleRadioChange.bind(this, type)}>
                    <input
                      className="radio__button"
                      type="radio"
                      id={type}
                      checked={selectedRadio === type.type}
                      onChange={this.handleRadioChange.bind(this, type)}
                    />
                    {type.type}
                  </div>
                );
              })}
            </div>
            {/* I realize after the fact that radios wasn't the most accurate block name*/}
            {selectedType ? (
              <div className="radios__questions">
                <div className="questions__question">{selectedType.question}</div>
                <input
                  name="answer"
                  value={answer}
                  className="question__input"
                  placeholder="Guess..."
                  onChange={this.handleInput}
                />
                {showHint ? (
                  <div className="questions__hint">{selectedType.hint}</div>
                ) : (
                  <div className="questions__hint" onClick={this.handleHint.bind(this, selectedType.type, showHint)}>
                    Hint
                  </div>
                )}
                <button className="questions__button" onClick={this.handleGuess.bind(this, selectedType.type)}>
                  Guess
                </button>
                <div
                  className={
                    guessed
                      ? correct[selectedType.type]
                        ? "questions__correct"
                        : "questions__incorrect"
                      : "questions__incorrect--empty"
                  }>
                  {showAnswer || guessed ? (correct[selectedType.type] ? "Correct" : "Incorrect") : ""}
                </div>
                <div className="questions__choices">
                  {showAnswer
                    ? selectedType.choice.map(choice => {
                        return (
                          <div className="choices__choice" key={choice}>
                            {choice}
                          </div>
                        );
                      })
                    : null}
                </div>
              </div>
            ) : null}
          </form>
        </div>
      </div>
    );
  }
}
