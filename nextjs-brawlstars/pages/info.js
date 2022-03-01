import Head from 'next/head'
import React, { Component } from "react";
import styles from "../styles/Info.module.scss";
import { useTranslation } from 'react-i18next';
//import AdSense from 'react-adsense';

function Info() {
    const { t } = useTranslation();
    return (
        <div
            style={{
                "marginTop": "30px",
            }}
            className={styles.home}
        >
            <Head>
                <title>Brawl Meta Info</title>
            </Head>
            <div className={styles.contentContainer}>
                <div className={styles.content}>
                    {t('homeGuide')}
                </div>
            </div>
            {/* <AdSense.Google
          style={{ display: 'block' }}
          client='ca-pub-4114406385852589'
          slot='4607116156'
          format='auto'
          responsive='true'
        /> */}

        </div>
    );
}
export default Info;