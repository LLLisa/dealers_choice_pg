const express = require('express');
const app = express();
const pg = require('pg');

const client = new pg.Client('postgres://localhost/video_games');

app.get('/', (req, res, next) => {
  res.send(`<h1>hello</h1>`);
});

const port = 3000;

const setup = async () => {
  try {
    await client.connect();
    app.listen(port, () => console.log(`listening on port ${port}`));
  } catch (e) {
    console.log(e);
  }
};

setup();
