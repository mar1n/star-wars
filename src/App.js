import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Pagination from './components/Paginations';
import Search from './components/Search';
import Posts from './components/Posts';
import Post from './components/Post';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [error, setError] = useState([]);

  const insertFilms = (value) => {
    const category = value;
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
          setLoading(false);
        } catch (err) {
          console.error(`Oeps, something is wrong ${err}`);
        }
        // keep running until there's no next page
      } while (lastResult.next !== null);
      // let's log out our new people array
      setLoading(true);
      setData(people);
      setPosts(people);
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
    setPosts(data.filter(x => x.name.toLowerCase().includes(value.target.value.toLowerCase())));
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Router>
        <button onClick={() => insertFilms('films')} className='category'>films</button>
        <button onClick={() => insertFilms('people')} className='category'>people</button>
        <button onClick={() => insertFilms('planets')} className='category'>planets</button>
        <button onClick={() => insertFilms('species')} className='category'>species</button>
        <button onClick={() => insertFilms('starships')} className='category'>starship</button>
        <button onClick={() => insertFilms('vehicles')} className='category'>vehicles</button>

        <Search value={search} onChange={(e) => onSearchChange(e)} />
        <div >
          <Posts
            list={currentPosts}
            pattern={search}
            loading={loading}
          />
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            paginate={paginate}
          />
        </div>
        <Switch>
          <Route exact path="/post/:id" component={Post} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
