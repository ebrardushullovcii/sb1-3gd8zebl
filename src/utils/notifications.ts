import { Notification } from '../types';
import { NOTIFICATION_TYPES } from '../constants/notifications';

const { ORDERS, ACTIONS, TABLES } = NOTIFICATION_TYPES;

export const formatDate = (date: Date): string => 
  date.toLocaleDateString('en-GB', { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  });

export const formatTime = (date: Date): string =>
  date.toLocaleTimeString('en-GB', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

function generateOrderDescription(orderId: number, order: typeof ORDERS[number], action: typeof ACTIONS[number]): string {
  return `#${orderId} order, "${order}" was "${action}"`;
}

function generateTableDescription(orderId: number, tableNumber: typeof TABLES[number]): string {
  return `#${orderId} order for "Table ${tableNumber}" Placed.`;
}

export function generateMoreNotifications(startId: number): Notification[] {
  const newNotifications: Notification[] = [];
  
  for (let i = 0; i < 15; i++) {
    const orderId = Math.floor(Math.random() * 1000);
    const date = new Date();
    date.setHours(date.getHours() - (i * 2));
    
    const isTablePlacement = Math.random() > 0.8;
    
    const description = isTablePlacement
      ? generateTableDescription(
          orderId,
          TABLES[Math.floor(Math.random() * TABLES.length)]
        )
      : generateOrderDescription(
          orderId,
          ORDERS[Math.floor(Math.random() * ORDERS.length)],
          ACTIONS[Math.floor(Math.random() * ACTIONS.length)]
        );
    
    newNotifications.push({
      id: startId + i,
      description,
      date: formatDate(date),
      time: formatTime(date),
      read: true
    });
  }
  
  return newNotifications;
}