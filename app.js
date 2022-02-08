const express = require('express');
const app = express();
const pg = require('pg');
const morgan = require('morgan');
const html = require('./public/app_html');

app.use(express.static('public'));
app.use(morgan('dev'));

const client = new pg.Client('postgres://localhost/video_games');

app.get('/', async (req, res, next) => {
  try {
    const response = await client.query(`SELECT * FROM games;`);
    res.send(html.fullList(response.rows));
  } catch (error) {
    next(error);
  }
});

app.get('/games/:name', async (req, res, next) => {
  try {
    const response = await client.query(`SELECT * FROM games WHERE name = $1`, [
      req.params.name,
    ]);
    res.send(html.detail(response.rows[0]));
  } catch (error) {
    next(error);
  }
});

const port = 3000;

const setup = async () => {
  try {
    await client.connect();
    const SQL = `
    DROP TABLE IF EXISTS games;
    CREATE TABLE games (name VARCHAR(50), year INT, genre VARCHAR(50), maker VARCHAR(50));
    INSERT INTO games (name, year, genre, maker)
    VALUES ('Dark_Souls', '2011', 'soulslike', 'From_Software');
    INSERT INTO games (name, year, genre, maker)
    VALUES ('Mega_Man_2', '1988', 'action-platformer', 'Capcom');
    INSERT INTO games (name, year, genre, maker)
    VALUES ('Hades', '2020', 'roguelike', 'Supergiant');
    INSERT INTO games (name, year, genre, maker)
    VALUES ('Civilization_VI', '2016', 'grand_strategy', 'Firaxis');
    `;
    app.listen(port, () => console.log(`listening on port ${port}`));
    await client.query(SQL);
  } catch (e) {
    console.log(e);
  }
};

setup();
