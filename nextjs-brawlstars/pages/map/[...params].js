import React, { Component, useState } from 'react';
import styles from "../../styles/Map.module.scss";
import { getData } from '../../components/ApiHandler';
import RecordResult from '../../components/recordResult';
import { isDuels, isTrio } from '../../components/BaseFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import i18n from '../../components/i18n';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


async function getRecordResult(mapName, mode) {

    let records = {};
    let recordArr = [];

    const res = await getData(`/api/statistics/mode/${mode}/map/${mapName}`);
    const data = res.data;

    if (!(data instanceof Array)) {
        return ({
            recordArr: recordArr,
            sumTotalGameNum: 0,
        })
    }
    data.forEach(e => {
        if (isTrio(mode) || isDuels(mode)) {
            if (records[e.brawlerName] === undefined) {
                records[e.brawlerName] = {
                };
            }
            records[e.brawlerName] = {
                ...records[e.brawlerName],
                [e.result]: e.cnt,
            }
        } else {
            records[e.brawlerName] = {
                brawlerName: e.brawlerName,
                averageRank: e.rankSum / e.cnt,
                cnt: e.cnt,
            }
        }
    });

    let sumTotalGameNum = 0;
    if (isTrio(mode) || isDuels(mode)) {
        for (let key in records) {
            let { victory, defeat, draw } = records[key];
            const victoryNum = victory || 0;
            const defeatNum = defeat || 0;
            const drawNum = draw || 0;
            const totalGameNum = victoryNum + defeatNum + drawNum;
            recordArr.push({
                "brawlerName": key,
                "victory": victoryNum,
                "defeat": defeatNum,
                "draw": drawNum,
                "winRate": (victoryNum) / totalGameNum,
                "totalGameNum": totalGameNum
            });
            sumTotalGameNum += totalGameNum;
        }

        recordArr.sort((a, b) => {
            return b.winRate - a.winRate;
        })
    } else {
        for (let key in records) {
            let { averageRank, cnt } = records[key];
            recordArr.push({
                "brawlerName": key,
                "averageRank": averageRank,
                "totalGameNum": cnt
            });
            sumTotalGameNum += cnt;
        }
        recordArr.sort((a, b) => {
            return a.averageRank - b.averageRank;
        })
    }

    return ({
        recordArr: recordArr,
        sumTotalGameNum: sumTotalGameNum
    });
}

export default function Map({ mapName, mode, recordArr, sumTotalGameNum, displayMapName }) {

    const { t } = useTranslation();
    const [isMapShown, setIsMapShown] = useState(false);

    function showMapImg() {
        setIsMapShown(value => {
            return !value;
        });
    }


    return <><div className={styles.mapClass}>
        <Head>
            <title>{`${t(mapName)} ${t("Win Rate")} ${t("Statistics")}`} </title>
        </Head>
        <h3>{t("Win Rate")} {t("Statistics")}</h3>
        <div className={styles.mapNameContainer} onClick={() => showMapImg()}>
            <span className={styles.mapName}>{t(mapName)}</span>
            <div className={styles.chevronContainer}>
                {isMapShown ?
                    <FontAwesomeIcon icon={faChevronUp} />
                    : <FontAwesomeIcon icon={faChevronDown} />
                }
            </div>
        </div>
        <div className={`${styles.mapImgContainer}
            ${mode.includes("Showdown") ? `${styles.showdown}` : ''}
            ${isMapShown ? '' : `${styles.none}`}`}>
            <img className={styles.mapImg} src={`/images/maps/${mode.includes("Showdown") ? 'showdown' : mode}/${displayMapName}.png`} alt={mapName} />
        </div>

        {mapName === "" ? (<div>invalid map name</div>) :
            <RecordResult key={recordArr} _recordArr={recordArr} sumTotalGameNum={sumTotalGameNum} mode={mode} />
        }
    </div>
    </>
};

export async function getServerSideProps(context) {
    let { params } = context.query;
    let mapName = '';
    let mode = '';
    const { locale } = context;
    //let recordArr = [];
    //let sumTotalGameNum = 0;
    if (params.length >= 3) {
        mapName = decodeURIComponent(params[0]);
        mode = params[2];
    }
    let displayMapName = mapName.replace(":", "");

    //i18n.changeLanguage(context.locale);

    //const mapName = unescape(params.map);
    //const mode = params.mode;

    let { recordArr, sumTotalGameNum } = await getRecordResult(mapName, mode);

    return ({
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
            mode, mapName, displayMapName, recordArr, sumTotalGameNum
        }
    });
}