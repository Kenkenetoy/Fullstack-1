import { Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

const LoginForm = () => {
    const imageName = 'logo.png';

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [errorFeedback, setErrorFeedback] = useState('');

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onError: (error) => {
                console.log('Error object:', error); // Debugging the error object
                if (error.email) {
                    setErrorFeedback(error.email); // Display the error message returned for email
                } else {
                    setErrorFeedback(
                        'An unexpected error occurred. Please try again.',
                    );
                }
            },
            onFinish: () => reset('password'),
        });
    };

    return (
        <form className="p-6 py-12 space-y-4" onSubmit={submit}>
            <div className="flex-col items-center hidden px-12 space-y-2 justify-evenly md:flex">
                <div className="flex w-32 h-32">
                    <img
                        src={`/images/${imageName}`}
                        alt="Dynamic Example"
                        className="object-contain w-full h-full drop-shadow"
                    />
                </div>
            </div>

            <div className="mb-8">
                <h3 className="text-3xl font-bold text-base-content">
                    Sign in
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-base-content">
                    Sign in to your account and explore a world of
                    possibilities. Your journey begins here.
                </p>
            </div>

            {/* Email field */}
            <label className="flex items-center gap-4 p-0 pl-4 input input-primary">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                >
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="h-10 border-none rounded-none input grow"
                    placeholder="Email"
                    autoComplete="username"
                    autoFocus={true}
                    onChange={(e) => setData('email', e.target.value)}
                />
            </label>

            {/* Password field */}
            <label className="flex items-center gap-4 p-0 pl-4 input input-primary">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                >
                    <path
                        fillRule="evenodd"
                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                        clipRule="evenodd"
                    />
                </svg>
                <input
                    id="password"
                    type="password"
                    name="password"
                    value={data.password}
                    className="h-10 border-none rounded-none input grow"
                    placeholder="Password"
                    autoComplete="current-password"
                    autoFocus={false}
                    onChange={(e) => setData('password', e.target.value)}
                />
            </label>

            {/* Remember me */}
            <label className="justify-start gap-2 cursor-pointer label">
                <input
                    type="checkbox"
                    name="remember"
                    checked={data.remember}
                    onChange={(e) => setData('remember', e.target.checked)}
                    className="checkbox"
                />
                <span className="label-text">Remember me</span>
            </label>

            {/* Error message */}
            {errorFeedback && (
                <div className="mt-4 alert alert-error">
                    <span>{errorFeedback}</span>
                </div>
            )}

            <div className="!mt-8">
                <button
                    type="submit"
                    className="w-full text-white btn btn-primary"
                    disabled={processing}
                >
                    Sign in
                </button>
            </div>

            <p className="!mt-8 text-center text-sm text-base-content">
                Don't have an account?{' '}
                <Link href={route('register')} className="btn btn-link">
                    Register here
                </Link>
            </p>

            <div className="flex flex-col items-center w-3/4 m-auto space-y-1 justify-evenly">
                <h4 className="text-sm text-base-content">
                    Liverpool University
                </h4>

                <p className="text-xs leading-relaxed text-base-300">
                    This is a parody project to showcase a school grade system.
                    It is not affiliated with any real school or institution.
                </p>
            </div>
        </form>
    );
};

export default LoginForm;
