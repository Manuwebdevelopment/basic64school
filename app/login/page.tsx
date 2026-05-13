"use client";

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';

export default function LoginPage() {
  const { login, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      window.location.href = '/';
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '1rem' }}>
      <h1 style={{ fontFamily: "'Press Start 2P', monospace", color: '#00ff00' }}>LOGIN</h1>
      <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
        <button style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}>
          Continue with Google
        </button>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }} />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" style={{ width: '100%', padding: '0.5rem' }}>Login</button>
      </form>
    </div>
  );
}
