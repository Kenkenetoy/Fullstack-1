import { router } from '@inertiajs/react';
import axios from 'axios';
import dayjs from 'dayjs';
import ExcelJS from 'exceljs';
import { useRef, useState } from 'react';
const AdminRegisterForm = () => {
    const [file, setFile] = useState(null);
    const [rows, setRows] = useState([]);
    const [existingEmails, setExistingEmails] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [isCheckingEmails, setIsCheckingEmails] = useState(false); // Track email checking status
    const [hasMissingData, setHasMissingData] = useState(false);
    const fileInputRef = useRef(null); // File input ref
    const [sortConfig, setSortConfig] = useState({
        key: 'name', // Default sorting by 'name'
        direction: 'asc', // Default ascending order
    });
    const [filter, setFilter] = useState('all'); // Options could be 'all', 'missing', 'existing'

    const handleFileChange = async (e) => {
        const uploadedFile = e.target.files[0];
        if (!uploadedFile) return;

        setFile(uploadedFile);
        setIsCheckingEmails(true);
        setErrorMessage('');
        setSuccessMessage('');

        const workbook = new ExcelJS.Workbook();
        const reader = new FileReader();

        reader.onload = async (e) => {
            try {
                await workbook.xlsx.load(e.target.result);
                const sheet = workbook.worksheets[0];

                if (!sheet) {
                    throw new Error('No sheet found in the uploaded file.');
                }

                const parsedRows = [];
                const headerRow = sheet.getRow(1);
                const headers = {};

                // Ensure that required headers exist
                const requiredHeaders = [
                    'name',
                    'email',
                    'phone number',
                    'gender',
                    'address',
                    'birthday',
                ];
                headerRow.eachCell((cell, colNumber) => {
                    if (cell.value) {
                        headers[cell.value.toLowerCase()] = colNumber;
                    }
                });

                const missingHeaders = requiredHeaders.filter(
                    (header) => !headers[header],
                );
                if (missingHeaders.length > 0) {
                    throw new Error(
                        `Missing required columns: ${missingHeaders.join(', ')}`,
                    );
                }

                sheet.eachRow((row, rowNumber) => {
                    if (rowNumber === 1) return; // Skip header row

                    const birthday = row.getCell(headers['birthday']).value;
                    const age = calculateAge(birthday);

                    parsedRows.push({
                        name: row.getCell(headers['name']).value,
                        email: row.getCell(headers['email']).value,
                        phone_number: row.getCell(
                            headers['phone number'] || headers['phone_number'],
                        ).value,
                        gender: row.getCell(headers['gender']).value,
                        address: row.getCell(headers['address']).value,
                        birthday,
                        age,
                        missingFields: [],
                    });
                });

                if (parsedRows.length === 0) {
                    throw new Error(
                        'The uploaded file is empty or does not contain valid data.',
                    );
                }

                // Validate missing required fields for each row
                const rowsWithMissingFields = parsedRows.map((row) => {
                    const missing = [];
                    if (!row.name) missing.push('Name');
                    if (!row.email) missing.push('Email');
                    if (!row.phone_number) missing.push('Phone Number');
                    if (!row.gender) missing.push('Gender');
                    if (!row.address) missing.push('Address');
                    if (!row.birthday) missing.push('Birthday');

                    row.missingFields = missing;
                    return row;
                });

                setRows(rowsWithMissingFields);

                // Set error message if there are missing fields
                const invalidRows = rowsWithMissingFields.filter(
                    (row) => row.missingFields.length > 0,
                );
                if (invalidRows.length > 0) {
                    setErrorMessage('Some rows are missing required fields.');
                } else {
                    setErrorMessage('');
                }

                checkExistingEmails(rowsWithMissingFields.map((r) => r.email));
            } catch (error) {
                console.error('Error parsing Excel file:', error);
                setErrorMessage(
                    error.message ||
                        'Invalid file format. Please upload a valid Excel file.',
                );
                setFile(null);
                setRows([]);
                setExistingEmails([]);
            } finally {
                setIsCheckingEmails(false);
            }
        };

        reader.readAsArrayBuffer(uploadedFile);
    };

    const checkExistingEmails = async (emails) => {
        try {
            const response = await axios.post(route('check.emails'), {
                emails,
            });
            setExistingEmails(response.data.existingEmails || []);
        } catch (error) {
            console.error('Error checking emails:', error);
        } finally {
            setIsCheckingEmails(false); // Reset email checking status
        }
    };

    const validateRows = () => {
        if (!Array.isArray(rows)) {
            setHasMissingData(true);
            return false;
        }

        const invalid = rows
            .map((row, index) => ({
                index,
                missingFields: Object.keys(row).filter((key) => !row[key]), // Find missing fields
            }))
            .filter((row) => row.missingFields.length > 0);

        setHasMissingData(invalid.length > 0); // Disable button if there are missing fields

        return invalid.length === 0; // Returns false if missing fields exist
    };

    const formatDate = (date) => {
        if (!date) return ''; // Handle empty values
        if (date instanceof Date) {
            return date.toISOString().split('T')[0]; // Convert Date object to "YYYY-MM-DD"
        }
        if (typeof date === 'string') {
            // Attempt to parse string dates (if in different formats)
            const parsedDate = dayjs(date);
            return parsedDate.isValid()
                ? parsedDate.format('YYYY-MM-DD')
                : date; // Keep original if invalid
        }
        return date; // Return as-is if unknown format
    };

    const calculateAge = (birthday) => {
        if (!birthday) return 'N/A';
        const birthDate = new Date(birthday);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
            age--;
        }
        return age;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateRows()) {
            window.alert(
                'Some rows have missing required fields. Please fill in all required fields before submitting.',
            );
            return;
        }

        if (!file) {
            setErrorMessage('Please select a file first.');
            return;
        }

        if (existingEmails.length > 0) {
            setErrorMessage(
                `Some emails already exist in the system: ${existingEmails.join(', ')}`,
            );
            return;
        }

        setIsUploading(true);
        setSuccessMessage('');
        setErrorMessage('');

        const formData = new FormData();
        formData.append('file', file);

        router.post(route('register.batch'), formData, {
            onSuccess: () => {
                setSuccessMessage('Batch registration successful!');
                setFile(null);
                setRows([]);
                setExistingEmails([]);
                setHasMissingData(false); // Reset state
            },
            onError: (errors) => {
                setErrorMessage(errors.file || 'Something went wrong!');
            },
            onFinish: () => {
                setIsUploading(false);
            },
        });
    };

    const handleClear = () => {
        setFile(null);
        setRows([]);
        setExistingEmails([]);
        setErrorMessage('');
        setSuccessMessage('');

        // Reset the file input element
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSort = (column) => {
        let direction = 'asc';
        if (sortConfig.key === column && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key: column, direction });
    };

    const sortedRows = [...rows].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });

    const filteredAndSortedRows = sortedRows.filter((row) => {
        // Apply filtering based on selected filter option
        if (filter === 'missing') {
            return (
                !row.name ||
                !row.email ||
                !row.phone_number ||
                !row.gender ||
                !row.address ||
                !row.birthday ||
                !row.age
            );
        } else if (filter === 'existing') {
            return existingEmails.includes(row.email); // Adjust based on your logic for existing accounts
        }
        return true; // 'all' will show all rows
    });

    return (
        <div className="relative overflow-x-hidden grow">
            <h2 className="mb-4 text-xl font-bold">Upload an Excel File</h2>

            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="space-y-4"
            >
                <div className="relative w-full">
                    <input
                        type="file"
                        accept=".xlsx, .csv"
                        onChange={handleFileChange}
                        className="w-full pr-10 file-input file-input-bordered"
                        ref={fileInputRef}
                    />
                    {file && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="absolute btn btn-circle btn-ghost btn-sm right-2 top-2"
                        >
                            ✕
                        </button>
                    )}
                </div>

                {existingEmails.length > 0 && (
                    <div className="my-4 alert alert-error">
                        <span>Some accounts already exist</span>
                    </div>
                )}

                {errorMessage && (
                    <div className="my-3 alert alert-error">
                        <span>{errorMessage}</span>
                    </div>
                )}

                {successMessage && (
                    <div className="my-3 alert alert-success">
                        <span>{successMessage}</span>
                    </div>
                )}

                {rows.length > 0 && (
                    <div className="mt-6 space-y-4">
                        <div className="flex items-center space-x-4">
                            <h3 className="mb-2 text-lg font-bold">
                                Review Data
                            </h3>
                            <div className="flex items-center justify-between">
                                <select
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                    className="w-full max-w-xs select select-bordered"
                                >
                                    <option value="all">All</option>
                                    <option value="missing">
                                        Missing Fields
                                    </option>
                                    <option value="existing">
                                        Existing Accounts
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full border border-collapse border-gray-300 table-auto">
                                <thead>
                                    <tr className="bg-gray-200">
                                        {[
                                            'name',
                                            'email',
                                            'phone_number',
                                            'gender',
                                            'address',
                                            'birthday',
                                            'age',
                                        ].map((header) => (
                                            <th
                                                key={header}
                                                className="px-4 py-2 border cursor-pointer"
                                                onClick={() =>
                                                    handleSort(header)
                                                }
                                            >
                                                {header
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    header.slice(1)}
                                                {sortConfig.key === header
                                                    ? sortConfig.direction ===
                                                      'asc'
                                                        ? ' ↑'
                                                        : ' ↓'
                                                    : null}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredAndSortedRows.map((row, index) => {
                                        const isDuplicate =
                                            existingEmails.includes(row.email);
                                        return (
                                            <tr
                                                key={index}
                                                className={
                                                    isDuplicate
                                                        ? 'bg-red-200'
                                                        : ''
                                                }
                                            >
                                                <td className="px-4 py-2 border">
                                                    {row.name || (
                                                        <span className="text-red-500">
                                                            Missing
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-2 border">
                                                    {row.email || (
                                                        <span className="text-red-500">
                                                            Missing
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-2 border">
                                                    {row.phone_number || (
                                                        <span className="text-red-500">
                                                            Missing
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-2 border">
                                                    {row.gender || (
                                                        <span className="text-red-500">
                                                            Missing
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-2 border">
                                                    {row.address || (
                                                        <span className="text-red-500">
                                                            Missing
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-2 border">
                                                    {formatDate(
                                                        row.birthday,
                                                    ) || (
                                                        <span className="text-red-500">
                                                            Missing
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-2 border">
                                                    {row.age || (
                                                        <span className="text-red-500">
                                                            Missing
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    className={`rounded-md px-4 py-2 text-white ${
                        !file ||
                        errorMessage ||
                        existingEmails.length > 0 ||
                        isUploading ||
                        isCheckingEmails ||
                        hasMissingData
                            ? 'cursor-not-allowed bg-gray-400'
                            : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                    disabled={
                        !file ||
                        errorMessage ||
                        existingEmails.length > 0 ||
                        isUploading ||
                        isCheckingEmails ||
                        hasMissingData
                    }
                >
                    Upload
                </button>
            </form>
        </div>
    );
};

export default AdminRegisterForm;
