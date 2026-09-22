import React, { useEffect, useState, useRef } from 'react';
import QRCode from 'qrcode';
import {
  Ticket,
  Printer,
  Download,
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  GraduationCap,
  Sparkles
} from 'lucide-react';

export default function TicketPass({ ticket }) {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const ticketRef = useRef(null);

  useEffect(() => {
    if (ticket && ticket.ticket_code) {
      QRCode.toDataURL(ticket.ticket_code, {
        width: 160,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      })
        .then((url) => setQrCodeUrl(url))
        .catch((err) => console.error('QR code generation failed:', err));
    }
  }, [ticket]);

  if (!ticket) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-6 animate-fadeIn">
      {/* Action Buttons (Hidden during printing) */}
      <div className="flex justify-end space-x-3 mb-3 no-print">
        <button
          onClick={handlePrint}
          className="px-4 py-2 rounded-none bg-white hover:bg-neutral-100 text-neutral-800 hover:text-black border-4 border-black text-xs font-bold transition flex items-center space-x-2 touch-target"
        >
          <Printer className="w-4 h-4 text-fuchsia-400" />
          <span>Print Pass</span>
        </button>
      </div>

      {/* Ticket Card */}
      <div
        ref={ticketRef}
        className="fest-ticket-card fest-glass rounded-none overflow-hidden border-4 border-black shadow-pop-lg relative"
      >
        {/* Ticket Header */}
        <div className="bg-fuchsia-500 p-6 text-black border-b-4 border-black relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-none bg-black flex items-center justify-center font-black shadow-pop-sm">
                <Sparkles className="w-5 h-5 text-brut-yellow" />
              </div>
              <div>
                <h2 className="text-xl font-black tracking-tight text-black">KIOT FEST 2026</h2>
                <p className="text-xs text-black/70 font-bold">Knowledge Institute of Technology</p>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-none bg-black border-2 border-white text-emerald-400 text-xs font-black uppercase">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Confirmed Pass</span>
              </span>
            </div>
          </div>
        </div>

        {/* Ticket Body: Two-Column Layout (Info + QR Code) */}
        <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
          {/* Left Column: Event & Student Info */}
          <div className="sm:col-span-2 space-y-4">
            <div>
              <span className="text-[11px] uppercase font-bold text-neutral-600 tracking-wider">
                Event Registered
              </span>
              <h3 className="text-xl font-black text-black mt-0.5">
                {ticket.event_title || 'Technical Symposium Event'}
              </h3>
            </div>

            {/* Student Details Grid */}
            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-none bg-white/80 border-4 border-black text-xs">
              <div>
                <span className="text-neutral-600 block text-[10px] uppercase font-semibold">Attendee Name</span>
                <span className="font-bold text-black text-sm truncate block">{ticket.student_name}</span>
              </div>
              <div>
                <span className="text-neutral-600 block text-[10px] uppercase font-semibold">Roll Number</span>
                <span className="font-bold text-fuchsia-600 font-mono text-sm block">{ticket.roll_no}</span>
              </div>
              <div>
                <span className="text-neutral-600 block text-[10px] uppercase font-semibold">Department / Year</span>
                <span className="font-medium text-neutral-800 block">
                  {ticket.department} • Year {ticket.year_of_study || 3}
                </span>
              </div>
              <div>
                <span className="text-neutral-600 block text-[10px] uppercase font-semibold">College</span>
                <span className="font-medium text-neutral-800 block truncate">{ticket.college || 'KIOT'}</span>
              </div>
            </div>

            {/* Timing & Venue */}
            <div className="flex flex-wrap gap-4 text-xs text-neutral-700">
              <div className="flex items-center space-x-1.5">
                <Calendar className="w-4 h-4 text-fuchsia-400" />
                <span>{ticket.event_date || 'March 25, 2026'}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Clock className="w-4 h-4 text-fuchsia-400" />
                <span>{ticket.event_time || '10:00 AM'}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <MapPin className="w-4 h-4 text-rose-400" />
                <span>{ticket.event_venue || 'KIOT Main Campus'}</span>
              </div>
            </div>
          </div>

          {/* Right Column: QR Code & Verification */}
          <div className="flex flex-col items-center justify-center p-4 rounded-none bg-white/90 border-4 border-black text-center">
            {qrCodeUrl ? (
              <div className="bg-white p-2 rounded-none shadow-pop-sm mb-2">
                <img src={qrCodeUrl} alt="Pass QR Code" className="w-28 h-28 object-contain" />
              </div>
            ) : (
              <div className="w-28 h-28 rounded-none bg-white mb-2 flex items-center justify-center text-xs text-neutral-500">
                Generating QR...
              </div>
            )}

            <span className="text-[10px] text-neutral-600 font-mono font-bold uppercase tracking-wider">
              {ticket.ticket_code}
            </span>
            <p className="text-[9px] text-neutral-500 mt-1">Scan at entrance checkpoint</p>
          </div>
        </div>

        {/* Ticket Footer Security Strip */}
        <div className="bg-white/90 px-6 py-3 border-t border-black/80 flex items-center justify-between text-[11px] text-neutral-600">
          <div className="flex items-center space-x-1">
            <GraduationCap className="w-4 h-4 text-fuchsia-400" />
            <span>KIOT Fest Organizing Committee</span>
          </div>
          <span className="font-mono text-[10px]">VERIFIED PASS</span>
        </div>
      </div>
    </div>
  );
}
