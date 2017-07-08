const express = require('express');
const router = express.Router();
const pg = require('pg');

const config = {
  database: 'antares',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 3000
};

let pool = new pg.Pool(config);

router.get('/', function(req, res) {
  pool.connect(function(errorConnectingToDatabase, db, done) {
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      let queryText = 'SELECT * FROM "tasks";';
      db.query(queryText, function(errorMakingQuery, result) {
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
          res.send(result.rows);
        }
      });
    }
  });
});

router.post('/', function(req, res) {
  let task = req.body;
  pool.connect(function(errorConnectingToDatabase, db, done) {
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      let queryText = 'INSERT INTO "tasks" ("task", "complete") VALUES ($1, false);';
      db.query(queryText, [task.task], function(errorMakingQuery, result) {
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });
    }
  });
});

module.exports = router;
