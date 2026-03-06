import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, X, Key, User } from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'Harshith kolaparthi' && password === 'HK73') {
      onLogin();
      setUsername('');
      setPassword('');
      setError('');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-surface border border-border p-8 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon via-primary to-accent" />
            
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-textSecondary hover:text-white hover:bg-surfaceHover rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center mb-8 mt-2">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-2xl font-display font-bold text-white mb-1">Admin Access</h2>
              <p className="text-sm text-textSecondary text-center">Enter credentials to manage the event</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-textSecondary uppercase tracking-wider mb-2">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-textSecondary" />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-background border border-border pl-12 pr-4 py-3 rounded-xl outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-white placeholder:text-textSecondary/50"
                    placeholder="Enter username"
                    autoFocus
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-textSecondary uppercase tracking-wider mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Key className="w-5 h-5 text-textSecondary" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-background border border-border pl-12 pr-4 py-3 rounded-xl outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-white placeholder:text-textSecondary/50"
                    placeholder="Enter password"
                  />
                </div>
              </div>

              {error && (
                <p className="text-accent text-sm font-medium text-center">{error}</p>
              )}

              <button
                type="submit"
                className="w-full bg-white text-background font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors mt-4"
              >
                LOGIN
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
