<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Imports\UsersImport;
use Maatwebsite\Excel\Facades\Excel;

class RegisterController extends Controller
{
    public function batchRegister(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,csv|max:2048',
        ]);
        try {
            Excel::import(new UsersImport(), $request->file('file'));
            return back()->with('success', 'Batch registration successful!');
        } catch (\Exception $e) {
            return back()->with('error', 'Error during import: ' . $e->getMessage());
        }
    }

    public function checkEmails(Request $request)
    {
        $emails = $request->input('emails');

        $existingEmails = User::whereIn('email', $emails)->pluck('email');

        return response()->json([
            'existingEmails' => $existingEmails,
        ]);
    }

}
