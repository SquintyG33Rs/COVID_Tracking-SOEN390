const express = require('express');

function createRouter(db) {
  const router = express.Router();
  const user = '';

  // the routes are defined here
	router.post('/USERS', (req, res, next) => {
		console.log("reached events.js router.post");
	  db.query(
	    'INSERT INTO USERS (lastName, firstName, password, email) VALUES (?,?,?,?)',
	    [req.body.lastName, req.body.firstName, req.body.password, req.body.email],
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

	router.get('/USERS', function (req, res, next) {
	  db.query(
	    'SELECT id, firstName, password, email FROM events WHERE  lastName=? ORDER BY date LIMIT 10 OFFSET ?',
	    [req.body.id, 10*(req.params.page || 0)],
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

	router.put('/USERS/:id', function (req, res, next) {
	  db.query(
	    'UPDATE USERS SET lastName=?, firstName=?, password=? WHERE id=? AND email=?',
	    [req.body.lastName, req.body.firstName, req.body.password, req.params.id, email],
	    (error) => {
	      if (error) {
	        res.status(500).json({status: 'error'});
	      } else {
	        res.status(200).json({status: 'ok'});
	      }
	    }
	  );
	});

	router.delete('/USERS/:id', function (req, res, next) {
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

module.exports = createRouter;