import { useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function ChatInput() {
    const { data, setData, post, reset } = useForm({ message: '' });
    const [loading, setLoading] = useState(false);

    const sendMessage = (e) => {
        e.preventDefault();
        if (!data.message.trim()) return;

        setLoading(true);
        post('/messages', {
            onSuccess: () => {
                reset('message');
                setLoading(false);
            },
        });
    };

    return (
        <form onSubmit={sendMessage} className="flex gap-2 mt-3">
            <input
                type="text"
                value={data.message}
                onChange={(e) => setData('message', e.target.value)}
                className="flex-1 input input-bordered"
                placeholder="Type a message..."
                disabled={loading}
            />
            <button
                type="submit"
                className={`btn btn-primary ${loading && 'loading'}`}
                disabled={loading}
            >
                Send
            </button>
        </form>
    );
}
