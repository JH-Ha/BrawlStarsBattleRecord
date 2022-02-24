import React, { Component, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/NaviBar.module.scss";
import i18n from "./i18n";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'


const Navbar = () => {
    const [language, setLanguage] = useState('en');
    const [toggleActive, setToggleActive] = useState(false);

    const router = useRouter();
    const { pathname, asPath, query } = router;
    useEffect(() => {
        const curLang = router.locale;
        setLanguage(curLang);
    }, []);

    const changelanguageToKo = () => {
        setLanguage('ko');
        router.push({ pathname, query }, asPath, { locale: 'ko' });
    }
    const changelanguageToEn = () => {
        setLanguage('en');
        router.push({ pathname, query }, asPath, { locale: 'en' });
    }
    const changelanguageToJa = () => {
        setLanguage('ja');
        router.push({ pathname, query }, asPath, { locale: 'ja' });
    }
    const clickToggleBtn = () => {
        setToggleActive((value) => {
            return !value;
        })
    }

    return (
        <nav className={styles.naviBar}>
            <div className={styles.logo}>
                <Link href="/" className={styles.container}>
                    <div className={styles.imgAndName}>
                        <img src="/brawlMeta.png" alt="brawlMeta.png" />
                        <div>Brawl Meta
                        </div>
                    </div>
                </Link>
            </div>
            <ul className={`${styles.menuContainer} ${toggleActive && styles.active}`}>
                <li className={styles.item}><Link href={`/`} >Home</Link></li>
                <li className={styles.item}><Link href={`/info`}>Info</Link></li>
                <li className={styles.item}><Link href={`/userList`}>Players</Link></li>
                <li className={styles.item}><Link href={`/mapList/gemGrab`} >Maps</Link></li>
                <li className={styles.item}><Link href={`/blog`} >Blog</Link></li>
                <div className={styles.languageContainer}>
                    <div className={`${styles.language} ${language === 'en' ? styles.selected : ''}`} onClick={changelanguageToEn}>en</div>
                    <div className={`${styles.language} ${language === 'ko' ? styles.selected : ''}`} onClick={changelanguageToKo}>ko</div>
                    <div className={`${styles.language} ${language === 'ja' ? styles.selected : ''}`} onClick={changelanguageToJa}>ja</div>
                </div>
            </ul>
            <div className={styles.toggleBtn} onClick={clickToggleBtn}>
                <FontAwesomeIcon icon={faBars} />
            </div>
        </nav>
    );

}

export default Navbar;
