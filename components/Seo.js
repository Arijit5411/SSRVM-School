// import Head from 'next/head';
// import React from 'react';

// const Seo = ({ SeoData, PageSlug, InnerPageSlug }) => {

//   const getDefaultValues = (page) => {
//     const { Meta_Title, Meta_Description, Meta_Keywords, Canonical, Robots, Inner_Page } = page || {};
//     return { Meta_Title, Meta_Description, Meta_Keywords, Canonical, Robots, Inner_Page };
//   };

//   if (SeoData !== null && Object.keys(SeoData ?? {})?.length === 0) return <Head />

//   const mainPage = getDefaultValues(SeoData?.find((item) => item?.Page_Slug === PageSlug));
//   const innerPage = InnerPageSlug && InnerPageSlug && mainPage.Inner_Page?.find((item) => item.Page_Slug === InnerPageSlug);

//   const { Meta_Title, Meta_Description, Meta_Keywords, Canonical, Robots } = innerPage || mainPage;

//   return (
//     <>
//       <Head>
//         {Meta_Title && <title>{Meta_Title}</title>}
//         {Meta_Description && <meta name="description" content={Meta_Description} />}
//         {Meta_Keywords && <meta name="keywords" content={Meta_Keywords} />}
//         {Canonical && <link rel="canonical" href={Canonical} />}
//         {Robots && <meta name="robots" content={Robots} />}
//       </Head>
//     </>
//   );
// };

// export default Seo;



import Head from 'next/head';
import React from 'react';

const Seo = ({ SeoData, PageSlug, InnerPageSlug }) => {
  const getDefaultValues = (page) => {
    const { 
      Meta_Title, 
      Meta_Description, 
      Meta_Keywords, 
      Canonical, 
      Robots, 
      Inner_Page, 
      OG_Title, 
      OG_Description, 
      OG_Image, 
      OG_Url, 
      OG_Type, 
      Twitter_Title, 
      Twitter_Description, 
      Twitter_Image, 
      Twitter_Card 
    } = page || {};
    return { 
      Meta_Title, 
      Meta_Description, 
      Meta_Keywords, 
      Canonical, 
      Robots, 
      Inner_Page, 
      OG_Title, 
      OG_Description, 
      OG_Image, 
      OG_Url, 
      OG_Type, 
      Twitter_Title, 
      Twitter_Description, 
      Twitter_Image, 
      Twitter_Card 
    };
  };

  if (SeoData !== null && Object.keys(SeoData ?? {})?.length === 0) return <Head />;

  const mainPage = getDefaultValues(SeoData?.find((item) => item?.Page_Slug === PageSlug));
  const innerPage = InnerPageSlug && mainPage.Inner_Page?.find((item) => item.Page_Slug === InnerPageSlug);

  const { 
    Meta_Title, 
    Meta_Description, 
    Meta_Keywords, 
    Canonical, 
    Robots, 
    OG_Title, 
    OG_Description, 
    OG_Image, 
    OG_Url, 
    OG_Type, 
    Twitter_Title, 
    Twitter_Description, 
    Twitter_Image, 
    Twitter_Card 
  } = innerPage || mainPage;

  return (
    <>
      <Head>
        {/* Meta Tags */}
        {Meta_Title && <title>{Meta_Title}</title>}
        {Meta_Description && <meta name="description" content={Meta_Description}/>}
        {Meta_Keywords && <meta name="keywords" content={Meta_Keywords}/>}
        {Canonical && <link rel="canonical" href={Canonical}/>}
        {Robots && <meta name="robots" content={Robots}/>}

        {/* Open Graph Tags */}
        {OG_Title && <meta property="og:title" content={OG_Title}/>}
        {OG_Description && <meta property="og:description" content={OG_Description}/>}
        {OG_Image && <meta property="og:image" content={OG_Image}/>}
        {OG_Url && <meta property="og:url" content={OG_Url}/>}
        {OG_Type && <meta property="og:type" content={OG_Type}/>}

        {/* Twitter Card Tags */}
        {Twitter_Title && <meta name="twitter:title" content={Twitter_Title}/>}
        {Twitter_Description && <meta name="twitter:description" content={Twitter_Description}/>}
        {Twitter_Image && <meta name="twitter:image" content={Twitter_Image}/>}
        {Twitter_Card && <meta name="twitter:card" content={Twitter_Card}/>}
      </Head>
    </>
  );
};

export default Seo;

