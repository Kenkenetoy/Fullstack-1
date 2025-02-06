import ChatInput from '@/Components/ChatInput';
import ChatMessage from '@/Components/ChatMessage';

export default function Chat({ auth, messages }) {
    return (
        <div className="max-w-lg mx-auto">
            {/* Chat Messages */}
            <div className="h-screen p-3 space-y-2 overflow-y-auto bg-base-200">
                {messages.map((msg) => (
                    <ChatMessage key={msg.id} message={msg} auth={auth} />
                ))}
            </div>

            {/* Chat Input */}
            <ChatInput />
        </div>
    );
}
