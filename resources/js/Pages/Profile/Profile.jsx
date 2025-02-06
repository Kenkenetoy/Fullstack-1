import BreadCrumbs from '@/Components/BreadCrumbs.jsx';
import ProfilePicture from '@/Components/ProfilePicture.jsx';
import { useState } from 'react';
import ProfilePictureUpload from './Partials/ProfilePictureUpload';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';

const RoleDepartment = ({ department, role }) =>
    department && (
        <div className="flex items-baseline gap-2">
            <p className="text-lg font-medium">{role}</p> -{' '}
            <p className="text-lg">{department}</p>
        </div>
    );

const Profile = ({ user, authUserId }) => {
    const { first_name, middle_name, last_name, phone_number, id } = user;
    const [activeTab, setActiveTab] = useState('about');
    const isCurrentUser = authUserId === id;

    const showModal = (modalId) => document.getElementById(modalId).showModal();

    return (
        <>
            <div className="hidden lg:block">
                <BreadCrumbs />
            </div>
            <div className="mx-auto space-y-4 lg:max-w-5xl">
                <div className="flex items-center m-auto overflow-hidden h-60 bg-primary-content lg:rounded-b-lg" />
                <div className="flex flex-col items-center gap-4 lg:flex-row">
                    <div className="w-48 h-48 p-2 -mt-12 rounded-full avatar bg-base-100">
                        <div
                            className="w-full h-full overflow-hidden rounded-full cursor-pointer"
                            role="button"
                            tabIndex={0}
                            onClick={() => showModal('my_modal_profilepic')}
                        >
                            <ProfilePicture
                                user={user}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col w-full p-12 space-y-4 lg:p-4">
                        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                            <div className="flex-col items-baseline">
                                <h2 className="text-2xl font-bold">{`${first_name} ${middle_name} ${last_name}`}</h2>
                                {['Student', 'Instructor', 'Staff'].map(
                                    (role) => (
                                        <RoleDepartment
                                            key={role}
                                            department={
                                                user[role.toLowerCase()]
                                                    ?.department?.name
                                            }
                                            role={role}
                                        />
                                    ),
                                )}
                            </div>
                            {isCurrentUser && (
                                <button
                                    className="btn btn-primary"
                                    onClick={() => showModal('my_modal_2')}
                                >
                                    Edit Profile
                                </button>
                            )}
                        </div>
                        <p>{phone_number}</p>
                    </div>
                </div>
                <div className="divider" />
                <div role="tablist" className="inline-flex tabs tabs-bordered">
                    {['posts', 'about'].map((tab) => (
                        <button
                            key={tab}
                            role="tab"
                            className={`tab ${activeTab === tab ? 'tab-active' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                {/* TAB CONTENT */}
                <div className="p-4">
                    {activeTab === 'posts'
                        ? 'Posts content goes here...'
                        : 'About content goes here...'}
                </div>
            </div>

            {/* MODALS */}
            <dialog id="my_modal_2" className="modal">
                <div className="flex flex-col items-center max-w-lg modal-box">
                    <ProfilePictureUpload user={user} />
                    <div className="divider" />
                    <UpdatePasswordForm />
                    <button className="absolute btn btn-circle btn-ghost btn-sm right-2 top-2">
                        ✕
                    </button>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            <dialog id="my_modal_profilepic" className="bg-transparent modal">
                <div className="flex-col items-start w-full p-0 bg-transparent rounded-none modal-box">
                    <button className="btn btn-circle btn-ghost btn-sm right-2 top-2 text-base-100">
                        ✕
                    </button>
                    <ProfilePicture user={user} />
                </div>
                <form method="dialog" className="p modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
};

export default Profile;
