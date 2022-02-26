module.exports = {
    databaseAuth: ''
 };

/* const connection = mysql.createConnection({
  host     : 'concordia-database-server.mysql.database.azure.com',
  user     : 'databaseadmin@concordia-database-server',
  password : '********',
  database : 'CovidTrackingDatabase'
});


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

const express = require('express');

function createRouter(db) {
  const router = express.Router();
  const owner = '';

  // the routes are defined here
	router.post('/event', (req, res, next) => {
	  db.query(
	    'INSERT INTO events (lastName, firstName, password, email) VALUES (?,?,?,?)',
	    [owner, req.body.lastName, req.body.firstName, new Date(req.body.date)],
	    (error) => {
	      if (error) {
	        console.error(error);
	        res.status(500).json({status: 'error'});
	      } else {
	        res.status(200).json({status: 'ok'});
	      }
	    }
	  );
	});

	router.get('/event', function (req, res, next) {
	  db.query(
	    'SELECT id, firstName, password, email FROM events WHERE  lastName=? ORDER BY date LIMIT 10 OFFSET ?',
	    [owner, 10*(req.params.page || 0)],
	    (error, results) => {
	      if (error) {
	        console.log(error);
	        res.status(500).json({status: 'error'});
	      } else {
	        res.status(200).json(results);
	      }
	    }
	  );
	});

	router.put('/event/:id', function (req, res, next) {
	  db.query(
	    'UPDATE events SET lastName=?, firstName=?, password=? WHERE id=? AND email=?',
	    [req.body.lastName, req.body.firstName, new Date(req.body.date), req.params.id, email],
	    (error) => {
	      if (error) {
	        res.status(500).json({status: 'error'});
	      } else {
	        res.status(200).json({status: 'ok'});
	      }
	    }
	  );
	});

	router.delete('/event/:id', function (req, res, next) {
	  db.query(
	    'DELETE FROM events WHERE id=? AND email=?',
	    [req.params.id, email],
	    (error) => {
	      if (error) {
	        res.status(500).json({status: 'error'});
	      } else {
	        res.status(200).json({status: 'ok'});
	      }
	    }
	  );
	});
  return router;
}

module.exports = createRouter; */
