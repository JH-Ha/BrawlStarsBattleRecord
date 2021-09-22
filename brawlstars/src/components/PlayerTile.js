import React, { Component } from "react";
import "./PlayerTile.scss";

class PlayerTile extends Component {
    render() {
        const {
            brawlerName,
            playerName,
            trophies,
            power,
        } = this.props;
        return <div className={`playerTile`}>
            <div>
                <div className="imgContainer">
                    <div className="trophies">{trophies}</div>
                    <img src={`/images/${brawlerName}.png`} alt={brawlerName} width="50px" />
                    <div className="powerContainer">
                        <div className="levelText">Lv
                        </div>
                        <div className="power">{power}
                        </div>
                    </div>
                </div>
                <div className={`playerName`}>
                    {playerName}
                </div>
            </div>
        </div>
    }
}

export default PlayerTile;