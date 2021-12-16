const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const authRoute = require('./routes/auth');
require('dotenv').config();

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/static', express.static(path.join(`${__dirname}/public`)));

app.use('/api/auth', authRoute);

const port = process.env.PORT || 8080;

mongoose
  .connect(process.env.DB_HOST, {
    // useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    // useFindAndModify: false,
  })
  .then(() => {
    app.listen(port, () => console.log(`Server and Database running on ${port}, http://localhost:${port}`));
  })
  .catch((err) => {
    console.log(err);
  });

