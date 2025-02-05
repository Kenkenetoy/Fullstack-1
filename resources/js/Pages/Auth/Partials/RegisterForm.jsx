import { Link, useForm } from '@inertiajs/react';

export function RegisterForm({ sideImage = true }) {
    const imageName = 'logo.png';
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        middle_name: '',
        last_name: '',
        email: '',
        birthday: '',
        gender: '',
        phone_number: '',
        address: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="flex">
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
                        Register
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-base-content">
                        Create an account and explore a world of possibilities.
                        Your journey begins here.
                    </p>
                </div>

                {/* First Name field */}
                <label className="flex items-center gap-4 p-0 pl-4 input input-primary">
                    <input
                        id="first_name"
                        type="text"
                        name="first_name"
                        value={data.first_name}
                        className="h-10 border-none rounded-none input grow"
                        placeholder="First Name"
                        autoFocus={true}
                        onChange={(e) => setData('first_name', e.target.value)}
                    />
                </label>
                {errors.first_name && (
                    <div className="mt-2 text-sm text-red-500">
                        {errors.first_name}
                    </div>
                )}

                {/* Middle Name field */}
                <label className="flex items-center gap-4 p-0 pl-4 input input-primary">
                    <input
                        id="middle_name"
                        type="text"
                        name="middle_name"
                        value={data.middle_name}
                        className="h-10 border-none rounded-none input grow"
                        placeholder="Middle Name"
                        autoFocus={true}
                        onChange={(e) => setData('middle_name', e.target.value)}
                    />
                </label>
                {errors.middle_name && (
                    <div className="mt-2 text-sm text-red-500">
                        {errors.middle_name}
                    </div>
                )}

                {/* Last Name field */}
                <label className="flex items-center gap-4 p-0 pl-4 input input-primary">
                    <input
                        id="last_name"
                        type="text"
                        name="last_name"
                        value={data.last_name}
                        className="h-10 border-none rounded-none input grow"
                        placeholder="Last Name"
                        autoFocus={true}
                        onChange={(e) => setData('last_name', e.target.value)}
                    />
                </label>
                {errors.last_name && (
                    <div className="mt-2 text-sm text-red-500">
                        {errors.last_name}
                    </div>
                )}

                {/* Email field */}
                <label className="flex items-center gap-4 p-0 pl-4 input input-primary">
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="h-10 border-none rounded-none input grow"
                        placeholder="Email"
                        onChange={(e) => setData('email', e.target.value)}
                    />
                </label>
                {errors.email && (
                    <div className="mt-2 text-sm text-red-500">
                        {errors.email}
                    </div>
                )}

                {/* Birthday (Date Picker) */}
                <label className="flex items-center gap-4 p-0 pl-4 input input-primary">
                    <input
                        id="birthday"
                        type="date"
                        name="birthday"
                        value={data.birthday}
                        className="h-10 border-none rounded-none input grow"
                        onChange={(e) => setData('birthday', e.target.value)}
                    />
                </label>
                {errors.birthday && (
                    <div className="mt-2 text-sm text-red-500">
                        {errors.birthday}
                    </div>
                )}

                {/* Gender Selection */}
                <div className="flex gap-4">
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="gender"
                            value="Male"
                            checked={data.gender === 'Male'}
                            onChange={(e) => setData('gender', e.target.value)}
                        />
                        <span>Male</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="gender"
                            value="Female"
                            checked={data.gender === 'Female'}
                            onChange={(e) => setData('gender', e.target.value)}
                        />
                        <span>Female</span>
                    </label>
                </div>
                {errors.gender && (
                    <div className="mt-2 text-sm text-red-500">
                        {errors.gender}
                    </div>
                )}

                {/* Phone Number */}
                <label className="flex items-center gap-4 p-0 pl-4 input input-primary">
                    <input
                        id="phone_number"
                        type="text"
                        name="phone_number"
                        value={data.phone_number}
                        className="h-10 border-none rounded-none input grow"
                        placeholder="Phone Number"
                        onChange={(e) =>
                            setData('phone_number', e.target.value)
                        }
                    />
                </label>
                {errors.phone_number && (
                    <div className="mt-2 text-sm text-red-500">
                        {errors.phone_number}
                    </div>
                )}

                {/* Address */}
                <label className="flex items-center gap-4 p-0 pl-4 input input-primary">
                    <input
                        id="address"
                        type="text"
                        name="address"
                        value={data.address}
                        className="h-10 border-none rounded-none input grow"
                        placeholder="Address"
                        onChange={(e) => setData('address', e.target.value)}
                    />
                </label>
                {errors.address && (
                    <div className="mt-2 text-sm text-red-500">
                        {errors.address}
                    </div>
                )}

                {/* Password field */}
                <label className="flex items-center gap-4 p-0 pl-4 input input-primary">
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="h-10 border-none rounded-none input grow"
                        placeholder="Password"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                </label>
                {errors.password && (
                    <div className="mt-2 text-sm text-red-500">
                        {errors.password}
                    </div>
                )}

                {/* Confirm Password field */}
                <label className="flex items-center gap-4 p-0 pl-4 input input-primary">
                    <input
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="h-10 border-none rounded-none input grow"
                        placeholder="Confirm Password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                    />
                </label>
                {errors.password_confirmation && (
                    <div className="mt-2 text-sm text-red-500">
                        {errors.password_confirmation}
                    </div>
                )}

                {/* Submit Button */}
                <div className="!mt-8">
                    <button
                        type="submit"
                        className="w-full text-white btn btn-primary"
                        disabled={processing}
                    >
                        Register
                    </button>
                </div>

                <p className="!mt-8 text-center text-sm text-base-content">
                    Already have an account?{' '}
                    <Link href={route('login')} className="btn btn-link">
                        Sign in
                    </Link>{' '}
                </p>
            </form>

            {/* Side Image */}
            {sideImage && (
                <img
                    src="/images/registerimg.jpg"
                    className="object-cover h-auto"
                    alt="Register"
                />
            )}
        </div>
    );
}
