import PropTypes from 'prop-types';

const RejectedUsers = ({ users }) => {
    if (!users.length) {
        return (
            <div className="text-center text-gray-500">No rejected users</div>
        );
    }

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
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

RejectedUsers.propTypes = {
    users: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
        }),
    ).isRequired,
};

export default RejectedUsers;
