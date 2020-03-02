const express = require('express');
const fetch = require('node-fetch');

const PORT = process.env.PORT || 5000;

const app = express();

var cache = {}

var midWare = (req, res, next) => {
  const username = 'all';
  if (cache[username]) {
    res.send(cache[username])
  } else {
    next()
  }
}

async function getRepos(req, res, next) {

  const username = 'all';

  let page = 1;

  let people = [];

  let lastResult = [];

  try {

    do {

      try {

        const resp = await fetch(`https://swapi.co/api/people/?format=json&page=${page}`);
        const data = await resp.json();
        lastResult = data;

        data.results.forEach(person => {
          people.push(person);
        });

        page++;

      } catch (err) {

        console.error(`Oeps, something is wrong ${err}`);

      }

    } while (lastResult.next !== null);

    cache[username] = people;

    res.send(people);
  } catch (err) {
      console.error(err);
      res.status(500);
  }
}
app.get('/repos', midWare, getRepos);

app.listen(5000, () => {
  console.log(`App listening on port ${PORT}`);
});