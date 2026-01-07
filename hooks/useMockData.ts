
import { useMemo } from 'react';

export interface UniversityEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  collegeName: string;
  eligibility: 'My College' | 'All Colleges' | 'Public';
  organizer: string;
  organizerId: string;
  category: 'Tech' | 'Cultural' | 'Sports' | 'Arts' | 'Business' | 'Charity';
  imageUrl: string;
}

// Helper function to generate dynamic dates relative to today
const getDateString = (daysOffset: number): string => {
    const date = new Date();
    date.setDate(date.getDate() + daysOffset);
    return date.toISOString();
};

export const mockEvents: UniversityEvent[] = [
  {
    id: '1',
    title: 'AI & Machine Learning Workshop',
    description: 'Dive into the world of AI with this hands-on workshop by the D.A.T.A Club. Learn about neural networks, data models, and practical applications. Perfect for aspiring data scientists. Laptops required.',
    date: getDateString(25), // 25 days in the future
    location: 'MBU Campus',
    collegeName: 'Mohan Babu University',
    eligibility: 'My College',
    organizer: 'D.A.T.A Club',
    organizerId: 'org1',
    category: 'Tech',
    imageUrl: 'https://picsum.photos/seed/1/800/600',
  },
  {
    id: '2',
    title: 'Sanskriti \'24 - Cultural Fest',
    description: 'Experience the vibrant culture of India at Sanskriti \'24. A week-long extravaganza with music, dance, drama, and art. Open to students from all colleges. Get your passes now!',
    date: getDateString(40), // 40 days in the future
    location: 'SV University Auditorium',
    collegeName: 'IIT Madras',
    eligibility: 'All Colleges',
    organizer: 'Student Cultural Committee',
    organizerId: 'org3',
    category: 'Cultural',
    imageUrl: 'https://picsum.photos/seed/2/800/600',
  },
  {
    id: '3',
    title: 'Robotics Expo (Last Month)',
    description: 'The ISTE student chapter showcased innovative robotics projects, from automated drones to line-following bots. A great learning experience for all engineering students.',
    date: getDateString(-35), // 35 days in the past
    location: 'Tirupati City Center',
    collegeName: 'VIT Vellore',
    eligibility: 'Public',
    organizer: 'ISTE MBU',
    organizerId: 'org4',
    category: 'Tech',
    imageUrl: 'https://picsum.photos/seed/3/800/600',
  },
  {
    id: '4',
    title: 'Entrepreneurship Conclave',
    description: 'Got a startup idea? Hear from successful founders and VCs at the annual E-Conclave. Features a pitching competition with exciting prizes. Hosted by the Business Club of MBU.',
    date: getDateString(55), // 55 days in the future
    location: 'MBU Campus',
    collegeName: 'Mohan Babu University',
    eligibility: 'All Colleges',
    organizer: 'Business Club MBU',
    organizerId: 'org2',
    category: 'Business',
    imageUrl: 'https://picsum.photos/seed/4/800/600',
  },
   {
    id: '5',
    title: 'Inter-Department Cricket Tournament (Missed)',
    description: 'The annual cricket tournament concluded last month with CSE department taking home the trophy. A thrilling series of matches showcasing incredible sportsmanship.',
    date: getDateString(-80), // 80 days in the past
    location: 'MBU Sports Ground',
    collegeName: 'Mohan Babu University',
    eligibility: 'My College',
    organizer: 'Sports Council MBU',
    organizerId: 'org1',
    category: 'Sports',
    imageUrl: 'https://picsum.photos/seed/5/800/600',
  },
  {
    id: '6',
    title: 'IEEE Guest Lecture on VLSI Design',
    description: 'Join the IEEE student branch for an insightful guest lecture on the latest trends in VLSI design by Dr. Arjun Sharma from ISRO. A must-attend for ECE and EEE students.',
    date: getDateString(12), // 12 days in the future
    location: 'MBU Campus',
    collegeName: 'Mohan Babu University',
    eligibility: 'My College',
    organizer: 'IEEE MBU',
    organizerId: 'org5',
    category: 'Tech',
    imageUrl: 'https://picsum.photos/seed/6/800/600',
  },
  {
    id: '7',
    title: 'TAIT Presents: The Art of Theatre',
    description: 'The Artists In Tirupati (TAIT) club presents a workshop on acting, scriptwriting, and stage production. Unleash your inner artist and learn the nuances of theatre.',
    date: getDateString(8), // 8 days in the future
    location: 'Tirupati City Center',
    collegeName: 'Mohan Babu University',
    eligibility: 'Public',
    organizer: 'TAIT Club',
    organizerId: 'org1',
    category: 'Arts',
    imageUrl: 'https://picsum.photos/seed/7/800/600',
  },
  {
    id: '8',
    title: 'Last Week\'s Blood Donation Camp',
    description: 'Thank you to all the students and faculty who participated in the blood donation camp. Your contribution has the power to save lives. Organized in collaboration with the local Red Cross.',
    date: getDateString(-7), // 1 week in the past
    location: 'MBU Campus',
    collegeName: 'Mohan Babu University',
    eligibility: 'Public',
    organizer: 'NSS Wing MBU',
    organizerId: 'org2',
    category: 'Charity',
    imageUrl: 'https://picsum.photos/seed/8/800/600',
  }
];