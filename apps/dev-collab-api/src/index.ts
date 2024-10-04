import express from "express";
import morgan from "morgan"; 
import { HomeMessageModel } from "shared/models/home";

const app = express();

// Use morgan to log HTTP requests
app.use(morgan('dev'));

app.get("/api/home/messages", (req, res) => {
  res.send(["Hello World!", "Test from Home"] satisfies HomeMessageModel);
});

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
