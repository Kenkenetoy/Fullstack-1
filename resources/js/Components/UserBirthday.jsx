import axios from 'axios';
import { useEffect, useState } from 'react';

const UserBirthday = () => {
    const [birthday, setBirthday] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserBirthday = async () => {
            try {
                const response = await axios.get('/user/birthday'); // Endpoint to fetch birthday

                // Check if birthday data is available
                if (response.data.birthday) {
                    const formattedBirthday = formatDate(
                        response.data.birthday,
                    );
                    setBirthday(formattedBirthday);
                } else {
                    setBirthday(null);
                }
            } catch (err) {
                setError('Failed to load user birthday');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserBirthday();
    }, []);

    // Function to format the date to "Month Day, Year" (e.g., "March 25, 1994")
    const formatDate = (dateString) => {
        const date = new Date(dateString);

        // Format to "Month Day, Year"
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options); // 'en-US' provides full month names
    };

    if (loading) return <p>Loading user birthday...</p>;
    if (error) return <p>{error}</p>;
    if (!birthday) return <p>No user birthday available</p>;

    return <p>{birthday}</p>;
};

export default UserBirthday;
