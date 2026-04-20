import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

interface AdminLoginProps {
  isAuthenticated: boolean;
  onLogin: (username: string, password: string) => boolean;
}

export default function AdminLogin({ isAuthenticated, onLogin }: AdminLoginProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!password.trim()) {
      setError('Ingresa la contrasena');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    const success = onLogin('admin', password);
    if (success) {
      navigate('/admin');
    } else {
      setError('Contrasena incorrecta');
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80"
          alt="Luxury furniture"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-12 left-12 text-white">
          <h2 className="font-serif text-4xl font-medium">Panel de Administracion</h2>
          <p className="mt-2 text-white/70">Gestiona tu tienda de forma sencilla</p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className={`w-full max-w-md transition-transform ${shake ? 'animate-shake' : ''}`}>
          <div className="text-center mb-10">
            <span className="font-serif text-3xl font-medium tracking-wide">PARAGON</span>
            <h1 className="font-serif text-2xl font-medium mt-6">Panel de Administracion</h1>
            <p className="text-sm text-[#595959] mt-2">Ingresa tus credenciales para continuar</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-xs text-[#797979] uppercase tracking-wider font-medium block mb-2">
                Usuario
              </label>
              <input
                type="text"
                value="admin"
                disabled
                className="w-full bg-[#F7F7F7] border border-[#EDEDED] rounded-xl px-4 py-3 text-[#797979] cursor-not-allowed"
              />
            </div>

            <div>
              <label className="text-xs text-[#797979] uppercase tracking-wider font-medium block mb-2">
                Contrasena
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#797979]" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  placeholder="••••••"
                  className="w-full bg-[#F7F7F7] border border-[#EDEDED] rounded-xl pl-11 pr-4 py-3 outline-none focus:border-black transition-colors"
                  autoFocus
                />
              </div>
              {error && (
                <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-red-600" />
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-4 rounded-xl font-medium hover:bg-black/90 transition-colors"
            >
              Ingresar
            </button>
          </form>

          <p className="text-center text-xs text-[#797979] mt-8">
            Credenciales por defecto: admin / admin
          </p>
        </div>
      </div>
    </div>
  );
}
