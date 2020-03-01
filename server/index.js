const express = require('express');
const path = require('path');

// Initialize server and port
const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Serves static file
app.use(express.static(path.resolve(__dirname, '../client/dist')));

// Starts a UNIX socket and listens for connections on the given path.
app.listen(port, () => console.log(`Burger Builder listening on port ${port}!`))
