import Link from "next/link";
import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

const ImportantAnnouncment = ({siteUrl}) => {
  const [data, setData] = useState();
  const getData = async () => {
    try {
      const res = await fetch(
        `${siteUrl}/api/home-announcment-enable-diasbles?populate=*`
      );
      const resdata = await res.json();
      setData(resdata);
    } catch (error) {
      console.log("mandatory disclosure error", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // console.log("data?.data[0]?.attributes?.Link", data?.data[0]?.attributes?.Link)

  return (
    <>
      {/* {(data?.data[0] !== null) ? (
        <Link className="d-block w-100" href={data?.data[0]?.attributes?.Link} target="_blank">
          <div
            className={`importantDiv cursor-pointer ${
              !data?.data[0]?.attributes?.switch && "d-none"
            }`}
          >
            <Marquee className="imp">
              <span className="mx-3 impSpan">
                {data?.data[0]?.attributes?.Text.toUpperCase()}!!!
              </span>
            </Marquee>
          </div>
        </Link>
      ) : (
        <div
          className={`importantDiv cursor-pointer ${
            !data?.data[0]?.attributes?.switch && "d-none"
          }`}
        >
          <Marquee className="imp">
            <span className="mx-3 impSpan">
              {data?.data[0]?.attributes?.Text.toUpperCase()}!!!
            </span>
          </Marquee>
        </div>
      )} */}
    </>
  );
};

export default ImportantAnnouncment;
