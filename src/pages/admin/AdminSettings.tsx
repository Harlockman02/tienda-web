import { useState } from 'react';
import { Store, Lock, Eye, EyeOff, Save } from 'lucide-react';
import type { StoreConfig } from '@/types';

interface AdminSettingsProps {
  storeConfig: StoreConfig;
  onUpdateStoreConfig: (updates: Partial<StoreConfig>) => void;
  onChangePassword: (currentPassword: string, newPassword: string) => boolean;
}

export default function AdminSettings({ storeConfig, onUpdateStoreConfig, onChangePassword }: AdminSettingsProps) {
  const [storeName, setStoreName] = useState(storeConfig.name);
  const [whatsappNumber, setWhatsappNumber] = useState(storeConfig.whatsappNumber);
  const [currency, setCurrency] = useState(storeConfig.currency);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [storeSuccess, setStoreSuccess] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const handleSaveStore = () => {
    onUpdateStoreConfig({
      name: storeName,
      whatsappNumber,
      currency,
    });
    setStoreSuccess(true);
    setTimeout(() => setStoreSuccess(false), 3000);
  };

  const handleChangePassword = () => {
    setPasswordError('');
    setPasswordSuccess(false);

    if (!currentPassword.trim()) {
      setPasswordError('Ingresa la contrasena actual');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError('La nueva contrasena debe tener al menos 6 caracteres');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Las contrasenas no coinciden');
      return;
    }

    const success = onChangePassword(currentPassword, newPassword);
    if (success) {
      setPasswordSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPasswordSuccess(false), 3000);
    } else {
      setPasswordError('La contrasena actual es incorrecta');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="font-serif text-3xl font-medium">Configuracion</h1>
        <p className="text-sm text-[#595959] mt-1">Gestiona la configuracion de tu tienda</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Store Information */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#F1F1F1] p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#D6AE7B]/10 rounded-xl flex items-center justify-center">
              <Store className="w-5 h-5 text-[#D6AE7B]" />
            </div>
            <h2 className="font-serif text-xl font-medium">Informacion de la Tienda</h2>
          </div>

          <div className="space-y-5">
            <div>
              <label className="text-xs text-[#797979] uppercase tracking-wider font-medium block mb-2">
                Nombre de la tienda *
              </label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                placeholder="PARAGON"
                className="w-full bg-[#F7F7F7] border border-[#EDEDED] rounded-xl px-4 py-3 outline-none focus:border-black transition-colors"
              />
              <p className="text-xs text-[#797979] mt-1">Este nombre aparecera en el logo y titulo de la web</p>
            </div>

            <div>
              <label className="text-xs text-[#797979] uppercase tracking-wider font-medium block mb-2">
                Numero de WhatsApp *
              </label>
              <input
                type="text"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                placeholder="+5215512345678"
                className="w-full bg-[#F7F7F7] border border-[#EDEDED] rounded-xl px-4 py-3 outline-none focus:border-black transition-colors"
              />
              <p className="text-xs text-[#797979] mt-1">Formato: +52 seguido del numero (sin espacios)</p>
            </div>

            <div>
              <label className="text-xs text-[#797979] uppercase tracking-wider font-medium block mb-2">
                Moneda
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full bg-[#F7F7F7] border border-[#EDEDED] rounded-xl px-4 py-3 outline-none focus:border-black transition-colors appearance-none"
              >
                <option value="MXN">MXN - Peso Mexicano</option>
                <option value="USD">USD - Dolar Estadounidense</option>
                <option value="EUR">EUR - Euro</option>
              </select>
            </div>

            {/* Preview */}
            <div className="bg-[#FAFAFA] rounded-xl p-6 text-center">
              <p className="text-xs text-[#797979] uppercase tracking-wider mb-3">Vista previa del logo</p>
              <span className="font-serif text-3xl font-medium tracking-wide">
                {storeName || 'PARAGON'}
              </span>
            </div>

            <button
              onClick={handleSaveStore}
              className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-black/90 transition-colors"
            >
              <Save className="w-4 h-4" />
              Guardar Configuracion
            </button>

            {storeSuccess && (
              <p className="text-sm text-green-600 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-600" />
                Configuracion guardada correctamente
              </p>
            )}
          </div>
        </div>

        {/* Admin Account */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#F1F1F1] p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-black/5 rounded-xl flex items-center justify-center">
              <Lock className="w-5 h-5 text-black" />
            </div>
            <h2 className="font-serif text-xl font-medium">Cuenta de Administrador</h2>
          </div>

          <div className="space-y-5">
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
                Contrasena actual *
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => { setCurrentPassword(e.target.value); setPasswordError(''); }}
                  placeholder="••••••"
                  className="w-full bg-[#F7F7F7] border border-[#EDEDED] rounded-xl px-4 py-3 pr-12 outline-none focus:border-black transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#797979]"
                >
                  {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs text-[#797979] uppercase tracking-wider font-medium block mb-2">
                Nueva contrasena *
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => { setNewPassword(e.target.value); setPasswordError(''); }}
                  placeholder="Minimo 6 caracteres"
                  className="w-full bg-[#F7F7F7] border border-[#EDEDED] rounded-xl px-4 py-3 pr-12 outline-none focus:border-black transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#797979]"
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs text-[#797979] uppercase tracking-wider font-medium block mb-2">
                Confirmar contrasena *
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setPasswordError(''); }}
                placeholder="Repite la nueva contrasena"
                className="w-full bg-[#F7F7F7] border border-[#EDEDED] rounded-xl px-4 py-3 outline-none focus:border-black transition-colors"
              />
            </div>

            {passwordError && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                {passwordError}
              </p>
            )}

            {passwordSuccess && (
              <p className="text-sm text-green-600 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-600" />
                Contrasena cambiada exitosamente
              </p>
            )}

            <button
              onClick={handleChangePassword}
              className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-black/90 transition-colors"
            >
              <Lock className="w-4 h-4" />
              Cambiar Contrasena
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
