import type { Timestamp } from 'firebase/firestore';

export interface Connection {
  id: string;
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  dataTransferred: string;
  duration: string;
  rating: number;
  status: 'Completed' | 'Active' | 'Failed';
  timestamp: Timestamp;
}
