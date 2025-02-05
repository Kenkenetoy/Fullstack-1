import axios from 'axios';
import { useEffect, useState } from 'react';

const BackgroundPicture = ({ user, style, alt = 'Background Picture' }) => {
    const [currentBackgroundPicture, setCurrentBackgroundPicture] =
        useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user || !user.slug) {
            setLoading(false);
            setError('User data is missing');
            return;
        }

        const fetchBackgroundPicture = async () => {
            try {
                const response = await axios.get(
                    `${user.slug}/background-picture`,
                );
                setCurrentBackgroundPicture(
                    response.data.background_picture_url || null,
                );
            } catch (error) {
                setError('Failed to load background picture');
            } finally {
                setLoading(false);
            }
        };

        fetchBackgroundPicture();
    }, [user]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    // Fallback to placeholder if background picture is null
    const imageSrc = currentBackgroundPicture || '/placeholder-background.jpg';

    return (
        <img
            src={imageSrc}
            alt={alt}
            className="h-full w-full object-cover"
            style={style}
        />
    );
};

export default BackgroundPicture;
