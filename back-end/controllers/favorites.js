const Favorite = require("../models/favorites");

// Could have just returned everything on the getTypes section
// But why not have multiple routes... aside from making extra 
// calls that is.
const guess = (req, res) => {
  Favorite.findOne({ type: req.params.type }, 'choice')
    .then(results => {
      res.status(200).json(results);
    })
    .catch(error => {
      res.status(500).json(error);
    });
};

const getTypes = (req, res) => {
  Favorite.find({}, 'type question hint')
    .then(results => {
      res.status(200).json(results);
    })
    .catch(error => {
      res.status(500).json(error);
    });
};

// Added via postman, seemed senseless to write code to add these...
const newFavorite = (req, res) => {
  let newFavorite = new Favorite({ ...req.body });
  newFavorite
    .save()
    .then(saved => {
      res.status(200).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
};

module.exports = {
  guess,
  getTypes,
  newFavorite,
};
