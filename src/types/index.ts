// Common types used across components
export type SortOption = 'All' | 'Unread';

export interface Notification {
  id: number;
  description: string;
  date: string;
  time: string;
  read: boolean;
}