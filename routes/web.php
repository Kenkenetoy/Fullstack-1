<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\ChatController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Home and Dashboard
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'name' => auth()->user() ? auth()->user()->name : null,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
*/

require __DIR__.'/auth.php';

Route::post('/register/batch', [RegisterController::class, 'batchRegister'])->name('register.batch');
Route::post('/check-emails', [RegisterController::class, 'checkEmails'])->name('check.emails');

/*
|--------------------------------------------------------------------------
| User Profile & Management Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth'])->group(function () {
    // Profile Management
    Route::patch('/directory/user/edit', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/directory/user/edit', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Profile Picture Management
    Route::post('/user/profile-picture', [UserController::class, 'updateProfilePicture']);

});

/*
|--------------------------------------------------------------------------
| Admin User Management Routes
|--------------------------------------------------------------------------
*/

Route::prefix('admin/users')->middleware('auth:sanctum')->group(function () {
    $statuses = ['pending', 'approved', 'rejected', 'banned'];
    foreach ($statuses as $status) {
        Route::get("/{$status}", [UserController::class, "{$status}Users"]);
    }

    $actions = ['approve', 'reject', 'ban'];
    foreach ($actions as $action) {
        Route::patch("{id}/{$action}", [UserController::class, $action])
            ->name("admin.users.{$action}");
    }
});

/*
|--------------------------------------------------------------------------
| Search Routes
|--------------------------------------------------------------------------
*/

Route::get('/search', fn() => Inertia::render('Search/Search'))->name('search');
Route::get('/search/search', [SearchController::class, 'autocomplete'])->name('search.autocomplete');
Route::get('/search/{query}', [SearchController::class, 'searchResults'])->name('search.results');

/*
|--------------------------------------------------------------------------
| Directory Route
|--------------------------------------------------------------------------
*/

Route::get('/directory', fn() => Inertia::render('Directory/Directory'))->name('directory');

/*
|--------------------------------------------------------------------------
| Slug-Based Profile Routes (Should Be After Auth)
|--------------------------------------------------------------------------
*/

Route::get('/{slug}/profile-picture', [UserController::class, 'getProfilePicture']);
Route::get('/{slug}', [ProfileController::class, 'view'])->name('profile.view');
