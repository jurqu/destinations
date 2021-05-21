//import the db database
const { generateUID } = require("./services");
let { destinations } = require("./db");

//import (require) express function
const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json()); // for parsing application/json
const fetch = require("node-fetch");
const { response, json } = require("express");
//call the express function to create out HTTP server
//from clients

// => give it a door (I.e PORT)

app.listen(PORT, () => {
  console.log(`Server started and listening on port: ${PORT}`);
});

app.get("/destinations", (req, res) => {
  res.send(destinations);
});

// post is used to create a new resource.
app.post("/destinations", (req, res) => {
  const { id, name, location, photo, description } = req.body;

  //validate input for name and location
  if (
    name === undefined ||
    name.length === 0 ||
    location === undefined ||
    location.length === 0
  ) {
    return res.status(400).send({ error: "name and location are required" });
  }

  // get a photo using the name and location form unsplash
  //=> make an api request to unsplash to search for photos related to our name and location
  //URL

  const URL = `https://api.unsplash.com/search/photos/?client_id=BZzw4xO11tAkifUyn09vGw0aMOHvjeM-noeeyi5_flA&query=${name}${location}`;
  fetch(URL)
    .then((response) => response.json())
    .then((photo) => {
      const random = Math.floor(Math.random() * photo.results.length);
      destinations.push({
        id: generateUID(),
        name: name,
        location: location,
        photo: photo.results[random].urls.raw, // must come from unsplash
      });
      res.send("submitted");
    });

  //add the user data in my db
});

app.delete("/destinations/:uid", (req, res) => {
  // console.log(req.params.uid);
  let { uid: id } = req.params;

  const filtered = destinations.filter((dest) => {
    if (dest.id !== id) {
      return true;
    }
  });
  destinations = filtered;
  console.log(destinations);
  res.send({ status: "success" });
});

app.put("/destinations/:id", (req, res) => {
  const { id } = req.params;
  const { name, location, description } = req.body;

  if (!name && !location && !photo && !description) {
    return send.status(400).json({ status: "no data to update" });
  }

  for (let dest of destinations) {
    if (dest.id === id) {
      //if (name)(dest.name = name) below is the same
      dest.name = name ? name : dest.name;
      dest.location = location ? location : dest.location;
      dest.photo = photo ? photo : dest.photo;
      dest.description = description ? description : dest.description;
      break;
    }
  }
  res.send({ status: "success" });
});

app.use(express.static("destinations"));
app.use("/db", express.static("photo"));
