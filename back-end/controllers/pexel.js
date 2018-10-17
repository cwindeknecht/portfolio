const PexelsAPI = require("pexels-api-wrapper");

var pexelsClient = new PexelsAPI(process.env.REACT_APP_PEXELS || process.env.HEROKU_PEXELS);

const getPictures = (req, res) => {
  pexelsClient
    .search(req.params.query, req.params.query.length, 1)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(error => {
      res.status(500).json({ error });
    });
};

const getPicture = (req, res) => {
  pexelsClient
    .search(req.params.query, 1, 1)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(error => {
      res.status(500).json({ error });
    });
};

module.exports = {
  getPictures,
  getPicture,
};
