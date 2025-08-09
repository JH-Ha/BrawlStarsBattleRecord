import React from "react";
import { getData } from "../components/ApiHandler";
import ModeList from "../components/modeList";
import { isTrio } from "../components/BaseFunctions";
import RecordResult from '../components/recordResult';
import styles from "../styles/Statistics.module.scss";
import { useRouter } from "next/router";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';

interface RecordData {
    brawlerName: string;
    result?: string;
    cnt: number;
    rankSum?: number;
}

interface TeamModeRecord {
    brawlerName: string;
    victory: number;
    defeat: number;
    draw: number;
    winRate: number;
    totalGameNum: number;
}

interface SoloModeRecord {
    brawlerName: string;
    averageRank: number;
    totalGameNum: number;
}

interface AllModeRecord {
    brawlerName: string;
    totalGameNum: number;
}

type RecordItem = TeamModeRecord | SoloModeRecord | AllModeRecord;

interface StatisticsProps {
    tag: string;
    mode: string;
    recordArr: RecordItem[];
    sumTotalGameNum: number;
}

const Statistics: React.FC<StatisticsProps> = ({ tag, mode, recordArr, sumTotalGameNum }) => {
    const router = useRouter();

    const changeMode = (selectedMode: string) => {
        router.push({
            pathname: '/statistics',
            query: {
                mode: selectedMode,
                tag: tag,
            }
        })
    }

    return <div>
        <div className={styles.statistics}>
            <div className={styles.modeListContainer}>
                <ModeList key={mode} mode={mode} changeMode={changeMode} />
            </div>
            <RecordResult key={JSON.stringify(recordArr)} _recordArr={recordArr} sumTotalGameNum={sumTotalGameNum} mode={mode}
                isPersonal={true} />
        </div>
    </div>
}

async function getRecordResult(searchParams: URLSearchParams): Promise<{ recordArr: RecordItem[], sumTotalGameNum: number }> {
    let records: { [key: string]: any } = {};
    let recordArr: RecordItem[] = [];
    const mode = searchParams.get("mode") || '';

    let res = await getData(`/record/result?${searchParams}`)

    const data: RecordData[] = res.data;
    data.forEach(e => {
        if (isTrio(mode)) {
            if (records[e.brawlerName] === undefined) {
                records[e.brawlerName] = {};
            }
            records[e.brawlerName] = {
                ...records[e.brawlerName],
                [e.result!]: e.cnt,
            }
        } else {
            records[e.brawlerName] = {
                brawlerName: e.brawlerName,
                averageRank: e.rankSum! / e.cnt,
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
            } as AllModeRecord);
            sumTotalGameNum += cnt;
        }
        recordArr.sort((a, b) => {
            return (b as AllModeRecord).totalGameNum - (a as AllModeRecord).totalGameNum;
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
            } as TeamModeRecord);
            sumTotalGameNum += totalGameNum;
        }

        recordArr.sort((a, b) => {
            return (b as TeamModeRecord).winRate - (a as TeamModeRecord).winRate;
        })
    } else {
        for (let key in records) {
            let { averageRank, cnt } = records[key];
            recordArr.push({
                "brawlerName": key,
                "averageRank": averageRank,
                "totalGameNum": cnt
            } as SoloModeRecord);
            sumTotalGameNum += cnt;
        }
        recordArr.sort((a, b) => {
            return (a as SoloModeRecord).averageRank - (b as SoloModeRecord).averageRank;
        })
    }
    console.log(recordArr);
    return ({
        recordArr: recordArr,
        sumTotalGameNum: sumTotalGameNum
    })
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale } = context;
    let { tag, mode } = context.query;
    
    const tagParam = typeof tag === 'string' ? tag : '';
    const modeParam = typeof mode === 'string' ? mode : 'gemGrab';
    
    let searchParams = new URLSearchParams({
        tag: tagParam,
        mode: modeParam,
    });
    let { recordArr, sumTotalGameNum } = await getRecordResult(searchParams);
    return ({
        props: {
            ...(await serverSideTranslations(locale || 'en', ['common'])),
            tag: tagParam,
            mode: modeParam,
            recordArr,
            sumTotalGameNum
        }
    });
}

export default Statistics;