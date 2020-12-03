const express = require('express');
const app = express();

//* Port
const port = process.env.PORT || 5000;

//?Import router
const router = require('./src/routes');

// Using main url
app.use('/api/v1', router);

app.listen(port, () => console.log(`server is running on localhost:${port}`));
