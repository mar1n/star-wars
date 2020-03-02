const express = require('express');
const fetch = require('node-fetch');

const PORT = process.env.PORT || 5000;

const app = express();

var cache = {}

var midWare = (req, res, next) => {
  const { category } = req.params;
  if (cache[category]) {
    res.send(cache[category])
  } else {
    next()
  }
}

async function getRepos(req, res, next) {
  const { category } = req.params;

  let page = 1;

  let people = [];

  let lastResult = [];

  try {

    do {

      try {

        const resp = await fetch(`https://swapi.co/api/${category}/?format=json&page=${page}`);
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

    cache[category] = people;

    res.send(people);
  } catch (err) {
      console.error(err);
      res.status(500);
  }
}
app.get('/repos/:category', midWare, getRepos);

app.listen(5000, () => {
  console.log(`App listening on port ${PORT}`);
});