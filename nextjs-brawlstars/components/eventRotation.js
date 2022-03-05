import React, { useEffect, useState } from 'react';
import { getData } from "./ApiHandler";
import { calWinRate, getLocalTime, isTrio } from './BaseFunctions';
import { useTranslation } from 'next-i18next';
import styles from "../styles/EventRotation.module.scss";
import DisplayTime from './DisplayTime';
import { useRouter } from 'next/router';

function EventRotation({ todayEvents, nextEvents }) {

    const { t, i18n } = useTranslation('common');
    const router = useRouter();

    const onClickEvent = (map, mode) => {
        router.push(`/map/${map}/mode/${mode}`);
    }

    return (
        <div className={styles.eventRotation}>
            {/* <ReactTitle title={`Brawl Meta Event Rotation`} /> */}
            <div className={styles.title}>
                {t("Today's Events")}
            </div>
            <div className={styles.eventContainer}>
                {todayEvents.map((ele, index) => {
                    return <div key={`TodayMaps-${index}`} className={styles.event}>
                        <div className={styles.topBar}>
                            <div>{t('newEventMsg')}</div>
                            <div>:&nbsp;</div>
                            <DisplayTime endTime={ele.endTime}></DisplayTime>
                        </div>
                        <div className={`${styles[ele.event.mode]} ${styles.info} ${ele.event.isPlus ? styles.plus : ''}`}
                            onClick={() => onClickEvent(ele.event.map, ele.event.mode)}>
                            <div className={styles.eventInfoContainer}>
                                <div className={styles.modeImg}>
                                    <img src={`/images/mode/${ele.event.mode}.png`} alt={ele.event.mode}></img>
                                </div>
                                <div className={styles.eventInfo}>
                                    <div>{t(ele.event.mode)}</div>
                                    <div>{t(ele.event.map)}</div>
                                </div>
                            </div>
                            <div className={styles.winRateInfo}>
                                {ele.winRate?.map(e => {
                                    return <div key={`${ele.event.mode}-${e.brawlerName}`}>
                                        <img className={styles.brawlerImg} src={`/images/${e.brawlerName}.png`} alt={e.brawlerName} />
                                        {isTrio(ele.event.mode) ?
                                            <div>{Math.floor(e.winRate * 100)}%</div>
                                            : <div>{Math.floor(e.averageRank * 100) / 100}</div>
                                        }

                                    </div>
                                })}
                                {ele.winRate?.length === 0 ? <div className={styles.noStats}> No Statistics </div> : <div></div>}
                            </div>
                        </div>
                    </div>
                })}
            </div>
            <div className={styles.title}>
                {t("Next Events")}
            </div>
            <div className={styles.eventContainer}>
                {nextEvents.map((ele, index) => {
                    return <div key={`nextEvents-${index}`} className={styles.event}>
                        <div className={styles.topBar}>
                            <div>{t('newEventMsg')}</div>
                            <div>:&nbsp;</div>
                            <DisplayTime endTime={ele.startTime}></DisplayTime>
                        </div>
                        <div className={`${styles[ele.event.mode]} ${styles.info} ${ele.event.isPlus ? styles.plus : ''}`}
                            onClick={() => onClickEvent(ele.event.map, ele.event.mode)}>
                            <div className={styles.eventInfoContainer}>
                                <div className={styles.modeImg}>
                                    <img src={`/images/mode/${ele.event.mode}.png`} alt={ele.event.mode}></img>
                                </div>
                                <div className={styles.eventInfo}>
                                    <div>{t(ele.event.mode)}</div>
                                    <div>{t(ele.event.map)}</div>
                                </div>
                            </div>
                            <div className={styles.winRateInfo}>
                                {ele.winRate?.map(e => {
                                    return <div key={`${ele.event.map}-${ele.event.mode}-${e.brawlerName}`}>
                                        <img className={styles.brawlerImg} src={`/images/${e.brawlerName}.png`} alt={e.brawlerName} />
                                        {isTrio(ele.event.mode) ?
                                            <div>{Math.floor(e.winRate * 100)}%</div>
                                            : <div>{Math.floor(e.averageRank * 100) / 100}</div>
                                        }
                                    </div>

                                })}
                                {ele.winRate?.length === 0 ? <div className={styles.noStats}> No Statistics </div> : <div></div>}
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}



export default EventRotation;