import PropTypes from 'prop-types';

const PendingUsers = ({ users = [] }) => {
    // Filter out approved and rejected users
    const pendingUsers = users.filter((user) => user.status === 'pending');

    if (!pendingUsers.length) {
        return (
            <div className="text-center text-gray-500">No pending users</div>
        );
    }

    // Function to handle user approval
    const handleApprove = async (id) => {
        try {
            const response = await axios.patch(`/admin/users/${id}/approve`);
            console.log('User approved:', response.data);
            // Update your local state to reflect the changes (you can call a refresh or update logic here)
        } catch (error) {
            console.error('Error approving user:', error);
        }
    };

    // For rejecting a user
    const handleReject = async (id) => {
        try {
            const response = await axios.patch(`/admin/users/${id}/reject`);
            console.log('User rejected:', response.data);
            // Update your local state to reflect the changes (you can call a refresh or update logic here)
        } catch (error) {
            console.error('Error rejecting user:', error);
        }
    };

    // Render pending users
    return (
        <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
                <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2">Name</th>
                    <th className="border border-gray-300 px-4 py-2">Email</th>
                    <th className="border border-gray-300 px-4 py-2">
                        Birthday
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                {pendingUsers.map((user) => (
                    <tr key={user.id}>
                        <td className="border border-gray-300 px-4 py-2">
                            {user.name}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                            {user.email}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                            {user.birthday}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                            {/* Action buttons */}
                            <button
                                onClick={() => handleApprove(user.id)}
                                className="mr-2 rounded bg-green-500 px-4 py-2 text-white"
                            >
                                Approve
                            </button>
                            <button
                                onClick={() => handleReject(user.id)}
                                className="rounded bg-red-500 px-4 py-2 text-white"
                            >
                                Reject
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

// Define PropTypes for type-checking
PendingUsers.propTypes = {
    users: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            birthday: PropTypes.string.isRequired,
            status: PropTypes.string.isRequired, // Make sure to validate the status field
        }),
    ).isRequired,
};

export default PendingUsers;
