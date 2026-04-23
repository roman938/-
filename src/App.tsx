import { useState } from 'react';
import Login from './components/Login';
import MainPage from './components/MainPage';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="min-h-screen bg-[#050510] flex justify-center w-full font-sans">
      <div className="w-full max-w-md bg-gradient-to-b from-rose-950 via-pink-950 to-indigo-950 relative min-h-screen shadow-[0_0_40px_rgba(236,72,153,0.15)] overflow-x-hidden">
        {isAuthenticated ? (
          <MainPage />
        ) : (
          <Login onLogin={() => setIsAuthenticated(true)} />
        )}
      </div>
    </div>
  );
}

