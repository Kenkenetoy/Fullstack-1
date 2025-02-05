import PropTypes from 'prop-types';

const BannedUsers = ({ users }) => {
    const bannedUsers = users.filter((user) => user.status === 'bannned');

    if (!users.length) {
        return <div className="text-center text-gray-500">No Banned users</div>;
    }

    const handleUnban = async (id) => {
        try {
            const response = await axios.patch(`/admin/users/${id}/approve`);
            console.log('User unbanned:', response.data);
            // Update your local state to reflect the changes (you can call a refresh or update logic here)
        } catch (error) {
            console.error('Error unbanning user:', error);
        }
    };

    return (
        <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
                <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2">Name</th>
                    <th className="border border-gray-300 px-4 py-2">Email</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td className="border border-gray-300 px-4 py-2">
                            {user.name}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                            {user.email}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                            {/* Action buttons */}
                            <button
                                onClick={() => handleBan(user.id)}
                                className="mr-2 rounded bg-red-500 px-4 py-2 text-white"
                            >
                                Ban
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

BannedUsers.propTypes = {
    users: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
        }),
    ).isRequired,
};

export default BannedUsers;
