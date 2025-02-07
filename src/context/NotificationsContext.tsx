'use client';

import { createContext, useContext, useReducer, ReactNode } from 'react';
import type { Notification } from '@/types';

interface NotificationsState {
  notifications: Notification[];
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  page: number;
}

type NotificationsAction =
  | { type: 'SET_NOTIFICATIONS'; payload: Notification[] }
  | { type: 'ADD_NOTIFICATIONS'; payload: Notification[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_HAS_MORE'; payload: boolean }
  | { type: 'INCREMENT_PAGE' }
  | { type: 'RESET_STATE' };

const initialState: NotificationsState = {
  notifications: [],
  isLoading: true,
  error: null,
  hasMore: true,
  page: 1,
};

const NotificationsContext = createContext<{
  state: NotificationsState;
  dispatch: React.Dispatch<NotificationsAction>;
} | null>(null);

function notificationsReducer(state: NotificationsState, action: NotificationsAction): NotificationsState {
  switch (action.type) {
    case 'SET_NOTIFICATIONS':
      return { ...state, notifications: action.payload };
    case 'ADD_NOTIFICATIONS':
      return { ...state, notifications: [...state.notifications, ...action.payload] };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_HAS_MORE':
      return { ...state, hasMore: action.payload };
    case 'INCREMENT_PAGE':
      return { ...state, page: state.page + 1 };
    case 'RESET_STATE':
      return initialState;
    default:
      return state;
  }
}

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(notificationsReducer, initialState);

  return (
    <NotificationsContext.Provider value={{ state, dispatch }}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotificationsContext() {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error('useNotificationsContext must be used within a NotificationsProvider');
  }
  return context;
}