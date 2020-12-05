const express = require('express');
const app = express();

//? Use express bodyParser
app.use(express.json());

//* Port
const port = process.env.PORT || 5000;


//? Config
require('dotenv').config();
app.use(express.json());

// *Import Module
const routers = require('./src/routes/');

//?Import router
const router = require('./src/routes');


app.use('/api/v1', routers);

app.listen(port, () => console.log(`server is running on localhost:${port}`));
