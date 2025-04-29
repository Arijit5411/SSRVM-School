/* eslint-disable @next/next/no-img-element */
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import ReactMarkdown from "react-markdown";

import { determineStrapiUrl } from "@/utils/strapiUtils";
import Seo from "@/components/Seo";
import Image from "next/image";

export const getServerSideProps = async (context) => {
  try {
    const siteUrl = determineStrapiUrl(context);
    const { slug } = context.params;

    const res = await fetch(`${siteUrl}/api/others-pages?filters[slug][$eq]=${slug}&populate[Content_Area][populate]=*`);
    const res2 = await fetch(`${siteUrl}/api/seo?populate=deep,10`);
    
    const data = await res.json();
    const data2 = await res2.json();

    return {
      props: {
        data: data?.data?.length > 0 ? data?.data[0] : {},
        seodata: data2?.data?.attributes?.Pages ?? {},
        slug,
        siteUrl,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error.message);

    return {
      props: {
        data: [],
      },
    };
  }
};

const OtherPage = ({ data,siteUrl,seodata,slug }) => {

  console.log("seodata", seodata)

  const processContent = (content) => {
    if (content) {
      let processedContent = content.replace(
        /\/uploads/g,
        `${siteUrl}/uploads`
      );
      // processedContent = processedContent.replace(/\n/g, "</br>");
      return processedContent;
    }
    return "";
  };

  return (
    <>
      <Seo SeoData={seodata} PageSlug={"others"} InnerPageSlug={slug} />
      <NavBar siteUrl={siteUrl}/>
      <div className="py-5"></div>
      <section className="py-5">
        <div className="container ">
          <div className="wrap-state mb-3 mb-md-5">
            <h1>{data?.attributes?.Page_Heading}</h1>
            <p>{data?.attributes?.Page_Sub_Heading}</p>
          </div>
          <div className="feature-contet-list other-page-x1">
            {data?.attributes?.Content_Area &&
              data?.attributes?.Content_Area.map((content, index) => {
                const dataImage = content.Image?.data?.attributes?.url;

                return (
                  <div className="row gy-4 gy-md-5 mb-4 mb-md-5" key={index}>
                    {(content.Content || content.Rich_Content) && (
                      <div className={dataImage ? "col-lg-6" : "col-lg-12"}>
                        <ReactMarkdown>{content?.Content}</ReactMarkdown>
                        {/* {processContent(content?.Rich_Content)} */}
                        <div dangerouslySetInnerHTML={{ __html: processContent(content?.Rich_Content) }} />
                      </div>
                    )}

                    {dataImage && (
                      <div
                        className={(content.Content || content.Rich_Content) ? "col-lg-6" : "col-lg-12"}
                      >
                        <Image width="636" height="434"
                          className="w-100 rounded-3"
                          src={siteUrl + dataImage}
                          alt=""
                        />
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </section>
      <Footer siteUrl={siteUrl}/>
    </>
  );
};

export default OtherPage;
