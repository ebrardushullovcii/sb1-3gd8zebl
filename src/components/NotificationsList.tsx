'use client';

import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { Badge } from './Badge';
import { SearchInput } from './SearchInput';
import { SortDropdown } from './SortDropdown';
import { LoadingSpinner } from './ui/LoadingSpinner';
import { ErrorState } from './ui/ErrorState';
import { useNotifications } from '@/hooks/useNotifications';
import type { SortOption, Notification } from '@/types';

const SEARCH_DEBOUNCE_MS = 200;
const INTERSECTION_THRESHOLD = 0.1;
const LOADING_PLACEHOLDER_COUNT = 5;

const LoadingPlaceholder = () => (
  <div className="py-8">
    <div className="animate-pulse space-y-3">
      {Array.from({ length: LOADING_PLACEHOLDER_COUNT }, (_, i) => (
        <div key={i} className="grid grid-cols-12 gap-4">
          <div className="col-span-8 md:col-span-9 h-4 bg-gray-200/70 rounded" />
          <div className="col-span-2 md:col-span-2 h-4 bg-gray-200/70 rounded" />
          <div className="col-span-2 md:col-span-1 h-4 bg-gray-200/70 rounded" />
        </div>
      ))}
    </div>
  </div>
);

const NotificationItem = ({ notification }: { notification: Notification }) => (
  <div className="py-3 grid grid-cols-12 hover:bg-white/40 transition-colors">
    <div className={`col-span-8 md:col-span-9 pl-4 ${notification.read ? 'text-gray-500' : 'text-gray-900'}`}>
      {notification.description}
    </div>
    <div className="col-span-2 md:col-span-2 text-sm text-gray-500">
      {notification.date}
    </div>
    <div className="col-span-2 md:col-span-1 text-sm text-gray-500">
      {notification.time}
    </div>
  </div>
);

export function NotificationsList() {
  const [mounted, setMounted] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('All');
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [lastFilteredLength, setLastFilteredLength] = useState(0);

  const {
    notifications,
    isLoading,
    error,
    hasMore,
    resetState,
    loadInitialData,
    loadMore
  } = useNotifications();

  const observerTarget = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredNotifications = useMemo(() => {
    let filtered = notifications;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(notification => 
        notification.description.toLowerCase().includes(query)
      );
    }
    
    if (sortBy === 'Unread') {
      filtered = filtered.filter(notification => !notification.read);
    }
    
    return filtered;
  }, [notifications, sortBy, searchQuery]);

  const unreadCount = useMemo(() => 
    (searchQuery ? filteredNotifications : notifications).filter(n => !n.read).length,
  [notifications, filteredNotifications, searchQuery]);

  const shouldLoadMore = useMemo(() => {
    if (!hasMore) return false;
    if (searchQuery === '' && sortBy === 'All') return true;
    
    const currentLength = filteredNotifications.length;
    const hasNewResults = currentLength > lastFilteredLength;
    setLastFilteredLength(currentLength);
    
    return hasNewResults;
  }, [filteredNotifications.length, hasMore, searchQuery, sortBy, lastFilteredLength]);

  const handleSortChange = useCallback((value: SortOption) => {
    setSortBy(value);
    setIsOpen(false);
    resetState();
    loadInitialData();
  }, [resetState, loadInitialData]);

  const handleSearch = useCallback((value: string) => {
    setSearchQuery(value);
    resetState();

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    
    searchTimeout.current = setTimeout(loadInitialData, SEARCH_DEBOUNCE_MS);
  }, [resetState, loadInitialData]);

  const handleSearchExpand = useCallback(() => {
    setIsSearchExpanded(true);
    setTimeout(() => searchInputRef.current?.focus(), 0);
  }, []);

  const handleSearchClose = useCallback(() => {
    setIsSearchExpanded(false);
    setSearchQuery('');
    resetState();
    loadInitialData();
  }, [resetState, loadInitialData]);

  useEffect(() => {
    loadInitialData();
    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, [loadInitialData]);

  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !isLoading && hasMore) {
          loadMore();
        }
      },
      { threshold: INTERSECTION_THRESHOLD }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.disconnect();
      }
    };
  }, [loadMore, isLoading, hasMore, mounted]);

  if (!mounted) {
    return <LoadingPlaceholder />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={() => window.location.reload()} />;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white/60 backdrop-blur-sm rounded-xl shadow-sm">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold">Unread</h1>
            <Badge count={unreadCount} />
          </div>
          <div className="flex items-center gap-3">
            <SortDropdown
              value={sortBy}
              isOpen={isOpen}
              onToggle={() => setIsOpen(!isOpen)}
              onChange={handleSortChange}
              options={['All', 'Unread']}
            />
            <SearchInput
              ref={searchInputRef}
              isExpanded={isSearchExpanded}
              searchQuery={searchQuery}
              onSearchChange={handleSearch}
              onExpandClick={handleSearchExpand}
              onCloseClick={handleSearchClose}
            />
          </div>
        </div>
      </div>

      <div className="px-4">
        <div 
          className="py-2 grid grid-cols-12 text-sm text-gray-700 font-medium rounded-full mb-2" 
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
        >
          <div className="col-span-8 md:col-span-9 pl-4">Description</div>
          <div className="col-span-2 md:col-span-2">Date</div>
          <div className="col-span-2 md:col-span-1">Time</div>
        </div>

        <div className="max-h-[600px] overflow-y-auto rounded-xl divide-y divide-gray-200/50">
          {isLoading && notifications.length === 0 ? (
            <LoadingPlaceholder />
          ) : filteredNotifications.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              No notifications found
            </div>
          ) : (
            <>
              {filteredNotifications.map(notification => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
              <div ref={observerTarget} className="py-4 text-center">
                {isLoading && (
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                    <LoadingSpinner />
                    Loading more...
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}