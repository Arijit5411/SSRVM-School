import "bootstrap/dist/css/bootstrap.min.css"
import "animate.css"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import '@/styles/scss/style.scss'
import RouteScrollToTop from '@/elements/RouteScrollToTop'
import ScrollToTop from 'react-scroll-to-top'
import { useEffect } from 'react'
import AOS from "aos";
import "aos/dist/aos.css";

export default function App({ Component, pageProps }) {

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap")
    AOS.init({
      offset: 0,
      easing: "ease",
      once: true,
    });
    AOS.refresh();
  }, [])

  return (
    <>
      <RouteScrollToTop />
      <Component {...pageProps} />
      <ScrollToTop smooth color='#210D7D' />
    </>
  )
}
