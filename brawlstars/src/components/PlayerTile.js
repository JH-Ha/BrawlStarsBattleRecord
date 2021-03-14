import React, { Component } from "react";
import playerTileStyles from "./PlayerTile.scss";

class PlayerTile extends Component {
    constructor() {
        super();
    }
    render() {
        const {
            brawlerName,
            playerName,
            trophies,
        } = this.props;
        return <div className={`playerTile`}>
            <div>
                <div>{trophies}</div>
                <img src={`images/${brawlerName}.png`} width="50px" />
                <div className={`playerName`}>
                    {playerName}
                </div>
            </div>
        </div>
    }
}

export default PlayerTile;