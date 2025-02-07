'use client';

import { useCallback } from 'react';
import { useNotificationsContext } from '@/context/NotificationsContext';
import { fetchInitialNotifications, fetchMoreNotifications, APIError } from '@/services/api';

export function useNotifications() {
  const { state, dispatch } = useNotificationsContext();
  const { notifications, isLoading, error, hasMore, page } = state;

  const resetState = useCallback(() => {
    dispatch({ type: 'RESET_STATE' });
  }, [dispatch]);

  const loadInitialData = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await fetchInitialNotifications();
      dispatch({ type: 'SET_NOTIFICATIONS', payload: response.notifications });
      dispatch({ type: 'SET_HAS_MORE', payload: response.hasMore });
    } catch (err) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: err instanceof APIError ? err.message : 'An unexpected error occurred'
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [dispatch]);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;
    
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });
    
    try {
      const response = await fetchMoreNotifications(page, notifications.length + 1);
      dispatch({ type: 'ADD_NOTIFICATIONS', payload: response.notifications });
      dispatch({ type: 'SET_HAS_MORE', payload: response.hasMore });
      dispatch({ type: 'INCREMENT_PAGE' });
    } catch (err) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: err instanceof APIError ? err.message : 'An unexpected error occurred'
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [isLoading, hasMore, page, notifications.length, dispatch]);

  return {
    notifications,
    isLoading,
    error,
    hasMore,
    resetState,
    loadInitialData,
    loadMore,
  };
}