import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';


import DashboardPage from './pages/DashboardPage';
import EventDetailPage from './pages/EventDetailPage';
import OrganizerDashboardPage from './pages/OrganizerDashboardPage';
import CreateEventPage from './pages/CreateEventPage';
import StudentDashboardPage from './pages/StudentDashboardPage';

import Layout from './components/Layout';
import { mockEvents, UniversityEvent } from './hooks/useMockData';

export type NewEventData = Omit<
  UniversityEvent,
  'id' | 'collegeName' | 'eligibility'
>;

const App: React.FC = () => {
  const MOCK_USER_COLLEGE = 'Mohan Babu University';

  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isOrganizer, setIsOrganizer] = React.useState(false);

  const [rsvpedEvents, setRsvpedEvents] = React.useState<Set<string>>(
    new Set(['1', '4'])
  );
  const [interestedEvents, setInterestedEvents] = React.useState<Set<string>>(
    new Set(['2', '6'])
  );

  const [events, setEvents] = React.useState<UniversityEvent[]>(
    [...mockEvents].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  );

  const handleLogin = (organizer: boolean) => {
    setIsAuthenticated(true);
    setIsOrganizer(organizer);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsOrganizer(false);
  };

  const addEvent = (eventData: NewEventData) => {
    const newEvent: UniversityEvent = {
      ...eventData,
      id: Date.now().toString(),
      collegeName: MOCK_USER_COLLEGE,
      eligibility: 'My College',
    };
    setEvents(prev => [newEvent, ...prev]);
  };

  const toggleRsvp = (eventId: string) => {
    setRsvpedEvents(prev => {
      const next = new Set(prev);
      next.has(eventId) ? next.delete(eventId) : next.add(eventId);
      return next;
    });
  };

  const toggleInterested = (eventId: string) => {
    setInterestedEvents(prev => {
      const next = new Set(prev);
      next.has(eventId) ? next.delete(eventId) : next.add(eventId);
      return next;
    });
  };

  const ProtectedRoute: React.FC<{
    isAllowed: boolean;
    redirectTo?: string;
    children: React.ReactNode;
  }> = ({ isAllowed, redirectTo = '/login', children }) => {
    return isAllowed ? <>{children}</> : <Navigate to={redirectTo} replace />;
  };

  return (
    <HashRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUpPage />} />
        

        {/* Student dashboard */}
        <Route
          path="/student-dashboard/*"
          element={
            <ProtectedRoute isAllowed={isAuthenticated}>
              <StudentDashboardPage
                userCollege={MOCK_USER_COLLEGE}
                rsvpedEvents={rsvpedEvents}
                interestedEvents={interestedEvents}
                toggleRsvp={toggleRsvp}
                toggleInterested={toggleInterested}
                events={events}
              />
            </ProtectedRoute>
          }
        />

        {/* Layout wrapped routes */}
        <Route
          element={
            <Layout
              isAuthenticated={isAuthenticated}
              isOrganizer={isOrganizer}
              onLogout={handleLogout}
              rsvpedEvents={rsvpedEvents}
              toggleRsvp={toggleRsvp}
              interestedEvents={interestedEvents}
              toggleInterested={toggleInterested}
              userCollege={MOCK_USER_COLLEGE}
              events={events}
              addEvent={addEvent}
            />
          }
        >
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isAllowed={isAuthenticated}>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/events/:id"
            element={
              <ProtectedRoute isAllowed={isAuthenticated}>
                <EventDetailPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/organizer"
            element={
              <ProtectedRoute
                isAllowed={isAuthenticated && isOrganizer}
                redirectTo="/dashboard"
              >
                <OrganizerDashboardPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create-event"
            element={
              <ProtectedRoute
                isAllowed={isAuthenticated && isOrganizer}
                redirectTo="/dashboard"
              >
                <CreateEventPage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
