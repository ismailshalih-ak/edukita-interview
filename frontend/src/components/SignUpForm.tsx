import { useState } from 'react';

interface SignUpFormProps {
  onSignup: (name: string, email: string, role: string) => Promise<boolean>;
}

const SignUpForm = ({ onSignup }: SignUpFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !role) {
      setError('All fields are required');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const success = await onSignup(name, email, role);
      if (!success) {
        setError('Failed to create account. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Sign Up</h2>
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your full name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="signup-email"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="your@email.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <div className="flex gap-4">
            <div className="flex items-center">
              <input
                id="teacher-role"
                name="role"
                type="radio"
                value="teacher"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                required
                checked={role === 'teacher'}
                onChange={() => setRole('teacher')}
              />
              <label htmlFor="teacher-role" className="ml-2 block text-sm text-gray-700">
                Teacher
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="student-role"
                name="role"
                type="radio"
                value="student"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                required
                checked={role === 'student'}
                onChange={() => setRole('student')}
              />
              <label htmlFor="student-role" className="ml-2 block text-sm text-gray-700">
                Student
              </label>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;