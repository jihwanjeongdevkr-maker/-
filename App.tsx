
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Counselors from './components/Counselors';
import Services from './components/Services';
import Booking from './components/Booking';
import Footer from './components/Footer';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: '홈', path: '/' },
    { name: '상담사 소개', path: '/counselors' },
    { name: '상담 분야', path: '/services' },
    { name: '상담 예약', path: '/booking' },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-teal-700">마음안식</Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`${
                  location.pathname === item.path
                    ? 'text-teal-600 font-bold'
                    : 'text-gray-600 hover:text-teal-500'
                } transition-colors duration-200`}
              >
                {item.name}
              </Link>
            ))}
            <Link to="/booking" className="bg-teal-600 text-white px-6 py-2 rounded-full hover:bg-teal-700 transition-colors">
              예약하기
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-gray-600 hover:bg-teal-50 rounded-md"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/counselors" element={<Counselors />} />
            <Route path="/services" element={<Services />} />
            <Route path="/booking" element={<Booking />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
