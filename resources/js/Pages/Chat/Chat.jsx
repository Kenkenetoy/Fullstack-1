import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('/chat/messages')
            .then((res) => res.json())
            .then((data) => setMessages(data));
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        router.post(
            '/chat/send',
            { message },
            {
                onSuccess: () => {
                    setMessage('');
                    fetch('/chat/messages')
                        .then((res) => res.json())
                        .then((data) => setMessages(data));
                },
            },
        );
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Live Chat</h1>
            <div className="h-96 overflow-auto border p-4">
                {messages.map((msg) => (
                    <div key={msg.id} className="border-b p-2">
                        <strong>{msg.user?.name}:</strong> {msg.message}
                    </div>
                ))}
            </div>
            <form onSubmit={sendMessage} className="mt-4">
                <input
                    type="text"
                    className="w-full border p-2"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button
                    type="submit"
                    className="mt-2 w-full bg-blue-500 p-2 text-white"
                >
                    Send
                </button>
            </form>
        </div>
    );
}
