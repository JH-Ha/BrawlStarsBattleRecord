import Head from 'next/head'
import styles from '../styles/Home.module.css'
import EventRotation from '../components/eventRotation'
import { getData } from '../components/ApiHandler'
import { calWinRate, getLocalTime, isTrio } from '../components/BaseFunctions';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface BrawlerStatsRecord {
  brawlerName: string;
  result: string;
  cnt: number;
  rankSum: number;
}
interface BrawlEvent {
  id: string;
  mode: string;
  map: string;
  isPlus: boolean | undefined; // used in front
}
interface BrawlerWinRate {
  brawlerName: string;
  victory: number | undefined;
  defeat: number | undefined;
  draw: number | undefined;
  winRate: number | undefined;
  totalGameNum: number;
  averageRank: number | undefined;
}
interface BrawlEventInfo {
  startTime: string;
  endTime: string;
  event: BrawlEvent;
  statistics: BrawlerStatsRecord[];
  winRate: BrawlerWinRate[]; // user in front
}

interface HomeProps {
  todayEvents: BrawlEventInfo[];
  nextEvents: BrawlEventInfo[];
}
export default function Home({ todayEvents, nextEvents }: HomeProps) {
  return (
    <div className={styles.container}>
      <EventRotation todayEvents={todayEvents} nextEvents={nextEvents} />
    </div>
  )
}



export async function getServerSideProps({ locale }: any) {
  // Fetch data from external API
  // Pass data to the page via props

  const res = await getData("/api/events/rotation");
  //const data = await res.json();
  //i18n.changeLanguage(locale);

  const events = res.data as BrawlEventInfo[];
  let now = new Date();
  let todayEvents = [] as BrawlEventInfo[];
  let nextEvents = [] as BrawlEventInfo[];

  //console.log(showdownEvents);

  events
    .filter(e => e.event.mode !== 'duoShowdown' && e.event.mode !== 'unknown')
    .forEach(e => {
      const startTime = getLocalTime(e.startTime);
      const endTime = getLocalTime(e.endTime);
      if ((startTime < now) && (now <= endTime)) {
        todayEvents.push(e);
      } else {
        nextEvents.push(e);
      }
      //console.log(`${startTime} - ${now} -${endTime}`);
      if (e.event.mode === 'soloShowdown' && e.startTime.substr(9, 2) ===
        "08") {
        e.event.isPlus = true;
      }
      if (e.statistics !== null) {
        e.winRate = calWinRate(e.statistics, e.event.mode).slice(0, 5) as BrawlerWinRate[];
      }
    });


  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      todayEvents,
      nextEvents
    }
  }
}