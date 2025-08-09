import React, { Component } from "react";
import styles from "../styles/PlayerTile.module.scss";

interface PlayerTileProps {
    brawlerName: string;
    playerName: string;
    trophies: number;
    power: number;
}

class PlayerTile extends Component<PlayerTileProps> {
    render(): JSX.Element {
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
                    <img src={`/images/${brawlerName}.webp`} alt={brawlerName} width="50px" />
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