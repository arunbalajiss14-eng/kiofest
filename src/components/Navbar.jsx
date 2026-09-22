import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartCount, toggleCart } from '../redux/slices/cartSlice';
import { selectIsAuthenticated, selectCoordinator, logout } from '../redux/slices/authSlice';
import {
  Sparkles,
  Ticket,
  ShoppingBag,
  Menu,
  X,
  GraduationCap,
  LogOut,
  Lock,
  Zap
} from 'lucide-react';

const TICKER_ITEMS = [
  'REGISTRATIONS OPEN',
  'MARCH 25 – 26, 2026',
  '₹1,50,000+ PRIZE POOL',
  '6 DEPARTMENTS',
  '20+ EVENTS',
  'KIOT CAMPUS, SALEM'
];

export default function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const coordinator = useSelector(selectCoordinator);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'All Events', href: '/events' },
    { name: 'My Passes', href: '/my-tickets' },
    { name: 'Coordinator', href: isAuthenticated ? '/admin' : '/login' },
  ];

  const isActive = (path) => router.pathname === path;
  const tickerRepeat = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Scrolling ticker strip */}
      <div className="w-full bg-brut-yellow text-black border-b-4 border-white overflow-hidden">
        <div className="marquee-track py-1.5">
          {tickerRepeat.map((item, i) => (
            <div key={i} className="flex items-center flex-shrink-0 px-4">
              <Zap className="w-3.5 h-3.5 mr-2 fill-black" />
              <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider whitespace-nowrap">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main nav bar */}
      <div className="fest-glass-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-[72px]">
            {/* Brand Logo: flat square block, not gradient circle */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-11 h-11 bg-fuchsia-500 border-4 border-white flex items-center justify-center shadow-brut-sm group-hover:-rotate-6 transition-transform duration-200">
                <Sparkles className="w-5 h-5 text-black" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="font-black text-lg sm:text-xl tracking-tight text-black">
                    KIOT FEST
                  </span>
                  <span className="bg-brut-yellow text-black text-[10px] font-black px-1.5 py-0.5 border-4 border-white">
                    2026
                  </span>
                </div>
                <p className="text-[11px] text-neutral-600 hidden xs:block font-bold tracking-wide uppercase">
                  Knowledge Institute of Technology
                </p>
              </div>
            </Link>

            {/* Desktop Navigation Links: bordered boxes, not pills */}
            <nav className="hidden md:flex items-center space-x-2">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3.5 py-2 text-sm font-black uppercase tracking-wide border-2 transition-all duration-150 ${
                      active
                        ? 'bg-fuchsia-500 text-black border-white shadow-brut-sm'
                        : 'text-neutral-700 border-transparent hover:text-black hover:bg-white hover:border-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {isAuthenticated ? (
                <div className="hidden sm:flex items-center space-x-2 bg-black px-3 py-1.5 border-4 border-emerald-400">
                  <span className="w-2 h-2 bg-emerald-400" />
                  <span className="text-xs font-black text-white truncate max-w-[120px] uppercase">
                    {coordinator?.name?.split(' ')[0] || 'Coordinator'}
                  </span>
                  <button
                    onClick={() => dispatch(logout())}
                    title="Sign out"
                    className="text-neutral-300 hover:text-rose-400 p-1"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-2 bg-black hover:bg-white hover:text-black border-4 border-white text-xs font-black uppercase text-white transition touch-target"
                >
                  <Lock className="w-3.5 h-3.5 text-brut-yellow" />
                  <span>Coordinator</span>
                </Link>
              )}

              <button
                onClick={() => dispatch(toggleCart())}
                aria-label="View Registration Cart"
                className="relative p-2.5 sm:px-4 sm:py-2.5 bg-black hover:bg-white hover:text-black border-4 border-white text-white transition flex items-center space-x-2 touch-target"
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="hidden sm:inline text-sm font-black uppercase">Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brut-pink text-black text-xs font-black h-5 w-5 border-4 border-white flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Mobile Navigation"
                className="md:hidden p-2.5 bg-black border-4 border-white text-white touch-target"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-brut-pink" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Slide-Out Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[104px] z-50 bg-black border-t-4 border-white p-6 flex flex-col justify-between animate-fadeIn">
          <div className="space-y-3">
            <p className="text-xs font-black text-neutral-400 uppercase tracking-wider px-1">
              Navigation Menu
            </p>
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3.5 text-base font-black uppercase border-2 transition touch-target w-full ${
                    active
                      ? 'bg-fuchsia-500 text-black border-white shadow-brut-sm'
                      : 'text-white border-black hover:border-white'
                  }`}
                >
                  <span>{link.name}</span>
                  <span className="text-xs opacity-60">&rarr;</span>
                </Link>
              );
            })}

            {isAuthenticated ? (
              <button
                onClick={() => {
                  dispatch(logout());
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-between px-4 py-3.5 text-base font-black uppercase text-rose-400 border-4 border-rose-500/40 w-full"
              >
                <span>Sign Out ({coordinator?.name?.split(' ')[0]})</span>
                <LogOut className="w-4 h-4" />
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3.5 text-base font-black uppercase text-brut-yellow border-4 border-black w-full"
              >
                <span>Coordinator Sign In</span>
                <Lock className="w-4 h-4" />
              </Link>
            )}
          </div>

          <div className="pt-6 border-t-2 border-white safe-bottom">
            <div className="flex items-center space-x-3 text-neutral-400 text-xs font-bold uppercase">
              <GraduationCap className="w-5 h-5 text-fuchsia-400 flex-shrink-0" />
              <span>Knowledge Institute of Technology, Kakapalayam, Salem</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
