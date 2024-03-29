import Head from 'next/head'
import styles from '../styles/Home.module.css'
import EventRotation from '../components/eventRotation'
import { getData } from '../components/ApiHandler'
import { calWinRate, getLocalTime, isTrio } from '../components/BaseFunctions';
import Script from 'next/script'
import i18n from '../components/i18n';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Home({ todayEvents, nextEvents }) {
  return (
    <div className={styles.container}>
      <EventRotation todayEvents={todayEvents} nextEvents={nextEvents} />
    </div>
  )
}



export async function getServerSideProps({ locale }) {
  // Fetch data from external API
  // Pass data to the page via props

  const res = await getData("/api/events/rotation");
  //const data = await res.json();
  //i18n.changeLanguage(locale);

  const events = res.data;
  let now = new Date();
  let todayEvents = [];
  let nextEvents = [];

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
        e.winRate = calWinRate(e.statistics, e.event.mode).slice(0, 5);
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