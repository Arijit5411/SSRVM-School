import React, { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Video from '../components/Video';

const GalleryVideo = (props) => {
    const selectedYear = props.selectedYear
    const [videos, setVideos] = useState([]);
    const [tabs, setTabs] = useState([]);
    const [activeTab, setActiveTab] = useState('All');

    const isProduction = process.env.NODE_ENV === "production";

    const siteUrl = isProduction
        ? process.env.REACT_APP_MAIN_SSRVM_SITE_URL
        : process.env.REACT_APP_LOCAL_SSRVM_SITE_URL;

    useEffect(() => {
        // Fetch data from the API
        fetch(`${siteUrl}/api/gallery-videos?populate=*`)
            .then((response) => response.json())
            .then((data) => {
                // Extract tabs and videos from the API response
                const tabsData = data.data;
                const videosData = tabsData.flatMap((tab) =>
                    tab.attributes.video_link.map((video) => ({
                        id: video.id,
                        title: video.title,
                        tab: tab.attributes.tab,
                        link: video.link,
                        year: tab.attributes.year,
                    }))
                );

                let filteredData = videosData;

                // Check if "All" is selected, if not, filter by the selected year
                if (selectedYear !== 'All') {
                    filteredData = videosData.filter(item => item.year === selectedYear);
                }

                setTabs(tabsData);
                setVideos(filteredData);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [selectedYear]);



    // Define a function to filter videos based on the active tab
    const filteredVideos = activeTab === 'All' ? videos : videos.filter((video) => video.tab === activeTab);

    // Define a function to handle tab selection
    const handleTabSelect = (selectedTab) => {
        setActiveTab(selectedTab);
    };

    return (
        <>
            {/* Render the tabs based on the API response */}
            <Tabs defaultActiveKey="All" id="uncontrolled-tab-example" className="mb-3" onSelect={handleTabSelect}>
                <Tab eventKey="All" title="All">
                    {/* Display videos for the 'All' tab */}
                    <div className="row">
                        {filteredVideos.map((video) => (
                            <div className="col-lg-4" key={video.id}>
                                <Video videoUrl={video.link} />
                                <h5>{video.title}</h5>
                            </div>
                        ))}
                    </div>
                </Tab>

                {tabs.map((tab) => (
                    <Tab eventKey={tab.attributes.tab} title={tab.attributes.tab} key={tab.id}>
                        {/* Display videos for other tabs */}
                        <div className="row">
                            {filteredVideos.map((video) => (
                                <div className="col-lg-4" key={video.id}>
                                    {video.tab === tab.attributes.tab && (
                                        <>
                                            <Video videoUrl={video.link} />
                                            <h5>{video.title}</h5>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </Tab>
                ))}
            </Tabs>
        </>
    );
};

export default GalleryVideo;
