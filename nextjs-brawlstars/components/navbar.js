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

    //const location = useLocation();
    //const history = useHistory();
    const router = useRouter();
    console.log("test");
    console.log(router);

    useEffect(() => {
        //const curLang = location.pathname.slice(1, 3);
        const curLang = router.locale;
        setLanguage(curLang);
        i18n.changeLanguage(curLang);
    }, []);

    const changelanguageToKo = () => {
        i18n.changeLanguage('ko');
        setLanguage('ko');
        console.log(history);
        router.push(router.pathname, { locale: 'ko' });
        //const nextLocation = location.pathname.replace(language, "ko");
        //router.push(nextLocation);
    }
    const changelanguageToEn = () => {
        i18n.changeLanguage('en');
        setLanguage('en');
        //const nextLocation = location.pathname.replace(language, "en");
        //router.push(nextLocation);
        router.push(router.pathname, { locale: 'en' });
    }
    const changelanguageToJa = () => {
        i18n.changeLanguage('ja');
        setLanguage('ja');
        //const nextLocation = location.pathname.replace(language, "ja");
        //router.push(nextLocation);
        router.push(router.pathname, { locale: 'ja' });
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
                <li className={styles.item}><Link href={`/${language}/`} >Home</Link></li>
                <li className={styles.item}><Link href={`/${language}/info`}>Info</Link></li>
                <li className={styles.item}><Link href={`/${language}/userList`}>Players</Link></li>
                <li className={styles.item}><Link href={`/${language}/mapList`} >Maps</Link></li>
                <li className={styles.item}><Link href={`/${language}/blog`} >Blog</Link></li>
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
