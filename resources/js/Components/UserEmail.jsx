import axios from 'axios';
import { useEffect, useState } from 'react';

const UserEmail = () => {
    const [email, setEmail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserEmail = async () => {
            try {
                const response = await axios.get('/user/email');
                setEmail(response.data.email);
            } catch (err) {
                setError('Failed to load user email');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserEmail();
    }, []);

    if (loading) return <p>Loading user email...</p>;
    if (error) return <p>{error}</p>;
    if (!email) return <p>No user email available</p>;

    return <p>{email}</p>;
};

export default UserEmail;
