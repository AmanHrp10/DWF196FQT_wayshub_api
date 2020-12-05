const express = require('express');
const app = express();

//! Port
const port = process.env.PORT || 5000;

//? Using library
app.use(express.json());

// *Import Module
const routers = require('./src/routes/');

// Using main url

app.use('/api/v1', routers);

app.listen(port, () => console.log(`server is running on localhost:${port}`));
