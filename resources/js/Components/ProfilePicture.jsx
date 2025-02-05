import { useEffect, useState } from 'react';

const ProfilePicture = ({ user, style, alt = 'Profile Picture' }) => {
    const placeholder = 'storage/images/profilepicture/placeholder-profile.jpg';
    const [imageSrc, setImageSrc] = useState(placeholder);

    useEffect(() => {
        if (!user?.slug) return;

        const fetchProfilePicture = async () => {
            try {
                const { data } = await axios.get(
                    `${user.slug}/profile-picture`,
                );
                setImageSrc(data.profile_picture_url || placeholder);
            } catch {
                setImageSrc(placeholder);
            }
        };

        fetchProfilePicture();
    }, [user?.slug]);

    return (
        <img src={imageSrc} alt={alt} className="h-full w-full" style={style} />
    );
};

export default ProfilePicture;
