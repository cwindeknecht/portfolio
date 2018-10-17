module.exports = app => {
  const pexelController = require("./controllers/pexel");
  const emailController = require("./controllers/email");

  app.route("/pexels/:query").get(pexelController.getPictures);
  app.route("/pexelssingle/:query").get(pexelController.getPicture);
  app.route("/email/:copy").post(emailController.sendEmails);
};
