import BreadCrumbs from '@/Components/BreadCrumbs.jsx';
import { usePage } from '@inertiajs/react';
import ProfilePictureUpload from './Partials/ProfilePictureUpload';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';

export default function Edit({ mustVerifyEmail, status, user }) {
    const { auth } = usePage().props; // Get the authenticated user

    return (
        // balhinonon yawa
        <>
            <BreadCrumbs />
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box flex max-w-lg flex-col items-start items-center">
                    <ProfilePictureUpload user={user} />
                    <div className="divider"></div>
                    <UpdatePasswordForm />
                    <form method="dialog">
                        <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
                            ✕
                        </button>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
}
