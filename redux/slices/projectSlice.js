// redux/slices/projectSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state for projects management
const initialState = {
  projects: [],        // Array of project objects
  loading: false,      // Loading state for API calls
  error: null,         // Error message for failed operations
  selectedProject: null, // Currently selected project for detail view
  filters: {           // Active filters for project list
    status: 'all',     // all, open, in-progress, completed, cancelled
    category: '',
    minBudget: null,
    maxBudget: null,
    skills: [],
    timeline: 'all',   // all, urgent, flexible
  },
  searchQuery: '',     // Current search query
  sortBy: 'newest',    // newest, oldest, budget-high, budget-low, deadline
  pagination: {        // Pagination information
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    hasNext: false,
    hasPrev: false,
  }
};

// Create project slice with reducers
const projectSlice = createSlice({
  name: 'projects',
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

    // Replace the entire projects array with new data
    setProjects: (state, action) => {
      state.projects = action.payload;
      state.loading = false;
      state.error = null;
    },

    // Add a single project to the list
    addProject: (state, action) => {
      const newProject = action.payload;
      // Check if project already exists to avoid duplicates
      const existingIndex = state.projects.findIndex(
        project => project.id === newProject.id
      );
      
      if (existingIndex === -1) {
        state.projects.unshift(newProject); // Add to beginning for newest first
      } else {
        // Update existing project if found
        state.projects[existingIndex] = newProject;
      }
      state.error = null;
    },

    // Update an existing project by ID
    updateProject: (state, action) => {
      const { id, updates } = action.payload;
      const projectIndex = state.projects.findIndex(
        project => project.id === id
      );
      
      if (projectIndex !== -1) {
        // Merge existing project with updates
        state.projects[projectIndex] = {
          ...state.projects[projectIndex],
          ...updates,
          updatedAt: new Date().toISOString(), // Track update timestamp
        };
      }
      state.error = null;
    },

    // Remove a project from the list by ID
    removeProject: (state, action) => {
      const projectId = action.payload;
      state.projects = state.projects.filter(
        project => project.id !== projectId
      );
      state.error = null;
    },

    // Set the currently selected project for detail view
    setSelectedProject: (state, action) => {
      state.selectedProject = action.payload;
    },

    // Clear the selected project
    clearSelectedProject: (state) => {
      state.selectedProject = null;
    },

    // Update search query for filtering projects
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },

    // Update filters for project list
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

    // Update sort preference
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },

    // Update pagination information
    setPagination: (state, action) => {
      state.pagination = {
        ...state.pagination,
        ...action.payload,
      };
    },

    // Add multiple projects at once (for pagination)
    addProjects: (state, action) => {
      const newProjects = action.payload;
      // Filter out duplicates based on ID
      const existingIds = new Set(state.projects.map(p => p.id));
      const uniqueNewProjects = newProjects.filter(
        project => !existingIds.has(project.id)
      );
      
      state.projects.push(...uniqueNewProjects);
      state.error = null;
    },

    // Update project status (open, in-progress, completed, cancelled)
    updateProjectStatus: (state, action) => {
      const { projectId, status, updatedBy } = action.payload;
      const projectIndex = state.projects.findIndex(
        project => project.id === projectId
      );
      
      if (projectIndex !== -1) {
        state.projects[projectIndex].status = status;
        state.projects[projectIndex].updatedAt = new Date().toISOString();
        state.projects[projectIndex].updatedBy = updatedBy;
        
        // Add status history tracking
        if (!state.projects[projectIndex].statusHistory) {
          state.projects[projectIndex].statusHistory = [];
        }
        state.projects[projectIndex].statusHistory.push({
          status,
          timestamp: new Date().toISOString(),
          updatedBy,
        });
      }
      
      // Also update selected project if it's the same
      if (state.selectedProject && state.selectedProject.id === projectId) {
        state.selectedProject.status = status;
        state.selectedProject.updatedAt = new Date().toISOString();
        state.selectedProject.updatedBy = updatedBy;
      }
    },

    // Add a bid to a project
    addBidToProject: (state, action) => {
      const { projectId, bid } = action.payload;
      const projectIndex = state.projects.findIndex(
        project => project.id === projectId
      );
      
      if (projectIndex !== -1) {
        if (!state.projects[projectIndex].bids) {
          state.projects[projectIndex].bids = [];
        }
        
        // Check if bid already exists
        const existingBidIndex = state.projects[projectIndex].bids.findIndex(
          b => b.id === bid.id
        );
        
        if (existingBidIndex === -1) {
          state.projects[projectIndex].bids.push(bid);
          state.projects[projectIndex].bidCount = 
            (state.projects[projectIndex].bidCount || 0) + 1;
        } else {
          state.projects[projectIndex].bids[existingBidIndex] = bid;
        }
      }
    },

    // Remove a bid from a project
    removeBidFromProject: (state, action) => {
      const { projectId, bidId } = action.payload;
      const projectIndex = state.projects.findIndex(
        project => project.id === projectId
      );
      
      if (projectIndex !== -1 && state.projects[projectIndex].bids) {
        state.projects[projectIndex].bids = state.projects[projectIndex].bids.filter(
          bid => bid.id !== bidId
        );
        state.projects[projectIndex].bidCount = Math.max(
          0,
          (state.projects[projectIndex].bidCount || 1) - 1
        );
      }
    },

    // Assign a freelancer to a project
    assignFreelancer: (state, action) => {
      const { projectId, freelancerId, freelancerName } = action.payload;
      const projectIndex = state.projects.findIndex(
        project => project.id === projectId
      );
      
      if (projectIndex !== -1) {
        state.projects[projectIndex].assignedFreelancer = {
          id: freelancerId,
          name: freelancerName,
          assignedAt: new Date().toISOString(),
        };
        state.projects[projectIndex].status = 'in-progress';
      }
    },

    // Toggle project favorite status
    toggleFavorite: (state, action) => {
      const projectId = action.payload;
      const projectIndex = state.projects.findIndex(
        project => project.id === projectId
      );
      
      if (projectIndex !== -1) {
        state.projects[projectIndex].isFavorite = 
          !state.projects[projectIndex].isFavorite;
      }
      
      // Also update selected project if it's the same
      if (state.selectedProject && state.selectedProject.id === projectId) {
        state.selectedProject.isFavorite = !state.selectedProject.isFavorite;
      }
    },

    // Reset project state to initial values
    resetProjects: (state) => {
      return initialState;
    },
  },
});

