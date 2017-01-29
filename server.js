const express = require('express'),
  app         = express(),
  path        = require('path'),
  port        = process.env.PORT || 8080;

function forceSSL() {
  return (req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      const url = `https://${req.get('Host')}${req.url}`;
      return res.redirect(url);
    }

    next();
  }
}

// settings
app.use(express.static(path.join(__dirname, 'dist')));
app.use(forceSSL);

// routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'dist', 'index.html')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'dist', 'index.html')));

// start the server
app.listen(port, () => console.log('Running!'));