import React, { useState, useEffect } from 'react';
import './App.css';

const DEFAULT_QUERY = '';

const PATH_BASE = 'https://swapi.co/api/';
const PATH_SEARCH = '/?search=';
const PARAM_PAGE = 'page='

const isSearched = searchTerm => item =>
  item.name.toLowerCase().includes(searchTerm.toLowerCase());

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState(DEFAULT_QUERY);
  const [error, setError] = useState([]);

  const insertFilms = (value) => {
    const category = value;
    // fetch(`${PATH_BASE}${category}${PATH_SEARCH}${search}&${PARAM_PAGE}4`)
    //   .then(res => res.json())
    //   .then((result) => {
    //     setSearchName(result.results)
    //   },
    //     (error) => {
    //       setError(error)
    //     }
    //   );
    async function getPages() {
      // set some variables
      const baseUrl = `https://swapi.co/api/${category}/?format=json&page=`;
      let page = 1;
      // create empty array where we want to store the people objects for each loop
      let people = [];
      // create a lastResult array which is going to be used to check if there is a next page
      let lastResult = [];
      do {
        // try catch to catch any errors in the async api call
        try {
          // use node-fetch to make api call
          const resp = await fetch(`${baseUrl}${page}`);
          const data = await resp.json();
          lastResult = data;
          data.results.forEach(person => {
            // destructure the person object and add to array
            const { name, height, films } = person;
            people.push({ name, height, films });
          });
          // increment the page with 1 on each loop
          page++;
        } catch (err) {
          console.error(`Oeps, something is wrong ${err}`);
        }
        // keep running until there's no next page
      } while (lastResult.next !== null);
      // let's log out our new people array
      // console.log(people);
      setData(people);
    }
    
    console.time("Time my API call");
    getPages();
    console.timeEnd("Time my API call");
  }

  const setSearchName = (result) => {
    setData(result);
  }

  const onSearchChange = (value) => {
    setSearch(value.target.value);
  }

  return (
    <>
      <button onClick={() => insertFilms('films')} className='category'>films</button>
      <button onClick={() => insertFilms('people')} className='category'>people</button>
      <button onClick={() => insertFilms('planets')} className='category'>planets</button>
      <button onClick={() => insertFilms('species')} className='category'>species</button>
      <button onClick={() => insertFilms('starships')} className='category'>starship</button>
      <button onClick={() => insertFilms('vehicles')} className='category'>vehicles</button>

      <input type="text" onChange={(e) => onSearchChange(e)} />

      <ul>
        {
          data.filter(isSearched(search)).map(item => (
            <li key={item.episode_id}>
              <p>{item.name}</p>
              <p>{item.opening_crawl}</p>
              <p>{item.director}</p>
              <p>{item.release_date}</p>
              <p>{item.characters}</p>
              <p>{item.planets}</p>
              <p>{item.starships}</p>
              <p>{item.vehicles}</p>
              <p>{item.species}</p>
              <p>{item.created}</p>
              <p>{item.edited}</p>
              <p>{item.url}</p>
            </li>
          ))
        }
      </ul>
    </>
  );
}

export default App;
