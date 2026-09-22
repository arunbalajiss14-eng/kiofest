import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsAuthenticated,
  selectCoordinator,
  logout
} from '../redux/slices/authSlice';
import {
  ShieldAlert,
  PlusCircle,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Calendar,
  Layers,
  ArrowRight,
  Lock,
  User,
  LogOut,
  Sparkles,
  Trophy,
  Users,
  Trash2
} from 'lucide-react';

export default function AdminPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const coordinator = useSelector(selectCoordinator);

  const [eventsList, setEventsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    department: 'CSE',
    category: 'Technical',
    description: '',
    rules: '',
    date: '2026-03-25',
    time: '10:00 AM - 01:00 PM',
    venue: 'CSE Central Lab',
    team_size: 1,
    registration_fee: 100,
    prize_pool: '₹10,000',
    seats_total: 40,
    banner_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
    coordinator_name: '',
    coordinator_phone: '9876543210'
  });

  // Sync coordinator details to default form values
  useEffect(() => {
    if (coordinator) {
      setFormData((prev) => ({
        ...prev,
        department: coordinator.department !== 'All Departments' ? coordinator.department : 'CSE',
        coordinator_name: coordinator.name
      }));
    }
  }, [coordinator]);

  const loadEvents = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/events');
      const data = await res.json();
      setEventsList(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleDeleteEvent = async (evt) => {
    const confirmed = window.confirm(
      `Delete "${evt.title}"? This will also remove any registrations for this event. This cannot be undone.`
    );
    if (!confirmed) return;

    setDeletingId(evt.id);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await fetch(`/api/events/${evt.id}`, { method: 'DELETE' });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete event');
      }

      setSuccessMsg(`Event "${evt.title}" was deleted.`);
      setEventsList((prev) => prev.filter((e) => e.id !== evt.id));
    } catch (err) {
      setErrorMsg(err.message || 'Error occurred while deleting event');
    } finally {
      setDeletingId(null);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    if (!formData.title.trim() || !formData.description.trim()) {
      setErrorMsg('Please enter both event title and description.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create event');
      }

      setSuccessMsg(`Event "${data.title}" successfully published to KIOT Fest database!`);
      // Reset form
      setFormData({
        title: '',
        department: coordinator?.department !== 'All Departments' ? coordinator?.department || 'CSE' : 'CSE',
        category: 'Technical',
        description: '',
        rules: '',
        date: '2026-03-25',
        time: '10:00 AM - 01:00 PM',
        venue: 'CSE Central Lab',
        team_size: 1,
        registration_fee: 100,
        prize_pool: '₹10,000',
        seats_total: 40,
        banner_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
        coordinator_name: coordinator?.name || '',
        coordinator_phone: '9876543210'
      });
      loadEvents();
    } catch (err) {
      setErrorMsg(err.message || 'Error occurred while creating event');
    } finally {
      setIsSubmitting(false);
    }
  };

  // If not authenticated, show Protected Barrier
  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full fest-glass rounded-none p-8 border-4 border-fuchsia-500 text-center space-y-5 shadow-pop-lg">
          <div className="w-16 h-16 rounded-none bg-rose-500/15 border-4 border-rose-500/40 text-rose-400 flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-black">Coordinator Portal Locked</h2>
            <p className="text-xs sm:text-sm text-neutral-600">
              Only authorized faculty and student coordinators can create and manage symposium events.
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/login?redirect=/admin"
              className="btn-fest-primary w-full py-3.5 rounded-none text-black font-black text-sm shadow-glow-primary hover:scale-[1.02] transition flex items-center justify-center space-x-2 touch-target"
            >
              <User className="w-4 h-4" />
              <span>Sign In as Coordinator</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Coordinator Dashboard | KIOT FEST 2026</title>
      </Head>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Top Coordinator Profile Bar */}
        <div className="fest-glass rounded-none p-4 sm:p-5 border-4 border-black mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-none bg-fuchsia-600 text-black flex items-center justify-center font-bold text-lg shadow-pop-sm">
              {coordinator?.name?.charAt(0) || 'C'}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-sm font-bold text-black">{coordinator?.name}</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-none bg-fuchsia-500/20 text-fuchsia-600 border-4 border-fuchsia-500">
                  {coordinator?.department}
                </span>
              </div>
              <p className="text-xs text-neutral-600">{coordinator?.role || 'Event Coordinator'}</p>
            </div>
          </div>

          <button
            onClick={() => dispatch(logout())}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-none bg-white hover:bg-rose-50 text-neutral-700 hover:text-rose-600 border-4 border-black hover:border-rose-500 text-xs font-semibold transition touch-target"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-none bg-purple-500/10 border-4 border-purple-500/30 text-purple-600 text-xs font-semibold mb-2">
            <ShieldAlert className="w-3.5 h-3.5 text-purple-400" />
            <span>Event Publishing Hub</span>
          </div>
          <h1 className="fluid-section-title font-black text-black">Publish New Fest Event</h1>
          <p className="text-xs sm:text-sm text-neutral-600 mt-2">
            Fill out the event parameters below to immediately make it live for student registrations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Create Event Form (2 Cols) */}
          <div className="lg:col-span-2 fest-glass rounded-none p-6 sm:p-8 border-4 border-black shadow-pop">
            <h2 className="text-xl font-bold text-black mb-6 flex items-center space-x-2">
              <PlusCircle className="w-5 h-5 text-fuchsia-400" />
              <span>Event Details Form</span>
            </h2>

            {successMsg && (
              <div className="mb-6 p-4 rounded-none bg-emerald-500/15 border-4 border-emerald-500/30 text-emerald-600 text-xs flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {errorMsg && (
              <div className="mb-6 p-4 rounded-none bg-rose-500/15 border-4 border-rose-500/30 text-rose-600 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-neutral-700 font-medium mb-1">
                  Event Title <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Autonomous Drone Obstacle Challenge"
                  className="w-full px-4 py-2.5 rounded-none bg-white border-4 border-black text-black focus:border-fuchsia-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-700 font-medium mb-1">Department</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-none bg-white border-4 border-black text-black focus:border-fuchsia-500"
                  >
                    <option value="CSE">CSE</option>
                    <option value="AI&DS">AI&DS</option>
                    <option value="ECE">ECE</option>
                    <option value="MECH">MECH</option>
                    <option value="CIVIL">CIVIL</option>
                    <option value="IT">IT</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-700 font-medium mb-1">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-none bg-white border-4 border-black text-black focus:border-fuchsia-500"
                  >
                    <option value="Technical">Technical</option>
                    <option value="Hackathon">Hackathon</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Non-Technical">Non-Technical</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-neutral-700 font-medium mb-1">
                  Event Description <span className="text-rose-400">*</span>
                </label>
                <textarea
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Provide comprehensive details about what students will learn or build..."
                  className="w-full px-4 py-2.5 rounded-none bg-white border-4 border-black text-black focus:border-fuchsia-500"
                  required
                />
              </div>

              <div>
                <label className="block text-neutral-700 font-medium mb-1">Rules & Guidelines</label>
                <textarea
                  name="rules"
                  rows={2}
                  value={formData.rules}
                  onChange={handleChange}
                  placeholder="1. Max 3 members. 2. Plagiarism leads to disqualification..."
                  className="w-full px-4 py-2.5 rounded-none bg-white border-4 border-black text-black focus:border-fuchsia-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-neutral-700 font-medium mb-1">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-none bg-white border-4 border-black text-black focus:border-fuchsia-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 font-medium mb-1">Time</label>
                  <input
                    type="text"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-none bg-white border-4 border-black text-black"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 font-medium mb-1">Venue</label>
                  <input
                    type="text"
                    name="venue"
                    value={formData.venue}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-none bg-white border-4 border-black text-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-neutral-700 font-medium mb-1">Fee (₹)</label>
                  <input
                    type="number"
                    name="registration_fee"
                    value={formData.registration_fee}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-none bg-white border-4 border-black text-black"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 font-medium mb-1">Prize Pool</label>
                  <input
                    type="text"
                    name="prize_pool"
                    value={formData.prize_pool}
                    onChange={handleChange}
                    placeholder="e.g. ₹10,000"
                    className="w-full px-4 py-2.5 rounded-none bg-white border-4 border-black text-black"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 font-medium mb-1">Total Seats</label>
                  <input
                    type="number"
                    name="seats_total"
                    value={formData.seats_total}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-none bg-white border-4 border-black text-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-700 font-medium mb-1">Coordinator Name</label>
                  <input
                    type="text"
                    name="coordinator_name"
                    value={formData.coordinator_name}
                    onChange={handleChange}
                    placeholder="Faculty / Student lead"
                    className="w-full px-4 py-2.5 rounded-none bg-white border-4 border-black text-black"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 font-medium mb-1">Coordinator Phone</label>
                  <input
                    type="text"
                    name="coordinator_phone"
                    value={formData.coordinator_phone}
                    onChange={handleChange}
                    placeholder="Mobile number"
                    className="w-full px-4 py-2.5 rounded-none bg-white border-4 border-black text-black"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-fest-primary w-full py-3.5 rounded-none text-black font-black text-sm shadow-glow-primary hover:scale-[1.02] transition flex items-center justify-center space-x-2 touch-target"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Publishing to Database...</span>
                    </>
                  ) : (
                    <>
                      <PlusCircle className="w-5 h-5" />
                      <span>Publish Event to Live Catalog</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Live Event Roster */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-black flex items-center space-x-2">
              <Layers className="w-5 h-5 text-amber-400" />
              <span>Live Fest Roster ({eventsList.length})</span>
            </h2>

            <div className="space-y-3 max-h-[700px] overflow-y-auto pr-1">
              {eventsList.map((evt) => (
                <div
                  key={evt.id}
                  className="p-4 rounded-none bg-white/90 border-4 border-black text-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-fuchsia-600 uppercase">{evt.department}</span>
                    <span className="text-neutral-600">
                      {evt.seats_booked} / {evt.seats_total} Booked
                    </span>
                  </div>
                  <h4 className="font-bold text-black text-sm">{evt.title}</h4>
                  <div className="flex items-center justify-between text-neutral-600">
                    <span>{evt.date}</span>
                    <span className="text-emerald-600 font-bold">
                      {Number(evt.registration_fee) === 0 ? 'Free' : `₹${evt.registration_fee}`}
                    </span>
                  </div>
                  <div className="pt-1 flex items-center justify-between">
                    <Link
                      href={`/events/${evt.id}`}
                      className="text-[11px] text-fuchsia-600 hover:text-fuchsia-800 font-semibold flex items-center space-x-1"
                    >
                      <span>View Live Page</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                    <button
                      onClick={() => handleDeleteEvent(evt)}
                      disabled={deletingId === evt.id}
                      className="text-[11px] text-rose-600 hover:text-white hover:bg-rose-600 border-2 border-rose-600 px-2 py-1 font-bold flex items-center space-x-1 transition disabled:opacity-50"
                    >
                      {deletingId === evt.id ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <Trash2 className="w-3 h-3" />
                      )}
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
