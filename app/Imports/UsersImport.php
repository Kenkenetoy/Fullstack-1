<?php

namespace App\Imports;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Carbon\Carbon;
use Illuminate\Support\Str;


class UsersImport implements ToModel, WithHeadingRow
{
    public function model(array $row)
    {

        $slug = Str::slug($request->name);

    // Ensure uniqueness by appending a number if the slug already exists
        $slugCount = User::where('slug', $slug)->count();
        if ($slugCount > 0) {
            $slug = $slug . '-' . ($slugCount + 1);  // Append a number to make it unique
        }
        // Remove password confirmation from validation if not available
        $validator = Validator::make($row, [
            'name' => 'required|string|max:255',
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                'unique:' . User::class,
                'regex:/^[a-zA-Z0-9._%+-]+@cec\.edu\.ph$/',
            ],
            'birthday' => 'required|date|before:' . now()->subYears(16)->toDateString(),
            'password' => ['required', 'min:8'], // Validate password without confirmation
        ], [
            'birthday.before' => 'You must be at least 16 years old to register.',
        ]);

        if ($validator->fails()) {
            dd('Validation failed for row:', $row, $validator->errors()); // Debugging
        }

        // Proceed with creating the user if validation passes
        return new User([
            'name' => $row['name'],
            'email' => $row['email'],
            'password' => Hash::make($row['password']),
            'phone_number' => $row['phone_number'],
            'gender' => $row['gender'],
            'address' => $row['address'],
            'birthday' => $this->transformDate($row['birthday']),
            'profile_picture' => null,
            'status' => 'accepted',
            'user_type' => 'student',
            'is_archived' => false,
            'slug' => $slug,
        ]);
    }

    // Transform Excel date to SQL-compatible date format
    private function transformDate($value)
    {
        if (is_numeric($value)) {
            return Carbon::instance(\PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($value))->format('Y-m-d');
        }

        try {
            return Carbon::parse($value)->format('Y-m-d');
        } catch (\Exception $e) {
            return null; // Return null if parsing fails
        }
    }
}
