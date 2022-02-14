const mongoose = require("mongoose");
require("dotenv/config")

const MONGO_URI = `mongodb+srv://${process.env.MG_USERNAME}:${process.env.MG_PWD}@cluster0.ezbcm.mongodb.net/Hash?authSource=admin&replicaSet=atlas-uwz0p3-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`


mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
