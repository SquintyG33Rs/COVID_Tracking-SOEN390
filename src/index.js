const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const events = require('./events');

const connection = mysql.createConnection({
  host     : 'concordia-database-server.mysql.database.azure.com',
  user     : 'databaseadmin@concordia-database-server',
  password : '********',
  database : 'CovidTrackingDatabase'
});

connection.connect();

const port = process.env.PORT || 3306;

const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(events(connection));

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});