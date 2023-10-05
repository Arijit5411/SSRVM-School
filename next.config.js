/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: {
    buildActivity: false,
  },
  env: {
    PUBLIC_URL: 'https://ssrvmtemplate.ssrvmtrust.org.in',
    REACT_APP_MAIN_SSRVM_SITE_URL: 'https://ssrvmtemplate.ssrvmtrust.org.in',
    REACT_APP_LOCAL_SSRVM_SITE_URL: 'https://schoolapi.ssrvmtrust.org.in'
  },
}

module.exports = nextConfig
