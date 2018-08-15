import serverless from 'serverless-http';
import express from 'express';
import AWS from 'aws-sdk';

const request = require('request').defaults({ encoding: null })

const app = express();
const rek = new AWS.Rekognition({
  region: 'us-west-2',
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

console.log(process.env)

app.get('/', (req, res) => {
  GetImageLabels(req.query, (err, data) => {
    if (err) return res.json({ message: err.message, error: true });

    res.json({
      image: req.query.img || req.query.image,
      message: 'Success!',
      data,
    });
  });
});

function GetImageLabels(params, func) {
  params = {
    img: params.img || params.image || func(new Error('The image param cannot be null.')),
    maxLabels: params.maxLabels || params.MaxLabels || 10,
    minConfidence: params.minConfidence || params.MinConfidence || 80,
  };

  if (params.img.length <= 8) return func(new Error('The image param length can not be <= 8.'));

  request.get(params.img, (reqErr, _, body) => {
    if (reqErr) return func(new Error('Error in request: ' + reqErr));

    const rekParams = {
      Image: { Bytes: body },
      MaxLabels: params.maxLabels,
      MinConfidence: params.minConfidence,
    };

    rek.detectLabels(rekParams, (rekErr, data) => {
      if (rekErr) return func(new Error('Error in rek: ' + rekErr));
      return func(null, data);
    });
  });
}

export default serverless(app);
