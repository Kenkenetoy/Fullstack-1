<?php

namespace App\Http\Controllers;
use App\Events\MessageSent;
use Illuminate\Http\Request;
use App\Models\Message;
use Inertia\Inertia;

class ChatController extends Controller
{
    public function index()
    {
        return Inertia::render('Chat/Chat');
    }

    public function sendMessage(Request $request)
    {
        $message = Message::create([
            'user_id' => auth()->id(),
            'message' => $request->message,
        ]);

        // Broadcast the event
        broadcast(new MessageSent($message));

        return response()->json($message);
    }

    public function getMessages()
    {
        return response()->json(Message::with('user')->latest()->take(50)->get());
    }
}
