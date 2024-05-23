import { createRequire } from "module";
const require = createRequire(import.meta.url);

// If you get any error, related to the word "module", check the package.json file
// It should be:
// {
//   "name": "nodejs",
//   "version": "1.0.0",
//   "description": "",
//   "main": "index.js",
//   "type": "module", // This line is important, if this line is not present, type this
//   "scripts": {
//     "server": "nodemon server.js"
//   },
//   "keywords": [],
//   "author": "",
//   .......
//   .......
//   .......
// }

import express from 'express';
const app = express(); // starting an express server
app.use(express.json()); // Integrating express with node

// VErrryy Important lines to connect to server from frontend
const cors = require('cors');
app.use(cors());

// To create API endpoints
import router from "./routes/routes.js";
app.use(router);

app.listen(5000);



