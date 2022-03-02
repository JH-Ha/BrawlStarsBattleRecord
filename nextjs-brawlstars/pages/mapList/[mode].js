import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useRouter } from 'next/router'
import { getData } from '../../components/ApiHandler';
import ModeList from '../../components/modeList';
import styles from '../../styles/MapList.module.scss';
import Head from 'next/head';
import i18n from '../../components/i18n';

const getFilteredMap = (maps, mode) => {
    let filteredMaps = maps;
    if (mode !== 'ALL' && mode !== undefined) {
        filteredMaps = maps.filter(x => {
            return x.mode === mode;
        });
    }
    return filteredMaps;
}

export default function MapList({ mode, filteredMaps }) {

    const { t } = useTranslation();
    const router = useRouter();

    const clickMap = (mapName, mapMode) => {
        let paramMapName = mapName.replace("&", "%26");
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

    const changeMode = (value) => {
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
                return <div key={index} className={styles.gemGrabItem} >{t(map.name)}
                    <img onClick={() => { clickMap(map.name, map.mode) }} src={`/images/maps/${map.mode.indexOf("Showdown") !== -1 ? "showdown" : map.mode}/${map.name}.png`} alt={map.name}></img>
                </div>
            })}
        </div>
    </div>
    </>);
}

export async function getServerSideProps(context) {
    let { mode } = context.query;
    i18n.changeLanguage(context.locale);
    const res = await getData(`/gameMap`);
    const data = res.data.sort((a, b) => {
        return a.mode.localeCompare(b.mode);
    });;

    if (mode === undefined) {
        mode = 'gemGrab';
    }

    let maps = data;
    let filteredMaps = getFilteredMap(maps, mode);
    return { props: { mode, filteredMaps } }
}