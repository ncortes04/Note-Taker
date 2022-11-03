const Router = require('express').Router();
const path = require('path');

Router.get('/', (req, res) =>
//sends user to the index.html file the ../.. indicates we are going back a directory since public is not within the current directory
  res.sendFile(path.join(__dirname, '../../public/index.html'))
);
Router.get('/notes', (req, res) =>
//sends the user to the notes html
  res.sendFile(path.join(__dirname, '../../public/notes.html'))
);
//fallback to this function of all directories fail
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

module.exports = Router;
