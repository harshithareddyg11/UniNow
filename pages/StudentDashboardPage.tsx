
import React from 'react';
import { Routes, Route, useLocation, Outlet } from 'react-router-dom';
import DashboardLayout from '../components/student-dashboard/DashboardLayout';
import OverviewTab from '../components/student-dashboard/tabs/OverviewTab';
import AllEventsTab from '../components/student-dashboard/tabs/AllEventsTab';
import RegisteredEventsTab from '../components/student-dashboard/tabs/RegisteredEventsTab';
import InterestedEventsTab from '../components/student-dashboard/tabs/InterestedEventsTab';
import MissedEventsTab from '../components/student-dashboard/tabs/MissedEventsTab';
import SettingsTab from '../components/student-dashboard/tabs/SettingsTab';
import type { UniversityEvent } from '../hooks/useMockData';

interface StudentDashboardPageProps {
  userCollege: string;
  rsvpedEvents: Set<string>;
  interestedEvents: Set<string>;
  toggleRsvp: (eventId: string) => void;
  toggleInterested: (eventId: string) => void;
  events: UniversityEvent[];
}

// This new layout component wraps each dashboard tab.
// It's responsible for rendering the common UI (sidebar, header) and providing
// the necessary context to all its children via <Outlet />.
const StudentDashboardContentLayout: React.FC<StudentDashboardPageProps> = (props) => {
  const location = useLocation();
  const getTitle = () => {
    const path = location.pathname.split('/').pop();
    switch(path) {
      case 'student-dashboard': return 'Dashboard Overview';
      case 'all-events': return 'All Events';
      case 'my-registered-events': return 'My Registered Events';
      case 'interested-events': return 'Interested Events';
      case 'missed-events': return 'Missed Events';
      case 'settings': return 'Settings';
      default: return 'Dashboard';
    }
  };

  return (
    <DashboardLayout title={getTitle()}>
      {/* The Outlet component renders the matched child route's element (e.g., <OverviewTab />) */}
      {/* and passes the context object down. This makes the data available to any nested */}
      {/* component that calls useOutletContext(), solving the original error. */}
      <Outlet context={props} />
    </DashboardLayout>
  );
};

// The main page component now just sets up the routing structure.
const StudentDashboardPage: React.FC<StudentDashboardPageProps> = (props) => {
  return (
    <Routes>
      <Route element={<StudentDashboardContentLayout {...props} />}>
        <Route path="/" element={<OverviewTab />} />
        <Route path="/all-events" element={<AllEventsTab />} />
        <Route path="/my-registered-events" element={<RegisteredEventsTab />} />
        <Route path="/interested-events" element={<InterestedEventsTab />} />
        <Route path="/missed-events" element={<MissedEventsTab />} />
        <Route path="/settings" element={<SettingsTab />} />
      </Route>
    </Routes>
  );
};

export default StudentDashboardPage;
