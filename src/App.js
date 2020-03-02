import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, match } from 'react-router-dom';
import Pagination from './components/pagination/Paginations';
import Search from './components/search/Search';
import Posts from './components/posts/Posts';
import Peoples from './components/category/Peoples';
import People from './components/category/People';
import Planets from './components/category/Planets';
import Planet from './components/category/Planet';
import Starships from './components/category/Starships';
import Starship from './components/category/Starship';
import Post from './components/post/Post';
import Home from './components/home/Home';
import './App.css';

function App() {
  

  return (
    <>
      <Router>
      <Link to={`/peoples`}>People</Link>
        <Link to={`/planets`}>Planets</Link>
        <Link to={`/starships`}>Starship</Link>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/peoples" component={Peoples} />
          <Route exact path="/peoples/:id" component={People} />
          <Route exact path="/planets" component={Planets} />
          <Route exact path="/planets/:id" component={Planet} />
          <Route exact path="/starships" component={Starships} />
          <Route exact path="/starships/:id" component={Starship} />
          
        </Switch>
      </Router>
    </>
  );
}

export default App;
