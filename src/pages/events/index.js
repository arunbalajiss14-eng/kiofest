import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchEvents,
  setDepartment,
  selectAllEvents,
  selectDepartmentFilter,
  selectCategoryFilter,
  selectSearchQuery,
  selectEventsStatus,
  selectEventsError,
  resetFilters
} from '../../redux/slices/eventSlice';
import EventCard from '../../components/EventCard';
import EventFilters from '../../components/EventFilters';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import RegistrationModal from '../../components/RegistrationModal';
import { getAllEvents } from '../../lib/db';
import { Sparkles, FilterX, Layers } from 'lucide-react';

export async function getServerSideProps(context) {
  const { dept } = context.query;
  const events = await getAllEvents({ department: dept || 'ALL' });
  return {
    props: {
      initialEvents: events,
      initialDept: dept || 'ALL'
    }
  };
}

export default function EventsCatalogPage({ initialEvents, initialDept }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const events = useSelector(selectAllEvents);
  const selectedDept = useSelector(selectDepartmentFilter);
  const selectedCat = useSelector(selectCategoryFilter);
  const searchQuery = useSelector(selectSearchQuery);
  const status = useSelector(selectEventsStatus);

  const [modalEvent, setModalEvent] = useState(null);

  // Sync URL query params with Redux store on initial load
  useEffect(() => {
    if (initialDept && initialDept !== 'ALL') {
      dispatch(setDepartment(initialDept));
    }
    dispatch(fetchEvents({ department: initialDept || 'ALL', category: 'ALL', search: '' }));
  }, [dispatch, initialDept]);

  const handleFilterRefetch = () => {
    dispatch(
      fetchEvents({
        department: selectedDept,
        category: selectedCat,
        search: searchQuery
      })
    );
  };

  const activeEventsList = events.length > 0 ? events : initialEvents;
  const isLoading = status === 'loading';

  return (
    <>
      <Head>
        <title>All Events & Competitions | KIOT FEST 2026</title>
        <meta
          name="description"
          content="Explore technical hackathons, workshops, circuit debugging, combat robotics, and cultural events across CSE, AI&DS, ECE, MECH, CIVIL, and IT."
        />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-none bg-purple-200 border-4 border-black text-black text-xs font-black uppercase mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Interactive Event Directory</span>
          </div>
          <h1 className="fluid-section-title font-black text-black">
            Discover Competitions & Workshops
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 mt-2">
            Filter by your engineering branch, choose your preferred category, and register directly or add multiple events to your cart.
          </p>
        </div>

        {/* Filter Controls Component */}
        <EventFilters onFilterChange={handleFilterRefetch} />

        {/* Events Grid / Loading / Empty State */}
        {isLoading ? (
          <LoadingSkeleton count={6} />
        ) : activeEventsList.length === 0 ? (
          <div className="text-center py-20 fest-glass rounded-none border-4 border-black space-y-4">
            <div className="w-16 h-16 rounded-none bg-white flex items-center justify-center mx-auto text-neutral-500">
              <FilterX className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-black">No Events Found</h3>
            <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto">
              We couldn&apos;t find any events matching your selected department or search keyword. Try clearing your filters.
            </p>
            <button
              onClick={() => {
                dispatch(resetFilters());
                dispatch(fetchEvents({ department: 'ALL', category: 'ALL', search: '' }));
              }}
              className="btn-fest-primary px-6 py-2.5 rounded-none text-black text-xs font-bold transition shadow-glow-primary touch-target hover:scale-105"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeEventsList.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onQuickRegister={(evt) => setModalEvent(evt)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Quick Registration Modal */}
      {modalEvent && (
        <RegistrationModal
          isOpen={!!modalEvent}
          onClose={() => setModalEvent(null)}
          targetEvent={modalEvent}
        />
      )}
    </>
  );
}
