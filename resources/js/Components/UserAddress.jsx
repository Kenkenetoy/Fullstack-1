import axios from 'axios';
import { useEffect, useState } from 'react';

const UserAddress = () => {
    const [phoneNumber, setAddress] = useState(null); // Capitalize variable name
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const response = await axios.get('/user/address'); // Endpoint to fetch phone number
                setAddress(response.data.address); // Corrected the key here
            } catch (err) {
                setError('Failed to load Phone Number');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAddress();
    }, []);

    if (loading) return <p>Loading phone number...</p>;
    if (error) return <p>{error}</p>;
    if (!phoneNumber) return <p>No phone number available</p>; // Corrected variable name here
    return <p>{phoneNumber}</p>; // Corrected variable name here
};

export default UserAddress;
