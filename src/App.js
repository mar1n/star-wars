import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, match } from 'react-router-dom';
import Pagination from './components/pagination/Paginations';
import Search from './components/search/Search';
import Posts from './components/posts/Posts';
import People from './components/category/People';
import Planets from './components/category/Planets';
import Starships from './components/category/Starships';
import Post from './components/post/Post';
import Home from './components/home/Home';
import './App.css';

function App() {
  

  return (
    <>
      <Router>
      <Link to={`/people`}>People</Link>
        <Link to={`/planets`}>Planets</Link>
        <Link to={`/starships`}>Starship</Link>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/people" component={People} />
          <Route exact path="/planets" component={Planets} />
          <Route exact path="/starships" component={Starships} />
          <Route exact path="/post/:id" component={Post} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
