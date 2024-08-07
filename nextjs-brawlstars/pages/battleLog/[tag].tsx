import React, { Component } from "react";

import ModeList from "../../components/modeList";
import TrioMode from "../../components/TrioMode";
import BrawlerList from "../../components/BrawlerList";
import styles from "../../styles/BattleLog.module.scss";
import SoloDuoMode from "../../components/SoloDuoMode";
import Pagination from "../../components/Pagination";
import { getData } from "../../components/ApiHandler";
import { useTranslation } from 'next-i18next';
import { isDuels, isPenta, isTrio } from "../../components/BaseFunctions";
import Head from "next/head";
import { useRouter } from "next/router";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PentaMode from "../../components/PentaMode";

export interface PlayRecord {
  battleTime: string;
  result: string;
  resultRank?: number;
  duration: number;
  map: string;
  trophyChange: number;
  type: string;
  mode: string;
  teamId?: number;
  playerName: string;
  trophies: number;
  brawlerName: string;
  power: number;
  groupRecords: PlayRecord[];
}

interface BattleLogProps {
  playRecord: PlayRecord[];
  curPage: number;
  tag: string;
  mode: string;
  brawlerName: string;
  totalElements: number;
  name: number;
}

export default function BattleLog({ playRecord, curPage,
  tag, mode, brawlerName, totalElements, name }: BattleLogProps) {
  const router = useRouter();
  const { t } = useTranslation();

  const changePageHandler = (page: number) => {
    router.push({
      pathname: "/battleLog/[tag]",
      query: {
        tag: tag,
        mode: mode,
        brawlerName: brawlerName,
        page: page,
        size: 5
      }
    });
  }

  function changeMode(mode: string) {
    router.push({
      pathname: "/battleLog/[tag]",
      query: {
        tag: tag,
        mode: mode,
        brawlerName: brawlerName,
        page: 1,
        size: 5
      }
    });
  }
  function changeBrawler(brawlerName: string) {
    router.push({
      pathname: "/battleLog/[tag]",
      query: {
        tag: tag,
        mode: mode,
        brawlerName: brawlerName,
        page: 1,
        size: 5
      }
    });
  }

  const goStatistics = () => {
    router.push(`/statistics?tag=${tag.replace("#", "%23")}`)
  }
  return (
    <div>
      <Head>
        <title>{`${t('battleLogTitle')} ${tag} ${name}`}</title>
      </Head>
      <div className="page-title">{t('battleLogTitle')}
        <button onClick={goStatistics} className="btn btn-secondary">{t("Statistics")}</button>
      </div>
      <div className={styles.searchContainer}>
        <ModeList key={`mode-${mode}`} changeMode={changeMode} mode={mode} />
        <BrawlerList key={brawlerName} brawlerName={brawlerName} changeBrawler={changeBrawler} />
      </div>
      <div className="page-title">{name}({tag})</div>

      <div className={playRecord.length === 0 ? styles.noRecord : styles.displayNone}>
        No record
      </div>
      {
        playRecord.map((data) => {
          if (isTrio(data.mode) || isDuels(data.mode)) {
            return (
              <TrioMode
                key={data.battleTime}
                battleTime={data.battleTime}
                result={data.result}
                duration={data.duration}
                map={data.map}
                trophyChange={data.trophyChange}
                type={data.type}
                mode={data.mode}
                groupRecords={data.groupRecords}
              />
            );
          } else if (isPenta(data.mode)) {
            return (
              <PentaMode
                key={data.battleTime}
                battleTime={data.battleTime}
                result={data.result}
                duration={data.duration}
                map={data.map}
                trophyChange={data.trophyChange}
                type={data.type}
                mode={data.mode}
                groupRecords={data.groupRecords}
              />
            )
          } else {
            return (
              <SoloDuoMode
                key={data.battleTime}
                rank={data.resultRank}
                map={data.map}
                trophyChange={data.trophyChange}
                mode={data.mode}
                groupRecords={data.groupRecords}
                tag={tag}
                type={data.type}
              />
            );
          }
        })}
      <Pagination
        key={curPage}
        curPage={curPage}
        numTotal={totalElements}
        numShowItems={5}
        pageUrl="/playerList"
        onClick={changePageHandler}
      ></Pagination>
      <div style={{ 'marginBottom': "10px" }}>
      </div>
    </div >
  );
}

async function getBattleLog(tag: string, mode: string, brawlerName: string, page: number) {
  //console.log(`getBattleLog tag ${tag} mode ${mode} bralerName ${brawlerName}`);

  tag = encodeURIComponent(tag);
  const queryPage = page - 1;
  let paramMode = mode;
  if (mode === 'ALL' || mode === 'All' || mode === null || mode === undefined) {
    paramMode = '';
  }
  let paramBrawlerName = brawlerName;
  if (brawlerName === 'ALL' || brawlerName === 'All' || brawlerName === null || brawlerName === undefined) {
    paramBrawlerName = '';
  }
  let searchParams = new URLSearchParams();
  searchParams.set("mode", paramMode);
  searchParams.set("brawlerName", paramBrawlerName);
  searchParams.set("page", queryPage.toString());
  searchParams.set("size", "5");
  console.log(`${new Date()} tag: ${tag} searchParams ${searchParams.toString()}`);

  let res = await getData(`/record/${tag}?${searchParams.toString()}`);
  const data = res.data;
  return ({
    playRecord: data.content,
    curPage: data.pageable.pageNumber + 1,
    totalElements: data.totalElements
  });
}


export async function getServerSideProps(context: any) {
  let { tag, mode, page, brawlerName } = context.query;
  if (mode === undefined) {
    mode = 'ALL';
  }
  if (page === undefined) {
    page = 1;
  }
  if (brawlerName === undefined) {
    brawlerName = 'ALL'
  }
  if (tag === undefined) {
    tag = '';
  }
  const { locale } = context;
  let { playRecord, curPage, totalElements } = await getBattleLog(tag, mode, brawlerName, page);

  let res = await getData(`/member/${tag.replace("#", "%23")}`);
  let member = res.data;
  let name = member.name;
  return ({
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      playRecord, tag, curPage,
      mode, brawlerName, totalElements, name
    }
  })
}
