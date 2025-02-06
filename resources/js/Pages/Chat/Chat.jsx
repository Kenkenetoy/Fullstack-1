import ChatInput from '@/Components/ChatInput';
import ChatMessage from '@/Components/ChatMessage';
import Echo from '@/echo'; // Import Laravel Echo
import { useEffect, useState } from 'react';

export default function Chat({ auth, messages }) {
    const [chatMessages, setChatMessages] = useState(messages);

    useEffect(() => {
        Echo.join('chat')
            .here((users) => {
                console.log('Users in chat:', users);
            })
            .joining((user) => {
                console.log(user.name + ' joined the chat.');
            })
            .leaving((user) => {
                console.log(user.name + ' left the chat.');
            })
            .listen('MessageSent', (event) => {
                setChatMessages((prevMessages) => [
                    ...prevMessages,
                    event.message,
                ]);
            });

        return () => {
            Echo.leave('chat');
        };
    }, []);

    return (
        <div className="max-w-lg p-4 mx-auto">
            <h2 className="mb-4 text-xl font-bold text-center">💬 Chat Room</h2>

            <div className="h-screen p-3 overflow-y-auto border rounded-lg border-base-300 bg-base-200">
                {chatMessages.map((msg) => (
                    <ChatMessage key={msg.id} message={msg} auth={auth} />
                ))}
            </div>

            <ChatInput />
        </div>
    );
}
