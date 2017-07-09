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

const pool = new pg.Pool(config);

router.get('/', (req, res) => {
  pool.connect((errorConnectingToDatabase, db, done) => {
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      // grabs task data from database and sorts by whether it is complete, priority, and then id
      let queryText = 'SELECT * FROM tasks ORDER BY complete, priority DESC, id;';
      db.query(queryText, (errorMakingQuery, result) => {
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

router.post('/', (req, res) => {
  let task = req.body;

  pool.connect((errorConnectingToDatabase, db, done) => {
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      // adds task to database
      let queryText = 'INSERT INTO "tasks" ("task", "complete", "priority") VALUES ($1, false, $2);';
      db.query(queryText, [task.task, task.priority], (errorMakingQuery, result) => {
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

router.put('/complete/:id', (req, res) => {
  let id = req.params.id;

  pool.connect((errorConnectingToDatabase, db, done) => {
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      let queryText = 'UPDATE "tasks" SET "complete" = true WHERE id = ' + id + ';';
      db.query(queryText, (errorMakingQuery, result) => {
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });
    }
  })
});

router.delete('/:id', (req, res) => {
  let id = req.params.id;

  pool.connect((errorConnectingToDatabase, db, done) => {
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      let queryText = 'DELETE FROM "tasks" WHERE id =' + id + ';';
      db.query(queryText, (errorMakingQuery, result) => {
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });
    }
  })

});

module.exports = router;
