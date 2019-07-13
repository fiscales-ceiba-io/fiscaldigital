import express from "express";
import path from "path";

const app: express.Application = express();

// app.use(favicon(__dirname + "/build/favicon.ico"));
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "build")));

app.get("/ping", (req, res) => {
  return res.send("pong");
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.REACT_APP_PORT || 8080);
