import '@/styles/globals.css'
import RouteScrollToTop from '@/elements/RouteScrollToTop'
import ScrollToTop from 'react-scroll-to-top'

export default function App({ Component, pageProps }) {
  return (
    <>
      <RouteScrollToTop />
      <Component {...pageProps} />
      <ScrollToTop smooth color='#210D7D' />
    </>
  )
}
