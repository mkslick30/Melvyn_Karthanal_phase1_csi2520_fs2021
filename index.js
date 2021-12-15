const express = require("express");
const ejs = require("ejs");
const path = require("path");
const mysql = require("mysql");
// const Connection = require("mysql/lib/Connection");

// Create express app
const app = express();

const db = mysql.createConnection({
  host: "us-cdbr-east-05.cleardb.net",
  user: "bfcabd0c83bab2",
  password: "61ed76dd",
  database: "heroku_fce97003cb06b7c"
});

db.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log(`Successful connected to the DB....`);
  }
});

// Initialize Body Parser Middleware to parse data sent by users in the request object
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // to parse HTML form data

// Initialize ejs Middleware
app.set("view engine", "ejs");
app.use("/public", express.static(__dirname + "/public"));
// app.set("views", path.join(__dirname, "views"));



// routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/survey_page", (req, res) => {
    res.render("survey_page");
});

app.get("/results", (req, res) => {
  Connection.createQuery('SELECT * from questions', (error, rows) => {
    if(error){
      throw error;
    } else {
      console.log(rows);
      res.render("results", { rows });
    }
  
  })
  
});

app.get("/home", (req, res) => {
  res.render("index");
});

app.get("/addpost1", (req, res) => {
  let data = { name: req.body.name, college: req.body.college, dorm: req.body.dorm, classes: req.body.num_of_classes, fav: req.body.fav_class, major: req.body.major};
  var sql = 'INSERT INTO questions (id, name, college, dorm, num_of_classes, fav_class, major, date) VALUES (null, ?, ?, ?, ?, ?, ?, null)';
  let query = db.query(sql, data, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(`student entry was inserted to the db...`);
  });
});

app.post("/insertQuestion", (req, res) => {
  const { name, college, dorm, classes, fav, major} = req.body;
    var nme = document.querySelector('#name').value;
    var colleg = document.querySelector('#college').value;
    var dor = document.querySelector('#dorm').value;
    var num = document.querySelector('#class').value;
    var fa = document.querySelector('#fav').value;
    var maj = document.querySelector('#major').value;
    
    
    var sql = 'INSERT INTO questions (id, name, college, dorm, num_of_classes, fav_class, major, date) VALUES (null, "' + nme + '", "' + colleg + '", "' + dor + '", "' + num + '", "' + fa + '", "' + maj + '", null)';
      db.query(sql)
      db.end();
    })






// Setup server ports
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

