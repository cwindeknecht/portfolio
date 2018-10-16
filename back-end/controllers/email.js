const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.REACT_APP_GMAIL || process.env.HEROKU_GMAIL,
    pass: process.env.REACT_APP_GMAIL_PASS || process.env.HEROKU_GMAIL_PASS,
  },
});

const sendEmails = (req, res) => {
  let { name, title, body, email } = req.body;
  let mailOptions = {
    from: `${process.env.REACT_APP_GMAIL || process.env.HEROKU_GMAIL}`,
    to: `${[email, process.env.REACT_APP_GMAIL || process.env.HEROKU_GMAIL]}`,
    subject: `Hello ${name}, Thanks for visiting My porfoio`,
    text: `${title +
      ": " +
      body +
      "\n\nIf you didn't contact my portfolio website, my apologies for not having better e-mail verification."}`,
    html: `<h1>${title}</h1><div>${body}</div><br><br><div>If you didn't contact my portfolio website, my apologies for not having better e-mail verification.</div>`,
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).json({ error });
    } else {
      res.status(200).json({ info });
    }
  });
};

module.exports = {
  sendEmails,
};
