<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Events\MessageSent;

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
        $request->validate(['message' => 'required|string']);

        $message = Message::create([
            'user_id' => auth()->id(),
            'message' => $request->message,
        ]);

        // Broadcast the message
        broadcast(new MessageSent($message))->toOthers();

        return response()->json($message);
    }
}
