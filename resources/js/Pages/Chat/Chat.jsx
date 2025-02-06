import ChatInput from '@/Components/ChatInput';
import ChatMessage from '@/Components/ChatMessage';

export default function Chat({ auth, messages }) {
    return (
        <div className="max-w-lg p-4 mx-auto">
            <h2 className="mb-4 text-xl font-bold text-center">💬 Chat Room</h2>

            {/* Chat Messages */}
            <div className="h-screen p-3 overflow-y-auto border rounded-lg border-base-300 bg-base-200">
                {messages.map((msg) => (
                    <ChatMessage key={msg.id} message={msg} auth={auth} />
                ))}
            </div>

            {/* Chat Input */}
            <ChatInput />
        </div>
    );
}
