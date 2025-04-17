import { useState } from 'react';
import { User } from '../types';

interface LoginFormProps {
  users: User[];
  loading: boolean;
  error: string | null;
  onLogin: (userId: number) => void;
}

const LoginForm = ({ users, loading, error, onLogin }: LoginFormProps) => {
  const [selectedUserId, setSelectedUserId] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUserId) {
      onLogin(Number(selectedUserId));
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Login</h2>
      {loading ? (
        <div className="text-center py-2">Loading users...</div>
      ) : error ? (
        <div className="text-red-500 text-sm py-2">{error}</div>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="user-select" className="block text-sm font-medium text-gray-700 mb-1">
              Select User
            </label>
            <select
              id="user-select"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
              required
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
            >
              <option value="" disabled>Select a user</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.email})
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            disabled={loading || !selectedUserId}
          >
            Login
          </button>
        </form>
      )}
    </div>
  );
};

export default LoginForm;