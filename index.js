//import the db database
let { destinations } = require("./db.js");

//import (require) express function
const express = require("express");
const app = express();
const PORT = 3000;
let generateUID = require("./services");
app.use(express.json()); // for parsing application/json

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

  //add the user data in my db
  destinations.push({
    id: generateUID,
    name: name,
    location: location,
    photo: photo ? photo : "",
  });
  console.log(req.body);
  res.send({ status: "success" });
});

app.delete("/destination/:uid", (req, res) => {
  // console.log(req.params.uid);
  let { uid: id } = req.params;

  const filtered = destinations.filter((dest) => {
    if (dest.id !== id) {
      return true;
    }
  });
  destinations = filtered;
  res.send({ status: "success" });
});
