import serverless from 'serverless-http';
import express from 'express';

const app = express()

app.get('/', (req, res) => {
  res.send('Hello! <a href="./api">Test an Image!</a>')
})

app.get('/api', (req, res) => {
  res.json({
    message: 'API',
  })
});

app.get('/api/:id', (req, res) => {
  res.json({
    message: `API for ${req.params.id}`,
  })
});

export default serverless(app);
