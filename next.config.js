/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: {
    buildActivity: false,
  },
  env: {
    // PUBLIC_URL: 'https://ssrvmtemplate.ssrvmtrust.org.in',
    PUBLIC_URL: 'http://43.205.227.120:3000/',
    REACT_APP_MAIN_SSRVM_SITE_URL: 'https://ssrvmtemplate.ssrvmtrust.org.in',
    REACT_APP_LOCAL_SSRVM_SITE_URL: 'https://schoolapi.ssrvmtrust.org.in',
    SMTP_HOST: "smtp.gmail.com",
    SMTP_PORT: 465,
    SMTP_USER: "noreply@ssrvm.org",
    SMTP_PASS: "Gold2005",
  },
}

module.exports = nextConfig
