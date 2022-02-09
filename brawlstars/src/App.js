import React from "react";
import "./App.css";
import PlayList from "./components/PlayList";
import UserList from "./components/UserList";
import { Route } from "react-router-dom";
import TopBar from "./components/TopBar";
import Home from "./components/Home";
import MapList from "./components/MapList";
import Map from "./components/Map";
import Statistics from "./components/Statistics";
import RegisterUser from "./components/RegisterUser";
import EventRotation from "./components/EventRotation";
import Footer from "./components/Footer";
import BlogList from "./components/BlogList";
import Blog from "./components/Blog";
import './components/i18n';

function App() {
  return (
    <div className="App">
      <TopBar />
      <Route path="/" component={EventRotation} exact={true} />
      <Route path="/info" component={Home} exact={true} />
      <Route path="/battleLog/:tag" component={PlayList} exact={true} />
      <Route path="/userList" component={UserList} />
      <Route path="/mapList" component={MapList} />
      <Route path="/map/:map/mode/:mode" component={Map} />
      <Route path="/statistics" component={Statistics} />
      <Route path="/user" component={RegisterUser} />
      <Route path="/blog" component={BlogList} exact={true} />
      <Route path="/blog/:id" component={Blog} />
      <Footer />
    </div>
  );
}

export default App;
