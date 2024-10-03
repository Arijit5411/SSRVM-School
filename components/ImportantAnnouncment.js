import Link from "next/link";
import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

const ImportantAnnouncment = ({ siteUrl }) => {
  const [data, setData] = useState(null);

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

  const announcement = data?.data[0]?.attributes;
  const isEnabled = announcement?.switch;
  const link = announcement?.Link;
  const text = announcement?.Text?.toUpperCase();

  return (
    <>
      {data && isEnabled ? (
        <Link href={link || "#"} className="d-block w-100" target="_blank">
          <div className="importantDiv cursor-pointer">
            <Marquee className="imp">
              <span className="mx-3 impSpan">{text}!!!</span>
            </Marquee>
          </div>
        </Link>
      ) : (
        isEnabled && (
          <div className="importantDiv cursor-pointer">
            <Marquee className="imp">
              <span className="mx-3 impSpan">{text}!!!</span>
            </Marquee>
          </div>
        )
      )}
    </>
  );
};

export default ImportantAnnouncment;
