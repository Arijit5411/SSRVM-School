import React, { useState } from "react";
import Modal from "react-modal";

const AlbumDisplay = () => {
    // Define an array of image URLs from Google Drive.
    const albums = [
        {
            name: "Album 1",
            images: [
                "https://drive.google.com/uc?export=download&id=1MFDNSCgfH-cAJl_MPY7SBFwzJorbzwc8",
                "https://drive.google.com/uc?export=download&id=1MFDNSCgfH-cAJl_MPY7SBFwzJorbzwc8",
            ],
        },
        {
            name: "Album 2",
            images: [
                "https://drive.google.com/uc?export=download&id=1MFDNSCgfH-cAJl_MPY7SBFwzJorbzwc8",
                "https://drive.google.com/uc?export=download&id=1MFDNSCgfH-cAJl_MPY7SBFwzJorbzwc8",
            ],
        },
    ];

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentAlbum, setCurrentAlbum] = useState(null);

    const openModal = (album) => {
        setCurrentAlbum(album);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setCurrentAlbum(null);
        setModalIsOpen(false);
    };

    return (
        <div className="album">
            {albums.map((album, index) => (
                <div key={index} className="album-item">
                    <h2 onClick={() => openModal(album)}>{album.name}</h2>
                </div>
            ))}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Album Modal"
            >
                {currentAlbum && (
                    <>
                        <h2>{currentAlbum.name}</h2>
                        <button onClick={closeModal}>Close</button>
                        <div className="album-images">
                            {currentAlbum.images.map((imageUrl, index) => (
                                <img
                                    key={index}
                                    src={imageUrl}
                                    alt={`Album ${index + 1}`}
                                    className="album-image"
                                />
                            ))}
                        </div>
                    </>
                )}
            </Modal>
        </div>
    );
};

export default AlbumDisplay;
