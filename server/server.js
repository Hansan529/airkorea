const express = require("express");
const app = express();
const cors = require("cors");
const apiRouter = require("./Router/apiRouter");

app.use(cors());
app.use(express.json());
app.use("/api", apiRouter);

const port = 3500;
app.listen(port, () => console.log("오픈"));