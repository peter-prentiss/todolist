const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require( 'path' );
const port = process.env.PORT || 5000;
const tasksRoute = require('./routes/taskmaster.js');

app.use(bodyParser.urlencoded({extended: true}));

app.use('/taskmaster', tasksRoute);

// Serve back static files by default
app.get('/*', (req, res) => {
  const file = req.params[0] || '/views/index.html';
  res.sendFile(path.join(__dirname, '/public/', file));
});

// Start listening for requests on a specific port
app.listen(port, () => {
  console.log('listening on port', port);
});
