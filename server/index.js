const express = require('express'),
      app = express(),
      morgan = require('morgan'),
      bodyParser = require('body-parser'),
      path = require('path');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/public', express.static(path.join(__dirname, '..', 'public')));
app.use('/', express.static(path.join(__dirname, '..', 'node_modules')));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, '..', 'public', 'index.html')));


const port = process.env.PORT || 3000;
app.listen(port, console.log(`listening on port ${port}`));