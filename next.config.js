/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: {
    buildActivity: false,
  },
  env: {
    // PUBLIC_URL: 'https://ssrvmtemplate.ssrvmtrust.org.in',
  //  PUBLIC_URL: 'http://43.205.227.120:3000/',
  //  REACT_APP_MAIN_SSRVM_SITE_URL: 'https://ssrvmtemplate.ssrvmtrust.org.in',
  //  REACT_APP_LOCAL_SSRVM_SITE_URL: 'https://schoolapi.ssrvmtrust.org.in',
    SMTP_HOST: "smtp.gmail.com",
    SMTP_PORT: 465,
    SMTP_USER: "noreply@ssrvm.org",
    SMTP_PASS: "Gold2005",
    LOCAL_SURL: '[ { "subdomain": "localhost:3737", "url": "https://cuttackapi.ssa.org.in" }, { "subdomain": "school2.localhost.com:3737", "url": "https://gauribidanurapi.ssrvm.org" } ]',

    SURL: '[ { "subdomain": "bangaloresouth.ssrvm.org", "url": "https://bangaloresouthapi.ssrvm.org" }, { "subdomain": "cuttack.ssa.org.in", "url": "https://cuttackapi.ssa.org.in" }, { "subdomain": "bangalorenorth.ssa.org.in", "url": "https://bangalorenorthapi.ssa.org.in" }, { "subdomain": "gauribidanur.ssrvm.org", "url": "https://gauribidanurapi.ssrvm.org" }, { "subdomain": "kolkata.ssa.org.in", "url": "https://kolkataapi.ssa.org.in" }, { "subdomain": "kollam.ssa.org.in", "url": "https://kollamapi.ssa.org.in" }, { "subdomain": "whitefield.ssa.org.in", "url": "https://whitefieldapi.ssa.org.in" }, { "subdomain": "vadgaon.ssrvm.org", "url": "https://vadgaonapi.ssrvm.org" }, { "subdomain": "nabinagar.ssa.org.in", "url": "https://nabinagarapi.ssa.org.in" }, { "subdomain": "asansol.ssa.org.in", "url": "https://asansolapi.ssa.org.in" }, { "subdomain": "kochi.ssa.org.in", "url": "https://kochiapi.ssa.org.in" }, { "subdomain": "jharsuguda.ssa.org.in", "url": "https://jharsugudaapi.ssa.org.in" }, { "subdomain": "vikaasa.ssa.org.in", "url": "https://vikaasaapi.ssa.org.in" }, { "subdomain": "bangalorenorth.ssrvm.org", "url": "https://bangalorenorthapi.ssrvm.org" }, { "subdomain": "hyderabad.ssa.org.in", "url": "https://hyderabadapi.ssa.org.in" }, { "subdomain": "thrissur.ssrvm.org", "url": "https://thrissurapi.ssrvm.org" }, { "subdomain": "moshi.ssrvm.org", "url": "https://moshiapi.ssrvm.org" }, { "subdomain": "dhenkanal.ssrvm.org", "url": "https://dhenkanalapi.ssrvm.org" }, { "subdomain": "laturmarathi.ssrvm.org", "url": "https://laturmarathiapi.ssrvm.org" }, { "subdomain": "karkala.ssrvm.org", "url": "https://karkalaapi.ssrvm.org" }, { "subdomain": "ulhasnagar.ssrvm.org", "url": "https://ulhasnagarapi.ssrvm.org" }, { "subdomain": "pathardi.ssrvm.org", "url": "https://pathardiapi.ssrvm.org" }, { "subdomain": "kamakhyanagar.ssrvm.org", "url": "https://kamakhyanagarapi.ssrvm.org" }, { "subdomain": "mulund.ssrvm.org", "url": "https://mulundapi.ssrvm.org" }, { "subdomain": "bangaloreeast.ssrvm.org", "url": "https://bangaloreeastapi.ssrvm.org" }, { "subdomain": "osmanabad.ssrvm.org", "url": "https://osmanabadapi.ssrvm.org" }, { "subdomain": "indore.ssrvm.org", "url": "https://indoreapi.ssrvm.org" }, { "subdomain": "warje.ssrvm.org", "url": "https://warjeapi.ssrvm.org" }, { "subdomain": "rrnagar.ssrvm.org", "url": "https://rrnagarapi.ssrvm.org" } ]'
  },
}

module.exports = nextConfig
