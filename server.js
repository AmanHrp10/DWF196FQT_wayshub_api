const express = require('express');
const app = express();

//! Port
const port = process.env.PORT || 5000;

// *Import Module
const routerChannel = require('./src/routes/channel');

// Using main url

app.get('/', (req, res) => {
  res.json({
    message: 'method get all',
  });
});

app.listen(port, () => console.log(`server is running on localhost:${port}`));
