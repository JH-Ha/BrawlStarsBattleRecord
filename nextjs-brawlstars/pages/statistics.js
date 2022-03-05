import React, { Component } from "react";
import { getData } from "../components/ApiHandler";
import ModeList from "../components/modeList";
import { isTrio } from "../components/BaseFunctions";
import RecordResult from '../components/recordResult';
import styles from "../styles/Statistics.module.scss";
import { useRouter } from "next/router";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Statistics({ tag, mode, recordArr, sumTotalGameNum }) {
    // state = {
    //     tag: '',
    //     mode: 'gemGrab',
    //     recordArr: [],
    //     sumTotalGameNum: 0,
    // }

    const router = useRouter();

    const changeMode = (mode) => {
        router.push({
            pathname: '/statistics',
            query: {
                mode: mode,
                tag: tag,
            }
        })
    }


    return <div>
        <div className={styles.statistics}>
            <div className={styles.modeListContainer}>
                <ModeList key={mode} mode={mode} changeMode={changeMode} />
            </div>
            <RecordResult key={recordArr} _recordArr={recordArr} sumTotalGameNum={sumTotalGameNum} mode={mode}
                isPersonal={true} />
        </div>
    </div>
}
async function getRecordResult(searchParams) {
    let records = {};
    let recordArr = [];
    const mode = searchParams.get("mode");

    let res = await getData(`/record/result?${searchParams}`)

    const data = res.data;
    data.forEach(e => {
        if (isTrio(mode)) {
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
    if (mode === 'ALL') {
        for (let key in records) {
            const { brawlerName, cnt } = records[key];
            recordArr.push({
                "brawlerName": brawlerName,
                "totalGameNum": cnt,
            });
            sumTotalGameNum += cnt;
        }
        recordArr.sort((a, b) => {
            return b.totalGameNum - a.totalGameNum;
        });

    }
    else if (isTrio(mode)) {
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
    console.log(recordArr);
    return ({
        recordArr: recordArr,
        sumTotalGameNum: sumTotalGameNum
    })
}
export async function getServerSideProps(context) {
    const { locale } = context;
    let { tag, mode } = context.query;
    if (tag === undefined) {
        tag = '';
    }
    if (mode === undefined) {
        mode = 'gemGrab'
    }
    let searchParams = new URLSearchParams({
        tag: tag,
        mode: mode,
    });
    let { recordArr, sumTotalGameNum } = await getRecordResult(searchParams);
    return ({
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
            tag,
            mode,
            recordArr,
            sumTotalGameNum
        }
    });
}