<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use phpDocumentor\Reflection\PseudoTypes\False_;
use Illuminate\Support\Str;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
{

    // Clean and concatenate names safely
    $firstName = trim($request->first_name ?? '');
    $middleName = trim($request->middle_name ?? '');
    $lastName = trim($request->last_name ?? '');

    // Ensure we don't have extra spaces or multiple dots
    $fullName = trim("$firstName $middleName $lastName");

    // Remove multiple spaces and dots, keeping hyphens intact
    $fullName = preg_replace('/\s+/', ' ', $fullName); // Convert multiple spaces to one
    $fullName = str_replace('.', '', $fullName); // Remove dots (or replace with '-' if desired)

    // Fallback: If name is empty, generate a random slug (prevents errors)
    if (empty($fullName)) {
        $fullName = 'user-' . uniqid();
    }

    // Generate base slug
    $baseSlug = Str::slug($fullName);

    // Ensure uniqueness
    $slug = $baseSlug;
    $count = 1;
    while (User::where('slug', $slug)->exists()) {
        $slug = $baseSlug . '-' . $count;
        $count++;
    }

    $request->validate([
        'first_name' => 'required|string|max:255',
        'middle_name' => 'required|string|max:255',
        'last_name' => 'required|string|max:255',
        'phone_number' => 'required|string|max:11',
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
        'password' => ['required', 'confirmed', Rules\Password::defaults()],
    ], [
    'birthday.before' => 'You must be at least 16 years old to register.',
    ]);

    $user = User::create([
        'first_name' => $request->first_name,
        'middle_name' => $request->middle_name,
        'last_name' => $request->last_name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
        'status' => 'pending',
        'user_type' => 'student',
        'birthday' => $request->birthday,
        'profile_picture' => null,
        'address' => $request->address,
        'gender' => $request->gender,
        'phone_number' => $request->phone_number,
        'is_archived' => false,
        'slug' => $slug,
    ]);

    event(new Registered($user));

    Auth::login($user);

    return redirect(route('dashboard', absolute: false));
}
}