// Export actions for use in components and thunks
export const {
  setLoading,
  setError,
  clearError,
  setProjects,
  addProject,
  addProjects,
  updateProject,
  removeProject,
  setSelectedProject,
  clearSelectedProject,
  setSearchQuery,
  setFilters,
  clearFilters,
  setSortBy,
  setPagination,
  updateProjectStatus,
  addBidToProject,
  removeBidFromProject,
  assignFreelancer,
  toggleFavorite,
  resetProjects,
} = projectSlice.actions;

// Selectors for accessing project state
export const selectProjects = (state) => state.projects.projects;
export const selectProjectsLoading = (state) => state.projects.loading;
export const selectProjectsError = (state) => state.projects.error;
export const selectSelectedProject = (state) => state.projects.selectedProject;
export const selectProjectFilters = (state) => state.projects.filters;
export const selectSearchQuery = (state) => state.projects.searchQuery;
export const selectSortBy = (state) => state.projects.sortBy;
export const selectPagination = (state) => state.projects.pagination;

// Complex selectors with derived data
export const selectFilteredProjects = (state) => {
  const { projects, filters, searchQuery, sortBy } = state.projects;
  
  let filtered = projects.filter(project => {
    // Filter by search query
    const matchesSearch = !searchQuery || 
      project.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.skills?.some(skill => 
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      project.client?.name?.toLowerCase().includes(searchQuery.toLowerCase());

    // Filter by status
    const matchesStatus = filters.status === 'all' || project.status === filters.status;

    // Filter by category
    const matchesCategory = !filters.category || project.category === filters.category;

    // Filter by budget range
    const projectBudget = parseFloat(project.budget) || 0;
    const matchesMinBudget = !filters.minBudget || projectBudget >= filters.minBudget;
    const matchesMaxBudget = !filters.maxBudget || projectBudget <= filters.maxBudget;

    // Filter by skills
    const matchesSkills = filters.skills.length === 0 ||
      filters.skills.every(filterSkill =>
        project.skills?.includes(filterSkill)
      );

    return matchesSearch && matchesStatus && matchesCategory && 
           matchesMinBudget && matchesMaxBudget && matchesSkills;
  });

  // Apply sorting
  filtered.sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'budget-high':
        return (parseFloat(b.budget) || 0) - (parseFloat(a.budget) || 0);
      case 'budget-low':
        return (parseFloat(a.budget) || 0) - (parseFloat(b.budget) || 0);
      case 'deadline':
        return new Date(a.deadline) - new Date(b.deadline);
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  return filtered;
};

// Selector to get project by ID
export const selectProjectById = (state, projectId) => 
  state.projects.projects.find(project => project.id === projectId);

// Selector to get favorite projects
export const selectFavoriteProjects = (state) =>
  state.projects.projects.filter(project => project.isFavorite);

// Selector to get projects by status
export const selectProjectsByStatus = (state, status) =>
  state.projects.projects.filter(project => project.status === status);

// Selector to get user's projects (as client or freelancer)
export const selectUserProjects = (state, userId) =>
  state.projects.projects.filter(project => 
    project.client?.id === userId || 
    project.assignedFreelancer?.id === userId
  );

// Export the reducer for store configuration
export default projectSlice.reducer;