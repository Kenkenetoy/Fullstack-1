// src/Pages/Layouts/Layout.jsx
import ApplicationLogo from '@/Components/ApplicationLogo.jsx';
import Footer from '@/Components/Footer.jsx';
import ProfilePicture from '@/Components/ProfilePicture.jsx';
import SearchComponentAuto from '@/Components/SearchComponent.jsx';
import { Link, usePage } from '@inertiajs/react';
import classNames from 'classnames';
import { useState } from 'react';
export default function Layout({ children, someProp }) {
    const [opened, setOpened] = useState(false);
    const user = usePage().props.auth.user;
    const toggleDropdown = () => {
        setOpened((prev) => {
            if (!prev) {
                document.body.style.overflow = 'hidden'; // Disable scrolling
            } else {
                document.body.style.overflow = ''; // Enable scrolling
            }
            return !prev;
        });
    };

    return (
        <>
            <header className="sticky top-0 z-30 text-gray-700 uppercase shadow-lg">
                {/* Red Navbar */}
                <div className="relative z-10 text-neutral-100">
                    <div className="flex items-center justify-start h-10 bg-neutral lg:justify-center">
                        <Link
                            href="/"
                            className="absolute z-20 transform -translate-x-1/2 left-1/2 max-h-16 max-w-16 lg:max-h-28 lg:max-w-28" // Center the logo
                        >
                            <ApplicationLogo hasShadow={true} />
                        </Link>
                        <div
                            className={classNames(
                                'tham tham-e-squeeze tham-w-6 cursor-pointer px-5 md:flex lg:hidden',
                                {
                                    'tham-active': opened, // Apply the white styling when active
                                },
                            )}
                            onClick={() => setOpened(!opened)} // Toggle state on click
                        >
                            <div className="tham-box">
                                <div className="tham-inner bg-base-200" />
                            </div>
                        </div>
                        <div className="items-center justify-center hidden lg:flex lg:gap-72">
                            <ul className="justify-end w-full p-0 menu menu-horizontal flex-nowrap">
                                <li>
                                    <Link href={route('dashboard')}>News</Link>
                                </li>
                                <li>
                                    <Link href={route('dashboard')}>
                                        Careers
                                    </Link>
                                </li>

                                <li>
                                    <details>
                                        <summary>Info for</summary>
                                        <ul className="p-2 text-black rounded-t-none bg-base-100">
                                            <li>
                                                <Link
                                                    href={route('logout')}
                                                    method="post"
                                                    as="button"
                                                >
                                                    Log Out
                                                </Link>
                                            </li>
                                        </ul>
                                    </details>
                                </li>
                            </ul>
                            <ul className="w-full h-full p-0 menu menu-horizontal flex-nowrap">
                                <li>
                                    <Link href={route('dashboard')}>Visit</Link>
                                </li>
                                <li>
                                    <Link href={route('chat')}>Chat</Link>
                                </li>
                                <li className="relative">
                                    <div
                                        className="flex items-center p-2 cursor-pointer"
                                        onClick={toggleDropdown}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                            />
                                        </svg>
                                    </div>
                                </li>

                                {user ? (
                                    <>
                                        <li className="h-1 dropdown dropdown-end">
                                            <div
                                                tabIndex={0}
                                                role="button"
                                                className="avatar btn btn-circle btn-ghost"
                                            >
                                                <div className="w-auto rounded-full">
                                                    <ProfilePicture
                                                        user={user}
                                                    />
                                                </div>
                                            </div>
                                            <ul
                                                tabIndex={0}
                                                className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
                                            >
                                                <span className="px-4 py-3 font-bold capitalize rounded-md text-base-content">
                                                    {`${user.first_name ?? ''} ${user.middle_name ? user.middle_name + ' ' : ''}${user.last_name ?? ''}`.trim() ||
                                                        'User'}
                                                </span>
                                                <li>
                                                    <Link
                                                        href={route(
                                                            'dashboard',
                                                        )}
                                                        className="px-3 capitalize rounded-md text-base-content"
                                                    >
                                                        Dashboard
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href={route(
                                                            'profile.view',
                                                            { slug: user.slug },
                                                        )}
                                                        className="px-3 capitalize rounded-md text-base-content"
                                                    >
                                                        Profile
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href={route('logout')}
                                                        method="post"
                                                        as="button"
                                                        className="px-3 capitalize rounded-md text-base-content"
                                                    >
                                                        Log Out
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li>
                                            <Link href={route('login')}>
                                                Sign In
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* White Navbar */}
                <div className="relative hidden z-5 lg:block">
                    <div className="flex items-center justify-center h-16 gap-40 overflow-x-hidden bg-base-100">
                        <ul className="justify-end w-full p-0 text-lg menu menu-horizontal flex-nowrap">
                            <li>
                                <Link href={route('dashboard')}>
                                    Education & research
                                </Link>
                            </li>
                            <li>
                                <Link href={route('dashboard')}>
                                    Admissions
                                </Link>
                            </li>
                        </ul>
                        <ul className="w-full p-0 text-lg menu menu-horizontal flex-nowrap">
                            <li>
                                <Link href={route('dashboard')}>
                                    life at liverpool
                                </Link>
                            </li>
                            <li>
                                <Link href={route('dashboard')}>
                                    who we are
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Dropdown Menu */}
                {opened && (
                    <>
                        {/* Dark Background Overlay */}
                        <div
                            className="fixed inset-0 bg-black bg-opacity-50 z-1"
                            onClick={toggleDropdown} // Click outside to close
                        ></div>

                        <div className="fixed w-full p-12 space-y-8 shadow-lg z-6 bg-base-100 lg:top-10">
                            {/* Modal */}
                            <div className="flex flex-col gap-8 m-auto lg:w-1/2">
                                <button
                                    className="self-end hidden btn btn-circle btn-ghost btn-sm lg:block"
                                    onClick={toggleDropdown}
                                >
                                    ✕
                                </button>
                                <div className="space-y-4">
                                    <p>Search</p>
                                    <SearchComponentAuto />
                                </div>
                            </div>

                            {/* Mobile Menu */}
                            <ul className="space-y-4 lg:hidden">
                                <li>
                                    <a
                                        href="#home"
                                        className="block hover:bg-gray-100"
                                    >
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#about"
                                        className="block hover:bg-gray-100"
                                    >
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#contact"
                                        className="block hover:bg-gray-100"
                                    >
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </>
                )}
            </header>

            <main className="text-gray-700">{children}</main>

            <Footer />
        </>
    );
}
