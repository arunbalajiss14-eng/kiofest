import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getAllEvents } from '../lib/db';
import HeroBanner from '../components/HeroBanner';
import EventCard from '../components/EventCard';
import RegistrationModal from '../components/RegistrationModal';
import {
  Sparkles,
  ArrowRight,
  Code,
  Cpu,
  Bot,
  Wrench,
  Building,
  Shield,
  ChevronDown,
  Clock,
  Trophy,
  Plus,
  Minus
} from 'lucide-react';

export async function getStaticProps() {
  const events = await getAllEvents();
  return {
    props: {
      initialEvents: events.slice(0, 6),
      totalEventCount: events.length
    },
    revalidate: 60
  };
}

export default function HomePage({ initialEvents, totalEventCount }) {
  const [selectedEventForModal, setSelectedEventForModal] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);

  const departments = [
    { name: 'Computer Science', code: 'CSE', icon: Code, bg: 'bg-fuchsia-500', text: 'text-black', events: 'Hackathon, Web, Reels', big: true },
    { name: 'AI & Data Science', code: 'AI&DS', icon: Bot, bg: 'bg-white', text: 'text-black', events: 'GenAI Workshop, Prompt Battle' },
    { name: 'Electronics & Comm.', code: 'ECE', icon: Cpu, bg: 'bg-brut-blue', text: 'text-black', events: 'Circuit Debugging, IoT Challenge' },
    { name: 'Mechanical Engg.', code: 'MECH', icon: Wrench, bg: 'bg-brut-yellow', text: 'text-black', events: 'Robo Wars, 3D CAD Master' },
    { name: 'Civil Engineering', code: 'CIVIL', icon: Building, bg: 'bg-emerald-400', text: 'text-black', events: 'Bridge Design, Smart City' },
    { name: 'Information Tech.', code: 'IT', icon: Shield, bg: 'bg-black', text: 'text-white', events: 'CTF Cyber Defense, App Dev' }
  ];

  const faqs = [
    {
      q: 'Who is eligible to participate in KIOT Fest 2026?',
      a: 'All undergraduate and postgraduate engineering, arts, and science students from recognized colleges/universities with a valid college ID card are welcome to participate.'
    },
    {
      q: 'Can a student register for multiple events across different departments?',
      a: 'Yes! You can use our registration cart to add multiple events across departments (e.g. Web Hackathon in CSE and Robo Wars in MECH) as long as their timings do not clash.'
    },
    {
      q: 'How do I receive and present my event pass?',
      a: 'Upon registration, an instant digital QR Pass is generated on your screen. You can also retrieve your pass anytime under the "My Passes" section by entering your college roll number.'
    },
    {
      q: 'Are food and accommodation provided?',
      a: 'Lunch and refreshment kits are provided for all registered participants. Outstation participants requiring hostel accommodation can contact the fest coordinator in advance.'
    }
  ];

  return (
    <>
      <Head>
        <title>KIOT FEST 2026 | National Level Symposium - Knowledge Institute of Technology</title>
      </Head>

      <div className="pb-16">
        <HeroBanner />

        {/* Department Showcase: asymmetric bento grid, not uniform cards */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-b-4 border-white">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-white text-black border-4 border-white text-xs font-black uppercase mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Multi-Disciplinary Excellence</span>
              </div>
              <h2 className="fluid-section-title font-black text-black">Events by Department</h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 max-w-sm">
              Explore flagship competitions, workshops, and symposiums organized by each engineering department.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[150px] sm:auto-rows-[170px]">
            {departments.map((dept, idx) => {
              const IconComp = dept.icon;
              return (
                <Link
                  key={dept.code}
                  href={`/events?dept=${dept.code}`}
                  className={`${dept.bg} ${dept.text} border-3 border-white shadow-brut hover:shadow-brut-lg hover:-translate-x-1 hover:-translate-y-1 transition-all duration-150 p-4 sm:p-5 flex flex-col justify-between ${dept.big ? 'col-span-2 row-span-1' : ''}`}
                >
                  <IconComp className="w-6 h-6 sm:w-7 sm:h-7" />
                  <div>
                    <h3 className="text-sm sm:text-lg font-black leading-tight">{dept.name}</h3>
                    <p className="text-[10px] sm:text-xs font-bold opacity-70 mt-1 line-clamp-1 uppercase">{dept.events}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Featured Events */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-b-4 border-white">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-brut-yellow text-black border-4 border-white text-xs font-black uppercase mb-3">
                <Trophy className="w-3.5 h-3.5" />
                <span>Flagship Highlights</span>
              </div>
              <h2 className="fluid-section-title font-black text-black">Featured Competitions</h2>
            </div>

            <Link
              href="/events"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-black border-4 border-white text-black hover:bg-white hover:text-black font-black text-sm uppercase group transition"
            >
              <span>View All {totalEventCount} Events</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {initialEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onQuickRegister={(evt) => setSelectedEventForModal(evt)}
              />
            ))}
          </div>
        </section>

        {/* 2-Day Schedule: index-card style */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-b-4 border-white">
          <h2 className="fluid-section-title font-black text-black mb-10">Fest Schedule &amp; Timeline</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Day 1 */}
            <div className="bg-black border-3 border-white">
              <div className="flex items-center justify-between bg-fuchsia-500 border-b-3 border-white p-4">
                <div>
                  <span className="text-xs font-black text-black/70 uppercase tracking-wider">Day 1</span>
                  <h3 className="text-xl font-black text-black">March 25, 2026</h3>
                </div>
                <span className="px-3 py-1 bg-black text-fuchsia-400 text-xs font-black uppercase border-4 border-white">
                  Hackathons
                </span>
              </div>

              <div className="divide-y-2 divide-white/20 text-xs sm:text-sm">
                <div className="p-4 flex items-start space-x-3">
                  <Clock className="w-4 h-4 text-fuchsia-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-black text-white">09:00 AM - 09:45 AM</p>
                    <p className="text-neutral-400">Grand Inauguration Ceremony &amp; Chief Guest Keynote (Main Auditorium)</p>
                  </div>
                </div>
                <div className="p-4 flex items-start space-x-3">
                  <Clock className="w-4 h-4 text-brut-yellow flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-black text-white">09:30 AM - 03:30 PM</p>
                    <p className="text-neutral-400">Web Hackathon 2026 &amp; Circuit Debugging Prelims</p>
                  </div>
                </div>
                <div className="p-4 flex items-start space-x-3">
                  <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-black text-white">01:30 PM - 05:00 PM</p>
                    <p className="text-neutral-400">Cyber Defense CTF &amp; CAD 3D Modeling Finals</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Day 2 */}
            <div className="bg-black border-3 border-white">
              <div className="flex items-center justify-between bg-brut-yellow border-b-3 border-white p-4">
                <div>
                  <span className="text-xs font-black text-black/70 uppercase tracking-wider">Day 2</span>
                  <h3 className="text-xl font-black text-black">March 26, 2026</h3>
                </div>
                <span className="px-3 py-1 bg-black text-brut-yellow text-xs font-black uppercase border-4 border-white">
                  Robo Wars
                </span>
              </div>

              <div className="divide-y-2 divide-white/20 text-xs sm:text-sm">
                <div className="p-4 flex items-start space-x-3">
                  <Clock className="w-4 h-4 text-fuchsia-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-black text-white">09:00 AM - 01:00 PM</p>
                    <p className="text-neutral-400">GenAI &amp; LLM Masterclass Hands-on Workshop</p>
                  </div>
                </div>
                <div className="p-4 flex items-start space-x-3">
                  <Clock className="w-4 h-4 text-brut-yellow flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-black text-white">11:00 AM - 04:00 PM</p>
                    <p className="text-neutral-400">Robo Wars Metal Carnage in Open Air Amphitheatre</p>
                  </div>
                </div>
                <div className="p-4 flex items-start space-x-3">
                  <Clock className="w-4 h-4 text-brut-blue flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-black text-white">04:30 PM - 06:00 PM</p>
                    <p className="text-neutral-400">Valedictory Ceremony, Cash Prize &amp; Trophy Distribution</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs: flat bordered accordion with square +/- toggle */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-b-4 border-white">
          <h2 className="fluid-section-title font-black text-black mb-10">Frequently Asked Questions</h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="bg-black border-3 border-white"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between text-white font-black text-sm sm:text-base touch-target"
                  >
                    <span>{faq.q}</span>
                    <span className={`w-7 h-7 flex-shrink-0 flex items-center justify-center border-2 ${isOpen ? 'bg-fuchsia-500 border-white' : 'bg-white border-white'}`}>
                      {isOpen ? <Minus className="w-4 h-4 text-black" /> : <Plus className="w-4 h-4 text-black" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-neutral-400 leading-relaxed border-t-2 border-white/20 pt-3 animate-fadeIn">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="bg-fuchsia-500 border-4 border-white shadow-brut-lg p-8 sm:p-14 text-center">
            <h2 className="text-2xl sm:text-4xl font-black text-black mb-3">
              Ready to Showcase Your Talent?
            </h2>
            <p className="text-xs sm:text-base text-black/70 max-w-xl mx-auto mb-8 font-bold">
              Limited seats are available per department event. Secure your spot and grab exciting certificates and cash prizes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/events"
                className="w-full sm:w-auto px-8 py-3.5 bg-black border-3 border-white shadow-brut text-white font-black text-sm uppercase hover:-translate-y-1 hover:shadow-brut-lg transition touch-target"
              >
                Register For Events Now
              </Link>
              <Link
                href="/my-tickets"
                className="w-full sm:w-auto px-8 py-3.5 bg-white border-3 border-black text-black text-sm font-black uppercase hover:bg-black hover:text-white hover:border-white transition touch-target"
              >
                Lookup Existing Pass
              </Link>
            </div>
          </div>
        </section>
      </div>

      {selectedEventForModal && (
        <RegistrationModal
          isOpen={!!selectedEventForModal}
          onClose={() => setSelectedEventForModal(null)}
          targetEvent={selectedEventForModal}
        />
      )}
    </>
  );
}
