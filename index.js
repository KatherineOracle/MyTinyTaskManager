// The main application script, ties everything together.
const PORT = process.env.PORT || 3001;
const path = require('path')
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes.js");
const app = express();
app.use(cors());
app.use(express.json());

require('dotenv').config();

app.use("/api", routes);


if (process.env.NODE_ENV === 'production'){
  console.log(process.env.NODE_ENV);
  app.get("*", (req, res) => {
    //console.log(path.join(__dirname, "client/build"));
    res.sendFile(path.join(__dirname, "client/build"));
   });
  }    


// connect to Mongo when the app initializes
const uri = process.env.CONNECTIONSTRING;

mongoose.connect(uri).catch((error) => handleError(error));

const connection = mongoose.connection;
connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

app.listen(PORT, () => {
  console.log(`Task API listening on port ${PORT}`);
});
