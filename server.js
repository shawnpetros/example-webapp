const express = require('express');
const bodyParser = require('body-parser');
const mongod = require('./db');

const app = express();
const port = process.env.PORT || 5000;

const handleErrors = (res, result) => {
  if (result instanceof Error) {
    res.status(500).send({ error: result.message });
  } else {
    res.send(result);
  }
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('client/build'));

app.get('/api/data', async (req, res) => {
  const r = await mongod.getAll();

  handleErrors(res, r);
});

app.post('/api/data', async (req, res) => {
  const r = await mongod.post(req.body);

  handleErrors(res, r);
});

app.delete('/api/data', async (req, res) => {
  const r = await mongod.drop();

  handleErrors(res, r);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
