// resources/js/Pages/Search/Search.jsx
import { useEffect } from 'react';
import SearchComponent from './Partials/SearchComponent';

export default function Search({ results }) {
    useEffect(() => {
        console.log(results); // Debugging to see the result data structure
    }, [results]);

    return (
        <>
            <div className="p-4">
                <h1 className="mb-4 text-xl font-bold">User Search</h1>

                <SearchComponent />
            </div>
        </>
    );
}
