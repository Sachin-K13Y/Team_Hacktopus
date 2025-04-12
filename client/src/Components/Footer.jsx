import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#082032] text-white py-6 px-6 flex flex-col md:flex-row justify-between items-center shadow-md">
      {/* Navigation Links */}
      <div className="mb-4 md:mb-0">
        <h3 className="text-lg font-semibold text-[#FF6D52] mb-2">Quick Links</h3>
        <ul className="space-y-2">
          <li>
            <Link to="/" className="hover:text-[#FF6D52] transition duration-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/experience" className="hover:text-[#FF6D52] transition duration-300">
              Experience
            </Link>
          </li>
          <li>
            <Link to="/doubts" className="hover:text-[#FF6D52] transition duration-300">
              Doubt Forum
            </Link>
          </li>
          <li>
            <Link to="/profile" className="hover:text-[#FF6D52] transition duration-300">
              Profile
            </Link>
          </li>
        </ul>
      </div>

      {/* Contact Information */}
      <div className="mb-4 md:mb-0 text-center">
        <h3 className="text-lg font-semibold text-[#FF6D52] mb-2">Contact Us</h3>
        <p>Email: support@margdarshanhub.com</p>
        <p>Phone: +1-123-456-7890</p>
      </div>

      {/* Copyright and Social Links */}
      <div className="text-center md:text-right">
        <p className="mb-2">&copy; {new Date().getFullYear()} MargDarshan Hub. All rights reserved.</p>
        <div className="flex justify-center md:justify-end space-x-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FF6D52] hover:text-[#FF6D52] transition duration-300"
          >
            Facebook
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FF6D52] hover:text-[#FF6D52] transition duration-300"
          >
            Twitter
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FF6D52] hover:text-[#FF6D52] transition duration-300"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;