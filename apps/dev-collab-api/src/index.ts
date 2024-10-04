import express from "express";
import { HomeMessageModel } from "shared/models/home";

const app = express();
const port = 3000;

app.get("/api/home/messages", (req, res) => {
  res.send(["Hello World!", "Test from Home"] satisfies HomeMessageModel);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
