// useFetchProfilePicture.js
import axios from 'axios';
import { useEffect, useState } from 'react';

const useFetchProfilePicture = () => {
    const [currentProfilePicture, setCurrentProfilePicture] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfilePicture = async () => {
            try {
                const response = await axios.get('/user/profile-picture'); // Adjust the endpoint as needed
                let profilePictureUrl =
                    window.location.origin +
                    '/storage/images/profilepicture/' +
                    response.data.profile_picture_url.split('/storage/')[1];

                setCurrentProfilePicture(profilePictureUrl); // Set the correctly formatted URL
            } catch (err) {
                setError('Failed to load current profile picture');
            }
        };

        fetchProfilePicture();
    }, []);

    return { currentProfilePicture, error }; // Return error directly here
};

export default useFetchProfilePicture;
