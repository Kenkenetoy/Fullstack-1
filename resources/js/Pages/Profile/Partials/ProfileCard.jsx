import ProfilePicture from '@/Components/ProfilePicture.jsx';
// import UserEmail from '@/Components/UserEmail.jsx';
import UserName from '@/Components/UserName.jsx';

export default function ProfileCard({ user, children }) {
    if (!user) {
        return <div>Loading...</div>; // or any other fallback UI
    }

    return (
        <>
            {/* Profile picture */}
            <div className="flex justify-center">
                <div className="avatar">
                    <div className="w-32 rounded">
                        <ProfilePicture user={user} />
                    </div>
                </div>
            </div>

            <div className="space-y-1 text-center">
                <h2 className="text-2xl font-semibold">
                    <UserName userId={user.id} />
                </h2>
                {/* <UserEmail user={user} className="text-sm text-gray-600" />{' '} */}
            </div>
            {/*
            <div className="text-center">
                <UserBirthday user={user} className="text-sm text-gray-600" />{' '}
            </div>

            <div className="text-center">
                <UserPhoneNumber
                    user={user}
                    className="text-sm text-gray-600"
                />{' '}
            </div>

            <div className="text-center">
                <UserAddress user={user} className="text-sm text-gray-600" />{' '}
            </div> */}

            <main className="text-gray-700">{children}</main>
        </>
    );
}
