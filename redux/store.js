// redux/store.js
import { configureStore } from '@reduxjs/toolkit';

// Import all slices
import authReducer from './slices/authSlice';
import freelancerReducer from './slices/freelancerSlice';
import messageReducer from './slices/messageSlice';
import projectReducer from './slices/projectSlice';

/**
 * Main Redux Store Configuration
 * 
 * This store combines all the slices (reducers) for the FreelanceHub application.
 * Redux Toolkit's configureStore automatically sets up:
 * - The Redux DevTools Extension
 * - Thunk middleware for async logic
 * - Development checks for common mistakes
 */

export const store = configureStore({
  reducer: {
    // Authentication state (user login, tokens, profile)
    auth: authReducer,
    
    // Freelancer management (browse, filter, favorite freelancers)
    freelancers: freelancerReducer,
    
    // Messaging system (conversations, messages, typing indicators)
    messages: messageReducer,
    
    // Project management (projects, bids, assignments)
    projects: projectReducer,
    
    /**
     * HOW TO ADD NEW SLICES:
     * 
     * 1. Create your slice file in redux/slices/ (e.g., paymentSlice.js)
     * 2. Import the reducer:
     *    import paymentReducer from './slices/paymentSlice';
     * 3. Add it to the reducer object below:
     *    payments: paymentReducer,
     * 
     * Example for future slices:
     * - payments: paymentReducer,       // Payment transactions
     * - notifications: notificationReducer, // Push notifications
     * - reviews: reviewReducer,         // Client/freelancer reviews
     * - analytics: analyticsReducer,    // Dashboard analytics
     * - settings: settingsReducer,      // User preferences
     */
  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Customize middleware configuration if needed
      serializableCheck: {
        // Ignore these action types (useful for non-serializable values like Dates, Functions)
        ignoredActions: [
          'persist/PERSIST',
          // Add any other action types that might contain non-serializable values
        ],
        // Ignore these field paths in all actions
        ignoredActionPaths: [
          'meta.arg',
          'payload.timestamp', // If you use Date objects in actions
          'payload.callback',  // If you pass functions in actions
        ],
        // Ignore these paths in the state
        ignoredPaths: [
          'items.dates', // Example: if you store Date objects in state
        ],
      },
    }),
  
  // Enable Redux DevTools in development
  devTools: process.env.NODE_ENV !== 'production',
});

/**
 * Store Type Definitions (for TypeScript users - optional)
 * 
 * If using TypeScript, you can export these types for better type safety:
 * 
 * export type RootState = ReturnType<typeof store.getState>;
 * export type AppDispatch = typeof store.dispatch;
 */

export default store;