import SearchComponentAuto from '@/Components/SearchComponent.jsx';
import { useState } from 'react';
import SearchResultsTable from './Partials/SearchResultsTable.jsx';

export default function Directory() {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <>
            <div className="relative flex flex-col space-y-8 bg-none lg:my-12 lg:max-w-lg lg:rounded-xl">
                <SearchComponentAuto onSearch={setSearchQuery} />
            </div>

            <div className="mt-8">
                <SearchResultsTable query={searchQuery} />
            </div>
        </>
    );
}
