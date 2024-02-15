import React, { Fragment, useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import Head from 'next/head';

import { determineStrapiUrl } from "@/utils/strapiUtils";

export const getServerSideProps = async (context) => {
    try {
        const siteUrl = determineStrapiUrl(context);

        const res = await fetch(`${siteUrl}/api/seos?pagination[start]=0&pagination[limit]=50`)

        const data = await res.json()

        return {
            props: {
                seodata: data,
                siteUrl
            }
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


const VirtualTourGallery = ({ seodata, siteUrl }) => {
    const [years, setYears] = useState(['All'])
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
        const fetchFirstImageURLs = async () => {
            const urls = await Promise.all(
                subfolders.map((subfolder) => getThumbnailImage(subfolder.id))
            );
            setFirstImageURLs(urls);
        };

        // Fetch first image URLs when subfolders change
        fetchFirstImageURLs();
    }, [subfolders]);



    const handleSubfolderTabSelect = (subfolderId) => {
        const subfolder = subfolders.find((subfolder) => subfolder.id === subfolderId);
        setSelectedSubfolder(subfolder);
        openLightbox(0);
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

            // Filter for image files within the subfolder
            const imagesInSubfolder = data.files.filter(
                (file) => file.mimeType.startsWith("image/")
            );

            if (imagesInSubfolder.length > 0) {
                const firstImageURL = `https://drive.google.com/thumbnail?id=${imagesInSubfolder[0].id}&sz=w1000`;
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
                    let yrArr = data?.data[0]?.attributes?.year_list.split(",")
                    setYears(yrArr)
                } else {
                    console.error('No data found in the API response.');
                }
            })
            .catch((error) => {
                console.error('Error fetching API config from API:', error);
            });
    };
    useEffect(() => {
        const fetchFirstImageURLs = async () => {
            const urls = {};
            for (const subfolder of subfolders) {
                const firstImageURL = await getThumbnailImage(subfolder.id);
                urls[subfolder.id] = firstImageURL;
            }
            setSubfolderFirstImageURLs(urls);
        };

        fetchFirstImageURLs();
    }, [subfolders]);



    const SingleTabContent = ({ folderId }) => {


        let arr = folderSubfolders[folderId]
        return (
            <>

                {
                    arr?.map((subfolder) => {
                        const subfolderThumbnailURL = subfolderFirstImageURLs[subfolder.id] || 'default-thumbnail-url.jpg';
                        return (
                            <div className='col-md-4'>
                                <div className="card wrap-news ">
                                    <div className="card-body">
                                        <a
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleSubfolderTabSelect(subfolder.id);
                                            }}

                                        >
                                            <img
                                                className="card-img-top test"
                                                src={subfolderThumbnailURL}
                                                alt="Card image cap"
                                            />
                                            <h4 style={{ background: '#EFEBE4' }} className="card-text-news text-center p-3 fw-bold">{subfolder.name}</h4>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }

            </>
        )
    }
    return (
        <>
            <Fragment>
                <Head>
                    <title>{seoData.title}</title>
                    {seoData.metaTitle && <meta name="title" content={seoData.metaTitle} />}
                    {seoData.metaTitle && <meta name="description" content={seoData.metaDescription} />}
                </Head>
                <NavBar siteUrl={siteUrl} />
                <div className='top-section1-new' style={{ background: '#EFEBE4' }}>
                    <div className="container">
                        <h1 className="principal-mess">VirtualTour Gallery</h1>
                    </div>
                </div>
                <div className='service-area pd-bottom-90 pb-lg-0' style={{ background: '#EFEBE4' }} >
                    <div className='container'>
                        <div className="mb-3">
                            {folders.map((folder) => (


                                <div eventKey={folder.id} title={folder.name} key={folder.id}>
                                    {folder.name === 'Infrastructure' &&

                                        <div className='row' >
                                            <SingleTabContent folderId={folder.id} />
                                        </div>
                                    }
                                </div>
                            ))}
                        </div>


                    </div>


                </div>
                <Footer siteUrl={siteUrl} />
            </Fragment>
            {lightboxOpen && (
                <Lightbox
                    mainSrc={`https://drive.google.com/thumbnail?id=${images[lightboxIndex]?.id}&sz=w1000`}
                    nextSrc={`https://drive.google.com/thumbnail?id=${images[(lightboxIndex + 1) % images.length]?.id}&sz=w1000`}
                    prevSrc={`https://drive.google.com/thumbnail?id=${images[(lightboxIndex + images.length - 1) % images.length]?.id}&sz=w1000`}
                    onCloseRequest={closeLightbox}
                    onMovePrevRequest={() => setLightboxIndex((lightboxIndex + images.length - 1) % images.length)}
                    onMoveNextRequest={() => setLightboxIndex((lightboxIndex + 1) % images.length)}
                />
            )}
        </>
    );
}

export default VirtualTourGallery;
