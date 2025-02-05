export default function Welcome({ name }) {
    const school = 'Cristal e-College';
    const heroContent =
        'Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.';

    return (
        <>
            <div className="hero min-h-96 bg-base-200">
                <div className="text-center hero-content">
                    <div className="max-w-md">
                        {name ? (
                            <h1 className="text-5xl font-bold">Hello {name}</h1>
                        ) : (
                            <h1 className="text-5xl font-bold">
                                Welcome To {school}
                            </h1>
                        )}

                        <p className="py-6">{heroContent}</p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>

            <div className="flex justify-between bg-neutral"></div>

            {/* <div className="container py-40 mx-auto bg-white dark:bg-black">
                <div className="mx-auto text-center max-w-7xl">
                    <p className="text-xl font-bold text-black dark:text-white md:text-4xl">
                        Remote{' '}
                        <span className="text-neutral-400">
                            {'Connectivity'.split('').map((word, idx) => (
                                <motion.span
                                    key={idx}
                                    className="inline-block"
                                    initial={{ x: -10, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: idx * 0.04,
                                    }}
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </span>
                    </p>
                    <p className="max-w-2xl py-4 mx-auto text-sm text-neutral-500 md:text-lg">
                        Break free from traditional boundaries. Work from
                        anywhere, at the comfort of your own studio apartment.
                        Perfect for Nomads and Travellers.
                    </p>
                </div>
                <WorldMap
                    dots={[
                        {
                            start: {
                                lat: 9.5624, // Panglao, Bohol, Philippines
                                lng: 123.7451,
                                label: 'Panglao, Bohol, Philippines',
                            },
                            end: {
                                lat: 35.6895,
                                lng: 139.6917,
                                label: 'Tokyo, Japan',
                            }, // Tokyo
                        },
                        {
                            start: {
                                lat: 9.5624, // Panglao, Bohol, Philippines
                                lng: 123.7451,
                                label: 'Panglao, Bohol, Philippines',
                            },
                            end: {
                                lat: -33.8688,
                                lng: 151.2093,
                                label: 'Sydney, Australia',
                            }, // Sydney
                        },
                        {
                            start: {
                                lat: 9.5624, // Panglao, Bohol, Philippines
                                lng: 123.7451,
                                label: 'Panglao, Bohol, Philippines',
                            },
                            end: {
                                lat: 40.7128,
                                lng: -74.006,
                                label: 'New York City, USA',
                            }, // NYC
                        },
                        {
                            start: {
                                lat: 9.5624, // Panglao, Bohol, Philippines
                                lng: 123.7451,
                                label: 'Panglao, Bohol, Philippines',
                            },
                            end: {
                                lat: 50.1109,
                                lng: 8.6821,
                                label: 'Frankfurt, Germany',
                            }, // Frankfurt
                        },
                        {
                            start: {
                                lat: 9.5624, // Panglao, Bohol, Philippines
                                lng: 123.7451,
                                label: 'Panglao, Bohol, Philippines',
                            },
                            end: {
                                lat: -34.9285,
                                lng: 138.6007,
                                label: 'Adelaide, Australia',
                            }, // Adelaide
                        },
                        {
                            start: {
                                lat: 9.5624, // Panglao, Bohol, Philippines
                                lng: 123.7451,
                                label: 'Panglao, Bohol, Philippines',
                            },
                            end: {
                                lat: 34.0522,
                                lng: -118.2437,
                                label: 'Los Angeles, USA',
                            }, // Los Angeles
                        },
                        {
                            start: {
                                lat: 9.5624, // Panglao, Bohol, Philippines
                                lng: 123.7451,
                                label: 'Panglao, Bohol, Philippines',
                            },
                            end: {
                                lat: 51.5074,
                                lng: -0.1278,
                                label: 'London, UK',
                            }, // London
                        },
                    ]}
                />
            </div> */}
        </>
    );
}
