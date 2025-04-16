'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useChatSocket } from '@/hooks/useChatSocket';
import axios from 'axios';

export default function ChatPage() {
  const { data: session, status } = useSession();
  const currentUserId = session?.user?._id || '';

  const { sendMessage, onMessage } = useChatSocket(currentUserId);
  const [recipientId, setRecipientId] = useState('');
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState<{ from: string; message: string }[]>([]);
  const [allUsers, setAllUsers] = useState<{ _id: string; userName: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!currentUserId) return;

    onMessage((data) => {
      setChatLog((prev) => [...prev, data]);
    });
  }, [onMessage, currentUserId]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('/api/user/fetchAllusers'); 
        console.log('API response:', res.data);

        const users = Array.isArray(res.data.users) ? res.data.users : [];
        setAllUsers(users);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to load users. Please try again later.');
        setAllUsers([]);
      }
    };
    fetchUsers();
  }, []);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated' || !currentUserId) {
    return <div>Please sign in to use the chat.</div>;
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">Chat with a Teammate</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <select
        onChange={(e) => setRecipientId(e.target.value)}
        value={recipientId}
        className="border px-3 py-2 rounded mb-2 w-full"
      >
        <option value="">Select a user</option>
        {Array.isArray(allUsers) && allUsers.length > 0 ? (
          allUsers
            .filter((u) => u._id !== currentUserId)
            .map((user) => (
              <option key={user._id} value={user._id}>
                {user.userName}
              </option>
            ))
        ) : (
          <option value="" disabled>
            No users available
          </option>
        )}
      </select>

      <div className="flex gap-2 mb-2">
        <input
          type="text"
          placeholder="Type message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border px-3 py-2 flex-1 rounded"
        />
        <button
          onClick={() => {
            if (!recipientId) {
              alert('Please select a recipient.');
              return;
            }
            sendMessage(recipientId, message);
            setChatLog((prev) => [...prev, { from: currentUserId, message }]);
            setMessage('');
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>

      <div className="border p-4 rounded bg-gray-100">
        <h2 className="font-medium mb-2">Chat Log</h2>
        {chatLog.map((msg, idx) => (
          <div key={idx}>
            <strong>{msg.from === currentUserId ? 'You' : msg.from}</strong>: {msg.message}
          </div>
        ))}
      </div>
    </div>
  );
}