//const that grab the files we created in routes folder
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
const express = require('express')
//the port we will be using
const PORT = 3001;

const app = express();
//making static public so css and html can access eachother
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use is opening files that redirect apis as well as html which is defined in index.js
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
