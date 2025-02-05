import ProfilePicture from '@/Components/ProfilePicture.jsx'; // Import the simplified component
import axios from 'axios';
import { useState } from 'react';

const ProfilePictureUpload = ({ user }) => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Track loading state

    const handleFileChange = ({ target: { files } }) => {
        const file = files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setError('Please upload a valid image file.');
            } else if (file.size > 2 * 1024 * 1024) {
                setError('File size exceeds 2MB.');
            } else {
                setImage(file);
                setPreview(URL.createObjectURL(file));
                setError('');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image) return setError('Please select a file before submitting.');

        setLoading(true);
        const formData = new FormData();
        formData.append('profile_picture', image);

        try {
            const response = await axios.post(
                '/user/profile-picture',
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                },
            );

            if (response.status === 200) {
                window.location.reload();
            } else {
                setError('Failed to upload profile picture');
            }
        } catch {
            setError('Failed to upload profile picture');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="w-full space-y-8">
            <header className="space-y-1">
                <h2 className="text-lg font-medium">Update Profile Picture</h2>
                <p className="text-sm text-gray-600">
                    Upload a new image to update your profile picture.
                </p>
            </header>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex w-full justify-center">
                    <div className="avatar w-60 rounded-full shadow-md">
                        {preview ? (
                            <img
                                src={preview}
                                alt="Preview"
                                className="h-64 w-64 object-cover shadow-lg"
                                onError={() => setPreview(null)} // Fallback for broken previews
                            />
                        ) : (
                            <ProfilePicture user={user} />
                        )}
                    </div>
                </div>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="file-input file-input-bordered file-input-ghost w-full"
                />
                {error && (
                    <div role="alert" className="alert alert-error">
                        <span>{error}</span>
                    </div>
                )}
                <button
                    type="submit"
                    className="btn btn-primary w-full"
                    disabled={loading}
                >
                    {loading ? 'Uploading...' : 'Update'}
                </button>
            </form>
        </section>
    );
};

export default ProfilePictureUpload;
