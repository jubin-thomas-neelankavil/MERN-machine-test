const express = require("express");
const connectToDatabase = require("./database/db.js");
const dotenv = require("dotenv");
const app = express();
const Routes = require("./routes/route.js");
const cors = require("cors");
const bodyParser = require("body-parser");

dotenv.config();

//app.use(bodyParser.json({ extended: true }));
//app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
 origin: "https://mern-machine-testjubinfrontend.vercel.app",
  methods: ["POST", "GET", "DELETE", "PUT"],
 credentials: true,
  optionsSuccessStatus: 204,
}));
app.use(bodyParser.json());

app.use("/", Routes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

const port = 8000;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

connectToDatabase(username, password, dbName);

app.listen(port, () => {
  console.log(`server running successfully on port ${port}`);
});
