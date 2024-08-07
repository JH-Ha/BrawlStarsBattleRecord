import Layout from '../components/layout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import '../styles/globals.scss'
import Loading from '../components/Loading'
import { useTranslation } from 'next-i18next'
import Script from 'next/script'
import Head from 'next/head'
import { appWithTranslation } from 'next-i18next';
import 'bootstrap/dist/css/bootstrap.min.css'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      setIsLoading(true);
    }
    const handleRouteComplete = (url, { shallow }) => {
      setIsLoading(false);
    }
    router.events.on('routeChangeStart', handleRouteChange)
    router.events.on('routeChangeComplete', handleRouteComplete)
    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
      router.events.off('routeChangeComplete', handleRouteComplete)
    }
  }, []);

  return (
    <Layout>
      {isLoading && <Loading />}
      <Head>
        <title>Brawl Meta</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="You can check best brawlers on all of brawler stars maps. We provides every brawlers' win rate statistics of Brawl Stars. 
             브롤스타즈 전적 기록 및 승률 확인 사이트입니다. 맵 마다 브롤러 별 승률과 선택률을 확인할 수 있습니다. 또한 당신의 전투 기록도 확인 가능합니다.
             ブロスタのマップごとにキャラクターの勝率を提供しております。" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="google-site-verification" content="PKyTkz1szHjS3fgqOvyg59O8dyYvNfN-Wh4OoObqRXI" />
      </Head>
      <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4114406385852589" crossOrigin="anonymous"></Script>
      <Component {...pageProps} />
      {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-34JGP66PP0"></Script>
      <Script id="google-analytics" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-34JGP66PP0');
          `}
      </Script>
    </Layout>
  );
}

export default appWithTranslation(MyApp);
