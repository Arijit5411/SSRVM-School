import React, { Fragment, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

import Head from "next/head";
import { determineStrapiUrl } from "@/utils/strapiUtils";
import Seo from "@/components/Seo";
export const getServerSideProps = async (context) => {
  try {
    const siteUrl = determineStrapiUrl(context);
    const res = await fetch(`${siteUrl}/api/seo?populate=deep,10`);

  const res1 = await fetch(`${siteUrl}/api/features?populate=*`);

  const data = await res.json();
  const data1 = await res1.json();

  return {
    props: {
      seodata: data?.data?.attributes?.Pages ?? {},
      featuresData: data1,
      siteUrl
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

const Features = ({ seodata, featuresData,siteUrl }) => {
  const [features, setFeatures] = useState([]);
  console.log("feature data", features,featuresData);
 

  useEffect(() => {
    // fetch(`${siteUrl}/api/features?populate=*`)
    //     .then(response => response.json())
    //     .then(data => {
    //         setFeatures(data.data);
    //     })
    //     .catch(error => {
    //         console.error('Error:', error);
    //     });
    if (featuresData && featuresData?.data && featuresData?.data?.length > 0) {
      setFeatures(featuresData.data);
    }
  }, [siteUrl]);

 
console.log('st url',siteUrl)
  return (
    <>
      <Fragment>
      <Seo SeoData={seodata} PageSlug={"features"} />

        <NavBar siteUrl={siteUrl}/>

        <div className="top-section1-new pb-5">
          <section className="wrap-item-principal-se1 pri-item marginmobile">
            <div className="container">
              <div className="row">
                <div className="col-lg-7">
                  <h1 className="principal-mess principalTtile">Features</h1>
                  {/* <p className="wrap-features desktophide">
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text. It has roots in a piece of classical Latin literature
                    from 45 BC, making it over 2000 years old. Richard
                    McClintock, a Latin professor at Hampden-Sydney Col- lege in
                    Virginia, looked up one of the more obscure Latin words,
                    consecte- tur, from a Lorem Ipsum passage, and going through
                    the cites of the word in classical literature, discovered
                    the undoubtable source. Lorem Ipsum
                  </p> */}
                  {/* <p className="wrap-features mobilehide">
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text. It has<br></br>
                    roots in a piece of classical Latin literature from 45 BC,
                    making it over 2000<br></br>
                    years old. Richard McClintock, a Latin professor at
                    Hampden-Sydney Col-<br></br>
                    lege in Virginia, looked up one of the more obscure Latin
                    words, consecte-<br></br>
                    tur, from a Lorem Ipsum passage, and going through the cites
                    of the word<br></br>
                    in classical literature, discovered the undoubtable source.
                    Lorem Ipsum<br></br>
                  </p> */}
                </div>
              </div>
            </div>
          </section>
          <section className="container">
            {features.map((feature, index) => (
              <div
                className={`row g-0 ${
                  index % 2 === 0 ? "" : "reverseFlexFeature"
                }`}
                key={feature.id}
              >
                <div className="col-lg-6 wrap-bg-colour">
                  <div className="wrap-fea-item">
                    <h4 className="wrap-fea-heading">
                      {feature.attributes.heading}
                    </h4>
                    <p className="wrap-fea-pargrap">
                    <ReactMarkdown >
                      {feature.attributes.sub_heading}
                        {/* // ?.split("\n")
                        // ?.slice(0, 3)
                        // ?.map((line, index) => (
                        //   <span key={index}>
                        //     {line}
                        //     <br />
                        //   </span>
                        // ))} */}
                        </ReactMarkdown>
                    </p>
                    <div className="btn-wrapper mt-4">
                      <div className="btn-wrap">
                        <Link
                          href={`/state-facility/${feature.id}`}
                          className="def-btn btn-1"
                        >
                          Know more
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="h-100">
                    <img
                      src={`${siteUrl}${feature.attributes?.Thumbnail?.data?.attributes?.url}`}
                      alt={feature.attributes.heading}
                      className="w-100 h-100 object-fit-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>
        <Footer siteUrl={siteUrl}/>
      </Fragment>
    </>
  );
};

export default Features;
