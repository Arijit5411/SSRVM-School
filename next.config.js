/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  reactStrictMode: true,
  devIndicators: {
    buildActivity: false,
  },
  images: {
    remotePatterns: [
        {
            protocol: 'https',
            hostname: '**',
        },
    ],
},
  env: {
    // PUBLIC_URL: 'https://ssrvmtemplate.ssrvmtrust.org.in',
    //  PUBLIC_URL: 'http://43.205.227.120:3000/',
    //  REACT_APP_MAIN_SSRVM_SITE_URL: 'https://ssrvmtemplate.ssrvmtrust.org.in',
    //  REACT_APP_LOCAL_SSRVM_SITE_URL: 'https://schoolapi.ssrvmtrust.org.in',
    GSURL: "https://globalcontent.ssrvm.org",
    SMTP_HOST:"smtp.gmail.com",
    SMTP_PORT: 465,
    SMTP_USER: "noreply@ssrvm.org",
    SMTP_PASS: "otfk qvvh zhfb xuoq",

    
    // SSRVM_CAPTCHA_SITE_KEY: '6LcHdSIpAAAAAEKFA_WyznjnY2mkvoqg3IJqPn6P',
    // SSRVM_CAPTCHA_SECRET_KEY: '6LcHdSIpAAAAAMrf1VChG69K3fzZzdgADFIwvjq2',

    // SSRVM_CAPTCHA_SITE_KEY: '6Le7590qAAAAAMDnLAjhDhGODgyfObMtAXgIP8UT',
    // SSRVM_CAPTCHA_SECRET_KEY: '6Le7590qAAAAABqdEQPV1_TUoq7GY7CqUIieYc0M',

    // SSA_CAPTCHA_SITE_KEY: '6Le7590qAAAAAMDnLAjhDhGODgyfObMtAXgIP8UT',
    // SSA_CAPTCHA_SECRET_KEY: '6Le7590qAAAAABqdEQPV1_TUoq7GY7CqUIieYc0M',


    SSRVM_CAPTCHA_SITE_KEY: '6LdL6t0qAAAAADizfpolsG3uv1r1KeWfgJ2HB9be',
    SSRVM_CAPTCHA_SECRET_KEY: '6LdL6t0qAAAAAK0oam4Kvs71o9eD5xj05-jaXD6b',

    SSA_CAPTCHA_SITE_KEY: '6LdL6t0qAAAAADizfpolsG3uv1r1KeWfgJ2HB9be',
    SSA_CAPTCHA_SECRET_KEY: '6LdL6t0qAAAAAK0oam4Kvs71o9eD5xj05-jaXD6b',

    // LOCAL_SURL: "https://hyderabad.ssa.org.in",
    // LOCAL_SURL: "https://indore.ssrvm.org",
    LOCAL_SURL: "https://borivaliwest.ssrvm.org",
    // LOCAL_SURL: "https://indore.ssrvm.org",
    SURL: '[{ "subdomain": "ssrvmpucbs.ssrvm.org", "url": "https://ssrvmpucbsapi.ssrvm.org" }, { "subdomain": "asansol.ssrvm.org", "url": "https://asansolapi.ssrvm.org" }, { "subdomain": "najibabad.ssrvm.org", "url": "https://najibabadapi.ssrvm.org" }, { "subdomain": "cheranellore.ssrvm.org", "url": "https://cheranelloreapi.ssrvm.org" }, { "subdomain": "mangadu.ssrvm.org", "url": "https://mangaduapi.ssrvm.org" }, { "subdomain": "biratnagar.ssrvm.org", "url": "https://biratnagarapi.ssrvm.org" }, { "subdomain": "parivakkam.ssrvm.org", "url": "https://parivakkamapi.ssrvm.org" }, { "subdomain": "sambalpur.ssrvm.org", "url": "https://sambalpurapi.ssrvm.org" }, { "subdomain": "ushanagar.ssrvm.org", "url": "https://ushanagarapi.ssrvm.org" }, { "subdomain": "itanagar.ssrvm.org", "url": "https://itanagarapi.ssrvm.org" }, { "subdomain": "westhill.ssrvm.org", "url": "https://westhillapi.ssrvm.org" }, { "subdomain": "bongaigaon.ssrvm.org", "url": "https://bongaigaonapi.ssrvm.org" }, { "subdomain": "cidcoaurangabad.ssrvm.org", "url": "https://cidcoaurangabadapi.ssrvm.org" }, { "subdomain": "rourkela.ssrvm.org", "url": "https://rourkelaapi.ssrvm.org" }, { "subdomain": "cherthala.ssrvm.org", "url": "https://cherthalaapi.ssrvm.org" }, { "subdomain": "omerga.ssrvm.org", "url": "https://omergaapi.ssrvm.org" }, { "subdomain": "sangamner.ssrvm.org", "url": "https://sangamnerapi.ssrvm.org" }, { "subdomain": "jbnagar.ssrvm.org", "url": "https://jbnagarapi.ssrvm.org" }, { "subdomain": "kayamkulam.ssrvm.org", "url": "https://kayamkulamapi.ssrvm.org" }, { "subdomain": "sastha.ssrvm.org", "url": "https://sasthaapi.ssrvm.org" }, { "subdomain": "kozhikode.ssrvm.org", "url": "https://kozhikodeapi.ssrvm.org" }, { "subdomain": "mangalore.ssrvm.org", "url": "https://mangaloreapi.ssrvm.org" }, { "subdomain": "jaipur.ssrvm.org", "url": "https://jaipurapi.ssrvm.org" }, { "subdomain": "godhra.ssrvm.org", "url": "https://godhraapi.ssrvm.org" }, { "subdomain": "latur.ssrvm.org", "url": "https://laturapi.ssrvm.org" }, { "subdomain": "dharavi.ssrvm.org", "url": "https://dharaviapi.ssrvm.org" }, { "subdomain": "adajan.ssrvm.org", "url": "https://adajanapi.ssrvm.org" }, { "subdomain": "borivaliwest.ssrvm.org", "url": "https://borivaliwestapi.ssrvm.org" }, { "subdomain": "borivalieast.ssrvm.org", "url": "https://borivalieastapi.ssrvm.org" }, { "subdomain": "bhugaon.ssrvm.org", "url": "https://bhugaonapi.ssrvm.org" }, { "subdomain": "kgf.ssrvm.org", "url": "https://kgfapi.ssrvm.org" }, { "subdomain": "mulbagal.ssrvm.org", "url": "https://mulbagalapi.ssrvm.org" }, { "subdomain": "thiru.ssrvm.org", "url": "https://thiruapi.ssrvm.org" }, { "subdomain": "jpnagar.ssrvm.org", "url": "https://jpnagarapi.ssrvm.org" }, { "subdomain": "panathur.ssrvm.org", "url": "https://panathurapi.ssrvm.org" }, { "subdomain": "anand.ssrvm.org", "url": "https://anandapi.ssrvm.org" }, { "subdomain": "ghatsila.ssrvm.org", "url": "https://ghatsilaapi.ssrvm.org" }, { "subdomain": "surat.ssrvm.org", "url": "https://suratapi.ssrvm.org" }, { "subdomain": "chikmagalur.ssrvm.org", "url": "https://chikmagalurapi.ssrvm.org" }, { "subdomain": "satellite.ssrvm.org", "url": "https://satelliteapi.ssrvm.org" }, { "subdomain": "kharghar.ssrvm.org", "url": "https://khargharapi.ssrvm.org" }, { "subdomain": "godhavi.ssrvm.org", "url": "https://godhaviapi.ssrvm.org" }, { "subdomain": "ahmednagar.ssrvm.org", "url": "https://ahmednagarapi.ssrvm.org" }, { "subdomain": "bavdhan.ssrvm.org", "url": "https://bavdhanapi.ssrvm.org" }, { "subdomain": "agartala.ssrvm.org", "url": "https://agartalaapi.ssrvm.org" }, { "subdomain": "shimoga.ssrvm.org", "url": "https://shimogaapi.ssrvm.org" }, { "subdomain": "rajbhavanroad.ssrvm.org", "url": "https://rajbhavanroadapi.ssrvm.org" }, { "subdomain": "shrirampur.ssrvm.org", "url": "https://shrirampurapi.ssrvm.org" }, { "subdomain": "noida.ssrvm.org", "url": "https://noidaapi.ssrvm.org" }, { "subdomain": "cochin.ssrvm.org", "url": "https://cochinapi.ssrvm.org" }, { "subdomain": "dahod.ssrvm.org", "url": "https://dahodapi.ssrvm.org" }, { "subdomain": "bangaloresouth.ssrvm.org", "url": "https://bangaloresouthapi.ssrvm.org" }, { "subdomain": "cuttack.ssa.org.in", "url": "https://cuttackapi.ssa.org.in" }, { "subdomain": "bangalorenorth.ssa.org.in", "url": "https://bangalorenorthapi.ssa.org.in" }, { "subdomain": "gauribidanur.ssrvm.org", "url": "https://gauribidanurapi.ssrvm.org" }, { "subdomain": "kolkata.ssa.org.in", "url": "https://kolkataapi.ssa.org.in" }, { "subdomain": "kollam.ssa.org.in", "url": "https://kollamapi.ssa.org.in" }, { "subdomain": "whitefield.ssa.org.in", "url": "https://whitefieldapi.ssa.org.in" }, { "subdomain": "vadgaon.ssrvm.org", "url": "https://vadgaonapi.ssrvm.org" }, { "subdomain": "nabinagar.ssa.org.in", "url": "https://nabinagarapi.ssa.org.in" }, { "subdomain": "asansol.ssa.org.in", "url": "https://asansolapi.ssa.org.in" }, { "subdomain": "kochi.ssa.org.in", "url": "https://kochiapi.ssa.org.in" }, { "subdomain": "jharsuguda.ssa.org.in", "url": "https://jharsugudaapi.ssa.org.in" }, { "subdomain": "vikaasa.ssa.org.in", "url": "https://vikaasaapi.ssa.org.in" }, { "subdomain": "bangalorenorth.ssrvm.org", "url": "https://bangalorenorthapi.ssrvm.org" }, { "subdomain": "hyderabad.ssa.org.in", "url": "https://hyderabadapi.ssa.org.in" }, { "subdomain": "thrissur.ssrvm.org", "url": "https://thrissurapi.ssrvm.org" }, { "subdomain": "moshi.ssrvm.org", "url": "https://moshiapi.ssrvm.org" }, { "subdomain": "dhenkanal.ssrvm.org", "url": "https://dhenkanalapi.ssrvm.org" }, { "subdomain": "laturmarathi.ssrvm.org", "url": "https://laturmarathiapi.ssrvm.org" }, { "subdomain": "karkala.ssrvm.org", "url": "https://karkalaapi.ssrvm.org" }, { "subdomain": "ulhasnagar.ssrvm.org", "url": "https://ulhasnagarapi.ssrvm.org" }, { "subdomain": "pathardi.ssrvm.org", "url": "https://pathardiapi.ssrvm.org" }, { "subdomain": "kamakhyanagar.ssrvm.org", "url": "https://kamakhyanagarapi.ssrvm.org" }, { "subdomain": "mulund.ssrvm.org", "url": "https://mulundapi.ssrvm.org" }, { "subdomain": "bangaloreeast.ssrvm.org", "url": "https://bangaloreeastapi.ssrvm.org" }, { "subdomain": "osmanabad.ssrvm.org", "url": "https://osmanabadapi.ssrvm.org" }, { "subdomain": "indore.ssrvm.org", "url": "https://indoreapi.ssrvm.org" }, { "subdomain": "warje.ssrvm.org", "url": "https://warjeapi.ssrvm.org" }, { "subdomain": "rrnagar.ssrvm.org", "url": "https://rrnagarapi.ssrvm.org" }]'
  },
}

// module.exports = nextConfig
module.exports = withBundleAnalyzer(nextConfig);
