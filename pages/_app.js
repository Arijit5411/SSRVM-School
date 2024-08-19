

const sitesData = [
  { siteUrl: "https://dahod.ssrvm.org", gtagId: "G-P2D8SRKKBD" },
  { siteUrl: "https://osmanabad.ssrvm.org", gtagId: "G-3J9TZFDPL5" },
  { siteUrl: "https://cochin.ssrvm.org", gtagId: "G-P7T823N846" },
  { siteUrl: "https://thrissur.ssrvm.org", gtagId: "G-9CYCFMZZFS" },
  { siteUrl: "https://indore.ssrvm.org", gtagId: "G-S7D8PXLCBY", gtmId: "GTM-PCG5Q78G" },
  { siteUrl: "https://moshi.ssrvm.org", gtagId: "G-155BE9KBJY" },
  { siteUrl: "https://noida.ssrvm.org", gtagId: "G-F165X86BQ0" },
  { siteUrl: "https://shrirampur.ssrvm.org", gtagId: "G-LBLPMSN3Z9" },
  { siteUrl: "https://jharsuguda.ssa.org.in", gtagId: "G-K25H71Q0NB" },
  { siteUrl: "https://rajbhavanroad.ssrvm.org", gtagId: "G-191SYHSZZS" },
  { siteUrl: "https://shimoga.ssrvm.org", gtagId: "G-XK9922P5EQ" },
  { siteUrl: "https://agartala.ssrvm.org", gtagId: "G-YSSH9YNQN6" },
  { siteUrl: "https://bavdhan.ssrvm.org", gtagId: "G-X2WCMQDCNT" },
  { siteUrl: "https://ahmednagar.ssrvm.org", gtagId: "'G-PZZCJCXXGR" },
  { siteUrl: "https://godhavi.ssrvm.org", gtagId: "G-LLGNQ97ZZ6" },
  { siteUrl: "https://kharghar.ssrvm.org", gtagId: "G-TBZHDH5JXG" },
  { siteUrl: "https://satellite.ssrvm.org", gtagId: "UA-82855323-9" },
  { siteUrl: "https://chikmagalur.ssrvm.org", gtagId: "G-SFV9HV0E9C" },
  { siteUrl: "https://dhenkanal.ssrvm.org", gtagId: "G-XB24N2YD6R" },
  { siteUrl: "https://surat.ssrvm.org", gtagId: "G-1VP74CBRM5" },
  { siteUrl: "https://ghatsila.ssrvm.org", gtagId: "G-EB3N1KLLEQ" },
  { siteUrl: "https://anand.ssrvm.org", gtagId: "G-G7X17SK753" },
  { siteUrl: "https://panathur.ssrvm.org", gtagId: "'G-FH02R0L7RW" },
  { siteUrl: "https://jpnagar.ssrvm.org", gtagId: "G-J8FGF6ER70" },
  { siteUrl: "https://warje.ssrvm.org", gtagId: "G-DRRET5QJR4" },
  { siteUrl: "https://thiru.ssrvm.org", gtagId: "G-KLWGDK95WE" },
  { siteUrl: "https://mulbagal.ssrvm.org", gtagId: "G-D49M36JKSB" },
  { siteUrl: "https://bangaloresouth.ssrvm.org", gtagId: "G-FP52Z6SNWF" },
  { siteUrl: "https://rrnagar.ssrvm.org", gtagId: "G-9YDR5E3XCV" },
  { siteUrl: "https://kgf.ssrvm.org", gtagId: "G-NC8YYDTLKW'" },
  { siteUrl: "https://bangalorenorth.ssrvm.org", gtagId: "G-L0MF1LDNWV" },
  { siteUrl: "https://bhugaon.ssrvm.org", gtagId: "G-NRB3SGWLWP" },
  { siteUrl: "https://mulund.ssrvm.org", gtagId: "G-H6NZ21L3RC" },
  { siteUrl: "https://borivalieast.ssrvm.org", gtagId: "G-5J1PLXPWRZ" ,gtmId: "GTM-PBJK7BX8"},
  { siteUrl: "https://laturmarathi.ssrvm.org", gtagId: "G-9RW1L95JVD" },
  { siteUrl: "https://borivaliwest.ssrvm.org", gtagId: "G-GPQTDEXJY9", gtmId:"GTM-5PB9BK9F"},
  { siteUrl: "https://adajan.ssrvm.org", gtagId: "G-SNBGFS52ZT" },
  { siteUrl: "https://dharavi.ssrvm.org", gtagId: "G-RLPCQVEB9C" },
  { siteUrl: "https://latur.ssrvm.org", gtagId: "G-MLJ4YPKVK4" },
  { siteUrl: "https://godhra.ssrvm.org", gtagId: "G-CJ69QZNQCX" },
  { siteUrl: "https://jaipur.ssrvm.org", gtagId: "G-W972L9GQYN" },
  { siteUrl: "https://mangalore.ssrvm.org", gtagId: "G-15KDVN7WSQ" },
  { siteUrl: "https://kozhikode.ssrvm.org", gtagId: "G-L1V5R63J9F" },
  { siteUrl: "https://karkala.ssrvm.org", gtagId: "G-D71JG1JDTB" },
  { siteUrl: "https://sastha.ssrvm.org", gtagId: "G-CG91LS7DD7" },
  { siteUrl: "https://bangaloreeast.ssrvm.org", gtagId: "G-0N24BL8CZH" },
  { siteUrl: "https://kayamkulam.ssrvm.org", gtagId: "G-EMK05KM6FW" },
  { siteUrl: "https://jbnagar.ssrvm.org", gtagId: "G-3W11ZBWMX4" },
  { siteUrl: "https://sangamner.ssrvm.org", gtagId: "G-YD160Q3GM9" },
  { siteUrl: "https://omerga.ssrvm.org", gtagId: "G-20Y31J7LKE" },
  { siteUrl: "https://cherthala.ssrvm.org", gtagId: "G-PM9Z5FS4VW" },
  { siteUrl: "https://rourkela.ssrvm.org", gtagId: "G-XWECQ0VEPJ'" },
  { siteUrl: "https://cidcoaurangabad.ssrvm.org", gtagId: "G-2LSBMMYTS6" },
  { siteUrl: "https://bongaigaon.ssrvm.org", gtagId: "G-X9B2K2VT2C" },
  { siteUrl: "https://westhill.ssrvm.org", gtagId: "G-RLJH74S4X7" },
  { siteUrl: "https://itanagar.ssrvm.org", gtagId: "G-8DEXN9WBKD" },
  { siteUrl: "https://ushanagar.ssrvm.org", gtagId: "G-ZQBDZMWYPB" },
  { siteUrl: "https://sambalpur.ssrvm.org", gtagId: "G-F8024QTV5Y" },
  { siteUrl: "https://ulhasnagar.ssrvm.org", gtagId: "G-N4P5L6CNK8" },
  { siteUrl: "https://parivakkam.ssrvm.org", gtagId: "G-5F2F6WQGT5" },
  { siteUrl: "https://biratnagar.ssrvm.org", gtagId: "G-9PPJPN76EH" },
  { siteUrl: "https://mangadu.ssrvm.org", gtagId: "G-HZ7VX1K7Q5" },
  { siteUrl: "https://cheranellore.ssrvm.org", gtagId: "G-XFD0TZPWMM" },
  { siteUrl: "https://pathardi.ssrvm.org", gtagId: "G-YW96RMSFLH'" },
  { siteUrl: "https://najibabad.ssrvm.org", gtagId: "G-9WBYKQB9CL" },
  { siteUrl: "https://asansol.ssrvm.org", gtagId: "G-MDK1X92N18" },
  { siteUrl: "https://vikaasa.ssa.org.in", gtagId: "G-HM4K01C2QG" },
  { siteUrl: "https://ssrvmpucbs.ssrvm.org", gtagId: "G-Y9RZPQSB0R" },
  { siteUrl: "https://kamakhyanagar.ssrvm.org", gtagId: "G-LVT03R7G4T" },
  { siteUrl: "https://kochi.ssa.org.in", gtagId: "G-FL6RSKQY7P" },
  { siteUrl: "https://whitefield.ssa.org.in", gtagId: "G-KKR4F2E07M'" },
  { siteUrl: "https://bangalorenorth.ssa.org.in", gtagId: "G-QWV26QS7Q6" },
  { siteUrl: "https://gauribidanur.ssrvm.org", gtagId: "G-61EY7WV5H5" },
  { siteUrl: "https://kolkata.ssa.org.in", gtagId: "G-GKJTFCWVV3" },
  { siteUrl: "https://kollam.ssa.org.in", gtagId: "G-JL5GGD6PFZ" },
  { siteUrl: "https://vadgaon.ssrvm.org", gtagId: "G-GW3MN9WFTF" },
  { siteUrl: "https://nabinagar.ssa.org.in", gtagId: "G-9MF5CLRS68" },
  { siteUrl: "https://asansol.ssa.org.in", gtagId: "G-5VPQ23P4TR" },
  { siteUrl: "https://hyderabad.ssa.org.in", gtagId: "G-2EMEGCYRRM" },
  { siteUrl: "https://cuttack.ssa.org.in", gtagId: "G-7LHVNFKPQF" },
]



