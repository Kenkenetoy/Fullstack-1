import BackgroundPicture from '@/Components/BackgroundPicture.jsx'; // Import the background picture component
import axios from 'axios';
import { useState } from 'react';

const BackgroundPictureUpload = ({ user }) => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState('');
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
                setError('Invalid file type. Please select an image.');
                return;
            }
            if (file.size > 2 * 1024 * 1024) {
                setError('File size exceeds 2MB.');
                return;
            }
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) {
            setError('Please select a file before submitting.');
            return;
        }

        const formData = new FormData();
        formData.append('background_picture', image);

        try {
            await axios.post('/user/background-picture', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            window.location.reload();
        } catch (err) {
            setError('Failed to upload background picture');
        }
    };

    return (
        <section className="w-full space-y-8">
            <header className="space-y-1">
                <h2 className="text-lg font-medium text-gray-900">
                    Update Background Picture
                </h2>
                <p className="text-sm text-gray-600">
                    Upload a new image to update your background picture.
                </p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex w-full flex-col items-center">
                    <div className="h-60 w-full overflow-hidden rounded-lg shadow-md">
                        {/* Use the BackgroundPicture component */}
                        {preview ? (
                            <img
                                src={preview}
                                alt="Preview"
                                className="h-full w-full object-cover shadow-lg"
                            />
                        ) : (
                            <BackgroundPicture user={user} />
                        )}
                    </div>
                </div>

                <div className="space-y-1">
                    <input
                        type="file"
                        accept="image/*"
                        id="background_picture"
                        onChange={handleFileChange}
                        className="file-input file-input-bordered file-input-ghost w-full"
                    />
                </div>

                {error && (
                    <div role="alert" className="alert alert-error">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 shrink-0 stroke-current"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span>{error}</span>
                    </div>
                )}
                <button type="submit" className="btn btn-primary w-full">
                    Update
                </button>
            </form>
        </section>
    );
};

export default BackgroundPictureUpload;
