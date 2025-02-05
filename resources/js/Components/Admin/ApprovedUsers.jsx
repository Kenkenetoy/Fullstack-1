import PropTypes from 'prop-types';

const ApprovedUsers = ({ users }) => {
    const approvedUsers = users.filter((user) => user.status === 'approved');

    if (!users.length) {
        return (
            <div className="text-center text-gray-500">No approved users</div>
        );
    }

    const handleBan = async (id) => {
        try {
            const response = await axios.patch(`/admin/users/${id}/ban`);
            console.log('User banned:', response.data);
            // Update your local state to reflect the changes (you can call a refresh or update logic here)
        } catch (error) {
            console.error('Error banning user:', error);
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
                {approvedUsers.map((user) => (
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

ApprovedUsers.propTypes = {
    users: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            status: PropTypes.string.isRequired, // Make sure to validate the status field
        }),
    ).isRequired,
};

export default ApprovedUsers;
