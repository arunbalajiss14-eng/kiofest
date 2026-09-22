import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCartItems,
  selectTotalAmount,
  selectIsCartOpen,
  setCartOpen,
  removeFromCart,
  clearCart
} from '../redux/slices/cartSlice';
import RegistrationModal from './RegistrationModal';
import {
  X,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Ticket,
  Calendar,
  CreditCard
} from 'lucide-react';

export default function CartDrawer() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const totalAmount = useSelector(selectTotalAmount);
  const isOpen = useSelector(selectIsCartOpen);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCheckoutEvent, setActiveCheckoutEvent] = useState(null);

  if (!isOpen) return null;

  const handleCheckoutSingle = (event) => {
    setActiveCheckoutEvent(event);
    setIsModalOpen(true);
  };

  const handleCheckoutAll = () => {
    if (items.length > 0) {
      setActiveCheckoutEvent(items[0]); // Starts registration flow with first event
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
        {/* Backdrop */}
        <div
          onClick={() => dispatch(setCartOpen(false))}
          className="absolute inset-0 bg-black/70 transition-opacity"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <div className="w-screen max-w-md fest-glass border-l-2 border-fuchsia-500 shadow-pop-lg flex flex-col justify-between text-black">
            {/* Drawer Header */}
            <div className="p-6 border-b border-black/80 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-none bg-fuchsia-500 text-black border-4 border-black">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">Registration Cart</h2>
                  <p className="text-xs text-neutral-600">
                    {items.length} {items.length === 1 ? 'event' : 'events'} selected
                  </p>
                </div>
              </div>

              <button
                onClick={() => dispatch(setCartOpen(false))}
                aria-label="Close cart"
                className="p-2 rounded-none bg-white/80 hover:bg-neutral-100 text-neutral-600 hover:text-black transition touch-target"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body: Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <div className="w-16 h-16 rounded-none bg-white/60 border-4 border-black flex items-center justify-center mx-auto text-neutral-500">
                    <Ticket className="w-8 h-8" />
                  </div>
                  <h3 className="text-base font-bold text-neutral-700">Your Cart is Empty</h3>
                  <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                    Browse technical symposiums, hackathons, and workshops to add them to your registration list.
                  </p>
                </div>
              ) : (
                items.map((event) => (
                  <div
                    key={event.id}
                    className="p-4 rounded-none bg-white/90 border-4 border-black flex items-start justify-between gap-3 hover:border-fuchsia-500 transition"
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-none bg-fuchsia-500 text-black border-2 border-black">
                          {event.department}
                        </span>
                        <span className="text-[10px] text-neutral-600 font-bold uppercase">{event.category}</span>
                      </div>
                      <h4 className="text-sm font-bold text-black line-clamp-1">{event.title}</h4>
                      <div className="flex items-center justify-between text-xs text-neutral-600 pt-1">
                        <span className="text-emerald-400 font-bold">
                          {Number(event.registration_fee) === 0 ? 'Free' : `₹${event.registration_fee}`}
                        </span>
                        <span className="text-[11px]">{event.date}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => dispatch(removeFromCart(event.id))}
                      aria-label={`Remove ${event.title} from cart`}
                      className="p-2 text-neutral-500 hover:text-rose-400 rounded-none hover:bg-white transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Drawer Footer: Total & Checkout CTA */}
            {items.length > 0 && (
              <div className="p-6 border-t-4 border-black bg-black space-y-4 safe-bottom">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-400 font-bold uppercase">Total Registration Fee</span>
                  <span className="text-xl font-black text-white">
                    {totalAmount === 0 ? 'Free Entry' : `₹${totalAmount}`}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => dispatch(clearCart())}
                    className="px-4 py-3 rounded-none bg-white hover:bg-neutral-100 border-3 border-white text-black text-xs font-black uppercase transition"
                  >
                    Clear
                  </button>

                  <button
                    onClick={handleCheckoutAll}
                    className="btn-fest-primary flex-1 py-3.5 rounded-none text-black font-black text-sm shadow-glow-primary hover:scale-[1.02] transition flex items-center justify-center space-x-2 touch-target"
                  >
                    <span>Proceed to Register ({items.length})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Registration Modal triggered from cart */}
      {isModalOpen && (
        <RegistrationModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setActiveCheckoutEvent(null);
          }}
          targetEvent={activeCheckoutEvent}
          onSuccess={() => {
            // Cart will be updated automatically by slice
          }}
        />
      )}
    </>
  );
}
