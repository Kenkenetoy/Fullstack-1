import ProfilePicture from '@/Components/ProfilePicture.jsx';

export default function ChatMessage({ message, auth }) {
    const isOwnMessage = message.user.id === auth.user.id;

    return (
        <div className={`chat ${isOwnMessage ? 'chat-end' : 'chat-start'}`}>
            <div className="flex items-center space-x-4">
                {!isOwnMessage && (
                    <div className="h-12 overflow-hidden rounded-full avatar">
                        <ProfilePicture user={message.user.id} />
                    </div>
                )}
                <div className="chat-bubble">{message.message}</div>
                {isOwnMessage && (
                    <div className="h-12 overflow-hidden rounded-full avatar">
                        <ProfilePicture user={message.user.id} />
                    </div>
                )}
            </div>
        </div>
    );
}
