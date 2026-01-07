import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchEvents } from "../lib/events";

import Button from "../components/Button";
import Logo from "../components/Logo";
import {
  CalendarIcon,
  UserGroupIcon,
  PlusCircleIcon,
} from "../components/IconComponents";

const LandingPage: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    fetchEvents().then(({ data }) => {
      setEvents(data ?? []);
    });
  }, []);

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="text-center pt-16">
        <Logo className="h-24 w-24 mx-auto mb-8" />

        <div className="bg-teal-400/20 text-teal-300 text-sm font-bold px-4 py-1 rounded-full inline-block mb-4">
          Your Campus. Your Events.
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
          Discover What's Happening on Campus
        </h1>

        <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-8">
          UniNow is your central hub for all university events. From tech talks to music festivals,
          never miss out on an opportunity to connect and learn.
        </p>

        <div className="mt-12">
          <Link to="/login">
            <Button>Login to Get Started</Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8 text-center">
        <div className="bg-slate-800/30 p-8 rounded-2xl">
          <CalendarIcon className="h-12 w-12 mx-auto text-teal-400 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Find Events Fast</h3>
          <p className="text-slate-400">
            Browse a comprehensive list of all campus activities in one place.
          </p>
        </div>

        <div className="bg-slate-800/30 p-8 rounded-2xl">
          <UserGroupIcon className="h-12 w-12 mx-auto text-teal-400 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Connect with Peers</h3>
          <p className="text-slate-400">
            Join events to meet like-minded students and build your network.
          </p>
        </div>

        <div className="bg-slate-800/30 p-8 rounded-2xl">
          <PlusCircleIcon className="h-12 w-12 mx-auto text-teal-400 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Organize with Ease</h3>
          <p className="text-slate-400">
            Promote your own club or department events to the entire university.
          </p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
