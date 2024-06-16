// backend/index.js
const express = require("express");
const rootRouter = require("./api/index")
const cors = require("cors");
const app = express();

app.use("/api/v1", rootRouter);


app.listen(3000);

