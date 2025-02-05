import { useEffect, useState } from 'react';

const ProfilePicture = ({ user, style, alt = 'Profile Picture' }) => {
    const [imageSrc, setImageSrc] = useState('/placeholder-profile.png');

    useEffect(() => {
        if (user?.slug) {
            axios
                .get(`${user.slug}/profile-picture`)
                .then(({ data }) =>
                    setImageSrc(
                        data.profile_picture_url || '/placeholder-profile.png',
                    ),
                )
                .catch(() => setImageSrc('/placeholder-profile.png'));
        }
    }, [user]);

    return (
        <img src={imageSrc} alt={alt} className="h-full w-full" style={style} />
    );
};

export default ProfilePicture;
