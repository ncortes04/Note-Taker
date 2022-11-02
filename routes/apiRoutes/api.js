const Router = require('express').Router();
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const fs = require('fs');
const dbDir = './db/db.json'
Router.post('/notes', (req, res) => {
    
  console.info(`${req.method} request received to add a note`);
  
    const { text, title} = req.body;
  
    if (text && title) {
      const createReview = {
        title,
        text,
        id: uuidv4(),
      };
  
      fs.readFile( dbDir, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          const parsedReviews = JSON.parse(data);
  
          parsedReviews.push(createReview);
  
          fs.writeFile( dbDir ,JSON.stringify(parsedReviews, null, 4),
            (writeErr) =>
              writeErr
                ? console.error(writeErr)
                : console.info('Successfully updated reviews!')
          );
        }
      });
      const response = {
        status: 'success',
        body: createReview,
      };
  
      console.log(response);
      res.status(201).json(response);
    } else {
      res.status(500).json('Error in posting review');
    }
  });
  Router.get('/notes', (req, res) => {
    fs.readFile( dbDir, 'utf8', (err, data) => {
        if(err) {
            console.log("Cannot access notes");
            console.error(err);
        } else {
            const parsed = JSON.parse(data);
            res.json(parsed);
        }
    })
});
Router.delete('/notes/:id', (req, res) => {
  fs.readFile( dbDir, 'utf8', (err, data) => {
    const reqParams = req.params.id
    if(err) {
        console.error(err);
    } else {
        const parsed = JSON.parse(data);
        const result = parsed.filter((note) => note.id !== reqParams);

        fs.writeFile( dbDir, JSON.stringify(result), (err) => {
            if(err) {
              console.log(err)
            } else {
            console.log(`Item ${reqParams} has been deleted`);
            console.log('Success!!')
          }
         })

        }
    });
  });
  module.exports = Router;
