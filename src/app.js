const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");
// console.log(__dirname);
// console.log(path.join(__dirname,'..'));

const app = express();
const port = process.env.PORT || 3000;
// Define the path

const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("views", viewsPath); // provides to use on a root,views is mandatroy
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectory));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather APP",
    name: "Chirag Bhayana",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "ABOUT ME",
    name: "Chirag bhayana",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help",
    name: "Chirag bhayana",
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404",
    name: "Chirag bhayana",
    error: "help article is not found",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  geocode(req.query.address, (error, { latitude, longitude } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(
      latitude,
      longitude,
      (error, { temp, feelslike, visibility, description } = {}) => {
        if (error) {
          return res.send({ error });
        }
        return res.send({
          temperature: temp,
          feelslikeTemp: feelslike,
          visibilityArea: visibility,
          description: description,
        });
      }
    );
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide an address!",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "404",
    name: "Chirag bhayana",
    error: "page not found",
  });
});

// app.get("/help", (req, res) => {
//   // res.send("help page");
// });

// app.get("/about", (req, res) => {
//   res.send("<h1> About </h1>");
// });

app.listen(port, () => {
  console.log("Server is running up on port 3000");
});
