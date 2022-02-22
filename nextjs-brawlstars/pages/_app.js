import Layout from '../components/layout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import '../styles/globals.scss'
import Loading from '../components/Loading'
import { useTranslation } from 'react-i18next'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);

  const { locale } = router;
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

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
  }, [])

  return (
    <Layout>
      {isLoading && <Loading />}
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp
