import AdminDashboard from '@/components/Admin/AdminDashboard';
import { Head } from '@inertiajs/react';
import axios from 'axios';

export default function Dashboard() {
    // Immediately invoke an async function to fetch data
    async () => {
        try {
            const response = await axios.get('/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    return (
        <>
            <Head title="Dashboard" />
            <div className="mx-auto max-w-7xl py-12 sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <AdminDashboard />
                </div>
            </div>
        </>
    );
}
