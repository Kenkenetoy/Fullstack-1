import { Link, usePage } from '@inertiajs/react';

const Breadcrumbs = () => {
    const { url } = usePage(); // Get the current URL path
    const segments = url.split('/').filter(Boolean); // Split path and remove empty parts

    let path = '';

    return (
        <nav className="border-b-2 p-4">
            <ul className="flex items-center space-x-2 text-sm">
                {/* Home link */}
                <li>
                    <Link href="/" className="text-gray-900 hover:underline">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                            />
                        </svg>
                    </Link>
                </li>

                {segments.map((segment, index) => {
                    path += `/${segment}`;
                    const isLast = index === segments.length - 1;

                    // Format breadcrumb text (remove dashes and capitalize words)
                    const formattedSegment = segment
                        .replace(/-/g, ' ') // Replace dashes with spaces
                        .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word

                    return (
                        <li key={index} className="flex items-center">
                            {/* Arrow separator */}
                            <span className="mx-2 text-gray-400">{'>'}</span>

                            {/* Breadcrumb link or text */}
                            {isLast ? (
                                <span className="text-gray-500">
                                    {formattedSegment}
                                </span>
                            ) : (
                                <Link
                                    href={path}
                                    className="text-blue-500 hover:underline"
                                >
                                    {formattedSegment}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Breadcrumbs;
