import express from "express";
import morgan from "morgan"; 
import { HomeMessageModel } from "shared/models/home";

const app = express();
const port = 3000;

// Use morgan to log HTTP requests
app.use(morgan('dev')); 

app.get("/api/home/messages", (req, res) => {
  res.send(["Hello World!", "Test from Home"] satisfies HomeMessageModel);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
