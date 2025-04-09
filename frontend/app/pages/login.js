// components/Login.js
"use client"
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


const Login = () => {
  const { login, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await login(email, password);
    if (error) setError(error.message);
  };
  if(user){
    router.push('/');
  return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
  <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
    <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Login</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Login
      </button>
    </form>

    {error && <p className="mt-4 text-center text-red-500">{error}</p>}

    <div className="mt-6 text-center">
      <p className="text-sm text-gray-600">
        Don't have an account?{" "}
        <Link href="/signup">
          <button className="text-blue-500 hover:underline font-medium cursor-pointer">Sign Up</button>
        </Link>
      </p>
    </div>
  </div>
</div>
  );
};

export default Login;
