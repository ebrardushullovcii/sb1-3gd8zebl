import { Notification } from '../types';
import { INITIAL_NOTIFICATIONS } from '../data/mockData';
import { generateMoreNotifications } from '../utils/notifications';
import { PAGINATION } from '../constants/notifications';

const { SIMULATED_DELAY, MAX_PAGES } = PAGINATION;

export class APIError extends Error {
  constructor(
    message: string,
    public code?: string,
    public status?: number
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export class NetworkError extends APIError {
  constructor(message = 'Network error occurred') {
    super(message, 'NETWORK_ERROR', 503);
  }
}

export class NotFoundError extends APIError {
  constructor(message = 'Resource not found') {
    super(message, 'NOT_FOUND', 404);
  }
}

interface FetchNotificationsResponse {
  notifications: Notification[];
  hasMore: boolean;
}

export async function fetchInitialNotifications(): Promise<FetchNotificationsResponse> {
  try {
    await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));
    return {
      notifications: INITIAL_NOTIFICATIONS,
      hasMore: true
    };
  } catch (error) {
    throw new NetworkError('Failed to fetch initial notifications');
  }
}

export async function fetchMoreNotifications(page: number, startId: number): Promise<FetchNotificationsResponse> {
  try {
    if (page > MAX_PAGES) {
      return { notifications: [], hasMore: false };
    }

    await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));
    return {
      notifications: generateMoreNotifications(startId),
      hasMore: page < MAX_PAGES
    };
  } catch (error) {
    throw new NetworkError('Failed to fetch more notifications');
  }
}

export async function markNotificationAsRead(id: number): Promise<void> {
  try {
    await new Promise(resolve => setTimeout(resolve, 200));
    // In a real API, this would update the server
  } catch (error) {
    throw new APIError('Failed to mark notification as read', 'UPDATE_ERROR', 500);
  }
}