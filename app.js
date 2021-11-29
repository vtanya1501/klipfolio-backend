const express = require("express");
const service = require("./routes/service");
const md = require("./routes/data_source");
const metric = require("./routes/metric");
const search = require("./routes/search");
const cors = require("cors");
require("dotenv").config();

//Database
const db = require("./config/database");

//Test database connection
db.authenticate()
  .then(() => console.log("Database Connected..!!!"))
  .catch((err) => console.log("Error : " + err));

const app = express();

app.use(express.json());
app.use(cors());
app.options("*", cors());

//service routes
app.use("/services", service);
app.use("/data-sources", md);
app.use("/metrics", metric);
app.use("/search", search);

const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`Server started on PORT ${PORT}`));

module.exports = app;
