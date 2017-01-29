const express = require('express'),
  app         = express(),
  path        = require('path'),
  compression = require('compression'),
  port        = process.env.PORT || 8080;

// settings
app.use(express.static(path.join(__dirname, 'dist')));
app.use(compression());
app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] != 'https') {
    const host = req.get('Host');
    const url  = `https://${host}${req.url}`;
    return res.redirect(url);
  }

  next();
});

// routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'dist', 'index.html')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'dist', 'index.html')));

// start the server
app.listen(port, () => console.log('Running!'));