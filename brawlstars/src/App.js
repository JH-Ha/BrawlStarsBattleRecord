import React from 'react';
import logo from './logo.svg';
import './App.css';
import PlayList from './components/PlayList';
import UserList from './components/UserList';
import {BrowserRouter as Router,  Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      
      <Router>
      <div>
        <ul>
          <li>
            <Link to="/">홈</Link>
          </li>
          <li>
            <Link to="playList">play record</Link>
          </li>
          <li>
            <Link to="/userList">user list</Link>
          </li>

        </ul>
      </div>
        <Route path="/playList" component={PlayList} exact={true}/>
        <Route path="/userList" component ={UserList}/>
      </Router>
    </div>
  );
}

export default App;
