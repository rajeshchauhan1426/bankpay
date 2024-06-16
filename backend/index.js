// backend/index.js
const express = require("express");
const rootRouter = require("./api/index")
const cors = require("cors");
const router = require("./api/index");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1", rootRouter);


app.listen(3000)
