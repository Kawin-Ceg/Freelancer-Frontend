// redux/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state for authentication
const initialState = {
  user: null,        // User object containing user details
  token: null,       // JWT token for authenticated requests
  isLoggedIn: false, // Boolean flag to check authentication status
  isLoading: false,  // Loading state for auth operations
  error: null,       // Error message for auth failures
};

// Create auth slice with reducers
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Set loading state
    setLoading: (state, action) => {
      state.isLoading = action.payload;
      state.error = null; // Clear error when loading starts
    },

    // Handle successful login
    loginSuccess: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isLoggedIn = true;
      state.isLoading = false;
      state.error = null;
    },

    // Handle login failure
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
    },

    // Handle successful registration
    registerSuccess: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isLoggedIn = true;
      state.isLoading = false;
      state.error = null;
    },

    // Handle registration failure
    registerFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
    },

    // Logout user and clear all auth data
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      state.isLoading = false;
      state.error = null;
    },

    // Update user information partially
    updateUser: (state, action) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload, // Merge existing user with updated fields
        };
      }
    },

    // Update user profile with detailed information
    updateProfile: (state, action) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
          updatedAt: new Date().toISOString(), // Track when profile was updated
        };
      }
    },

    // Clear any authentication errors
    clearError: (state) => {
      state.error = null;
    },

    // Refresh token (useful for token rotation)
    refreshToken: (state, action) => {
      state.token = action.payload;
      state.error = null;
    },

    // Set user as verified (after email verification, etc.)
    setVerified: (state) => {
      if (state.user) {
        state.user.isVerified = true;
        state.user.verifiedAt = new Date().toISOString();
      }
    },
  },
});

// Export actions for use in components and thunks
export const {
  setLoading,
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
  logout,
  updateUser,
  updateProfile,
  clearError,
  refreshToken,
  setVerified,
} = authSlice.actions;

// Selectors for accessing auth state (optional but recommended)
export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectError = (state) => state.auth.error;
export const selectUserRole = (state) => state.auth.user?.role;
export const selectUserId = (state) => state.auth.user?.id;

// Export the reducer for store configuration
export default authSlice.reducer;