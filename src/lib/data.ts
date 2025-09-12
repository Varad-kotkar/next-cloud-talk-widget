import { addDays, format } from 'date-fns';

export const expiringFiles = [
  {
    id: 1,
    name: 'Q4-Financials-Draft.docx',
    expires: format(addDays(new Date(), 2), 'MMM dd, yyyy'),
    room: 'Finance Team',
  },
  {
    id: 2,
    name: 'Project-Phoenix-Proposal.pdf',
    expires: format(addDays(new Date(), 5), 'MMM dd, yyyy'),
    room: 'Management',
  },
  {
    id: 3,
    name: 'Marketing-Assets-Jan.zip',
    expires: format(addDays(new Date(), 7), 'MMM dd, yyyy'),
    room: 'Marketing',
  },
];

export const quotes = [
    {
        quote: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
    },
    {
        quote: "Innovation distinguishes between a leader and a follower.",
        author: "Steve Jobs"
    },
    {
        quote: "Strive not to be a success, but rather to be of value.",
        author: "Albert Einstein"
    },
    {
        quote: "The mind is everything. What you think you become.",
        author: "Buddha"
    },
    {
        quote: "Your time is limited, so don’t waste it living someone else’s life.",
        author: "Steve Jobs"
    }
];

export const cleanupSuggestions = [
  {
    id: 'room-1',
    type: 'Inactive Room',
    message: "Room 'Old-Projects' has been inactive for 60 days.",
    action: 'Archive Room',
  },
  {
    id: 'file-1',
    type: 'Stale File',
    message: "File 'archive_2022.zip' hasn't been accessed in over a year.",
    action: 'Delete File',
  },
  {
    id: 'pin-1',
    type: 'Old Pinned Message',
    message: "A message from 6 months ago is still pinned in 'General'.",
    action: 'Unpin Message',
  },
];
