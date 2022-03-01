import React from 'react';

import styles from "../styles/Footer.module.scss";

const Footer = () => {

    return (
        <footer className={styles.footer}>
            This material is unofficial and is not endorsed by Supercell.
            <br />
            For more information see <a href="https://www.supercell.com/fan-content-policy">Supercell&apos;s Fan Content Policy</a>
        </footer>
    )
};

export default Footer;