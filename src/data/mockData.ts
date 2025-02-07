import { Notification } from '../types/notification';

export const INITIAL_NOTIFICATIONS: Notification[] = [
  { id: 1, description: '#202 order, "mushroom burger" was "accepted"', date: '6 Jan 2024', time: '11:32', read: false },
  { id: 2, description: '#588 order, "Soda" was Ready.', date: '6 Jan 2024', time: '11:11', read: false },
  { id: 3, description: '#164 order for "Table A101" Placed.', date: '6 Jan 2024', time: '10:59', read: false },
  { id: 4, description: '#202 order was Completed.', date: '5 Jan 2024', time: '18:36', read: true },
  { id: 5, description: '#202 order, "mushroom burger" was "Served".', date: '5 Jan 2024', time: '18:07', read: true },
  { id: 6, description: '#202 order, "mushroom burger" was "Served".', date: '5 Jan 2024', time: '17:55', read: true },
  { id: 7, description: '#202 order was Completed.', date: '5 Jan 2024', time: '17:17', read: true },
  { id: 8, description: '#164 order for "Table A101" Placed.', date: '5 Jan 2024', time: '17:01', read: true },
  { id: 9, description: '#164 order for "Table A101" Placed.', date: '5 Jan 2024', time: '16:24', read: true },
  { id: 10, description: '#202 order was Completed.', date: '5 Jan 2024', time: '16:20', read: true },
  { id: 11, description: '#303 order, "pizza" was "ready"', date: '5 Jan 2024', time: '16:15', read: true },
  { id: 12, description: '#404 order, "pasta" was "served"', date: '5 Jan 2024', time: '16:10', read: true },
  { id: 13, description: '#505 order, "salad" was "completed"', date: '5 Jan 2024', time: '16:05', read: true },
  { id: 14, description: '#606 order for "Table B202" Placed.', date: '5 Jan 2024', time: '16:00', read: true },
  { id: 15, description: '#707 order, "drink" was "accepted"', date: '5 Jan 2024', time: '15:55', read: true }
];