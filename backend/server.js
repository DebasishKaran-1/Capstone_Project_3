const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRouter = require('./routes/auth-routes.js');

//config dotenv
dotenv.config();


//rest object
const app = express();

// enable CORS for all origins and allow credentials (mirrors request origin)
app.use(cors({ origin: true, credentials: true }));

// safe preflight handler (avoids using '*' path which breaks path-to-regexp)
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers'] || 'Content-Type, Authorization');
    if (req.headers.origin) res.header('Access-Control-Allow-Credentials', 'true');
    return res.sendStatus(204);
  }
  next();
});

// parse JSON bodies
app.use(express.json());

//rest api
app.get('/', (req, res) => {
    res.send("<h1>Hello from Express server</h1>");
});

app.use('/auth',authRouter);

//port
const PORT = process.env.PORT || 3000;
//run server
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});