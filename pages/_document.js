import { determineStrapiUrl } from '@/utils/strapiUtils';
import { Html, Head, Main, NextScript } from 'next/document';

const Document = (props) => {
  const { seoData } = props;

  const Organization_Schema = seoData?.data?.attributes?.Organization_Schema ?? null;
  const Location_Schema = seoData?.data?.attributes?.Location_Schema ?? null;

  return (
    <Html lang="en">
      <Head>
      <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id=' + i + dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-PCG5Q78G');
              `,
            }}
          />
        <link href="https://www.dafontfree.net/embed/bWV0cm9wb2xpcy1yZWd1bGFyJmRhdGEvNTIvbS8xNTY4MDAvTWV0cm9wb2xpcy1SZWd1bGFyLm90Zg" rel="stylesheet" type="text/css" />
        {/* Font Awesome 6.4 */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous" referrerPolicy="no-referrer" />
        <link href="https://db.onlinewebfonts.com/c/c02d97eb2b2899bdb0d87b182a64333d?family=Metropolis-Regular" rel="stylesheet" />
        
        {/* Insert schemas if they exist */}
        {Organization_Schema && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: Organization_Schema }} />
        )}
        {Location_Schema && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: Location_Schema }} />
        )}
      </Head>
      <body>
      <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=GTM-PCG5Q78G`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

// Document.getInitialProps = async (ctx) => {
//   const initialProps = await ctx.defaultGetInitialProps(ctx);
//   const { req } = ctx;
//   const host = req.headers['host'];
//   let seoData = null;

//   try {
//     const siteUrl = determineStrapiUrl(host);
//     const res = await fetch(`${siteUrl}/api/seo`);
//     if (res.ok) {
//       seoData = await res.json();
//     } else {
//       console.error("Error fetching SEO data:", res.statusText);
//     }
//   } catch (error) {
//     console.error("Error fetching SEO data:", error.message);
//   }

//   return { ...initialProps, seoData };
// };


Document.getInitialProps = async (ctx) => {
  const initialProps = await ctx.defaultGetInitialProps(ctx);
  const { req } = ctx;

  let host = '';
  if (req) {
    host = req.headers['host'];
  }

  let seoData = null;
  try {
    if (host) {
      const siteUrl = determineStrapiUrl(host);
      const res = await fetch(`${siteUrl}/api/seo`);
      if (res.ok) {
        seoData = await res.json();
      } else {
        console.error("Error fetching SEO data:", res.statusText);
      }
    }
  } catch (error) {
    console.error("Error fetching SEO data:", error.message);
  }

  return { ...initialProps, seoData };
};


export default Document;