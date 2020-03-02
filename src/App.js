import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Pagination from './components/pagination/Paginations';
import Search from './components/search/Search';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import Home from './components/home/Home';
import './App.css';

function App() {
  

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/post/:id" component={Post} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
