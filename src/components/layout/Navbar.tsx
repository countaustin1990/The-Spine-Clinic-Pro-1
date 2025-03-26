import { useState, useEffect, useMemo, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Activity, User, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { currentUser, logout } = useAuth();
  const location = useLocation();

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = useMemo(
    () => [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: 'Doctors', path: '/doctors' },
      { name: 'Testimonials', path: '/testimonials' },
      { name: 'Blog', path: '/blog' },
      { name: 'Contact', path: '/contact' },
    ],
    []
  );

  const handleLogout = async () => {
    try {
      await logout();
      closeMenu();
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Activity size={28} className="text-sky-600" />
          <span className="text-xl font-bold text-sky-800">The Spine Clinic</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map(({ name, path }) => (
            <Link
              key={name}
              to={path}
              className={`font-medium transition-colors hover:text-sky-600 ${
                location.pathname === path ? 'text-sky-600' : 'text-sky-600'
              }`}
              onClick={closeMenu}
            >
              {name}
            </Link>
          ))}

          {currentUser ? (
            <div className="relative group">
              <Link to="/dashboard" className="flex items-center space-x-1 font-medium text-sky-600">
                <User size={20} />
                <span>Dashboard</span>
              </Link>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <LogOut size={18} className="mr-2" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary py-2">
              Login / Register
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0"
        >
          <div className="container mx-auto py-4 px-4 space-y-3">
            {navLinks.map(({ name, path }) => (
              <Link
                key={name}
                to={path}
                className={`block py-2 font-medium ${
                  location.pathname === path ? 'text-sky-600' : 'text-gray-700'
                }`}
                onClick={closeMenu}
              >
                {name}
              </Link>
            ))}

            {currentUser ? (
              <>
                <Link to="/dashboard" className="block py-2 font-medium text-sky-600" onClick={closeMenu}>
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="block w-full text-left py-2 font-medium text-red-600">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="block py-2 font-medium text-sky-600" onClick={closeMenu}>
                Login / Register
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
