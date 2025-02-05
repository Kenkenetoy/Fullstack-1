import { Link } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function SearchResultsTable({ query }) {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    useEffect(() => {
        if (query.trim() !== '') {
            fetchResults(1);
        }
    }, [query]);

    const fetchResults = async (pageNumber) => {
        setLoading(true);
        try {
            const response = await axios.get('/search/directory', {
                params: { query, page: pageNumber },
            });

            setResults(response.data.data);
            setPage(response.data.current_page);
            setLastPage(response.data.last_page);
        } catch (error) {
            console.error('Error fetching search results:', error);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-4 overflow-x-auto">
            {loading && <p className="text-gray-500">Loading...</p>}
            {!loading && results.length === 0 && (
                <p className="text-gray-500">No results found.</p>
            )}
            {!loading && results.length > 0 && (
                <>
                    <table className="table w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200 text-left">
                                <th className="border p-2">Name</th>
                                <th className="border p-2">Email</th>
                                <th className="border p-2">Type</th>
                                <th className="border p-2">Department</th>
                                <th className="border p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-100">
                                    <td className="border p-2">
                                        {user.first_name} {user.middle_name}{' '}
                                        {user.last_name}
                                    </td>
                                    <td className="border p-2">{user.email}</td>
                                    <td className="border p-2 capitalize">
                                        {user.type}
                                    </td>
                                    <td className="border p-2">
                                        {user.department || 'No Department'}
                                    </td>
                                    <td className="border p-2">
                                        <Link
                                            href={`/profile/${user.id}`}
                                            className="text-blue-500 hover:underline"
                                        >
                                            View Profile
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="mt-4 flex justify-center space-x-2">
                        <button
                            className="btn btn-outline"
                            onClick={() => fetchResults(page - 1)}
                            disabled={page === 1}
                        >
                            Previous
                        </button>
                        <span className="rounded bg-gray-200 px-4 py-2">
                            {page} / {lastPage}
                        </span>
                        <button
                            className="btn btn-outline"
                            onClick={() => fetchResults(page + 1)}
                            disabled={page === lastPage}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
