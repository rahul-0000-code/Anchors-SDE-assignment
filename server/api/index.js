const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')
const db = require('../config/dbConnection');
const routes = require('../Routes/Routes');

app.use(cors())
app.use(bodyParser.json());
app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
