const Router = require('express').Router();
//creates unique id for each note which can be accessed to deleted
const { v4: uuidv4 } = require('uuid');

const fs = require('fs');
const dbDir = './db/db.json'
// router function to handle requests
Router.post('/notes', (req, res) => {
    
  console.info(`${req.method} request received to add a note`);
  //defining request body which consists of a title and text
    const { text, title} = req.body;
  //checking if text and title exists, if so create a new constant called create review
    if (text && title) {
      const createReview = {
        title,
        text,
        id: uuidv4(),
      };
  //reads the file wiht dbDir constant that directs to db.json
      fs.readFile( dbDir, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          //converts data into an object
          const parsedReviews = JSON.parse(data);
          //pushes the newly created review into the object
          parsedReviews.push(createReview);
          // reqrites the file wiht the new object on the end
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
  //params for request id
  const reqParams = req.params.id
  //reads file
  fs.readFile( dbDir, 'utf8', (err, data) => {
    if(err) {
        console.error(err);
    } else {
      //converts into object
        const parsed = JSON.parse(data);
        //filters newly added note and adds to the array
        let result = parsed.filter((note) => note.id !== reqParams);
      // writes teh file with the new note removed
        fs.writeFile( dbDir, JSON.stringify(result), (err) => {
            if(err) {
              console.log(err)
            } else {
            //logs what id was removed
            console.log(`Item ${reqParams} has been deleted`);
            console.log('Success!!')
          }
         })
        }
    });
    //makes page refresh list of notes
    res.send('Delete request');
  });
  module.exports = Router;
