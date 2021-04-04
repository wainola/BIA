const express = require("express");
const app = express();

app.use(express.static("src"));
app.use(express.static("../ballot-contract/build/contracts"));
app.get("/", (req, res) => {
  res.render("index.html");
});

app.listen(3000, () => console.log("Listening on port 3000"));
