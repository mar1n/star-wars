import React, { useState, useEffect } from 'react';
import './App.css';

const DEFAULT_QUERY = '';

const PATH_BASE = 'https://swapi.co/api/';
const PATH_SEARCH = '?search=';

const isSearched = searchTerm => item =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase());

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState(DEFAULT_QUERY);
  const [error, setError] = useState([]);

  const insertFilms = (value) => {
    const category = value;
    fetch(`${PATH_BASE}${category}${PATH_SEARCH}${search}`)
      .then(res => res.json())
      .then((result) => {
        setSearchName(result.results)
      },
        (error) => {
          setError(error)
        }
      );
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
      <button onClick={() => insertFilms('starship')} className='category'>starship</button>
      <button onClick={() => insertFilms('vehicles')} className='category'>vehicles</button>

      <input type="text" onChange={(e) => onSearchChange(e)} />

      <ul>
        {
          data.filter(isSearched(search)).map(item => (
            <li key={item.episode_id}>
              <p>{item.title}</p>
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
