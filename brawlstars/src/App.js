import React from "react";
import "./App.css";
import PlayList from "./components/PlayList";
import UserList from "./components/UserList";
import { Route, Switch, Redirect } from "react-router-dom";
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

      <Switch>
        <Route path="/:lang" component={EventRotation} exact={true} />
        <Route path="/:lang/info" component={Home} exact={true} />
        <Route path="/:lang/battleLog/:tag" component={PlayList} exact={true} />
        <Route path="/:lang/userList" component={UserList} />
        <Route path="/:lang/mapList" component={MapList} />
        <Route path="/:lang/map/:map/mode/:mode" component={Map} />
        <Route path="/:lang/statistics" component={Statistics} />
        <Route path="/:lang/user" component={RegisterUser} />
        <Route path="/:lang/blog" component={BlogList} exact={true} />
        <Route path="/:lang/blog/:id" component={Blog} />
        <Redirect to="/en" />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
