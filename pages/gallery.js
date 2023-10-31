import React, { Fragment, useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import GalleryVideo from '../components/galleryVideo';
import Head from 'next/head';
// import Seo from './Seo';

const isProduction = process.env.NODE_ENV === 'production';

const siteUrl = isProduction
    ? process.env.REACT_APP_MAIN_SSRVM_SITE_URL
    : process.env.REACT_APP_LOCAL_SSRVM_SITE_URL;

export const getStaticProps = async () => {
    const res = await fetch(`${siteUrl}/api/seos?pagination[start]=0&pagination[limit]=50?pagination[start]=0&pagination[limit]=50`)

    const data = await res.json()

    return {
        props: {
            seodata: data
        }
    }
}

const Gallery = ({ seodata }) => {
    const [selectedOption, setSelectedOption] = useState('Photos');
    const [selectedYear, setSelectedYear] = useState('All');
    const [folderName, setFolderName] = useState('');
    const [folders, setFolders] = useState([]);
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [images, setImages] = useState([]);
    const [subfolders, setSubfolders] = useState([]);
    const [selectedSubfolder, setSelectedSubfolder] = useState(null);
    const [folderSubfolders, setFolderSubfolders] = useState({});
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const [firstImageURLs, setFirstImageURLs] = useState([]);
    const [subfolderFirstImageURLs, setSubfolderFirstImageURLs] = useState({});
    const [seoData, setSeoData] = useState({
        title: '',
        metaTitle: '',
        metaDescription: '',
    });

    const [apiConfig, setApiConfig] = useState({
        API_KEY: '',
        ROOT_FOLDER_ID: '',
    });

    useEffect(() => {
        // Fetch SEO data from your API
        // fetch(`${siteUrl}/api/seos?pagination[start]=0&pagination[limit]=50?pagination[start]=0&pagination[limit]=50`) // Replace with the actual API endpoint
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log('API response data:', data); // Log the API response data
        //         if (data && data.data && data.data.length > 0) {
        //             const seoAttributes = data.data[35].attributes;
        //             setSeoData({
        //                 title: seoAttributes.title || '',
        //                 metaTitle: seoAttributes.metaTitle || '',
        //                 metaDescription: seoAttributes.metaDescription || '',
        //             });
        //         }
        //     })
        //     .catch((error) => {
        //         console.error('Error fetching SEO data:', error);
        //     });
        if (seodata && seodata?.data && seodata?.data?.length > 0) {
            const seoAttributes = seodata.data[35].attributes;
            setSeoData({
                title: seoAttributes.title || '',
                metaTitle: seoAttributes.metaTitle || '',
                metaDescription: seoAttributes.metaDescription || '',
            })
        }
    }, []);


    useEffect(() => {
        // Fetch API_KEY and ROOT_FOLDER_ID from your API endpoint
        fetchApiConfigFromApi();
    }, []);

    useEffect(() => {
        fetchFolderName();
        fetchFolders(apiConfig.ROOT_FOLDER_ID);
    }, [apiConfig]);

    useEffect(() => {
        fetchFolderName();
        fetchSubfolders(apiConfig.ROOT_FOLDER_ID);
    }, [apiConfig]);

    useEffect(() => {
        if (selectedFolder) {
            fetchImagesInFolder(selectedFolder.id);
            fetchSubfolders(selectedFolder.id);
        }
    }, [selectedFolder]);

    useEffect(() => {
        if (selectedSubfolder) {
            fetchImagesInFolder(selectedSubfolder.id);
        }
    }, [selectedSubfolder]);

    useEffect(() => {
        // Use Promise.all to fetch first image URLs for all subfolders
        const fetchFirstImageURLs = async () => {
            const urls = await Promise.all(
                subfolders.map((subfolder) => getThumbnailImage(subfolder.id))
            );
            setFirstImageURLs(urls);
        };

        // Fetch first image URLs when subfolders change
        fetchFirstImageURLs();
    }, [subfolders]);

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleSubfolderTabSelect = (subfolderId) => {
        const subfolder = subfolders.find((subfolder) => subfolder.id === subfolderId);
        setSelectedSubfolder(subfolder);
        openLightbox(0); // Open lightbox when selecting a subfolder
    };

    const handleYearChange = (event) => {
        const selectedYear = event.target.value;
        setSelectedYear(selectedYear);
    };


    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const fetchFolders = (parentId) => {
        fetch(`https://www.googleapis.com/drive/v3/files?q='${parentId}' in parents&key=${apiConfig.API_KEY}`)
            .then((response) => response.json())
            .then((data) => {
                const allFiles = data.files;
                const folderFiles = allFiles.filter(file => file.mimeType === 'application/vnd.google-apps.folder');
                setFolders(folderFiles);
            })
            .catch((error) => {
                console.error('Error fetching folders:', error);
            });
    };

    const fetchImagesInFolder = (folderId) => {
        fetch(`https://www.googleapis.com/drive/v3/files?q='${folderId}' in parents&key=${apiConfig.API_KEY}`)
            .then((response) => response.json())
            .then((data) => {
                const imageFiles = data.files.filter(file => file.mimeType.startsWith('image/'));
                setImages(imageFiles);
            })
            .catch((error) => {
                console.error('Error fetching images in folder:', error);
            });
    };

    const handleFolderTabSelect = (folderId) => {
        const folder = folders.find((folder) => folder.id === folderId);
        setSelectedFolder(folder);
        setSelectedSubfolder(null); // Reset selected subfolder when a new folder is selected
    };

    const fetchFolderName = () => {
        fetch(`https://www.googleapis.com/drive/v3/files/${apiConfig.ROOT_FOLDER_ID}?key=${apiConfig.API_KEY}`)
            .then((response) => response.json())
            .then((data) => {
                const folder = data;
                setFolderName(folder.name);
            })
            .catch((error) => {
                console.error('Error fetching folder name:', error);
            });
    };

    const fetchSubfolders = () => {
        fetch(`https://www.googleapis.com/drive/v3/files?q='${apiConfig.ROOT_FOLDER_ID}' in parents&key=${apiConfig.API_KEY}`)
            .then((response) => response.json())
            .then((data) => {
                // Filter folder files
                const folderFiles = data.files.filter(file => file.mimeType === 'application/vnd.google-apps.folder');

                // Fetch and store subfolders by folder ID
                const folderSubfoldersMap = {};

                const folderSubfolderPromises = folderFiles.map((folderFile) => {
                    return fetch(`https://www.googleapis.com/drive/v3/files?q='${folderFile.id}' in parents&key=${apiConfig.API_KEY}`)
                        .then((response) => response.json())
                        .then((subfolderData) => {
                            folderSubfoldersMap[folderFile.id] = subfolderData.files || [];
                        });
                });

                // Use Promise.all to fetch subfolders for all folders in parallel
                return Promise.all(folderSubfolderPromises)
                    .then(() => {
                        // Merge all subfolders into a single array for the "All" tab
                        const allSubfolders = Object.values(folderSubfoldersMap).reduce((accumulator, subfolders) => {
                            return [...accumulator, ...subfolders];
                        }, []);

                        // Set the state for both "All" subfolders and individual folder subfolders
                        setSubfolders(allSubfolders);
                        setFolderSubfolders(folderSubfoldersMap);
                    });
            })
            .catch((error) => {
                console.error('Error fetching subfolders:', error);
            });
    };

    const openLightbox = (startIndex) => {
        setLightboxIndex(startIndex);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    const getThumbnailImage = async (subfolderId) => {
        try {
            // Fetch the images within the subfolder
            const response = await fetch(
                `https://www.googleapis.com/drive/v3/files?q='${subfolderId}' in parents&key=${apiConfig.API_KEY}`
            );

            if (!response.ok) {
                throw new Error("Failed to fetch images in subfolder");
            }

            const data = await response.json();
            console.log("data", data)

            // Filter for image files within the subfolder
            const imagesInSubfolder = data.files.filter(
                (file) => file.mimeType.startsWith("image/")
            );

            if (imagesInSubfolder.length > 0) {
                const firstImageURL = `https://drive.google.com/uc?id=${imagesInSubfolder[0].id}`;
                console.log("First Image URL:", firstImageURL); // Log the constructed URL
                return firstImageURL;
            } else {
                console.log("No images found in subfolder");
                // If there are no images in the subfolder, return a placeholder image URL.
                return "assets/img/banner/5a-admissions.jpg";
            }
        } catch (error) {
            console.error("Error fetching images in subfolder:", error);
            return "assets/img/banner/5a-admissions.jpg"; // Return a placeholder image in case of an error
        }
    };

    const fetchApiConfigFromApi = () => {
        // Fetch API_KEY and ROOT_FOLDER_ID from your API endpoint
        fetch(`${siteUrl}/api/gallery-apis`)
            .then((response) => response.json())
            .then((data) => {
                if (data && data.data && data.data.length > 0) {
                    const { API_KEY, ROOT_FOLDER_ID } = data.data[0].attributes;
                    setApiConfig({ API_KEY, ROOT_FOLDER_ID });
                } else {
                    console.error('No data found in the API response.');
                }
            })
            .catch((error) => {
                console.error('Error fetching API config from API:', error);
            });
    };
    // Modify the useEffect for fetching first image URLs
    useEffect(() => {
        const fetchFirstImageURLs = async () => {
            const urls = {};
            for (const subfolder of subfolders) {
                const firstImageURL = await getThumbnailImage(subfolder.id);
                urls[subfolder.id] = firstImageURL;
            }
            setSubfolderFirstImageURLs(urls);
        };

        // Fetch first image URLs when subfolders change
        fetchFirstImageURLs();
    }, [subfolders]);


    return (
        <>
            <Fragment>
                <Head>
                    <title>{seoData.title}</title>
                    {seoData.metaTitle && <meta name="title" content={seoData.metaTitle} />}
                    {seoData.metaTitle && <meta name="description" content={seoData.metaDescription} />}
                </Head>
                <NavBar />

                {/* {seoData && (
                    <Seo
                        title={seoData.title}
                        metaTitle={seoData.metaTitle}
                        metaDescription={seoData.metaDescription}
                    />
                )} */}

                <div className='top-section1-new'>
                    <div className="container">
                        <h1 className="principal-mess">Gallery</h1>
                    </div>
                </div>

                <div className='service-area pd-bottom-90 pb-lg-0'>
                    <div className='container'>
                        <div className='row'>
                            <div className='gallery-dropdown'>
                                <div>
                                    {/* Dropdown for selecting Photos or Videos */}
                                    <select value={selectedOption} onChange={handleOptionChange} className="drop">
                                        <option value="Photos">Photos</option>
                                        <option value="Videos">Videos</option>
                                    </select>
                                </div>

                                <div>
                                    {/* Conditionally render the year dropdown based on selected option */}
                                    {selectedOption === 'Photos' && (
                                        <div>
                                            <select value={selectedYear} onChange={handleYearChange} className="drop">
                                                <option value="All">All</option>
                                                <option value="2021">2021</option>
                                                <option value="2020">2020</option>
                                                <option value="2019">2019</option>
                                                <option value="2018">2018</option>
                                                <option value="2017">2017</option>
                                            </select>
                                        </div>
                                    )}
                                    {selectedOption === 'Videos' && (
                                        <div>
                                            <select value={selectedYear} onChange={handleYearChange} className="drop">
                                                <option value="All">All</option>
                                                <option value="year 2023">2023</option>
                                                <option value="year 2022">2022</option>
                                                <option value="year 2021">2021</option>
                                                <option value="year 2020">2020</option>
                                                {/* Add more options as needed */}
                                            </select>
                                        </div>
                                    )}

                                </div>
                            </div>
                        </div>
                        {selectedOption === 'Videos' ? (
                            <GalleryVideo selectedYear={selectedYear} />
                        ) : (

                            <Tabs defaultActiveKey="All" id="uncontrolled-tab-example" className="mb-3" onSelect={handleFolderTabSelect}>
                                <Tab eventKey="All" title="All">
                                    <div className="row">
                                        {subfolders
                                            .filter((subfolder) => {
                                                // Extract the year from subfolder name
                                                const subfolderYear = parseInt(subfolder.name.split('-')[0], 10);

                                                // Check if the subfolder matches the selected year or "All"
                                                return selectedYear === 'All' || subfolderYear === parseInt(selectedYear, 10);
                                            })
                                            .sort((a, b) => {
                                                // Extract the years from subfolder names
                                                const yearA = parseInt(a.name.split('-')[0], 10);
                                                const yearB = parseInt(b.name.split('-')[0], 10);

                                                // Sort by year in descending order
                                                return yearB - yearA;
                                            })
                                            .map((subfolder) => {
                                                return (
                                                    <div className='col-lg-4' key={subfolder.id}>
                                                        <div className="card wrap-news">
                                                            <div className="card-body">
                                                                <a
                                                                    href="#"
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        handleSubfolderTabSelect(subfolder.id); // Pass the selected subfolder ID
                                                                    }}
                                                                >
                                                                    <img
                                                                        className="card-img-top"
                                                                        src={subfolderFirstImageURLs[subfolder.id] || 'default-thumbnail-url.jpg'} // Provide a default thumbnail URL
                                                                        alt="Card image cap"
                                                                    />
                                                                    <h6 className="galleryTitle">{subfolder.name}</h6>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}

                                    </div>
                                </Tab>


                                {folders.map((folder) => (
                                    <Tab eventKey={folder.id} title={folder.name} key={folder.id}>
                                        <div className="row">
                                            {folderSubfolders[folder.id]?.map((subfolder) => {
                                                // Check if the subfolder matches the selected year or "All"
                                                const subfolderYear = parseInt(subfolder.name.split('-')[0], 10);
                                                if (selectedYear === 'All' || subfolderYear === parseInt(selectedYear, 10)) {
                                                    const subfolderThumbnailURL = subfolderFirstImageURLs[subfolder.id] || 'default-thumbnail-url.jpg'; // Provide a default thumbnail URL
                                                    return (
                                                        <div className='col-lg-4' key={subfolder.id}>
                                                            <div className="card wrap-news">
                                                                <div className="card-body">
                                                                    <a
                                                                        href="#"
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            handleSubfolderTabSelect(subfolder.id);
                                                                        }}
                                                                    >
                                                                        <img
                                                                            className="card-img-top"
                                                                            src={subfolderThumbnailURL}
                                                                            alt="Card image cap"
                                                                        />
                                                                        <h4 className="card-text-news">{subfolder.name}</h4>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                                return null; // Filtered out subfolders won't be rendered
                                            })}
                                        </div>
                                    </Tab>
                                ))}

                            </Tabs>
                        )}

                    </div>
                </div>
                <Footer />
            </Fragment>
            {lightboxOpen && (
                <Lightbox
                    mainSrc={`https://drive.google.com/uc?id=${images[lightboxIndex]?.id}`}
                    nextSrc={`https://drive.google.com/uc?id=${images[(lightboxIndex + 1) % images.length]?.id}`}
                    prevSrc={`https://drive.google.com/uc?id=${images[(lightboxIndex + images.length - 1) % images.length]?.id}`}
                    onCloseRequest={closeLightbox}
                    onMovePrevRequest={() => setLightboxIndex((lightboxIndex + images.length - 1) % images.length)}
                    onMoveNextRequest={() => setLightboxIndex((lightboxIndex + 1) % images.length)}
                />
            )}
        </>
    );
}

export default Gallery;
