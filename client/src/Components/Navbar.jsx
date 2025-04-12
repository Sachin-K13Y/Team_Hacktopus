import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import {
  FaUserCircle,
  FaRegBell,
  FaBell,
  FaSearch,
  FaHome,
  FaBriefcase,
  FaComments,
  FaNewspaper
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Close mobile menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => document.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  const linkClasses = ({ isActive }) =>
    `px-3 py-2 rounded-lg transition-all duration-300 flex items-center ${
      isActive
        ? 'bg-[#FF6D52]/10 text-[#FF6D52] font-medium'
        : 'text-white hover:text-[#FF6D52] hover:bg-[#FF6D52]/5'
    }`;

  const mobileLinkClasses = ({ isActive }) =>
    `px-4 py-2.5 rounded-lg transition-all duration-300 flex items-center text-sm ${
      isActive
        ? 'bg-[#FF6D52] text-white font-medium'
        : 'text-white hover:bg-[#FF6D52]/20'
    }`;

  const toggleProfile = () => {
    setProfileOpen(!profileOpen);
  };

  const toggleNotifications = () => {
    setHasNotifications(!hasNotifications);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 ${
        scrolled
          ? 'backdrop-blur-xl bg-[#082032]/95 shadow-xl py-2'
          : 'backdrop-blur-lg bg-[#082032]/90 py-3'
      } transition-all duration-300`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo without animation */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center"
        >
          <NavLink to="/" className="text-2xl font-bold flex items-center">
            <span className="bg-gradient-to-r from-[#FF6D52] to-[#FF9E52] bg-clip-text text-transparent">
              MargDarshan Hub
            </span>
          </NavLink>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1">
          <NavLink to="/" className={linkClasses}>
            <FaHome className="mr-2" /> Home
          </NavLink>
          <NavLink to="/experience" className={linkClasses}>
            <FaBriefcase className="mr-2" /> Experiences
          </NavLink>
          <NavLink to="/doubts" className={linkClasses}>
            <FaComments className="mr-2" /> Doubt Forum
          </NavLink>
          <NavLink to="/news" className={linkClasses}>
            <FaNewspaper className="mr-2" /> News
          </NavLink>
        </div>

        {/* Desktop Right Side */}
        <div className="hidden lg:flex items-center space-x-4">
          {/* Search Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 text-white hover:text-[#FF6D52] transition-colors"
          >
            <FaSearch className="text-xl" />
          </motion.button>

          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleNotifications}
            className="p-2 relative"
          >
            {hasNotifications ? (
              <FaBell className="text-xl text-[#FF6D52]" />
            ) : (
              <FaRegBell className="text-xl text-white hover:text-[#FF6D52]" />
            )}
            {hasNotifications && (
              <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-[#082032]"></span>
            )}
          </motion.button>

          {/* Profile Dropdown */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleProfile}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <div className="relative">
                <FaUserCircle className="text-3xl text-white hover:text-[#FF6D52] transition-colors" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#082032]"></div>
              </div>
              {profileOpen ? (
                <FiChevronUp className="text-white" />
              ) : (
                <FiChevronDown className="text-white" />
              )}
            </motion.button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-56 bg-[#2C394B] rounded-xl shadow-2xl overflow-hidden z-50"
                >
                  <div className="py-1">
                    <div className="px-4 py-3 border-b border-[#082032]">
                      <p className="text-sm font-medium text-white">Signed in as</p>
                      <p className="text-sm text-[#FF6D52] truncate">student@example.com</p>
                    </div>
                    <NavLink
                      to="/profile"
                      className="block px-4 py-3 text-white hover:bg-[#FF6D52]/10 transition-colors"
                    >
                      Your Profile
                    </NavLink>
                    <NavLink
                      to="/settings"
                      className="block px-4 py-3 text-white hover:bg-[#FF6D52]/10 transition-colors"
                    >
                      Settings
                    </NavLink>
                    {!authenticated ? (
                      <>
                        <NavLink
                          to="/login"
                          className="block px-4 py-3 text-white hover:bg-[#FF6D52]/10 transition-colors"
                        >
                          Login
                        </NavLink>
                        <NavLink
                          to="/sign-up"
                          className="block px-4 py-3 bg-gradient-to-r from-[#FF6D52] to-[#FF9E52] text-white font-medium"
                        >
                          Sign Up
                        </NavLink>
                      </>
                    ) : (
                      <NavLink
                        to="/logout"
                        className="block px-4 py-3 text-white hover:bg-[#FF6D52]/10 transition-colors border-t border-[#082032]"
                      >
                        Logout
                      </NavLink>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          ref={buttonRef}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-white text-2xl focus:outline-none"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </motion.button>

        {/* Mobile Menu Popup */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed top-20 right-4 bg-[#082032] z-40 rounded-xl shadow-2xl overflow-hidden w-64 border border-[#2C394B]"
            >
              <div className="px-3 py-3">
                <div className="flex flex-col space-y-2">
                  <NavLink to="/" className={mobileLinkClasses}>
                    <FaHome className="mr-3" /> Home
                  </NavLink>
                  <NavLink to="/experience" className={mobileLinkClasses}>
                    <FaBriefcase className="mr-3" /> Experiences
                  </NavLink>
                  <NavLink to="/doubts" className={mobileLinkClasses}>
                    <FaComments className="mr-3" /> Doubt Forum
                  </NavLink>
                  <NavLink to="/news" className={mobileLinkClasses}>
                    <FaNewspaper className="mr-3" /> News
                  </NavLink>
                  <NavLink to="/profile" className={mobileLinkClasses}>
                    <FaUserCircle className="mr-3" /> Profile
                  </NavLink>

                  <div className="pt-3 mt-2 border-t border-[#2C394B]">
                    {!authenticated ? (
                      <>
                        <NavLink
                          to="/login"
                          className="block w-full px-4 py-2 mb-2 text-center font-medium rounded-lg bg-[#FF6D52] text-white hover:bg-[#FF8D52] transition-colors text-sm"
                        >
                          Login
                        </NavLink>
                        <NavLink
                          to="/sign-up"
                          className="block w-full px-4 py-2 text-center font-medium rounded-lg bg-transparent border border-[#FF6D52] text-[#FF6D52] hover:bg-[#FF6D52]/10 transition-colors text-sm"
                        >
                          Sign Up
                        </NavLink>
                      </>
                    ) : (
                      <NavLink
                        to="/logout"
                        className="block w-full px-4 py-2 text-center font-medium rounded-lg bg-transparent border border-red-500 text-red-500 hover:bg-red-500/10 transition-colors text-sm"
                      >
                        Logout
                      </NavLink>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Search Bar (Mobile) */}
        {menuOpen && (
          <div className="lg:hidden fixed bottom-1 right-30 z-50">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FF6D52] to-[#FF9E52] shadow-xl flex items-center justify-center text-white"
            >
              <FaSearch className="text-xl" />
            </motion.button>
          </div>
        )}
      </div>
    </motion.nav>
  );
}

export default Navbar;