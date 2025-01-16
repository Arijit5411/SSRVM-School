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
import Head from "next/head";

export default function App({ Component, pageProps }) {

  // let site_url = pageProps?.siteUrl?.split('/_s')?.join("");
  let site_url = pageProps?.siteUrl ? pageProps.siteUrl.split('/_s').join('') : '';

  const sitesData = [
    { siteUrl: "https://dahod.ssrvm.org", gtagId: "G-P2D8SRKKBD", gtmId: "GTM-NZBB56BC" },
    { siteUrl: "https://osmanabad.ssrvm.org", gtagId: "G-3J9TZFDPL5", gtmId: "GTM-KGXRKX2G" },
    { siteUrl: "https://cochin.ssrvm.org", gtagId: "G-P7T823N846", gtmId: "GTM-WHPDJM2M" },
    { siteUrl: "https://thrissur.ssrvm.org", gtagId: "G-9CYCFMZZFS", gtmId: "GTM-MM47X6B9" },
    { siteUrl: "https://indore.ssrvm.org", gtagId: "G-S7D8PXLCBY", gtmId: "GTM-PCG5Q78G" },
    // { siteUrl: "https://indore.ssrvm.org", gtagId: "G-S7D8PXLCBY" },
    { siteUrl: "https://moshi.ssrvm.org", gtagId: "G-155BE9KBJY", gtmId: "GTM-WWQSLW3T" },
    { siteUrl: "https://noida.ssrvm.org", gtagId: "G-F165X86BQ0", gtmId: "GTM-N4M4G8M6" },
    { siteUrl: "https://shrirampur.ssrvm.org", gtagId: "G-LBLPMSN3Z9", gtmId: "GTM-N6K7SXKB" },
    { siteUrl: "https://jharsuguda.ssa.org.in", gtagId: "G-K25H71Q0NB", gtmId: "GTM-P66KW9CF" },
    { siteUrl: "https://rajbhavanroad.ssrvm.org", gtagId: "G-191SYHSZZS", gtmId: "GTM-MM7TTS4M" },
    { siteUrl: "https://shimoga.ssrvm.org", gtagId: "G-XK9922P5EQ", gtmId: "GTM-5P6PH4LD" },
    { siteUrl: "https://agartala.ssrvm.org", gtagId: "G-YSSH9YNQN6", gtmId: "GTM-PP4QJ7XW" },
    { siteUrl: "https://bavdhan.ssrvm.org", gtagId: "G-X2WCMQDCNT", gtmId: "GTM-WRNJB7PV" },
    { siteUrl: "https://ahmednagar.ssrvm.org", gtagId: "G-PZZCJCXXGR" },
    { siteUrl: "https://godhavi.ssrvm.org", gtagId: "G-LLGNQ97ZZ6", gtmId: "GTM-KXPLV2ZG" },
    { siteUrl: "https://kharghar.ssrvm.org", gtagId: "G-TBZHDH5JXG", gtmId: "GTM-M5HJV8DW" },
    { siteUrl: "https://satellite.ssrvm.org", gtagId: "UA-82855323-9", gtmId: "GTM-MJD3HGHH" },
    { siteUrl: "https://chikmagalur.ssrvm.org", gtagId: "G-SFV9HV0E9C", gtmId: "GTM-M88VB2PQ" },
    { siteUrl: "https://dhenkanal.ssrvm.org", gtagId: "G-XB24N2YD6R", gtmId: "GTM-TMCGBSNR" },
    { siteUrl: "https://surat.ssrvm.org", gtagId: "G-1VP74CBRM5", gtmId: "GTM-52M75733" },
    { siteUrl: "https://ghatsila.ssrvm.org", gtagId: "G-EB3N1KLLEQ", gtmId: "GTM-N4Z36MPN" },
    { siteUrl: "https://anand.ssrvm.org", gtagId: "G-G7X17SK753", gtmId: "GTM-PCNF9DQN" },
    { siteUrl: "https://panathur.ssrvm.org", gtagId: "G-FH02R0L7RW", gtmId: "GTM-WRVDHZWK" },
    { siteUrl: "https://jpnagar.ssrvm.org", gtagId: "G-J8FGF6ER70" },
    { siteUrl: "https://warje.ssrvm.org", gtagId: "G-DRRET5QJR4", gtmId: "GTM-NQRXMV5X" },
    { siteUrl: "https://thiru.ssrvm.org", gtagId: "G-KLWGDK95WE", gtmId: "GTM-TL6RKLPM" },
    { siteUrl: "https://mulbagal.ssrvm.org", gtagId: "G-D49M36JKSB" },
    // { siteUrl: "https://bangaloresouth.ssrvm.org", gtagId: "G-J8FGF6ER70"},
    { siteUrl: "https://bangaloresouth.ssrvm.org", gtagId: "G-FP52Z6SNWF", gtmId: 'GTM-M3HCW2V' },
    { siteUrl: "https://rrnagar.ssrvm.org", gtagId: "G-9YDR5E3XCV", gtmId: "GTM-TCW8QGP8" },
    { siteUrl: "https://kgf.ssrvm.org", gtagId: "G-NC8YYDTLKW", gtmId: "GTM-PG6FC8JK" },
    { siteUrl: "https://bangalorenorth.ssrvm.org", gtagId: "G-L0MF1LDNWV", gtmId: 'GTM-PV5JPZV9' },
    { siteUrl: "https://bhugaon.ssrvm.org", gtagId: "G-NRB3SGWLWP", gtmId: "GTM-NMSG9J48" },
    { siteUrl: "https://mulund.ssrvm.org", gtagId: "G-H6NZ21L3RC", gtmId: "GTM-KXKTK39M" },
    // { siteUrl: "https://borivalieast.ssrvm.org", gtagId: "G-5J1PLXPWRZ", gtmId: "GTM-PBJK7BX8" },
    { siteUrl: "https://borivalieast.ssrvm.org", gtmId: "GTM-PBJK7BX8" },
    { siteUrl: "https://laturmarathi.ssrvm.org", gtagId: "G-9RW1L95JVD", gtmId: "GTM-NKN3B3TX" },
    // { siteUrl: "https://borivaliwest.ssrvm.org", gtagId: "G-GPQTDEXJY9", gtmId: "GTM-5PB9BK9F" },
    { siteUrl: "https://borivaliwest.ssrvm.org", gtmId: "GTM-5PB9BK9F", gtmId: "GTM-5PB9BK9F" },
    { siteUrl: "https://adajan.ssrvm.org", gtagId: "G-SNBGFS52ZT", gtmId: "GTM-KFH4HGBH" },
    { siteUrl: "https://dharavi.ssrvm.org", gtagId: "G-RLPCQVEB9C", gtmId: "GTM-579TXDK5" },
    { siteUrl: "https://latur.ssrvm.org", gtagId: "G-MLJ4YPKVK4", gtmId: "GTM-KJWB22HB" },
    { siteUrl: "https://godhra.ssrvm.org", gtagId: "G-CJ69QZNQCX", gtmId: "GTM-PJQ7XLMW" },
    { siteUrl: "https://mangalore.ssrvm.org", gtagId: "G-15KDVN7WSQ", gtmId: "GTM-TP9RH3QC"},
    { siteUrl: "https://jaipur.ssrvm.org", gtagId: "G-W972L9GQYN", gtmId: "GTM-P5R3JFJ6"},
    { siteUrl: "https://kozhikode.ssrvm.org", gtagId: "G-L1V5R63J9F", gtmId: "GTM-5C3JGM8Q" },
    { siteUrl: "https://karkala.ssrvm.org", gtagId: "G-D71JG1JDTB", gtmId: "GTM-WXH8BJGP" },
    { siteUrl: "https://sastha.ssrvm.org", gtagId: "G-CG91LS7DD7", gtmId: "GTM-NN4FG8G8" },
    { siteUrl: "https://bangaloreeast.ssrvm.org", gtagId: "G-0N24BL8CZH", gtmId: "GTM-WG66B2SQ" },
    { siteUrl: "https://kayamkulam.ssrvm.org", gtagId: "G-EMK05KM6FW", gtmId: "GTM-K4HDGCHH" },
    { siteUrl: "https://jbnagar.ssrvm.org", gtagId: "G-3W11ZBWMX4", gtmId: "GTM-T73KBR77" },
    { siteUrl: "https://sangamner.ssrvm.org", gtagId: "G-YD160Q3GM9", gtmId: "GTM-WQDN27QL" },
    { siteUrl: "https://omerga.ssrvm.org", gtagId: "G-20Y31J7LKE", gtmId: "GTM-MBS8S57F" },
    { siteUrl: "https://cherthala.ssrvm.org", gtagId: "G-PM9Z5FS4VW", gtmId: "GTM-PQ28W5BH" },
    { siteUrl: "https://rourkela.ssrvm.org", gtagId: "G-XWECQ0VEPJ", gtmId: "GTM-PL6KMRP8" },
    { siteUrl: "https://cidcoaurangabad.ssrvm.org", gtagId: "G-2LSBMMYTS6", gtmId: "GTM-PW9M3PGC"},
    { siteUrl: "https://bongaigaon.ssrvm.org", gtagId: "G-X9B2K2VT2C", gtmId: "GTM-MHR8VMCF" },
    { siteUrl: "https://westhill.ssrvm.org", gtagId: "G-RLJH74S4X7", gtmId: "GTM-MM2KHP7D" },
    { siteUrl: "https://itanagar.ssrvm.org", gtagId: "G-8DEXN9WBKD", gtmId: "GTM-KHH4X323" },
    { siteUrl: "https://ushanagar.ssrvm.org", gtagId: "G-ZQBDZMWYPB", gtmId: "GTM-5L7N3Z42" },
    { siteUrl: "https://sambalpur.ssrvm.org", gtagId: "G-F8024QTV5Y" },
    { siteUrl: "https://ulhasnagar.ssrvm.org", gtagId: "G-N4P5L6CNK8", gtmId: "GTM-5B4GNQZD" },
    { siteUrl: "https://parivakkam.ssrvm.org", gtagId: "G-5F2F6WQGT5", gtmId: "GTM-W66XMQHL" },
    { siteUrl: "https://biratnagar.ssrvm.org", gtagId: "G-9PPJPN76EH", gtmId: "GTM-KRLXJHP5" },
    { siteUrl: "https://mangadu.ssrvm.org", gtagId: "G-HZ7VX1K7Q5", gtmId: "GTM-NXHH24WH" },
    { siteUrl: "https://cheranellore.ssrvm.org", gtagId: "G-XFD0TZPWMM", gtmId: "GTM-MQRP9KGM" },
    { siteUrl: "https://pathardi.ssrvm.org", gtagId: "G-YW96RMSFLH", gtmId: "GTM-PNXGJ3LD" },
    { siteUrl: "https://najibabad.ssrvm.org", gtagId: "G-9WBYKQB9CL", gtmId: "GTM-KDW5HNP4" },
    { siteUrl: "https://asansol.ssrvm.org", gtagId: "G-MDK1X92N18", gtmId: "GTM-KCCH2WMN" },
    { siteUrl: "https://vikaasa.ssa.org.in", gtagId: "G-HM4K01C2QG", gtmId: "GTM-P957SJNC" },
    { siteUrl: "https://ssrvmpucbs.ssrvm.org", gtagId: "G-Y9RZPQSB0R" },
    { siteUrl: "https://kamakhyanagar.ssrvm.org", gtagId: "G-LVT03R7G4T", gtmId: "GTM-5M2ZX9NG" },
    { siteUrl: "https://kochi.ssa.org.in", gtagId: "G-FL6RSKQY7P" },
    { siteUrl: "https://whitefield.ssa.org.in", gtagId: "G-KKR4F2E07M", gtmId: "GTM-N7KFCMB7" },
    { siteUrl: "https://bangalorenorth.ssa.org.in", gtagId: "G-QWV26QS7Q6", gtmId: "GTM-KXSZKDRT" },
    { siteUrl: "https://gauribidanur.ssrvm.org", gtagId: "G-61EY7WV5H5", gtmId: 'GTM-WX3ZNNP7' },
    { siteUrl: "https://kolkata.ssa.org.in", gtagId: "G-GKJTFCWVV3", gtmId: "GTM-N87Z3W93" },
    { siteUrl: "https://kollam.ssa.org.in", gtagId: "G-JL5GGD6PFZ", gtmId: "GTM-5VMMXM9L" },
    { siteUrl: "https://vadgaon.ssrvm.org", gtagId: "G-GW3MN9WFTF", gtmId: "GTM-W7X9TVLQ" },
    { siteUrl: "https://nabinagar.ssa.org.in", gtagId: "G-9MF5CLRS68", gtmId: "GTM-PZJX5TW3" },
    { siteUrl: "https://asansol.ssa.org.in", gtagId: "G-5VPQ23P4TR", gtmId: "GTM-5HD8W9MK" },
    { siteUrl: "https://hyderabad.ssa.org.in", gtagId: "G-2EMEGCYRRM", gtmId: "GTM-NL2FZ2SX" },
    { siteUrl: "https://cuttack.ssa.org.in", gtagId: "G-7LHVNFKPQF", gtmId: "GTM-WXJPS9WK" },
    { siteUrl: "https://bangaloresouth.ssa.org.in", gtagId: "G-J8FGF6ER70", gtmId: "GTM-KLP62H8M" },
    { siteUrl: "https://panampillynagar.ssrvm.org", gtagId: "G-FL6RSKQY7P", gtmId: "GTM-P3MWLFTT" },
    { siteUrl: "https://vignannagar.ssrvm.org", gtagId: "G-WX9F7CD3Z8", gtmId: "GTM-MMC6FSXB" },

  ]

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
    AOS.init({
      offset: 0,
      easing: "ease",
      once: true,
    });
    AOS.refresh();
  }, []);

  // Find matching site or return an empty object if none is found
  const matchedSite = sitesData.find((item) => {
    const cleanItemUrl = item.siteUrl.replace(/^https?:\/\//, ''); // Remove http:// or https://
    const cleanSiteUrl = site_url.replace(/^https?:\/\//, ''); // Remove http:// or https://
    return cleanItemUrl === cleanSiteUrl; // Match the cleaned URLs
  }) || {}; // Return an empty object if no match is found

  // Destructure gtagId and gtmId, with default values if undefined
  const { gtagId = '', gtmId = '' } = matchedSite;


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
      {/* {gtagId !== null && <LoadScript gtagId={gtagId} />} */}
      {gtagId && <LoadScript gtagId={gtagId} />}
      <Component {...pageProps} />
      <ScrollToTop className="d-none d-lg-block" smooth color='#210D7D' />
    </>
  );
}

const LoadScript = ({ gtagId }) => (
  <>
    {gtagId &&
      <><script
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
    }
  </>
);

