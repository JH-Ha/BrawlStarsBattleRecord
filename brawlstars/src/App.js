import React from "react";
import logo from "./logo.svg";
import "./App.css";
import PlayList from "./components/PlayList";
import UserList from "./components/UserList";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import TopBar from "./components/TopBar";
import Home from "./components/Home";
import MapList from "./components/MapList";
import Map from "./components/Map";
import Statistics from "./components/Statistics";

function App() {
  return (
    <div className="App">
      <Router>
        <TopBar />
        <Route path="/" component={Home} exact={true} />
        <Route path="/battleLog/:tag" component={PlayList} exact={true} />
        <Route path="/userList" component={UserList} />
        <Route path="/mapList" component={MapList} />
        <Route path="/map/:map/mode/:mode" component={Map} />
        <Route path="/statistics" component={Statistics} />
      </Router>
    </div>
  );
}

export default App;
