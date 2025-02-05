import axios from 'axios';
import { useEffect, useState } from 'react';

const UserPhoneNumber = () => {
    const [phoneNumber, setPhoneNumber] = useState(null); // Capitalize variable name
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPhoneNumber = async () => {
            try {
                const response = await axios.get('/user/phone_number'); // Endpoint to fetch phone number
                setPhoneNumber(response.data.phone_number); // Corrected the key here
            } catch (err) {
                setError('Failed to load Phone Number');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPhoneNumber();
    }, []);

    if (loading) return <p>Loading phone number...</p>;
    if (error) return <p>{error}</p>;
    if (!phoneNumber) return <p>No phone number available</p>; // Corrected variable name here
    return <p>{phoneNumber}</p>; // Corrected variable name here
};

export default UserPhoneNumber;
