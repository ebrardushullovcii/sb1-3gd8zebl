export const PAGINATION = {
  ITEMS_PER_PAGE: 15,
  MAX_PAGES: 5,
  SIMULATED_DELAY: 300,
} as const;

export const NOTIFICATION_TYPES = {
  ORDERS: ['pizza', 'burger', 'pasta', 'salad', 'drink'],
  ACTIONS: ['accepted', 'ready', 'served', 'completed'],
  TABLES: ['A101', 'A102', 'B201', 'B202', 'C301'],
} as const;