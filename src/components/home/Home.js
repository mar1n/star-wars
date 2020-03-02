import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Pagination from '../pagination/Paginations';
import Search from '../search/Search';
import Posts from '../posts/Posts';

export default function Home() {
    const [data, setData] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [search, setSearch] = useState('');

  const insertFilms = (value) => {
    const category = value;
    async function getPages() {
      setLoading(false);
      fetch('/repos')
        .then(response => response.json())
        .then(characters => {
            setData(characters);
            setPosts(characters);
            setLoading(true);
        })
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
        <nav>
        <button onClick={() => insertFilms('films')} className='category'>films</button>
        <button onClick={() => insertFilms('people')} className='category'>people</button>
        <button onClick={() => insertFilms('planets')} className='category'>planets</button>
        <button onClick={() => insertFilms('species')} className='category'>species</button>
        <button onClick={() => insertFilms('starships')} className='category'>starship</button>
        <button onClick={() => insertFilms('vehicles')} className='category'>vehicles</button>
        </nav>
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
        </>
    );
}