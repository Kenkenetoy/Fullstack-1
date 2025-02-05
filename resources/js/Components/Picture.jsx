import axios from 'axios';
import { useEffect, useState } from 'react';

const Picture = ({ user, type = 'background', style, alt }) => {
    const [imageSrc, setImageSrc] = useState('/placeholder-background.jpg');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.slug) return setLoading(false);

        axios
            .get(`/${type}/${user.slug}`)
            .then(({ data }) =>
                setImageSrc(data[`${type}_picture_url`] || imageSrc),
            )
            .catch(() => {})
            .finally(() => setLoading(false));
    }, [user, type]);

    return loading ? (
        <div>Loading...</div>
    ) : (
        <img
            src={imageSrc}
            alt={alt || `${type} picture`}
            className="h-full w-full object-cover"
            style={style}
        />
    );
};

export default Picture;
