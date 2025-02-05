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
    const {
        first_name,
        middle_name,
        last_name,
        student,
        instructor,
        staff,
        phone_number,
        id,
    } = user;
    const [activeTab, setActiveTab] = useState('about');
    const isCurrentUser = authUserId === id;

    const showModal = (modalId) => document.getElementById(modalId).showModal();

    return (
        <>
            <div className="hidden lg:block">
                <BreadCrumbs />
            </div>
            <div className="mx-auto space-y-4 lg:max-w-5xl">
                <div className="m-auto flex h-60 items-center overflow-hidden bg-primary-content lg:rounded-b-lg" />
                <div className="flex flex-col items-center gap-4 lg:flex-row">
                    <div className="avatar -mt-12 h-48 w-48 rounded-full bg-base-100 p-2">
                        <div
                            className="h-full w-full cursor-pointer overflow-hidden rounded-full"
                            role="button"
                            tabIndex={0}
                            onClick={() => showModal('my_modal_profilepic')}
                        >
                            <ProfilePicture
                                user={user}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>
                    <div className="flex w-full flex-col space-y-4 p-12 lg:p-4">
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
                <div role="tablist" className="tabs tabs-bordered inline-flex">
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
                <div className="modal-box flex max-w-lg flex-col items-center">
                    <ProfilePictureUpload user={user} />
                    <div className="divider" />
                    <UpdatePasswordForm />
                    <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
                        ✕
                    </button>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            <dialog id="my_modal_profilepic" className="modal bg-transparent">
                <div className="modal-box w-full flex-col items-start rounded-none bg-transparent p-0">
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
