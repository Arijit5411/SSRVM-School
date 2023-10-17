import React, { useEffect, useState } from 'react';
import HomeGallery from '../components/HomeGallery';

const API_KEY = 'AIzaSyBEdRvOzjFZO12jc1ztNIRl4nIOPceVp2M';
const ROOT_FOLDER_ID = '1wvsFsTyCiQ-Kc-oLIzlDuLq1QuliwW8U';


const GoogleDriveIntegration = () => {
    const [folderName, setFolderName] = useState('');
    const [folders, setFolders] = useState([]);
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [images, setImages] = useState([]);

    useEffect(() => {
        fetchFolderName();
        fetchFolders(ROOT_FOLDER_ID);
    }, []);

    useEffect(() => {
        if (selectedFolder) {
            fetchImagesInFolder(selectedFolder.id);
            fetchFolders(selectedFolder.id);
        }
    }, [selectedFolder]);

    const fetchFolderName = () => {
        fetch(`https://www.googleapis.com/drive/v3/files/${ROOT_FOLDER_ID}?key=${API_KEY}`)
            .then((response) => response.json())
            .then((data) => {
                const folder = data;
                setFolderName(folder.name);
            })
            .catch((error) => {
                console.error('Error fetching folder name:', error);
            });
    };

    const fetchFolders = (parentId) => {
        fetch(`https://www.googleapis.com/drive/v3/files?q='${parentId}' in parents&key=${API_KEY}`)
            .then((response) => response.json())
            .then((data) => {
                const allFiles = data.files;
                const folderFiles = allFiles.filter(file => file.mimeType === 'application/vnd.google-apps.folder');
                setFolders((prevFolders) => [...prevFolders, ...folderFiles]);
            })
            .catch((error) => {
                console.error('Error fetching folders:', error);
            });
    };

    const fetchImagesInFolder = (folderId) => {
        fetch(`https://www.googleapis.com/drive/v3/files?q='${folderId}' in parents&key=${API_KEY}`)
            .then((response) => response.json())
            .then((data) => {
                const imageFiles = data.files.filter(file => file.mimeType.startsWith('image/'));
                setImages(imageFiles);
            })
            .catch((error) => {
                console.error('Error fetching images in folder:', error);
            });
    };

    const handleFolderClick = (folder) => {
        setSelectedFolder(folder);
    };

    return (
        <div>
            <HomeGallery />
            <h1>Google Drive Folder</h1>
            <p>Folder Title: {folderName}</p>
            <h2>Folders in the Root Folder:</h2>
            <ul>
                {folders.map((folder) => (
                    <li key={folder.id} onClick={() => handleFolderClick(folder)}>
                        {folder.name}
                    </li>
                ))}
            </ul>
            {selectedFolder && (
                <>
                    <h2>Images in {selectedFolder.name}:</h2>
                    <div>
                        {images.map((image) => (
                            <div key={image.id}>
                                <h3>{image.name}</h3>
                                <img src={`https://drive.google.com/uc?id=${image.id}`} alt={image.name} />
                            </div>
                        ))}
                    </div>
                    <h2>Subfolders in {selectedFolder.name}:</h2>
                    <ul>
                        {folders
                            .filter((folder) => folder.parents && folder.parents.includes(selectedFolder.id))
                            .map((subfolder) => (
                                <li key={subfolder.id} onClick={() => handleFolderClick(subfolder)}>
                                    {subfolder.name}
                                </li>
                            ))}
                    </ul>
                </>
            )}
        </div>
    );
};
export default GoogleDriveIntegration;
