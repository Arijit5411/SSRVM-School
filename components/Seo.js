import Head from 'next/head';
import React from 'react';

const Seo = ({ SeoData, PageSlug, InnerPageSlug }) => {
  
  const getDefaultValues = (page) => {
    const { Meta_Title, Meta_Description, Meta_Keywords, Canonical, Robots, Inner_Page } = page || {};
    return { Meta_Title, Meta_Description, Meta_Keywords, Canonical, Robots, Inner_Page };
  };

  if (Object.keys(SeoData)?.length === 0) return <Head />

  const mainPage = getDefaultValues(SeoData?.find((item) => item?.Page_Slug === PageSlug));
  const innerPage = InnerPageSlug && InnerPageSlug && mainPage.Inner_Page?.find((item) => item.Page_Slug === InnerPageSlug);

  const { Meta_Title, Meta_Description, Meta_Keywords, Canonical, Robots } = innerPage || mainPage;

  return (
    <>
      <Head>
        {Meta_Title && <title>{Meta_Title}</title>}
        {Meta_Description && <meta name="description" content={Meta_Description} />}
        {Meta_Keywords && <meta name="keywords" content={Meta_Keywords} />}
        {Canonical && <link rel="canonical" href={Canonical} />}
        {Robots && <meta name="robots" content={Robots} />}
        </Head>
    </>
  );
};

export default Seo;
