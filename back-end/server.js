require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
};

const server = express();
server.use(express.json());
server.use(cors(corsOptions));

let user = process.env.HEROKU_MLABUSER;
let password = process.env.HEROKU_MLABPASS;

mongoose
  .connect(
    `mongodb://${user}:${password}@ds131313.mlab.com:31313/portfolio`,
    { useNewUrlParser: true },
  )
  .then(() => console.log("MongoDB Running"))
  .catch(err => console.log("MongoDB Error", err));

const routes = require("./routes.js");
routes(server);

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});

module.exports = server;
