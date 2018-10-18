module.exports = app => {
  const pexelController = require("./controllers/pexel");
  const emailController = require("./controllers/email");
  const favoritesController = require("./controllers/favorites");

  app.route("/pexels/:query").get(pexelController.getPictures);
  app.route("/pexelssingle/:query").get(pexelController.getPicture);
  app.route("/email/:copy").post(emailController.sendEmails);
  app.route("/guess/:type").get(favoritesController.guess);
  app.route("/types").get(favoritesController.getTypes);
  app.route("/newfavorite").post(favoritesController.newFavorite);
};
