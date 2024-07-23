/** @format */

import React, {
  ReactEventHandler,
  SelectHTMLAttributes,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import styles from "../../styles/Map.module.scss";
import eventStyles from "../../styles/EventRotation.module.scss";
import { getData } from "../../components/ApiHandler";
import RecordResult from "../../components/recordResult";
import { isDuels, isPenta, isTeamMode, isTrio } from "../../components/BaseFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

interface RecordResultDto {
  brawlerName: string;
  result: string;
  cnt: number;
  rankSum: number;
}

interface RawRecord {
  brawlerName: string;
  victory?: number;
  defeat?: number;
  draw?: number;
  averageRank?: number;
  cnt: number;
}
interface RawRecords {
  [key: string]: RawRecord;
}

interface Record {
  brawlerName: string;
  // for 3vs3 and 5vs5: victory, defeat, draw, winrate
  victory?: number;
  defeat?: number;
  draw?: number;
  winRate: number;
  // for solo and duo : averageRank
  averageRank: number;
  totalGameNum: number;
}

async function getRecordResult(
  mapName: string,
  mode: string,
  yearMonth: string,
) {
  let records = {} as RawRecords;
  let recordArr = [] as Record[];
  let url = `/api/statistics/mode/${mode}/map/${mapName}`;
  if (yearMonth !== undefined && yearMonth !== "") {
    url += `?yearMonth=${yearMonth}`;
  }
  const res = await getData(url);
  const data = res.data.recordResultDtos as RecordResultDto[];
  const statUpdated = res.data.updated;
  const statsYearMonths = res.data.yearMonths;

  if (!(data instanceof Array)) {
    return {
      recordArr: recordArr,
      sumTotalGameNum: 0,
    };
  }
  data.forEach((e) => {
    if (isTeamMode(mode)) {
      if (records[e.brawlerName] === undefined) {
        records[e.brawlerName] = { brawlerName: e.brawlerName, cnt: 0 };
      }
      records[e.brawlerName] = {
        ...records[e.brawlerName],
        [e.result]: e.cnt,
      };
    } else {
      records[e.brawlerName] = {
        brawlerName: e.brawlerName,
        averageRank: e.rankSum / e.cnt,
        cnt: e.cnt,
      };
    }
  });

  let sumTotalGameNum = 0;
  if (isTeamMode(mode)) {
    for (let key in records) {
      let { victory, defeat, draw } = records[key];
      const victoryNum = victory || 0;
      const defeatNum = defeat || 0;
      const drawNum = draw || 0;
      const totalGameNum = victoryNum + defeatNum + drawNum;
      recordArr.push({
        brawlerName: key,
        victory: victoryNum,
        defeat: defeatNum,
        draw: drawNum,
        winRate: victoryNum / totalGameNum,
        averageRank: 0,
        totalGameNum: totalGameNum,
      });
      sumTotalGameNum += totalGameNum;
    }

    recordArr.sort((a, b) => {
      return b.winRate - a.winRate;
    });
  } else {
    for (let key in records) {
      let { averageRank, cnt } = records[key];
      recordArr.push({
        brawlerName: key,
        winRate: 0,
        averageRank: averageRank || 0,
        totalGameNum: cnt,
      });
      sumTotalGameNum += cnt;
    }
    recordArr.sort((a, b) => {
      return a.averageRank - b.averageRank;
    });
  }

  return {
    recordArr: recordArr,
    sumTotalGameNum: sumTotalGameNum,
    statUpdated,
    statsYearMonths
  };
}

interface Prop {
  mapName: string;
  mode: string;
  recordArr: Record[];
  sumTotalGameNum: number;
  displayMapName: string;
  searchYearMonth: string;
  statUpdated: number;
  statsYearMonths: string[];
}

export default function Map({
  mapName,
  mode,
  recordArr,
  sumTotalGameNum,
  displayMapName,
  searchYearMonth,
  statUpdated,
  statsYearMonths
}: Prop) {
  const { t } = useTranslation();
  const [isMapShown, setIsMapShown] = useState(true);

  function showMapImg() {
    if (isMapShown) {
      //setImgContainerHeight(`${0}px`);
      setIsMapShown(false);
    } else {
      //setImgContainerHeight(`${imgHeight}px`);
      setIsMapShown(true);
    }
  }

  const zeroPad = (num: number, places: number) =>
    String(num).padStart(places, "0");

  const toYearMonthLabelFormat = (time: Date): string => {
    return `${time.getFullYear()}-${zeroPad(time.getMonth() + 1, 2)}`;
  };
  const toYearMonthValueFormat = (time: Date): string => {
    return `${time.getFullYear()}${zeroPad(time.getMonth() + 1, 2)}`;
  };
  interface Option {
    label: string;
    value: string;
  }
  let options: Option[] = [];
  options.push({
    label: "recent3months",
    value: "",
  });
  const today = new Date();
  for (let i = 0; i < 3; i++) {
    const iMonthAgo = new Date();
    // bug fix. minus one month is not accurate
    iMonthAgo.setDate(15);
    iMonthAgo.setMonth(today.getMonth() - i);
    options.push({
      label: toYearMonthLabelFormat(iMonthAgo),
      value: toYearMonthValueFormat(iMonthAgo),
    });
  }

  const router = useRouter();

  const changeYearMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const searchYearMonth = e.currentTarget.value;
    let paramMapName = encodeURIComponent(mapName);
    router.push({
      pathname: "/map/[map]/mode/[mode]",
      query: {
        map: paramMapName,
        mode: mode,
        searchYearMonth: searchYearMonth,
      },
    });
  };

  const goToMapList = (e: React.MouseEvent<HTMLDivElement>) => {
    router.push({
      pathname: "/mapList/[mode]",
      query: {
        mode: mode,
      },
    });
  };

  const ref = useRef<HTMLImageElement>(null);

  const modeWrap = mode.includes("Showdown") ? "showdown" : mode;

  const toDateStr = (timeMillis: number) => {
    const timeDate = new Date(timeMillis);
    const year = timeDate.getFullYear();
    const month = timeDate.getMonth() + 1;
    const date = timeDate.getDate() + 1;
    const hours = timeDate.getHours();
    const minutes = timeDate.getMinutes();
    return `${year}/${zeroPad(month, 2)}/${zeroPad(date, 2)} ${zeroPad(hours, 2)}:${zeroPad(minutes, 2)}`;
  }
  return (
    <>
      <div className={styles.mapClass}>
        <Head>
          <title>
            {`${t(mapName)} - ${t(mode)} - ${t("Win Rate")} - ${t(
              "Statistics"
            )} - ${t("brawlStars")} - Brawl Meta`}
          </title>
          <meta name="description" content={`${t("mapModeMetaDesc1")}${t(mapName)}(${t(mode)})${t("mapModeMetaDesc2")}`}
          />
        </Head>
        <div className={styles.inner}>
          <div className={styles.lastUpdatedOn}>
            {t("lastUpdatedOn")} : {toDateStr(statUpdated)}
          </div>
          <div className={styles.pageDesc}> {t("mapModeMetaDesc1")}{t(mapName)}({t(mode)}){t("mapModeMetaDesc2")}    </div>
          <div className={`${eventStyles[modeWrap]} ${styles.titleContainer} page-title`}>
            <div className={styles.imgContainer}>
              <img src={`/images/mode/${mode}.png`} alt={mapName} />
            </div>
            <div className={styles.info}>
              <div className={styles.mode} onClick={goToMapList}>
                {t(mode)}
              </div>
              <div
                className={styles.mapNameContainer}
                onClick={() => showMapImg()}
              >
                <span className={styles.mapName}>{t(mapName)}</span>
                <div className={styles.chevronContainer}>
                  {isMapShown ? (
                    <FontAwesomeIcon icon={faChevronUp} />
                  ) : (
                    <FontAwesomeIcon icon={faChevronDown} />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div
            className={`${styles.mapImgContainer}
            ${mode.includes("Showdown") ? `${styles.showdown}` : ""}
            ${isMapShown ? "" : styles.none}`}
          >
            <img
              ref={ref}
              className={styles.mapImg}
              src={`/images/maps/${mode.includes("Showdown") ? "showdown" : mode
                }/${displayMapName}.png`}
              alt={mapName}
            />
          </div>
          <div className={styles.bar} />
          {statsYearMonths.length > 0 ?
            <div className={styles.yearMonthContainer}>
              <div className={styles.label}>{t("period")}</div>
              <select className={`${styles.periodSelect} form-control`} onChange={changeYearMonth} value={searchYearMonth}>
                {options.map((option) => {
                  return (
                    <option key={option.value} value={option.value}>
                      {t(option.label)}
                    </option>
                  );
                })}
              </select>
            </div>
            : (<div></div>)}

          {mapName === "" ? (
            <div>invalid map name</div>
          ) : (
            <RecordResult
              // key={recordArr}
              _recordArr={recordArr}
              sumTotalGameNum={sumTotalGameNum}
              mode={mode}
              isPersonal={false}
            />
          )}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: any) {
  let { params, searchYearMonth } = context.query;
  let mapName = "";
  let mode = "";
  const { locale } = context;
  if (params.length >= 3) {
    mapName = decodeURIComponent(params[0]);
    mode = params[2];
  }
  if (searchYearMonth === undefined) {
    searchYearMonth = "";
  }
  let displayMapName = mapName.replace(":", "");

  let { recordArr, sumTotalGameNum, statUpdated, statsYearMonths } = await getRecordResult(
    mapName,
    mode,
    searchYearMonth
  );

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      mode,
      mapName,
      displayMapName,
      recordArr,
      sumTotalGameNum,
      searchYearMonth,
      statUpdated,
      statsYearMonths
    },
  };
}
