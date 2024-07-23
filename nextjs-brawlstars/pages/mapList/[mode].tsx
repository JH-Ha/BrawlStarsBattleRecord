import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router'
import { getData } from '../../components/ApiHandler';
import ModeList from '../../components/modeList';
import styles from '../../styles/MapList.module.scss';
import Head from 'next/head';
import { calDisplayMapTime } from '../../components/BaseFunctions';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import Pagination from '../../components/Pagination';

type GameMap = {
    name: string,
    mode: string,
    startTime: string,
    endTime: string,
    displayName: string
}

type ModeListProps = {
    mode: string,
    mapName: string,
    gameMaps: GameMap[],
}

const MapList: React.FC<ModeListProps> = ({ mode, mapName, gameMaps }) => {

    const { t } = useTranslation();
    const router = useRouter();
    const [mapNameForSearch, setMapNameForSearch] = useState<string>(mapName);
    const [searchedMaps, setSearchedMaps] = useState<GameMap[]>([]);
    const [curPage, setCurPage] = useState<number>(1);
    const [totalGameMapNum, setTotalGameMapNum] = useState<number>(0);
    const numShowTimes = 8;

    useEffect(() => {
        const filteredMaps = gameMaps.filter(map => t(map.name).toLocaleLowerCase().indexOf(mapName.toLocaleLowerCase()) != -1);

        const startIndex = (curPage - 1) * numShowTimes;
        const currentMaps = filteredMaps.slice(startIndex, startIndex + numShowTimes);
        setSearchedMaps(currentMaps);
        setTotalGameMapNum(filteredMaps.length);
    }, [gameMaps, curPage])


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

    const handleMapNameChange = (e: React.FormEvent<HTMLInputElement>) => {
        setMapNameForSearch(e.currentTarget.value);
    }
    const clickSearchBtn = () => {
        setCurPage(1);
        router.push({
            pathname: '/mapList/[mode]',
            query: {
                mode: mode,
                mapName: mapNameForSearch
            }
        })
    }
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            clickSearchBtn();
        }
    }

    return (<><div className={styles.mapList}>
        <Head>
            <title>Map List - Brawl Meta</title>
        </Head>
        <div className='page-title'>
            {t('mapsGuide')}
        </div>
        <div className={styles.searchContainer}>
            <ModeList key={mode} changeMode={changeMode} mode={mode}></ModeList>
            <div className='form-floating'>
                <input type='text'
                    className='form-control'
                    onChange={handleMapNameChange}
                    value={mapNameForSearch}
                    onKeyDown={handleKeyDown}></input>
                <label htmlFor=''>map name</label>
            </div>
            <button className='btn btn-primary' type='button' onClick={clickSearchBtn}>{t('search')}</button>
        </div>
        <div className={styles.gemGrabContainer}>{
            searchedMaps
                .map((map, index) => {
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
        <Pagination curPage={curPage} numTotal={totalGameMapNum} pageUrl={"/"} numShowItems={numShowTimes} onClick={(num: number) => setCurPage(num)}></Pagination>
    </div>
    </>);
}



export const getServerSideProps: GetServerSideProps = async (context) => {
    let { mode, mapName } = context.query as { mode: string, mapName: string };
    let locale = context.locale;
    //i18n.changeLanguage(context.locale);
    let searchParams = new URLSearchParams({
        mode: mode
    });

    const res = await getData(`/gameMap?${searchParams}`);
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

    if (mapName === undefined) {
        mapName = '';
    }

    gameMaps.sort((a, b) => {
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
            mapName,
            gameMaps
        }
    }
}

export default MapList;