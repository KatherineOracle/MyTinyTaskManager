// The main application script, ties everything together.
const PORT = process.env.PORT || 5000;
const express = require("express");
const cors = require("cors");
const path = require("path"); //for heroku
const mongoose = require("mongoose");
const routes = require("./routes.js");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", routes);


if (process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*',(req,res)=> {res.sendFile(path.resolve(__dirname,
  'client', 'build','index.html'));
  });
}

// connect to Mongo when the app initializes
const uri =
  "mongodb+srv://ready-player-one:cmuaZzJbkCTtlgqz@hyperiondev-katherinev.7hvpsqa.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(uri).catch((error) => handleError(error));

const connection = mongoose.connection;
connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

app.listen(PORT, () => {
  console.log(`Task API listening on port ${PORT}`);
});