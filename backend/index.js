require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

// Connect DB
const db = require('./src/config/db')
db.connect();

const route = require('./src/routes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

route(app);

app.listen(port, () => {
  console.log(`Success at ${port}`)
})