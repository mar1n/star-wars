import React, { useState, useEffect } from 'react';
import './App.css';

const DEFAULT_QUERY = '';

const PATH_BASE = 'https://swapi.co/api/';
const PATH_SEARCH = '?search=';
const mainUrl = 'https://swapi.co/api/people/?search=r2';

function App() {
  const [films, setFilms] = useState('');
  const [people, setPeople] = useState('');
  const [planets, setPlanets] = useState('');
  const [species, setSpecies] = useState('');
  const [starship, setStarship] = useState('');
  const [vehicles, setVehicles] = useState('');

  const [category, setCategory] = useState('');

  const [data, setData] = useState([]);
  const [search, setSearch] = useState(DEFAULT_QUERY);
  const [error, setError] = useState([]);

  const insertFilms = (value) => {
    const category = value;
    fetch(`${PATH_BASE}${category}${PATH_SEARCH}${DEFAULT_QUERY}`)
      .then(res => res.json())
      .then((result) => {
        setData(result.results)
      },
        (error) => {
          setError(error)
        }
      );
  }

  const setSearchName = (result) => {
      setData({result});
  }

  return (
    <>
      <button onClick={() => insertFilms('films')} className='category'>films</button>
      <button onClick={() => insertFilms('people')} className='category'>people</button>
      <button onClick={() => insertFilms('planets')} className='category'>planets</button>
      <button onClick={() => insertFilms('species')} className='category'>species</button>
      <button onClick={() => insertFilms('starship')} className='category'>starship</button>
      <button onClick={() => insertFilms('vehicles')} className='category'>vehicles</button>
      <div className='listOfCategory'>
        {films}
      </div>
      <ul>
        {console.log(data)}
        {
        data.map(item => (
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
