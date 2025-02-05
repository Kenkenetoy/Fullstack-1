<?php

namespace App\Http\Controllers;
use App\Models\Message;
use Inertia\Inertia;

class MessageController extends Controller
{
    public function index()
    {
        return Inertia::render('Message/Message');
    }

    public function getMessages()
    {
        return response()->json(Message::with('user')->latest()->take(50)->get());
    }
}
