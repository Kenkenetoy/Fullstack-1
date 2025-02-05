<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    // Fetch users by status
    public function getUsersByStatus($status)
    {
        return response()->json(User::where('status', $status)->get());
    }

    public function pendingUsers()   { return $this->getUsersByStatus('pending'); }
    public function approvedUsers()  { return $this->getUsersByStatus('approved'); }
    public function rejectedUsers()  { return $this->getUsersByStatus('rejected'); }
    public function bannedUsers()    { return $this->getUsersByStatus('banned'); }

    // Update user status
    public function updateUserStatus($id, $status)
    {
        $messages = [
            'approved' => 'User approved successfully',
            'rejected' => 'User rejected successfully',
            'banned'   => 'User banned successfully',
        ];

        try {
            User::where('id', $id)->update(['status' => $status]);
            return response()->json(['message' => $messages[$status] ?? 'Status updated'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error updating user status', 'error' => $e->getMessage()], 500);
        }
    }

    public function approve($id) { return $this->updateUserStatus($id, 'approved'); }
    public function reject($id)  { return $this->updateUserStatus($id, 'rejected'); }
    public function ban($id)     { return $this->updateUserStatus($id, 'banned'); }

    // Profile Management
    public function updateProfilePicture(Request $request)
    {
        $request->validate([
            'profile_picture' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        $user = auth()->user();
        $image = $request->file('profile_picture');
        $originalName = $image->getClientOriginalName();

        // Ensure the uploaded file does not overwrite the placeholder
        $forbiddenNames = ['placeholder-profile.jpg'];
        if (in_array($originalName, $forbiddenNames)) {
            return response()->json(['error' => 'Invalid file name. Please rename your file and try again.'], 400);
        }

        // Generate a unique filename
        $imageName = time() . '_' . $originalName;

        // Delete old profile picture if exists (except placeholder)
        if ($user->profile_picture && !in_array($user->profile_picture, $forbiddenNames)) {
            Storage::disk('public')->delete('images/profilepicture/' . $user->profile_picture);
        }

        // Save new profile picture
        $image->storeAs('images/profilepicture', $imageName, 'public');
        $user->update(['profile_picture' => $imageName]);

        return response()->json(['profile_picture' => $imageName]);
    }

    public function updateBackgroundPicture(Request $request)
    {
        $request->validate([
            'background_picture' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        $user = auth()->user();
        $image = $request->file('background_picture');
        $originalName = $image->getClientOriginalName();

        // Ensure the uploaded file does not overwrite the placeholder
        $forbiddenNames = ['placeholder-background.jpg'];
        if (in_array($originalName, $forbiddenNames)) {
            return response()->json(['error' => 'Invalid file name. Please rename your file and try again.'], 400);
        }

        // Generate a unique filename
        $imageName = time() . '_' . $originalName;

        // Delete old background picture if exists (except placeholder)
        if ($user->background_picture && !in_array($user->background_picture, $forbiddenNames)) {
            Storage::disk('public')->delete('images/backgrounds/' . $user->background_picture);
        }

        // Save new background picture
        $image->storeAs('images/backgrounds', $imageName, 'public');
        $user->update(['background_picture' => $imageName]);

        return response()->json(['background_picture' => $imageName]);
    }

    public function getProfilePicture($slug)
    {
        $user = User::where('slug', $slug)->first();

        // If no user is found, return the placeholder image
        if (!$user) {
            return response()->json([
                'profile_picture_url' => asset('storage/images/profilepicture/placeholder-profile.jpg')
            ]);
        }

        return response()->json([
            'profile_picture_url' => asset('storage/images/profilepicture/' . ($user->profile_picture ?? 'placeholder-profile.jpg'))
        ]);
    }

    public function getBackgroundPicture($slug)
    {
        $user = User::where('slug', $slug)->first();

        // If user not found, return the placeholder background image
        if (!$user) {
            return response()->json([
                'background_picture_url' => asset('storage/images/backgrounds/placeholder-background.jpg')
            ]);
        }

        return response()->json([
            'background_picture_url' => asset('storage/images/backgrounds/' . ($user->background_picture ?? 'placeholder-background.jpg'))
        ]);
    }

}
