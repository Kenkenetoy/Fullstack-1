<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MessageController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Chat/Chat', [
            'messages' => Message::with('user:id,name')->latest()->take(20)->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'message' => 'required|string|max:500',
        ]);

        $message = Message::create([
            'user_id' => auth()->id(),
            'message' => $validated['message'],
        ]);

        return back();
    }
}
