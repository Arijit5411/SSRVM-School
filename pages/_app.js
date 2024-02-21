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
import '../styles/new_custom.css'
import '../node_modules/react-datetime/css/react-datetime.css'
import '../node_modules/react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Script from "next/script"
import { useRouter } from "next/router"

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const lastString1 = '.ssrvm.org'
  const lastString2 = '.ssa.org.in'


  const currentUrl1 = router?.components?.["/"]?.props?.pageProps?.siteUrl
  const newUrl1 = currentUrl1?.substring(0, currentUrl1?.length - 13) + `${lastString1}`;
  console.log('newUrl1', newUrl1)


  const currentUrl2 = router?.components?.["/"]?.props?.pageProps?.siteUrl
  const newUrl2 = currentUrl2?.substring(0, currentUrl2?.length - 14) + `${lastString2}`;
  console.log('newUrl2', newUrl2)

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
      <ToastContainer />
      <RouteScrollToTop />
      {newUrl1 === 'https://dahod.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-P2D8SRKKBD"></Script>
          <Script>
            {`
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments)}
                      gtag('js', new Date());

                      gtag('config', 'G-P2D8SRKKBD');
                `}

          </Script>
        </>

      }

      {newUrl1 === 'https://cochin.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-P7T823N846"></Script>
          <Script>
            {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-P7T823N846');
              `}
          </Script>
        </>

      }

      {newUrl1 === 'https://thrissur.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-9CYCFMZZFS"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-9CYCFMZZFS');

                `
            }
          </Script>
        </>

      }
      {newUrl1 === 'https://indore.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-S7D8PXLCBY"></Script>
          <Script>
            {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-S7D8PXLCBY');
                `}
          </Script>
        </>

      }
      {newUrl1 === 'https://moshi.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-155BE9KBJY"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-155BE9KBJY');
                `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://noida.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-F165X86BQ0"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-F165X86BQ0');
                `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://shrirampur.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-LBLPMSN3Z9"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-LBLPMSN3Z9');
                `
            }
          </Script>
        </>
      }
      {newUrl2 === 'https://jharsuguda.ssa.org.in' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-K25H71Q0NB"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-K25H71Q0NB');
                `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://rajbhavanroad.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-191SYHSZZS"></Script>
          <Script>
            {

              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-191SYHSZZS');
                `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://shimoga.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-XK9922P5EQ"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-XK9922P5EQ');
                `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://shimoga.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-XK9922P5EQ"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-XK9922P5EQ');
                `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://agartala.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-YSSH9YNQN6"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-YSSH9YNQN6');
                `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://bavdhan.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-X2WCMQDCNT"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-X2WCMQDCNT');
                `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://ahmednagar.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-PZZCJCXXGR"></Script>
          <Script>
            {
              `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments)}
                  gtag('js', new Date());
  
                  gtag('config', 'G-PZZCJCXXGR');
                  `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://godhavi.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-LLGNQ97ZZ6"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-LLGNQ97ZZ6');
                `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://kharghar.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-TBZHDH5JXG"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-TBZHDH5JXG');
                `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://satellite.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=UA-82855323-9"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'UA-82855323-9');
                `
            }
          </Script>

        </>
      }
      {newUrl1 === 'https://chikmagalur.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-SFV9HV0E9C"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-SFV9HV0E9C');
                `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://dhenkanal.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-XB24N2YD6R"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-XB24N2YD6R');
                `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://surat.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-1VP74CBRM5"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-1VP74CBRM5');
                `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://ghatsila.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-EB3N1KLLEQ"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-EB3N1KLLEQ');
                `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://anand.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-G7X17SK753"></Script>
          <Script>
            {
              `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments)}
            gtag('js', new Date());

            gtag('config', 'G-G7X17SK753');
            `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://anand.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-G7X17SK753"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-G7X17SK753');
                `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://panathur.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-FH02R0L7RW"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-FH02R0L7RW');
                `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://jpnagar.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-J8FGF6ER70"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-J8FGF6ER70');
                `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://warje.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-DRRET5QJR4"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-DRRET5QJR4');
                `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://thiru.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-KLWGDK95WE"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-KLWGDK95WE');
                `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://mulbagal.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-D49M36JKSB"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-D49M36JKSB');
                `
            }
          </Script>
        </>
      }
      {newUrl1 == 'https://bangaloresouth.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-FP52Z6SNWF" strategy="afterInteractive" />
          <Script strategy="afterInteractive">
            {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments)}
                    gtag('js', new Date());
                    gtag('config', 'G-FP52Z6SNWF');
                `}
          </Script>
        </>
      }
      {newUrl1 === 'https://rrnagar.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-9YDR5E3XCV"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-9YDR5E3XCV');
                `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://kgf.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-NC8YYDTLKW"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-NC8YYDTLKW');
                `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://bangalorenorth.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-L0MF1LDNWV"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-L0MF1LDNWV');
                `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://bhugaon.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-NRB3SGWLWP"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-NRB3SGWLWP');
                `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://mulund.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-H6NZ21L3RC"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-H6NZ21L3RC');
                `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://borivalieast.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-5J1PLXPWRZ"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-5J1PLXPWRZ');
                `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://laturmarathi.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-9RW1L95JVD"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-9RW1L95JVD');
                `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://borivaliwest.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-GPQTDEXJY9"></Script>
          <Script>
            {
              `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments)}
              gtag('js', new Date());

              gtag('config', 'G-GPQTDEXJY9');
              `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://adajan.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-SNBGFS52ZT"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-SNBGFS52ZT');
                `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://dharavi.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-RLPCQVEB9C"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-RLPCQVEB9C');
                `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://latur.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-MLJ4YPKVK4"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-MLJ4YPKVK4');
                `
            }
          </Script>"
        </>
      }
      {newUrl1 === 'https://godhra.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-CJ69QZNQCX"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-CJ69QZNQCX');
                `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://jaipur.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-W972L9GQYN"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-W972L9GQYN');
                `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://mangalore.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-15KDVN7WSQ"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-15KDVN7WSQ');
                `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://kozhikode.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-L1V5R63J9F"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-L1V5R63J9F');
                `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://karkala.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-D71JG1JDTB"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-D71JG1JDTB');
                `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://sastha.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-CG91LS7DD7"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-CG91LS7DD7');
                `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://bangaloreeast.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-0N24BL8CZH"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-0N24BL8CZH');
                `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://kayamkulam.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-EMK05KM6FW"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-EMK05KM6FW');
                `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://jbnagar.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-3W11ZBWMX4"></Script>
          <Script>
            {
              `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments)}
              gtag('js', new Date());

              gtag('config', 'G-3W11ZBWMX4');
              `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://sangamner.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-YD160Q3GM9"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-YD160Q3GM9');
                `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://omerga.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-20Y31J7LKE"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-20Y31J7LKE');
                `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://cherthala.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-PM9Z5FS4VW"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-PM9Z5FS4VW');
                `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://rourkela.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-XWECQ0VEPJ"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-XWECQ0VEPJ');
                `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://cidcoaurangabad.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-2LSBMMYTS6"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-2LSBMMYTS6');
                `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://bongaigaon.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-X9B2K2VT2C"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-X9B2K2VT2C');
                `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://westhill.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-RLJH74S4X7"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-RLJH74S4X7');
                `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://itanagar.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-8DEXN9WBKD"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-8DEXN9WBKD');
                `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://ushanagar.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-ZQBDZMWYPB"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-ZQBDZMWYPB');
                `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://sambalpur.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-F8024QTV5Y"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-F8024QTV5Y');
                `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://ulhasnagar.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-N4P5L6CNK8"></Script>
          <Script>
            {
              `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments)}
              gtag('js', new Date());

              gtag('config', 'G-N4P5L6CNK8');
              `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://parivakkam.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-5F2F6WQGT5"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-5F2F6WQGT5');
                `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://biratnagar.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-9PPJPN76EH"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-9PPJPN76EH');
                `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://mangadu.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-HZ7VX1K7Q5"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-HZ7VX1K7Q5');
                `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://cheranellore.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-XFD0TZPWMM"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-XFD0TZPWMM');
                `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://pathardi.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-YW96RMSFLH"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-YW96RMSFLH');
                `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://najibabad.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-9WBYKQB9CL"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-9WBYKQB9CL');
                `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://asansol.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-MDK1X92N18"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-MDK1X92N18');
                `
            }
          </Script>
        </>
      }
      {newUrl2 === 'https://vikaasa.ssa.org.in' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-HM4K01C2QG"></Script>
          <Script>
            {
              `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments)}
              gtag('js', new Date());

              gtag('config', 'G-HM4K01C2QG');
              `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://ssrvmpucbs.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-Y9RZPQSB0R"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-Y9RZPQSB0R');
                `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://kamakhyanagar.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-LVT03R7G4T"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-LVT03R7G4T');
                `
            }
          </Script>
        </>
      }
      {newUrl2 === 'https://kochi.ssa.org.in' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-FL6RSKQY7P"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-FL6RSKQY7P');
                `
            }
          </Script>
        </>
      }
      {newUrl2 === 'https://whitefield.ssa.org.in' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-KKR4F2E07M"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-KKR4F2E07M');
                `
            }
          </Script>
        </>
      }
      {newUrl2 === 'https://cuttack.ssa.org.in' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-7LHVNFKPQF"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-7LHVNFKPQF');
                `
            }
          </Script>
        </>
      }
      {newUrl2 === 'https://bangalorenorth.ssa.org.in' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-QWV26QS7Q6"></Script>
          <Script>
            {
              `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments)}
              gtag('js', new Date());

              gtag('config', 'G-QWV26QS7Q6');
              `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://gauribidanur.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-61EY7WV5H5"></Script>
          <Script>
            {
              `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments)}
              gtag('js', new Date());

              gtag('config', 'G-61EY7WV5H5');
              `
            }
          </Script>
        </>
      }
      {newUrl2 === 'https://kolkata.ssa.org.in' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-GKJTFCWVV3"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-GKJTFCWVV3');
                `
            }
          </Script>
        </>
      }
      {newUrl2 === 'https://kollam.ssa.org.in' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-JL5GGD6PFZ"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-JL5GGD6PFZ');
                `
            }
          </Script>
        </>
      }
      {newUrl1 === 'https://vadgaon.ssrvm.org' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-GW3MN9WFTF"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-GW3MN9WFTF');
                `
            }
          </Script>
        </>
      }
      {newUrl2 === 'https://nabinagar.ssa.org.in' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-9MF5CLRS68"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-9MF5CLRS68');
                `
            }
          </Script>
        </>
      }
      {newUrl2 === 'https://asansol.ssa.org.in' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-5VPQ23P4TR"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-5VPQ23P4TR');
                `
            }
          </Script>
        </>
      }
      {newUrl2 === 'https://hyderabad.ssa.org.in' &&
        <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-2EMEGCYRRM"></Script>
          <Script>
            {
              `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-2EMEGCYRRM');
                `
            }
          </Script>
        </>
      }


      <Component {...pageProps} />
      <ScrollToTop smooth color='#210D7D' />
    </>
  )
}
