const axios = require("axios");

let random = query => {
  return {
    method: "GET",
    url: `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`,
    headers: {
      Authorization: process.env.REACT_APP_PEXELS || process.env.HEROKU_PEXELS,
    },
  };
};

const getRandom = (req, res) => {
  axios(random(req.params.query))
    .then(results => console.log(results))
    .catch(err => console.log(err));
};

module.exports = {
  getRandom,
};
