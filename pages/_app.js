import '@/styles/scss/style.scss'
import "animate.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
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
