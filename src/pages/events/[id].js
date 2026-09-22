import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, selectCartItems, setCartOpen } from '../../redux/slices/cartSlice';
import { getEventById, getAllEvents } from '../../lib/db';
import RegistrationModal from '../../components/RegistrationModal';
import {
  Calendar,
  Clock,
  MapPin,
  Trophy,
  Users,
  Phone,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Share2,
  ShieldCheck,
  Check,
  Plus
} from 'lucide-react';

export async function getStaticPaths() {
  const events = await getAllEvents();
  const paths = events.map((event) => ({
    params: { id: event.id.toString() }
  }));

  return {
    paths,
    fallback: 'blocking' // Enables dynamic pages for newly added events
  };
}

export async function getStaticProps({ params }) {
  const rawEvent = await getEventById(params.id);

  if (!rawEvent) {
    return { notFound: true };
  }

  // Strict JSON serialization guarantee: converts any Date instances to string
  const event = JSON.parse(
    JSON.stringify(rawEvent, (key, value) => {
      if (value instanceof Date) {
        return value.toISOString().split('T')[0];
      }
      return value;
    })
  );

  return {
    props: { event },
    revalidate: 30 // ISR
  };
}

export default function EventDetailPage({ event }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (router.isFallback) {
    return (
      <div className="min-h-screen flex items-center justify-center text-black">
        <p className="text-lg">Loading Event Details...</p>
      </div>
    );
  }

  const isInCart = cartItems.some((item) => item.id === event.id);
  const isSoldOut = Number(event.seats_booked) >= Number(event.seats_total);
  const seatsRemaining = Math.max(0, Number(event.seats_total) - Number(event.seats_booked));
  const bookedPercent = Math.min(100, Math.round((Number(event.seats_booked) / Number(event.seats_total)) * 100));

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleAddToCart = () => {
    if (!isInCart && !isSoldOut) {
      dispatch(addToCart(event));
      dispatch(setCartOpen(true));
    }
  };

  return (
    <>
      <Head>
        <title>{`${event.title} | KIOT FEST 2026`}</title>
        <meta name="description" content={event.description} />
        <meta property="og:title" content={`${event.title} - KIOT Fest 2026`} />
        <meta property="og:description" content={event.description} />
        <meta property="og:image" content={event.banner_url} />
      </Head>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          href="/events"
          className="inline-flex items-center space-x-2 text-xs sm:text-sm font-semibold text-neutral-600 hover:text-black mb-6 group touch-target"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to All Events</span>
        </Link>

        {/* Hero Banner Card */}
        <div className="fest-glass rounded-none overflow-hidden border-4 border-fuchsia-500 shadow-pop-lg relative mb-8">
          <div className="relative h-64 sm:h-96 w-full">
            <img
              src={event.banner_url}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

            {/* Badges on Image */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
              <div className="flex gap-2">
                <span className="px-3 py-1 rounded-none bg-fuchsia-600/90 text-black font-bold text-xs shadow-pop-sm">
                  {event.department} Department
                </span>
                <span className="px-3 py-1 rounded-none bg-white/80 text-neutral-800 font-semibold text-xs border-4 border-black/60">
                  {event.category}
                </span>
              </div>

              <button
                onClick={handleShare}
                aria-label="Share Event"
                className="p-2.5 rounded-none bg-white/80 text-neutral-700 hover:text-black border-4 border-black/60 transition flex items-center space-x-1.5 text-xs font-semibold touch-target"
              >
                <Share2 className="w-4 h-4 text-fuchsia-400" />
                <span>{copiedLink ? 'Copied URL!' : 'Share'}</span>
              </button>
            </div>

            {/* Bottom Title on Image */}
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                {event.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Two-Column Grid: Info & Registration */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Details & Rules */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description Card */}
            <div className="fest-glass rounded-none p-6 sm:p-8 border-4 border-black space-y-4">
              <h2 className="text-lg font-bold text-black flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>About the Event</span>
              </h2>
              <p className="text-neutral-700 text-sm leading-relaxed whitespace-pre-line">
                {event.description}
              </p>
            </div>

            {/* Rules & Guidelines Card */}
            {event.rules && (
              <div className="fest-glass rounded-none p-6 sm:p-8 border-4 border-black space-y-4">
                <h2 className="text-lg font-bold text-black flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-fuchsia-400" />
                  <span>Rules & Guidelines</span>
                </h2>
                <div className="text-neutral-700 text-sm leading-relaxed whitespace-pre-line bg-white/60 p-4 rounded-none border-4 border-black">
                  {event.rules}
                </div>
              </div>
            )}

            {/* Coordinator Info */}
            <div className="fest-glass rounded-none p-6 sm:p-8 border-4 border-black space-y-4">
              <h2 className="text-lg font-bold text-black flex items-center space-x-2">
                <Users className="w-5 h-5 text-emerald-400" />
                <span>Event Coordinators</span>
              </h2>
              <div className="p-4 rounded-none bg-white/60 border-4 border-black flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-black">{event.coordinator_name || 'Department Faculty Coordinator'}</p>
                  <p className="text-xs text-neutral-600">{event.department} Department, KIOT</p>
                </div>
                {event.coordinator_phone && (
                  <a
                    href={`tel:${event.coordinator_phone}`}
                    className="inline-flex items-center space-x-2 px-4 py-2 rounded-none bg-white hover:bg-neutral-100 text-fuchsia-600 border-4 border-black text-xs font-semibold transition touch-target"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{event.coordinator_phone}</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Registration Card & Seat Progress */}
          <div className="space-y-6">
            <div className="fest-glass rounded-none p-6 sm:p-8 border-4 border-fuchsia-500 sticky top-24 space-y-6">
              {/* Fee & Prize */}
              <div className="space-y-3 pb-6 border-b border-black">
                <div>
                  <span className="text-[10px] uppercase font-bold text-neutral-600 tracking-wider">Registration Fee</span>
                  <p className="text-3xl font-black text-black">
                    {Number(event.registration_fee) === 0 ? 'Free Entry' : `₹${event.registration_fee}`}
                  </p>
                </div>

                {event.prize_pool && (
                  <div className="flex items-center space-x-2 text-amber-600 font-bold text-sm bg-amber-500/10 p-2.5 rounded-none border-4 border-amber-500/20">
                    <Trophy className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>Prize: {event.prize_pool}</span>
                  </div>
                )}
              </div>

              {/* Timing & Venue */}
              <div className="space-y-3 text-xs sm:text-sm text-neutral-700">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-4 h-4 text-fuchsia-400 flex-shrink-0" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-fuchsia-400 flex-shrink-0" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  <span>{event.venue}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <span>Team Size: Max {event.team_size || 1} Student(s)</span>
                </div>
              </div>

              {/* Seat Availability Progress Bar */}
              <div className="space-y-2 pt-4 border-t border-black">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-600">Seat Capacity</span>
                  <span className="font-bold text-black">
                    {event.seats_booked} / {event.seats_total} Booked
                  </span>
                </div>
                <div className="w-full h-2 rounded-none bg-white overflow-hidden">
                  <div
                    className={`h-full rounded-none transition-all duration-500 ${
                      isSoldOut ? 'bg-rose-500' : bookedPercent > 80 ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${bookedPercent}%` }}
                  />
                </div>
                <p className="text-[11px] text-neutral-600">
                  {isSoldOut ? (
                    <span className="text-rose-600 font-bold">Housefull! Registrations closed.</span>
                  ) : (
                    <span className="text-emerald-600 font-bold">{seatsRemaining} seats remaining</span>
                  )}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                {isSoldOut ? (
                  <button
                    disabled
                    className="w-full py-3.5 rounded-none bg-white text-neutral-500 font-bold text-sm cursor-not-allowed text-center touch-target"
                  >
                    Event Sold Out
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="btn-fest-primary w-full py-3.5 rounded-none text-black font-black text-sm shadow-glow-primary hover:scale-[1.02] transition touch-target"
                    >
                      Instant Register (Generate Pass)
                    </button>

                    {isInCart ? (
                      <button
                        onClick={() => dispatch(setCartOpen(true))}
                        className="w-full py-3 rounded-none bg-emerald-500/20 text-emerald-600 font-bold text-xs border-4 border-emerald-500/40 flex items-center justify-center space-x-1.5 touch-target"
                      >
                        <Check className="w-4 h-4" />
                        <span>View in Registration Cart</span>
                      </button>
                    ) : (
                      <button
                        onClick={handleAddToCart}
                        className="w-full py-3 rounded-none bg-white hover:bg-neutral-100 text-neutral-800 hover:text-black border-4 border-black text-xs font-semibold transition flex items-center justify-center space-x-1.5 touch-target"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add to Multi-Event Cart</span>
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      {isModalOpen && (
        <RegistrationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          targetEvent={event}
        />
      )}
    </>
  );
}
