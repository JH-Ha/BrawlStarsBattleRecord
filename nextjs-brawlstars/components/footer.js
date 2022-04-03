import React from 'react';
import { Twitter, Youtube } from 'react-bootstrap-icons';
import styles from "../styles/Footer.module.scss";

const Footer = () => {

    return (
        <footer className={styles.footer}>
            <div className={styles.snsContainer}>
                <a className={styles.icon} href="https://www.youtube.com/channel/UCXmfZv4gZLbQfR8RKGOhXkw">
                    <Youtube />
                </a>
                <a className={styles.icon} href="https://twitter.com/brawl_meta">
                    <Twitter />
                </a>
            </div>
            <div>
                This material is unofficial and is not endorsed by Supercell.
                <br />
                For more information see <a href="https://www.supercell.com/fan-content-policy">Supercell&apos;s Fan Content Policy</a>
            </div>
        </footer >
    )
};

export default Footer;