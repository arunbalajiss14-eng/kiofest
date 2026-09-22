import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  MapPin,
  Phone,
  Mail,
  GraduationCap,
  Heart
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-black border-t-4 border-white text-neutral-400 text-xs sm:text-sm mt-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-2 bg-brut-yellow" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Brand & College Info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-fuchsia-500 border-3 border-white flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-black" />
              </div>
              <span className="text-lg font-black text-white tracking-tight">KIOT FEST 2026</span>
            </div>
            <p className="text-neutral-400 text-xs leading-relaxed max-w-md">
              Knowledge Institute of Technology (KIOT) is a premier engineering institution in Salem, Tamil Nadu, committed to academic excellence, innovation, and technological leadership.
            </p>
            <div className="pt-2 flex items-center space-x-2 text-brut-yellow font-bold text-xs uppercase">
              <GraduationCap className="w-4 h-4" />
              <span>Department of Computer Science &amp; Engineering</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-black uppercase tracking-wider text-xs border-b-2 border-white pb-2">Quick Links</h4>
            <ul className="space-y-2 text-xs pt-1">
              <li>
                <Link href="/" className="text-neutral-400 hover:text-brut-yellow transition">
                  Fest Home
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-neutral-400 hover:text-brut-yellow transition">
                  All Events &amp; Competitions
                </Link>
              </li>
              <li>
                <Link href="/my-tickets" className="text-neutral-400 hover:text-brut-yellow transition">
                  My Registration Passes
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-neutral-400 hover:text-brut-yellow transition">
                  Coordinator Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Venue */}
          <div className="space-y-3">
            <h4 className="text-white font-black uppercase tracking-wider text-xs border-b-2 border-white pb-2">Contact &amp; Venue</h4>
            <div className="space-y-2 text-xs text-neutral-400 pt-1">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-fuchsia-400 flex-shrink-0 mt-0.5" />
                <span>KIOT Campus, KIOT Knowledge Outreach Building, Kakapalayam (PO), Salem - 637504.</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-fuchsia-400 flex-shrink-0" />
                <span>kiotfest2026@kiot.ac.in</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>+91 98765 43210 / 0427-2433900</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t-2 border-white flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <p>© 2026 Knowledge Institute of Technology. All rights reserved.</p>
          <p className="flex items-center space-x-1">
            <span>Crafted for 3rd Year CSE Workshop with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>using React, Redux &amp; Next.js</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
