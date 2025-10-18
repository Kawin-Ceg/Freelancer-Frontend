// redux/slices/freelancerSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state for freelancers management
const initialState = {
  freelancers: [],      // Array of freelancer objects
  loading: false,       // Loading state for API calls
  error: null,          // Error message for failed operations
  selectedFreelancer: null, // Currently selected freelancer for detail view
  filters: {            // Active filters for freelancer list
    skills: [],
    minRating: 0,
    maxHourlyRate: null,
    location: '',
    availability: 'all',
  },
  searchQuery: '',      // Current search query
  pagination: {         // Pagination information
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    hasNext: false,
    hasPrev: false,
  }
};

// Create freelancer slice with reducers
const freelancerSlice = createSlice({
  name: 'freelancers',
  initialState,
  reducers: {
    // Set loading state for async operations
    setLoading: (state, action) => {
      state.loading = action.payload;
      // Clear error when loading starts
      if (action.payload) {
        state.error = null;
      }
    },

    // Set error message for failed operations
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Clear any existing errors
    clearError: (state) => {
      state.error = null;
    },

    // Replace the entire freelancers array with new data
    setFreelancers: (state, action) => {
      state.freelancers = action.payload;
      state.loading = false;
      state.error = null;
    },

    // Add a single freelancer to the list
    addFreelancer: (state, action) => {
      const newFreelancer = action.payload;
      // Check if freelancer already exists to avoid duplicates
      const existingIndex = state.freelancers.findIndex(
        freelancer => freelancer.id === newFreelancer.id
      );
      
      if (existingIndex === -1) {
        state.felancers.push(newFreelancer);
      } else {
        // Update existing freelancer if found
        state.freelancers[existingIndex] = newFreelancer;
      }
      state.error = null;
    },

    // Update an existing freelancer by ID
    updateFreelancer: (state, action) => {
      const { id, updates } = action.payload;
      const freelancerIndex = state.freelancers.findIndex(
        freelancer => freelancer.id === id
      );
      
      if (freelancerIndex !== -1) {
        // Merge existing freelancer with updates
        state.freelancers[freelancerIndex] = {
          ...state.freelancers[freelancerIndex],
          ...updates,
          updatedAt: new Date().toISOString(), // Track update timestamp
        };
      }
      state.error = null;
    },

    // Remove a freelancer from the list by ID
    removeFreelancer: (state, action) => {
      const freelancerId = action.payload;
      state.freelancers = state.freelancers.filter(
        freelancer => freelancer.id !== freelancerId
      );
      state.error = null;
    },

    // Set the currently selected freelancer for detail view
    setSelectedFreelancer: (state, action) => {
      state.selectedFreelancer = action.payload;
    },

    // Clear the selected freelancer
    clearSelectedFreelancer: (state) => {
      state.selectedFreelancer = null;
    },

    // Update search query for filtering freelancers
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },

    // Update filters for freelancer list
    setFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },

    // Clear all active filters
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },

    // Update pagination information
    setPagination: (state, action) => {
      state.pagination = {
        ...state.pagination,
        ...action.payload,
      };
    },

    // Add multiple freelancers at once (for pagination)
    addFreelancers: (state, action) => {
      const newFreelancers = action.payload;
      // Filter out duplicates based on ID
      const existingIds = new Set(state.freelancers.map(f => f.id));
      const uniqueNewFreelancers = newFreelancers.filter(
        freelancer => !existingIds.has(freelancer.id)
      );
      
      state.freelancers.push(...uniqueNewFreelancers);
      state.error = null;
    },

    // Update freelancer rating and review count
    updateFreelancerRating: (state, action) => {
      const { freelancerId, newRating, newReviewCount } = action.payload;
      const freelancerIndex = state.freelancers.findIndex(
        freelancer => freelancer.id === freelancerId
      );
      
      if (freelancerIndex !== -1) {
        state.freelancers[freelancerIndex].rating = newRating;
        state.freelancers[freelancerIndex].reviewCount = newReviewCount;
      }
    },

    // Toggle freelancer favorite status
    toggleFavorite: (state, action) => {
      const freelancerId = action.payload;
      const freelancerIndex = state.freelancers.findIndex(
        freelancer => freelancer.id === freelancerId
      );
      
      if (freelancerIndex !== -1) {
        state.freelancers[freelancerIndex].isFavorite = 
          !state.freelancers[freelancerIndex].isFavorite;
      }
      
      // Also update selected freelancer if it's the same
      if (state.selectedFreelancer && state.selectedFreelancer.id === freelancerId) {
        state.selectedFreelancer.isFavorite = !state.selectedFreelancer.isFavorite;
      }
    },

    // Reset freelancer state to initial values
    resetFreelancers: (state) => {
      return initialState;
    },
  },
});

// Export actions for use in components and thunks
export const {
  setLoading,
  setError,
  clearError,
  setFreelancers,
  addFreelancer,
  addFreelancers,
  updateFreelancer,
  removeFreelancer,
  setSelectedFreelancer,
  clearSelectedFreelancer,
  setSearchQuery,
  setFilters,
  clearFilters,
  setPagination,
  updateFreelancerRating,
  toggleFavorite,
  resetFreelancers,
} = freelancerSlice.actions;

// Selectors for accessing freelancer state
export const selectFreelancers = (state) => state.freelancers.freelancers;
export const selectFreelancersLoading = (state) => state.freelancers.loading;
export const selectFreelancersError = (state) => state.freelancers.error;
export const selectSelectedFreelancer = (state) => state.freelancers.selectedFreelancer;
export const selectFreelancerFilters = (state) => state.freelancers.filters;
export const selectSearchQuery = (state) => state.freelancers.searchQuery;
export const selectPagination = (state) => state.freelancers.pagination;

// Complex selectors with derived data
export const selectFilteredFreelancers = (state) => {
  const { freelancers, filters, searchQuery } = state.freelancers;
  
  return freelancers.filter(freelancer => {
    // Filter by search query
    const matchesSearch = !searchQuery || 
      freelancer.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      freelancer.skills?.some(skill => 
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      freelancer.title?.toLowerCase().includes(searchQuery.toLowerCase());

    // Filter by skills
    const matchesSkills = filters.skills.length === 0 ||
      filters.skills.every(filterSkill =>
        freelancer.skills?.includes(filterSkill)
      );

    // Filter by minimum rating
    const matchesRating = freelancer.rating >= filters.minRating;

    // Filter by maximum hourly rate
    const matchesHourlyRate = !filters.maxHourlyRate ||
      freelancer.hourlyRate <= filters.maxHourlyRate;

    // Filter by location
    const matchesLocation = !filters.location ||
      freelancer.location?.toLowerCase().includes(filters.location.toLowerCase());

    return matchesSearch && matchesSkills && matchesRating && 
           matchesHourlyRate && matchesLocation;
  });
};

// Selector to get freelancer by ID
export const selectFreelancerById = (state, freelancerId) => 
  state.freelancers.freelancers.find(freelancer => freelancer.id === freelancerId);

// Selector to get favorite freelancers
export const selectFavoriteFreelancers = (state) =>
  state.freelancers.freelancers.filter(freelancer => freelancer.isFavorite);

// Export the reducer for store configuration
export default freelancerSlice.reducer;