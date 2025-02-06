import ProfilePicture from '@/Components/ProfilePicture.jsx';

export default function ChatMessage({ message, auth }) {
    const isOwnMessage = message.user.id === auth.user.id;

    return (
        <div className={`chat ${isOwnMessage ? 'chat-end' : 'chat-start'}`}>
            <div className="flex items-end space-x-6">
                <div className="chat-bubble">{message.message}</div>
                {isOwnMessage && (
                    <div className="h-10 -mb-4 overflow-hidden rounded-full avatar">
                        <ProfilePicture user={message.user.slug} />
                    </div>
                )}
            </div>
        </div>
    );
}
