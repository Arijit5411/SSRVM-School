import React, { useState, useEffect } from "react";

function OurToppers({siteUrl}) {
    const [selectedClass, setSelectedClass] = useState("XII");
    const [classOptions, setClassOptions] = useState([]);
    const [toppersData, setToppersData] = useState([]);

    const [tdata, setTdata] = useState([])
    const [standard, setStandard] = useState([])
    const [filteredRanks, setFilteredRanks] = useState([])

    useEffect(() => {
        // Fetch the API data for class options and toppers
        fetch(`${siteUrl}/api/topper-results?populate=*`)
            .then(response => response.json())
            .then(data => {
                setClassOptions(data.data);
                setToppersData(data.data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    useEffect(() => {
        // Fetch the API data for class options and toppers
        fetch(`${siteUrl}/api/top-rank?populate[toppers][populate]=*&populate=*`)
            .then(response => response.json())
            .then(data => {
                setTdata(data.data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    useEffect(() => {
        let stdArr = []
        if (tdata?.attributes?.toppers && tdata?.attributes?.toppers.length > 0) {
            tdata?.attributes?.toppers.map(t => stdArr.push(t.standard))
            if (stdArr.length > 0) {
                setStandard([... new Set(stdArr)])
            }
        }
    }, [tdata])


    const handleChange = event => {
        setSelectedClass(event.target.value);
    };
    // ==DROPDOWN SORT (Changed)====
    const renderDropdownOptions = () => {
        // Sort the classOptions array based on your desired order
        // const sortedClassOptions = classOptions.sort((a, b) => {
        //     const order = ['XII', 'XI', 'X', 'IX', 'VIII', 'VII', 'VI'];
        //     return order.indexOf(a.attributes.select_class) - order.indexOf(b.attributes.select_class);
        // });

        return (
            <select className="drop" value={selectedClass} onChange={handleChange}>
                <option value="">Select Class</option>
                {standard.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
                {/* {sortedClassOptions.map(option => (
                    <option key={option.id} value={option.attributes.select_class}>
                        {option.attributes.select_class}
                    </option>
                ))} */}
            </select>
        );
    };
    // DROPDOWN SORT END=======
    // const renderTopperCard = (topperName, topperDescription, topperImage) => (
    //     <div className="col-lg-4">
    //         <div className="wrap-item-member">
    //             <div className="wrap-image">
    //                 <img src={`${siteUrl}${topperImage?.attributes?.url}`} alt={topperName} className="member-img" />
    //             </div>
    //             <div className="wrap-text">
    //                 <h6>{topperName}</h6>
    //                 <p>{topperDescription}</p>
    //             </div>
    //         </div>
    //     </div>


    // );

    // const renderContent = () => {
    //     if (!selectedClass) {
    //         return null;
    //     }

    //     const selectedClassData = classOptions.find(option => option.attributes.select_class === selectedClass);
    //     if (!selectedClassData) {
    //         return null;
    //     }

    //     const { attributes } = selectedClassData;

    //     return (
    //         <div className="row g-4">
    //             {attributes.science_rank_one_name && (
    //                 <div>
    //                     <h6>Science Toppers</h6>
    //                 </div>
    //             )}
    //             {attributes.science_rank_one_name && renderTopperCard(attributes.science_rank_one_name, attributes.science_rank_one_description, attributes.science_rank_one_image?.data)}
    //             {attributes.science_rank_two_name && renderTopperCard(attributes.science_rank_two_name, attributes.science_rank_two_description, attributes.science_rank_two_image?.data)}
    //             {attributes.science_rank_three_name && renderTopperCard(attributes.science_rank_three_name, attributes.science_rank_three_description, attributes.science_rank_three_image?.data)}

    //             {attributes.commerce_rank_one_name && (
    //                 <div>
    //                     <h6>Commerce Toppers</h6>
    //                 </div>
    //             )}
    //             {attributes.commerce_rank_one_name && renderTopperCard(attributes.commerce_rank_one_name, attributes.commerce_rank_one_description, attributes.commerce_rank_one_image?.data)}
    //             {attributes.commerce_rank_two_name && renderTopperCard(attributes.commerce_rank_two_name, attributes.commerce_rank_two_description, attributes.commerce_rank_two_image?.data)}
    //             {attributes.commerce_rank_three_name && renderTopperCard(attributes.commerce_rank_three_name, attributes.commerce_rank_three_description, attributes.commerce_rank_three_image?.data)}

    //             {attributes.arts_rank_one_name && (
    //                 <div>
    //                     <h6>Arts Toppers</h6>
    //                 </div>
    //             )}
    //             {attributes.arts_rank_one_name && renderTopperCard(attributes.arts_rank_one_name, attributes.arts_rank_one_description, attributes.arts_rank_one_image?.data)}
    //             {attributes.arts_rank_two_name && renderTopperCard(attributes.arts_rank_two_name, attributes.arts_rank_two_description, attributes.arts_rank_two_image?.data)}
    //             {attributes.arts_rank_three_name && renderTopperCard(attributes.arts_rank_three_name, attributes.arts_rank_three_description, attributes.arts_rank_three_image?.data)}

    //             {/* Handling case for X and others */}
    //             {!attributes.science_rank_one_name && !attributes.commerce_rank_one_name && !attributes.arts_rank_one_name && (
    //                 <div>
    //                     {/* <h6>Toppers</h6> */}
    //                 </div>
    //             )}
    //             {!attributes.science_rank_one_name && !attributes.commerce_rank_one_name && !attributes.arts_rank_one_name && renderTopperCard(attributes.rank_one_name, attributes.rank_one_description, attributes.rank_one_image?.data)}
    //             {!attributes.science_rank_one_name && !attributes.commerce_rank_one_name && !attributes.arts_rank_one_name && renderTopperCard(attributes.rank_two_name, attributes.rank_two_description, attributes.rank_two_image?.data)}
    //             {!attributes.science_rank_one_name && !attributes.commerce_rank_one_name && !attributes.arts_rank_one_name && renderTopperCard(attributes.rank_three_name, attributes.rank_three_description, attributes.rank_three_image?.data)}
    //         </div>

    //     );
    // };

    //Component To display toppers
    const Rankers = ({ selectedClass }) => {
        let newData = []
        let fields = []
        let hasFields = false
        let data = tdata?.attributes?.toppers
        if (data && data.length > 0) {
            newData = data.filter(d => d.standard === selectedClass)
        }
        if (newData.length > 0) {
            hasFields = newData.every(d => d?.field?.length > 0)
            if (hasFields) {
                let res = newData.map(d => d.field)
                fields = [... new Set(res)]
            }
        }

        return (
            <>
                {
                    selectedClass?.length > 0 && newData?.length > 0 && fields?.length > 0 ? (
                        <div className="mt-4">
                            {
                                fields.map(field => {
                                    return (
                                        <div className="m-2">
                                            <div>
                                                <h5>{field} Toppers</h5>
                                            </div>
                                            <div className="row">
                                                {
                                                    newData.map(d => {
                                                        if (d.field === field) {
                                                            return (
                                                                <div className="col-lg-4 my-3 my-md-0">
                                                                    <div className="wrap-item-member">
                                                                        <div className="wrap-image">
                                                                            <img src={`${siteUrl}${d?.image?.data?.attributes?.url}`} alt={d.name} className="member-img" />
                                                                        </div>
                                                                        <div className="wrap-text">
                                                                            <h6>{d.name}</h6>
                                                                            <p>{d.description}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    })
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ) : selectedClass?.length > 0 && newData?.length > 0 && fields?.length === 0 ? (
                        <>
                            {
                                newData.map(d => {
                                    return (
                                        <div className="col-lg-4 mt-4">
                                            <div className="wrap-item-member">
                                                <div className="wrap-image">
                                                    <img src={`${siteUrl}${d?.image?.data?.attributes?.url}`} alt={d.name} className="member-img" />
                                                </div>
                                                <div className="wrap-text">
                                                    <h6>{d.name}</h6>
                                                    <p>{d.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </>
                    ) : <h2 className="fs-30">Select a Class!</h2>
                }
            </>
        )
    }

    return (
        <>
            {console.log('gg', tdata, standard)}
            <div className="container pd-top-75 mobilehide-result">
                <div className="head">
                    <div>
                        <h4>Our Toppers</h4>
                    </div>
                    <div className="dropdown">
                        <p>Filter class-wise:</p>
                        {renderDropdownOptions()}
                    </div>
                </div>
                {/* {renderContent()} */}
                <Rankers selectedClass={selectedClass} />
            </div>

            <div className="container pd-top-75 desktophide">
                <h4>Our Toppers</h4>
                <div className="head">
                    <div className="dropdown">
                        <p>Filter class-wise:</p>
                        {renderDropdownOptions()}
                    </div>
                </div>
                {/* {renderContent()} */}
                <Rankers selectedClass={selectedClass} />
            </div>
        </>

    );
}

export default OurToppers;
