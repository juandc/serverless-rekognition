import serverless from 'serverless-http';
import express from 'express';
import AWS from 'aws-sdk';

const request = require('request').defaults({ encoding: null })

const rek = new AWS.Rekognition({
  region: 'us-west-2',
  accessKeyId: "hmmmm",
  secretAccessKey: "boooo",
});
const app = express();

const TEST_IMAGE = 'https://s3.us-east-2.amazonaws.com/serverless-rekognition-platzi/upload/IMG_20171119_104715_250.jpeg';
const TEST_BUCKET = 'ohh';
const TEST_NAME = 'ayayay';

function Detectlabels(req, res) {
  request.get(TEST_IMAGE, (err, _, body) => {
    const params = {
      Image: {
        Bytes: body,
      },
      MaxLabels: 20,
      MinConfidence: 80,
    };

    rek.detectLabels(params, (err, data) => {
      if (err) return console.log(err);
      console.log(data)
    });
  })

  res.send('Todo bien compa');
}

app.get('/api/:id', Detectlabels)

export default serverless(app);
