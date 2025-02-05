<?php

namespace App\Http\Controllers;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;
use App\Models\Student;
use App\Models\Instructor;

class ProfileController extends Controller
{
    /**
     * Display a user's profile card.
     *
     * @param int $userId
     * @return \Inertia\Response
     */
    public function view($slug)
    {
        $user = User::with([
            'student.department',
            'instructor.department',
            'staff.department'
        ])->where('slug', $slug)->firstOrFail();

        return Inertia::render('Profile/Profile', [
            'user' => $user,
            'authUserId' => Auth::id(),
        ]);
    }

    /**
     * Display the edit profile form for the logged-in user.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Inertia\Response
     */
    // public function edit(Request $request): Response
    // {
    //     return Inertia::render('Profile/Edit', [
    //         'user' => $request->user(), // Pass the logged-in user to the component
    //         'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
    //         'status' => session('status'),
    //     ]);
    // }

    /**
     * Update the logged-in user's profile information.
     *
     * @param \App\Http\Requests\ProfileUpdateRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        // If the email is updated, set email_verified_at to null
        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the logged-in user's account.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'], // Ensure the password is correct
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
