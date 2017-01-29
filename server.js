const express = require('express'),
  app         = express(),
  path        = require('path'),
  port        = process.env.port || 8080;

// settings
app.use(express.static(__dirname + '/dist'));


// routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

// start the server
app.listen(port, () => console.log('Running!'));