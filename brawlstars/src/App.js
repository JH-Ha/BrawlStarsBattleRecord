import React from "react";
import "./App.css";
import PlayList from "./components/PlayList";
import UserList from "./components/UserList";
import { BrowserRouter as Router, Route } from "react-router-dom";
import TopBar from "./components/TopBar";
import Home from "./components/Home";
import MapList from "./components/MapList";
import Map from "./components/Map";
import Statistics from "./components/Statistics";
import RegisterUser from "./components/RegisterUser";
import EventRotation from "./components/EventRotation";

function App() {
  return (
    <div className="App">
      <Router>
        <TopBar />
        <Route path="/" component={EventRotation} exact={true} />
        <Route path="/info" component={Home} exact={true} />
        <Route path="/battleLog/:tag" component={PlayList} exact={true} />
        <Route path="/userList" component={UserList} />
        <Route path="/mapList" component={MapList} />
        <Route path="/map/:map/mode/:mode" component={Map} />
        <Route path="/statistics" component={Statistics} />
        <Route path="/user" component={RegisterUser} />
      </Router>
    </div>
  );
}

export default App;
