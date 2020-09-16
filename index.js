const express = require("express");
const app = express();
const port = process.env.PORT;
//Database
const Database = require("@replit/database");
const db = new Database();

app.use(express.static("public"));

app.get('/', (req, res) => {
	res.status(200).sendFile(__dirname + "/views/index.html");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});