import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '@/styles/scss/style.scss';
import RouteScrollToTop from '@/elements/RouteScrollToTop';
import ScrollToTop from 'react-scroll-to-top';
import { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import '../styles/default.css';
import '../styles/new_custom.css';
import '../node_modules/react-datetime/css/react-datetime.css';
import '../node_modules/react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Script from "next/script";
import { useRouter } from "next/router";
import Head from "next/head";

export default function App({ Component, pageProps }) {

  let site_url = pageProps?.siteUrl?.split('/_s')?.join("");

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
    AOS.init({
      offset: 0,
      easing: "ease",
      once: true,
    });
    AOS.refresh();
  }, []);

  const siteMap = new Map(sitesData.map(obj => [obj.siteUrl, obj]));
  const { gtagId, gtmId } = siteMap.has(site_url) ? siteMap.get(site_url) : { siteUrl: null, gtagId: null };

  return (
    <>
      <Head>
        {gtmId &&
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id=' + i + dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer', '${gtmId}');
              `,
            }}
          />
        }
      </Head>

      {gtmId &&
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
      }

      <ToastContainer />
      <RouteScrollToTop />
      {/* {gtagId !== null && <LoadScript gtagId={'G-P2D8SRKKBD'} />} */}
      <LoadScript gtagId={gtagId} />
      <Component {...pageProps} />
      <ScrollToTop smooth color='#210D7D' />
    </>
  );
}

const LoadScript = ({ gtagId }) => (
  <>
    <script
      async
      src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`}
    ></script>
    <script
      dangerouslySetInnerHTML={{
        __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', ${gtagId});
            `,
      }}
    />
  </>
);





// const LoadScript = (props) => (
// <script async src={`https://www.googletagmanager.com/gtag/js?id=${props?.gtagId}`}>
//   {
//     // `  window.dataLayer = window.dataLayer || [];
//     //           function gtag(){dataLayer.push(arguments)}
//     //           gtag('js', new Date());
//     //           gtag('config', ${props?.gtagId});
//     //      `
//   }
// </script>)