import { Link } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function SearchComponentAuto() {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [debouncedQuery, setDebouncedQuery] = useState('');

    // Debouncing the search query
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
        }, 500); // 500ms delay before sending request

        return () => clearTimeout(timer); // Cleanup timeout on query change
    }, [query]);

    // Fetch suggestions when debouncedQuery changes
    useEffect(() => {
        const fetchSuggestions = async () => {
            if (debouncedQuery) {
                setLoading(true);
                try {
                    const response = await axios.get('/search/search', {
                        params: { query: debouncedQuery, perPage: 10, page },
                    });

                    const { data } = response.data;

                    console.log('Search Results:', data);

                    setSuggestions((prev) =>
                        page === 1 ? data : [...prev, ...data],
                    );
                } catch (error) {
                    console.error(
                        'Error fetching autocomplete suggestions:',
                        error,
                    );
                    setSuggestions([]);
                } finally {
                    setLoading(false);
                }
            } else {
                setSuggestions([]);
            }
        };

        fetchSuggestions();
    }, [debouncedQuery, page]);

    return (
        <>
            <div className="dropdown w-full space-y-4">
                <label
                    tabIndex={0}
                    className="input input-primary flex items-center overflow-hidden p-0 pl-4"
                >
                    <input
                        type="text"
                        className="input h-10 grow rounded-none border-none"
                        placeholder="Search for users"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setPage(1); // Reset page to 1 when query changes
                        }}
                    />
                    <button className="btn btn-primary hidden rounded-none px-20 lg:block">
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
                    </button>
                </label>{' '}
                <button className="btn btn-primary block flex w-full items-center lg:hidden">
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
                    <p>Search</p>
                </button>
                {suggestions.length > 0 && (
                    <ul
                        tabIndex={0}
                        className="menu dropdown-content z-[1] mt-2 w-full rounded-none bg-base-100 p-0 shadow"
                    >
                        {suggestions.map((user, index) => (
                            <li key={index}>
                                {user.id ? (
                                    <Link
                                        href={route('profile.view', {
                                            slug: user.slug,
                                        })}
                                        method="get"
                                    >
                                        <div className="flex flex-col items-start -space-y-2 rounded-none">
                                            <div className="flex flex-row items-center space-x-2">
                                                <div className="text-lg font-bold">
                                                    {user.first_name}{' '}
                                                    {user.middle_name}{' '}
                                                    {user.last_name}
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
                                    <div>No ID available</div>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {loading && (
                <p className="absolute mt-2 text-sm text-gray-500">
                    Loading...
                </p>
            )}
        </>
    );
}
