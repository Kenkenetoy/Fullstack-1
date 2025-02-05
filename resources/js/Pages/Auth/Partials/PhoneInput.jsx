import { useState } from 'react';

const countryCodes = [
    { value: '+1', label: '🇺🇸 +1', maxLength: 10 },
    { value: '+44', label: '🇬🇧 +44', maxLength: 10 },
    { value: '+63', label: '🇵🇭 +63', maxLength: 10 },
    { value: '+91', label: '🇮🇳 +91', maxLength: 10 },
];

export default function PhoneInput({ data, setData }) {
    const [selectedCountry, setSelectedCountry] = useState(countryCodes[2]); // Default: 🇵🇭 +63
    const [error, setError] = useState('');

    const handlePhoneChange = (e) => {
        let phone = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters

        if (phone.length > selectedCountry.maxLength) {
            phone = phone.slice(0, selectedCountry.maxLength);
        }

        if (phone.length < selectedCountry.maxLength) {
            setError(
                `Phone number must be ${selectedCountry.maxLength} digits.`,
            );
        } else {
            setError('');
        }

        setData('phone_number', selectedCountry.value + phone);
    };

    return (
        <div className="mb-4">
            <label className="font-semibold label">Phone Number</label>
            <div className="flex items-center gap-2">
                {/* DaisyUI Dropdown with Primary Color */}
                <details className="dropdown">
                    <summary className="w-40 btn btn-primary">
                        {selectedCountry.label}
                    </summary>
                    <ul className="w-40 p-2 shadow menu dropdown-content rounded-box bg-base-100">
                        {countryCodes.map((country) => (
                            <li key={country.value}>
                                <button
                                    className="w-full text-left hover:bg-primary hover:text-white"
                                    onClick={() => {
                                        setSelectedCountry(country);
                                        setData(
                                            'phone_number',
                                            country.value +
                                                data.phone_number.replace(
                                                    /\D/g,
                                                    '',
                                                ),
                                        );
                                    }}
                                >
                                    {country.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </details>

                {/* Phone Number Input */}
                <input
                    type="text"
                    className="w-full input input-bordered"
                    placeholder="Enter phone number"
                    value={data.phone_number.replace(selectedCountry.value, '')}
                    onChange={handlePhoneChange}
                    maxLength={selectedCountry.maxLength}
                    required
                />
            </div>

            {/* Error Message */}
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
}
