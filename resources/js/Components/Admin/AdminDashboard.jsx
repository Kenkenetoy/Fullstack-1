import axios from 'axios';
import { useEffect, useState } from 'react';
import ApprovedUsers from './ApprovedUsers';
import BannedUsers from './BannedUsers';
import PendingUsers from './PendingUsers';
import RejectedUsers from './RejectedUsers';

const AdminDashboard = () => {
    const [pendingUsers, setPendingUsers] = useState([]); // State to store pending users
    const [approvedUsers, setApprovedUsers] = useState([]); // State to store pending users
    const [rejectedUsers, setRejectedUsers] = useState([]); // State to store pending users
    const [bannedUsers, setBannedUsers] = useState([]); // State to store pending users
    const [loading, setLoading] = useState(true); // State to handle loading
    const [error, setError] = useState(null); // State to handle errors

    // Fetch pending users from the backend
    useEffect(() => {
        const fetchPendingUsers = async () => {
            try {
                const response = await axios.get('/admin/users/pending'); // API endpoint
                setPendingUsers(response.data); // Update state with fetched data
            } catch (err) {
                setError('Failed to fetch pending users');
            } finally {
                setLoading(false); // Stop loading after the request is complete
            }
        };

        const fetchApprovedUsers = async () => {
            try {
                const response = await axios.get('/admin/users/approved'); // API endpoint
                setApprovedUsers(response.data); // Update state with fetched data
            } catch (err) {
                setError('Failed to fetch approved users');
            } finally {
                setLoading(false); // Stop loading after the request is complete
            }
        };

        const fetchRejectedUsers = async () => {
            try {
                const response = await axios.get('/admin/users/rejected'); // API endpoint
                setRejectedUsers(response.data); // Update state with fetched data
            } catch (err) {
                setError('Failed to fetch pending users');
            } finally {
                setLoading(false); // Stop loading after the request is complete
            }
        };

        const fetchBannedUsers = async () => {
            try {
                const response = await axios.get('/admin/users/banned'); // API endpoint
                setBannedUsers(response.data); // Update state with fetched data
            } catch (err) {
                setError('Failed to fetch banned users');
            } finally {
                setLoading(false); // Stop loading after the request is complete
            }
        };

        fetchPendingUsers();
        fetchApprovedUsers();
        fetchRejectedUsers();
        fetchBannedUsers();
    }, []);

    // Render the UI
    if (loading) {
        return <div className="mt-4 text-center">Loading...</div>; // Show loading state
    }

    if (error) {
        return <div className="mt-4 text-center text-red-500">{error}</div>; // Show error state
    }

    return (
        <div className="p-6">
            <h2 className="mb-4 text-2xl font-bold">Admin Dashboard</h2>
            <PendingUsers users={pendingUsers} />{' '}
            <ApprovedUsers users={approvedUsers} />{' '}
            <RejectedUsers users={rejectedUsers} />{' '}
            <BannedUsers users={bannedUsers} />{' '}
            {/* Pass pending users to the child component */}
        </div>
    );
};

export default AdminDashboard;
