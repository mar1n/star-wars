const express = require('express');
const fetch = require('node-fetch');
const redis = require('redis');

const PORT = process.env.PORT || 5000;
const REDIS_PORT = process.env.PORT || 6379;

const client = redis.createClient(REDIS_PORT);

const app = express();

// Set response
function setResponse(username, repos) {
  return `<h2>${username} has ${repos} Github repos</h2>`;
}

// Make request to Github for data
// async function getRepos(req, res, next) {
//   try {
//     console.log('Fetching Data...');

//     const username  = 'all';

//     const response = await fetch(`https://dog.ceo/api/breeds/list/all`);

//     const data = await response.json();
// console.log(data);
//     const repos = data;

//     // Set data to Redis
//     client.setex(username, 3600, repos);

//     res.send(setResponse(username, repos));
//   } catch (err) {
//     console.error(err);
//     res.status(500);
//   }
// }

// Cache middleware
// function cache(req, res, next) {
//   const username = 'all';

//   client.get(username, (err, data) => {
//     if (err) throw err;

//     if (data !== null) {
//       res.send(setResponse(username, data));
//     } else {
//       next();
//     }
//   });
// }

var cache = {}
var midWare = (req, res, next) => {
  const username  = 'all';
    if (cache[username]) {
        res.send(cache[username])
    } else {
        next()
    }
}

async function getRepos(req, res, next) {
//   try {
//     console.log('Fetching Data...');

//     const username  = 'all';

//     const response = await fetch(`https://swapi.co/api/people/?format=json&page=`);

//     const data = await response.json();
// console.log(data);
//     const repos = data;

//     // Set data to Redis
//     //client.setex(username, 3600, repos);
//     cache[username] = data;

//     res.send(data);
//   } catch (err) {
//     console.error(err);
//     res.status(500);
//   }
const username  = 'all';
let page = 1;
      // create empty array where we want to store the people objects for each loop
      let people = [];
      // create a lastResult array which is going to be used to check if there is a next page
      let lastResult = [];
      try {
      do {
        // try catch to catch any errors in the async api call
        try {
          // use node-fetch to make api call
          const resp = await fetch(`https://swapi.co/api/people/?format=json&page=${page}`);
          const data = await resp.json();
          //console.log(data);
          lastResult = data;
          data.results.forEach(person => {
            // destructure the person object and add to array
            const { name, height, films } = person;
            people.push(person);
          });
          // increment the page with 1 on each loop
          page++;
          setLoading(false);
        } catch (err) {
          console.error(`Oeps, something is wrong ${err}`);
        }
        // keep running until there's no next page
      } while (lastResult.next !== null);
      const repos = people;
      cache[username] = people;
      res.send(people);
    } catch(err) {
      console.error(err);
      res.status(500);
    }
}
app.get('/repos', midWare, getRepos);

app.listen(5000, () => {
  console.log(`App listening on port ${PORT}`);
});

// app.get("/schools", (req, resp) => {
//   fetch(
//     'https://dog.ceo/api/breeds/list/all'
//   )
//     .then(res => res.json())
//     .then(json => {
//       resp.send(json);
//     })
//     .catch(err => {
//       console.error(err);
//       resp.send(202);
//     });
// });
// app.listen(3001, function() {
//   console.log('Your app is running on port 3000 !!!')
// });
//  const express = require('express');
// const responseTime = require('response-time')

// //Load Express Framework
// var app = express();

// //Create a middleware that adds a X-Response-Time header to responses.
// app.use(responseTime());

// const axios = require('axios')


// const getBreeds = async () => {
//     try {
//       return await axios.get('https://dog.ceo/api/breeds/list/all')
//     } catch (error) {
//       console.error(error)
//     }
//   }

// app.get('/dogs', getBreeds);

// app.listen(3001
//     , function() {
//   console.log('Your app is running on port 3000 !!!')
// });