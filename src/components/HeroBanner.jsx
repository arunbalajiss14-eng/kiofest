import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Calendar,
  MapPin,
  Trophy,
  ArrowRight,
  Sparkles,
  Ticket,
  ArrowUpRight
} from 'lucide-react';

export default function HeroBanner() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const festTargetDate = new Date('2026-03-25T09:00:00').getTime();
    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = festTargetDate - now;
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative border-b-4 border-white pt-8 pb-10 sm:pt-12 sm:pb-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Asymmetric split: headline block left, sticker collage right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-start">
          {/* Left: Headline column (7/12) */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-brut-yellow text-black border-4 border-white shadow-brut-sm mb-6 -rotate-1">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs sm:text-sm font-black uppercase tracking-wide">Annual National Level Inter-College Fest</span>
            </div>

            <h1 className="fluid-hero-title font-black tracking-tight text-black mb-5">
              Unleash Your<br />
              Innovation at{' '}
              <span className="bg-brut-yellow text-black px-2 inline-block -rotate-1 mt-1">
                KIOT FEST 2026
              </span>
            </h1>

            <p className="fluid-subtext text-neutral-700 max-w-xl mb-8 leading-relaxed border-l-4 border-fuchsia-500 pl-4">
              Join South India&apos;s premier symposium of Hackathons, Technical Paper Presentations, Combat Robotics, AI Masterclasses, and Cultural Celebrations.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              <Link
                href="/events"
                className="btn-fest-primary px-8 py-4 text-black font-black text-base flex items-center justify-center space-x-2 touch-target uppercase"
              >
                <span>Explore All Events</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/my-tickets"
                className="px-6 py-4 bg-black hover:bg-white hover:text-black border-3 border-white text-white font-black text-base transition flex items-center justify-center space-x-2 touch-target uppercase"
              >
                <Ticket className="w-5 h-5 text-brut-yellow" />
                <span>Find My Passes</span>
              </Link>
            </div>

            {/* Countdown as a single hard-bordered strip, not 4 separate glass cards */}
            <div className="inline-flex flex-wrap bg-black border-3 border-white shadow-brut">
              {[
                { label: 'Days', val: timeLeft.days },
                { label: 'Hours', val: timeLeft.hours },
                { label: 'Minutes', val: timeLeft.minutes },
                { label: 'Seconds', val: timeLeft.seconds }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`px-4 sm:px-6 py-3 text-center ${idx !== 0 ? 'border-l-2 border-white' : ''}`}
                >
                  <div className="text-2xl sm:text-3xl font-black text-brut-yellow font-mono">
                    {String(item.val).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] font-black text-neutral-400 uppercase tracking-wider mt-0.5">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Sticker collage of key facts (5/12) — replaces centered pill row */}
          <div className="lg:col-span-5 relative pt-4 lg:pt-10">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 sticker bg-fuchsia-500 border-3 border-white shadow-brut p-5">
                <Trophy className="w-6 h-6 text-black mb-2" />
                <p className="text-2xl font-black text-black leading-none">₹1,50,000+</p>
                <p className="text-xs font-black text-black/70 uppercase mt-1">Total Prize Pool</p>
              </div>

              <div className="sticker bg-white border-3 border-white shadow-brut-pink p-4">
                <Calendar className="w-5 h-5 text-black mb-2" />
                <p className="text-sm font-black text-black leading-tight">March 25 &ndash; 26</p>
                <p className="text-[10px] font-bold text-black/60 uppercase mt-1">2026</p>
              </div>

              <div className="sticker bg-brut-blue border-3 border-white shadow-brut p-4">
                <MapPin className="w-5 h-5 text-black mb-2" />
                <p className="text-sm font-black text-black leading-tight">KIOT Campus</p>
                <p className="text-[10px] font-bold text-black/70 uppercase mt-1">Salem, TN</p>
              </div>

              <div className="sticker bg-brut-yellow border-3 border-white shadow-brut p-4">
                <p className="text-2xl font-black text-black leading-none">6+</p>
                <p className="text-[10px] font-black text-black/70 uppercase mt-1">Departments</p>
              </div>

              <div className="sticker bg-black border-3 border-emerald-400 shadow-brut p-4">
                <p className="text-2xl font-black text-emerald-400 leading-none">1,500+</p>
                <p className="text-[10px] font-black text-neutral-400 uppercase mt-1">Students Registered</p>
              </div>

              <Link
                href="/events"
                className="col-span-2 flex items-center justify-between bg-white border-3 border-white shadow-brut p-4 hover:bg-brut-yellow transition-colors group"
              >
                <span className="text-sm font-black text-black uppercase">20+ Technical &amp; Cultural Events</span>
                <ArrowUpRight className="w-5 h-5 text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
