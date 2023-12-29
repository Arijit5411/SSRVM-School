import React, { useState, useEffect } from "react";
// ... Your other imports and code ...

const DownloadResult = ({siteUrl}) => {
  const [selectedOption2, setSelectedOption2] = useState("XII");
  const [fetchedData, setFetchedData] = useState([]);
  const [dropdownOptions, setDropdownOptions] = useState([]);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${siteUrl}/api/download-results?populate=*`
        );
        const data = await response.json();
        setFetchedData(data.data);

        // Extract unique class options from fetched data
        const uniqueOptions = Array.from(
          new Set(data.data.map((item) => item.attributes.select_class))
        );
        setDropdownOptions(uniqueOptions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedOption2]);

  const handleChange2 = (event) => {
    setSelectedOption2(event.target.value);
  };

  const renderContent2 = () => {
    const filteredData = fetchedData.filter(
      (item) => item.attributes.select_class === selectedOption2
    );

    return filteredData.map((item) => (
      <div className="col-lg-6" key={item.id}>
        <div className="card-wrap">
          <div className="cardcontent2">
            <h6>{item.attributes.title}</h6>
            <p className="Downloadlink">
              <a
                href={`${siteUrl}${item.attributes.pdf?.data?.attributes?.url}`}
                download
              >
                Download
              </a>
            </p>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <>
      <div className="desktophide">
        <h4>Download Results</h4>
        <div className="head">
          <div className="dropdown">
            <p>Download Results for class:</p>
            <select
              className="drop"
              value={selectedOption2}
              onChange={handleChange2}
            >
              {dropdownOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row g-4 mt-0">{renderContent2()}</div>
      </div>
      <div className="mobilehide-result">
        <div className="head flex-md-row flex-column mt-md-0 mt-2">
          <div>
            <h4>Download Results</h4>
          </div>
          <div className="dropdown">
            <p>Download Results for class:</p>
            <select
              className="drop"
              value={selectedOption2}
              onChange={handleChange2}
            >
              {dropdownOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row g-4 mt-0">{renderContent2()}</div>
      </div>
    </>
  );
};

export default DownloadResult;
