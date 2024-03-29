import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router'
import { getData } from '../../components/ApiHandler';
import ModeList from '../../components/modeList';
import styles from '../../styles/MapList.module.scss';
import Head from 'next/head';
import { calDisplayMapTime } from '../../components/BaseFunctions';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';

type GameMap = {
    name: string,
    mode: string,
    startTime: string,
    endTime: string,
    displayName: string
}

type ModeListProps = {
    mode: string,
    filteredMaps: GameMap[],
}

const getFilteredMap = (maps: GameMap[], mode: string) => {
    let filteredMaps = maps;
    if (mode !== 'ALL' && mode !== undefined) {
        filteredMaps = maps.filter(x => {
            return x.mode === mode;
        });
    }
    return filteredMaps;
}

const MapList: React.FC<ModeListProps> = ({ mode, filteredMaps }) => {

    const { t } = useTranslation();
    const router = useRouter();

    const clickMap = (mapName: string, mapMode: string) => {
        let paramMapName = encodeURIComponent(mapName);
        // let { history, i18n } = this.props;
        router.push({
            pathname: "/map/[map]/mode/[mode]",
            query: {
                map: paramMapName,
                mode: mapMode
            }
        });
        //`/${i18n.language}/map/${paramMapName}/mode/${mapMode}`);
    }

    const changeMode = (value: string) => {
        router.push({
            pathname: '/mapList/[mode]',
            query: { mode: value },
        })
    }

    return (<><div className={styles.mapList}>
        <Head>
            <title>Map List - Brawl Meta</title>
        </Head>
        <h3>
            {t('mapsGuide')}
        </h3>
        <div>
            <ModeList key={mode} changeMode={changeMode} mode={mode}></ModeList>
        </div>
        <div className={styles.gemGrabContainer}>{
            filteredMaps.map((map, index) => {
                return <div key={index} className={styles.gemGrabItem} >
                    <div className={styles.mapTimeContainer}>
                        <div className={styles.mapTime}>
                            {calDisplayMapTime(map.startTime, map.endTime, t)}
                        </div>
                    </div>
                    <div className={styles.mapName}>{t(map.displayName)}</div>
                    <div className={styles.imgContainer}>
                        <img onClick={() => { clickMap(map.name, map.mode) }} src={`/images/maps/${map.mode.indexOf("Showdown") !== -1 ? "showdown" : map.mode}/${map.displayName}.png`} alt={map.name}></img>
                    </div>
                </div>
            })}
        </div>
    </div>
    </>);
}



export const getServerSideProps: GetServerSideProps = async (context) => {
    let { mode } = context.query;
    let locale = context.locale;
    //i18n.changeLanguage(context.locale);
    const res = await getData(`/gameMap`);
    const gameMaps: GameMap[] = res.data;

    gameMaps.map(a => {
        let oneYearAgo = '20210301T000000.000Z';
        a.displayName = a.name.replace(":", "");
        if (a.startTime === null) {
            a.startTime = oneYearAgo;
        }
        if (a.endTime === null) {
            a.endTime = oneYearAgo;
        }
        return a;
    });

    if (mode === undefined) {
        mode = 'gemGrab';
    }
    if (Array.isArray(mode)) {
        mode = mode[0];
    }

    const filteredMaps = getFilteredMap(gameMaps, mode);
    filteredMaps.sort((a, b) => {
        let cmpResult = a.mode.localeCompare(b.mode);
        if (cmpResult == 0) {
            return b.startTime.localeCompare(a.startTime);
        } else {
            return cmpResult;
        }
    });
    return {
        props: {
            ...(await serverSideTranslations(locale as string, ['common'])),
            mode,
            filteredMaps
        }
    }
}

export default MapList;