import React, { Component } from "react";
import styles from "../styles/PlayerTile.module.scss";

class PlayerTile extends Component {
    render() {
        const {
            brawlerName,
            playerName,
            trophies,
            power,
        } = this.props;
        return <div className={styles.playerTile}>
            <div>
                <div className={styles.imgContainer}>
                    <div className={styles.trophies}>{trophies}</div>
                    <img src={`/images/${brawlerName}.png`} alt={brawlerName} width="50px" />
                    <div className={styles.powerContainer}>
                        <div className={styles.levelText}>Lv
                        </div>
                        <div className={styles.power}>{power}
                        </div>
                    </div>
                </div>
                <div className={`${styles.playerName}`}>
                    {playerName}
                </div>
            </div>
        </div>
    }
}

export default PlayerTile;