import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, TreePine, LogIn, UserPlus, LogOut } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthenticated = !!localStorage.getItem('token'); 

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/login'); 
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:scale-105 transition-transform">
            <TreePine className="h-8 w-8 text-emerald-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              SkillTree
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-emerald-600 ${
                isActive('/') ? 'text-emerald-600' : 'text-slate-700'
              }`}
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className={`text-sm font-medium transition-colors hover:text-emerald-600 ${
                isActive('/dashboard') ? 'text-emerald-600' : 'text-slate-700'
              }`}
            >
              Dashboard
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-slate-700 hover:text-emerald-600 transition-colors"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-lg">
            <nav className="px-4 py-4 space-y-4">
              <Link
                to="/"
                className={`block text-sm font-medium transition-colors hover:text-emerald-600 ${
                  isActive('/') ? 'text-emerald-600' : 'text-slate-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/dashboard"
                className={`block text-sm font-medium transition-colors hover:text-emerald-600 ${
                  isActive('/dashboard') ? 'text-emerald-600' : 'text-slate-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <div className="pt-4 border-t border-slate-200 space-y-2">
                {isAuthenticated ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-slate-700 hover:text-emerald-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <LogIn className="h-4 w-4" />
                      <span>Login</span>
                    </Link>
                    <Link
                      to="/register"
                      className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <UserPlus className="h-4 w-4" />
                      <span>Register</span>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
