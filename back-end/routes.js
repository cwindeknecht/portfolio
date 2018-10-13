module.exports = app => {
  const pexelController = require("./controllers/pexel");

  app.route("/randompicture/:query").get(pexelController.getRandom);
};
