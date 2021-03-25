import React, { Component } from 'react';
import axios from "axios";
import mapListStyles from "./MapList.scss";

class MapList extends Component {
    state = {
        gemGrabMaps: [],
    }
    componentDidMount() {
        axios.get(`http://brawlstat.xyz:8080/map`)
            //axios.get(`http://localhost/record/${tag}`)
            .then(response => {      // .then : 응답(상태코드200~300미만)성공시
                console.log(response);
                const data = response.data;
                const gemGrabMaps = data.filter(x => {
                    return x.mode === "gemGrab"
                });
                this.setState({
                    gemGrabMaps: gemGrabMaps
                })
                console.log(data);
            }).catch(error => {
                console.log(error);
            });
    }
    render() {
        return <div className="mapList">
            <div className="gemGrabContainer">{
                this.state.gemGrabMaps.map(map => {
                    return <div className="gemGrabItem">{map.name}
                        <img src={`./images/maps/${map.name}.png`}></img>
                    </div>
                })}
            </div>
        </div>
    }
}

export default MapList;