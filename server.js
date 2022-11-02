
const apiRoutes = require('./routes/apiRoutes/api');
const htmlRoutes = require('./routes/htmlRoutes/html');
const express = require('express')
const path = require('path');
const fs = require('fs');
// Helper method for generating unique ids

const PORT = 3001;

const app = express();

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
