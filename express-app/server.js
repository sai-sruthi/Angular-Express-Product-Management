const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const sql = require('mssql');
cors = require('cors')

const routes = require('./routes/routes');

const app = express();

//parser for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Cross Origin middleware
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*")
//   res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
//   next()
// })
routeConfig={
  app: app,
  dbConfig: {
      user: 'sa',
      password: 'Passw0rd',
      server: 'localhost', 
      database: 'Products-Angular'
  }
};
routes.init(routeConfig);

app.use(cors());

//Set our api routes
app.use('/', routes.router);

/**
 * Get port from environment and store in express
 */
const port = process.env.port || '3000';
app.set('port', port);

/**
 * Create HTTP server
 */

const server = http.createServer(app);

/**
 * Listen on the provided port
 */

server.listen(port, () => console.log(`API running on localhost:${port}`));