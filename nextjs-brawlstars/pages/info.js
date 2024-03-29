import Head from 'next/head'
import React from "react";
import styles from "../styles/Info.module.scss";
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Guide = {
    en: {
        "homeGuide": `You can check your battle log and brawlers' statistic at maps on this web site.
            
In the Event menu, we shows the win rate statistics information of the current event.

In the Players menu, you can check the users which are currently being tracked.
We saves battle records up to 50 games.
            
In the Maps, we provides the Brawler win rate for each map.
            
Stats and statistics are updated every hour.

contact : brawlmeta22@gmail.com`
    },
    ko: {
        "homeGuide": `브롤스타즈 전적 검색 및 승률 확인이 가능한 사이트입니다.
            
상단 메뉴의 '이벤트'를 클릭하면, 현재 진행되고 있는 이벤트의 승률 통계 정보를 보여줍니다.

'플레이어'에는 현재 트래킹되고 있는 유저들의 정보를 확인할 수 있습니다.
최대 50게임까지 트래킹이 됩니다.
            
'맵'에서는 맵별 브롤러 승률을 알 수 있습니다.
            
1시간 마다 전적과 통계가 업데이트 됩니다.
            
contact : brawlmeta22@gmail.com`,
    },
    ja: {
        "homeGuide": `ブロールスターズのバトル履歴と勝率通計が確認できるウェブサイトです。
            
上部のメニューの「イベント」をクリックすると、現在進行中のイベントの勝率統計情報が表示されます。

「プレイヤー」メニューでは現在追跡されているユーザーの情報を確認できます。
最大50ゲームまで記録しています。
            
「マップ」メニューでは、マップごとのキャラクターの勝率を提供しています。
            
1時間ごとにバトル履歴と統計が更新されます。

contact : brawlmeta22@gmail.com`,
    }
}

export default function Info() {

    const { locale } = useRouter();
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
                    {Guide[locale]["homeGuide"]}
                </div>
            </div>
        </div>
    );
}



export async function getServerSideProps({ locale }) {


    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        }
    }
}