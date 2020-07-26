var express = require("express");

var sequielize = require("./models").sequelize;

const port = 8082;
var app = express();
sequielize.sync();

const { Person } = require("./models");

Person.create({ name: "Test", age: 25 });

app.get("/", (req, res) => {
  res.send("hello world");
  Person.findAll({}).then((result) => {
    console.log(result);
  });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Example app listening at http://localhost : ${port}`);
});
