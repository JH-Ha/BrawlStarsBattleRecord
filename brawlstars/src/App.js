import React from 'react';
import logo from './logo.svg';
import './App.css';
import PlayList from './components/PlayList';
import UserList from './components/UserList';

function App() {
  return (
    <div className="App">
      <PlayList/>
      <UserList/>
    </div>
  );
}

export default App;
