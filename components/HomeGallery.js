import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Slider from "react-slick";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import Link from "next/link";
import Image from "next/image";

const HomeGallery = ({ siteUrl }) => {
  const [subfolders, setSubfolders] = useState([]);
  const [selectedSubfolder, setSelectedSubfolder] = useState(null);
  const [albumImages, setAlbumImages] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [firstImageURLs, setFirstImageURLs] = useState([]);
  const [apiConfig, setApiConfig] = useState({
    API_KEY: "",
    ROOT_FOLDER_ID: "",
  });

  const handleSubfolderClick = (subfolder, index) => {
    setSelectedSubfolder(subfolder);
    fetchImagesInAlbum(subfolder.id);
    setLightboxOpen(true);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setSelectedSubfolder(null); // Reset selected subfolder
    setAlbumImages([]); // Reset album images
    setLightboxOpen(false);
  };

  function SampleNextArrow(props) {
    const { className, onClick } = props;
    return <FaArrowRight className={className} onClick={onClick} />;
  }
  function SamplePrevArrow(props) {
    const { className, onClick } = props;
    return <FaArrowLeft className={className} onClick={onClick} />;
  }

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          arrows: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
        },
      },
    ],
  };

  useEffect(() => {
    // Fetch API_KEY and ROOT_FOLDER_ID from your API endpoint
    fetchApiConfigFromApi();
  }, []);

  useEffect(() => {
    // Fetch subfolders when the component mounts
    fetchSubfolders(apiConfig.ROOT_FOLDER_ID);
  }, [apiConfig]);

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

  const fetchImagesInAlbum = (albumId) => {
    fetch(
      `https://www.googleapis.com/drive/v3/files?q='${albumId}' in parents&key=${apiConfig.API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        const imageFiles = data.files.filter((file) =>
          file.mimeType.startsWith("image/")
        );
        setAlbumImages(imageFiles);
      })
      .catch((error) => {
        console.error("Error fetching images in album:", error);
      });
  };

  const fetchSubfolders = (parentId) => {
    fetch(
      `https://www.googleapis.com/drive/v3/files?q='${parentId}' in parents&key=${apiConfig.API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        const folderPromises = data?.files?.map((file) => {
          if (file.mimeType === "application/vnd.google-apps.folder") {
            return fetch(
              `https://www.googleapis.com/drive/v3/files?q='${file.id}' in parents&key=${apiConfig.API_KEY}`
            ).then((response) => response.json());
          }
          return null;
        });

        // Use Promise.all to fetch subfolders from all folders in parallel
        return Promise.all(folderPromises);
      })
      .then((subfolderData) => {
        // Merge subfolders from all folders into a single array
        const mergedSubfolders = subfolderData.reduce(
          (accumulator, subfolder) => {
            if (subfolder && subfolder.files) {
              return [...accumulator, ...subfolder.files];
            }
            return accumulator;
          },
          []
        );

        // Sort subfolders in descending order by name
        const sortedSubfolders = [...mergedSubfolders].sort((a, b) => {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();
          if (nameA > nameB) return -1;
          if (nameA < nameB) return 1;
          return 0;
        });

        // Set the state with the sorted subfolders
        setSubfolders(sortedSubfolders);
      })
      .catch((error) => {
        console.error("Error fetching subfolders:", error);
      });
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
      // console.log("data", data);

      // Filter for image files within the subfolder
      const imagesInSubfolder = data.files.filter((file) =>
        file.mimeType.startsWith("image/")
      );

      if (imagesInSubfolder.length > 0) {
        const firstImageURL = `https://drive.google.com/thumbnail?id=${imagesInSubfolder[0].id}&sz=w1000`;
        // console.log("First Image URL:", firstImageURL); // Log the constructed URL
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
          console.error("No data found in the API response.");
        }
      })
      .catch((error) => {
        console.error("Error fetching API config from API:", error);
      });
  };

  return (
    <>
      <div className="backgroungColor">
        <div className="container">
          <div className="row">
            <div className="d-flex justify-content-between items-center ">
              <div>
                <h2 className="title pd-bottom-20">Gallery</h2>
              </div>
              <div>
                <div className="fw-bold">
                  <Link className="title " href="/gallery">
                    More Gallery
                  </Link>
                </div>
              </div>
            </div>
            <div className="row">
              {subfolders.length > 0 && (
                <Slider {...settings}>
                  {subfolders.map((subfolder, index) => (
                    <div className="" key={subfolder.id}>
                      <div
                        className="card boxMargin"
                        onClick={() => handleSubfolderClick(subfolder, index)}
                      >
                        <Image width={402} height={220}
                          className="card-img-top"
                          src={
                            firstImageURLs[index] ||
                            "/assets/img/banner/5a-admissions.jpg"
                          }
                          alt="Card image cap"
                        />
                        <div className="card-body">
                          <h6>{subfolder.name}</h6>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              )}
            </div>
          </div>
        </div>
        {albumImages && albumImages.length > 0 && (
          <Lightbox
            mainSrc={`https://drive.google.com/thumbnail?id=${albumImages[lightboxIndex]?.id}&sz=w1000`}
            nextSrc={`https://drive.google.com/thumbnail?id=${albumImages[(lightboxIndex + 1) % albumImages.length]?.id
              }&sz=w1000`}
            prevSrc={`https://drive.google.com/thumbnail?id=${albumImages[
              (lightboxIndex + albumImages.length - 1) % albumImages.length
            ]?.id
              }&sz=w1000`}
            onCloseRequest={closeLightbox}
            onMovePrevRequest={() =>
              setLightboxIndex(
                (lightboxIndex + albumImages.length - 1) % albumImages.length
              )
            }
            onMoveNextRequest={() =>
              setLightboxIndex((lightboxIndex + 1) % albumImages.length)
            }
          />
        )}
      </div>
    </>
  );
};

export default HomeGallery;
