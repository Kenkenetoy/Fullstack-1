import { Link } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function SearchComponent() {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1); // Track the current page
    const [hasMore, setHasMore] = useState(true); // Track if there are more results

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (query.length > 2) {
                setLoading(true); // Set loading state
                try {
                    const response = await axios.get('/api/search', {
                        params: { query, perPage: 10, page },
                    });
                    const { data, current_page, last_page } = response.data;

                    // Append new results to suggestions
                    setSuggestions((prev) =>
                        page === 1 ? data : [...prev, ...data],
                    );

                    // Check if there are more results
                    setHasMore(current_page < last_page);
                } catch (error) {
                    console.error(
                        'Error fetching autocomplete suggestions:',
                        error,
                    );
                    setSuggestions([]); // Reset suggestions on error
                } finally {
                    setLoading(false); // Reset loading state
                }
            } else {
                setSuggestions([]); // Reset suggestions if query is too short
            }
        };

        fetchSuggestions();
    }, [query, page]);

    const handleLoadMore = () => {
        if (hasMore) {
            setPage((prev) => prev + 1); // Increment page to load more results
        }
    };

    return (
        <div className="relative mx-auto w-full max-w-md">
            {/* Input field */}
            <div className="dropdown w-96">
                <label
                    tabIndex={0}
                    className="input input-primary flex items-center gap-4 p-0 pl-4"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70"
                    >
                        <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <input
                        type="text"
                        className="input h-10 grow rounded-none border-none"
                        placeholder="Search for users"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setPage(1); // Reset to page 1 on a new search
                        }}
                    />
                </label>

                {/* Suggestions Dropdown */}
                {suggestions.length > 0 && (
                    <ul
                        tabIndex={0}
                        className="menu dropdown-content z-[1] mt-2 w-full rounded-none bg-base-100 p-0 shadow"
                    >
                        {suggestions.map((user, index) => (
                            <li key={index} onClick={() => setQuery(user.name)}>
                                {user.id ? (
                                    <Link
                                        href={`/profile/${user.id}`}
                                        method="get"
                                    >
                                        <div className="flex flex-col items-start -space-y-2 rounded-none">
                                            <div className="flex flex-row items-center space-x-2">
                                                <div className="text-lg font-bold">
                                                    {user.name}
                                                </div>
                                                <div className="text-sm capitalize text-blue-500">
                                                    {user.type}
                                                </div>
                                            </div>

                                            <div className="text-sm text-gray-400">
                                                {user.department ||
                                                    'No Department'}
                                            </div>
                                            <div className="text-sm text-gray-400">
                                                {user.email}
                                            </div>
                                        </div>
                                    </Link>
                                ) : (
                                    <div>No ID available</div> // Handle missing id
                                )}
                            </li>
                        ))}

                        {/* Load More Button */}
                        {hasMore && (
                            <li
                                className="cursor-pointer text-center text-blue-500 hover:underline"
                                onClick={handleLoadMore}
                            >
                                Load More
                            </li>
                        )}
                    </ul>
                )}
            </div>

            {loading && (
                <p className="absolute mt-2 text-sm text-gray-500">
                    Loading...
                </p>
            )}
        </div>
    );
}
