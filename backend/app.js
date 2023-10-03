require('dotenv').config();
const express = require('express');
const router = require('./routes/router');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middleware/error-middleware');
const PORT = process.env.PORT || 5000;
const app = express();
const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Yerevan');


app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use("/", router);
app.use(errorMiddleware);




const start = async () => {
  try {
    const scheduleTask = require('./utils/schedule');
    scheduleTask();
    app.listen(PORT, () => console.log(`Server Running in http://localhost:/${PORT}`))
  } catch (error) {
    console.log(error);
  }
}

start();