import React, { Component } from 'react';
import axios from "axios";
import mapListStyles from "./MapList.scss";

class MapList extends Component {
    state = {
        gemGrabMaps: [],
    }
    clickMap = (mapName) => {
        console.log(this);
        let { history } = this.props;
        history.push(`/map?mapName=${mapName}`);
    }
    componentDidMount() {
        axios.get(`http://brawlstat.xyz:8080/gameMap`)
            //axios.get(`http://localhost/record/${tag}`)
            .then(response => {
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
                this.state.gemGrabMaps.map((map, index) => {
                    return <div key={index} className="gemGrabItem" onClick={() => { this.clickMap(map.name) }}>{map.name}
                        <img src={`./images/maps/${map.name}.png`}></img>
                    </div>
                })}
            </div>
        </div>
    }
}

export default MapList;