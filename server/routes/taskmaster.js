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
      let queryText = 'SELECT * FROM tasks ORDER BY complete, id;';
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

router.put('/complete/:id', function(req, res){
  var id = req.params.id; // Book with updated content
  console.log(id);

  // YOUR CODE HERE

  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      // We connected to the database!!!
      // Now we're going to GET things from the db
      var queryText = 'UPDATE "tasks" SET "complete" = true WHERE id = ' + id + ';';
      // errorMakingQuery is a bool, result is an object
      db.query(queryText, function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
          // console.log(result);
          // Send back the results
          res.sendStatus(200);
        }
      }); // end query
    } // end if
  }) // end pool

});

router.delete('/:id', function(req, res){
  var id = req.params.id; // id of the thing to delete
  console.log('Delete route called with id of', id);

  // YOUR CODE HERE
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      // We connected to the database!!!
      // Now we're going to GET things from the db
      var queryText = 'DELETE FROM "tasks" WHERE id =' + id + ';';
      console.log(queryText);
      // errorMakingQuery is a bool, result is an object
      db.query(queryText, function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
          // console.log(result);
          // Send back the results
          res.sendStatus(200);
        }
      }); // end query
    } // end if
  }) // end pool

});

module.exports = router;
