module.exports = app => {
  const pexelController = require("./controllers/pexel");
  const emailController = require("./controllers/email");

  app.route("/randompicture/:query").get(pexelController.getRandom);
  app.route("/email/:copy").post(emailController.sendEmails);
};
