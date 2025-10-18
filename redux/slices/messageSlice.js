// redux/slices/messageSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state for messages management
const initialState = {
  messages: [],        // Array of message objects
  loading: false,      // Loading state for API calls
  error: null,         // Error message for failed operations
  conversations: [],   // List of conversations/threads
  activeConversation: null, // Currently active conversation
  unreadCount: 0,      // Total unread messages count
  typingUsers: {},     // Track typing users by conversation ID
};

// Create message slice with reducers
const messageSlice = createSlice({
  name: 'messages',
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

    // Replace the entire messages array with new data
    setMessages: (state, action) => {
      state.messages = action.payload;
      state.loading = false;
      state.error = null;
      
      // Update unread count
      state.unreadCount = action.payload.filter(
        message => !message.isRead && message.sender !== 'me'
      ).length;
    },

    // Add a single message to the list
    addMessage: (state, action) => {
      const newMessage = action.payload;
      
      // Check if message already exists to avoid duplicates
      const existingIndex = state.messages.findIndex(
        message => message.id === newMessage.id
      );
      
      if (existingIndex === -1) {
        state.messages.push(newMessage);
        
        // Update unread count if it's a received message
        if (!newMessage.isRead && newMessage.sender !== 'me') {
          state.unreadCount += 1;
        }
        
        // Update conversation last message and timestamp
        if (state.activeConversation) {
          const conversationIndex = state.conversations.findIndex(
            conv => conv.id === state.activeConversation.id
          );
          if (conversationIndex !== -1) {
            state.conversations[conversationIndex].lastMessage = newMessage.text;
            state.conversations[conversationIndex].timestamp = newMessage.timestamp;
            state.conversations[conversationIndex].unreadCount = 
              state.messages.filter(
                msg => msg.conversationId === state.activeConversation.id && 
                       !msg.isRead && msg.sender !== 'me'
              ).length;
          }
        }
      }
      state.error = null;
    },

    // Update an existing message by ID
    updateMessage: (state, action) => {
      const { id, updates } = action.payload;
      const messageIndex = state.messages.findIndex(
        message => message.id === id
      );
      
      if (messageIndex !== -1) {
        const originalMessage = state.messages[messageIndex];
        const wasUnread = !originalMessage.isRead && originalMessage.sender !== 'me';
        const isNowRead = updates.isRead && originalMessage.sender !== 'me';
        
        // Merge existing message with updates
        state.messages[messageIndex] = {
          ...originalMessage,
          ...updates,
          updatedAt: new Date().toISOString(),
        };
        
        // Update unread count if message read status changed
        if (wasUnread && isNowRead) {
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
      }
      state.error = null;
    },

    // Mark all messages in a conversation as read
    markConversationAsRead: (state, action) => {
      const conversationId = action.payload;
      const unreadMessages = state.messages.filter(
        message => message.conversationId === conversationId && 
                  !message.isRead && 
                  message.sender !== 'me'
      );
      
      // Update messages as read
      state.messages = state.messages.map(message => 
        message.conversationId === conversationId && !message.isRead
          ? { ...message, isRead: true }
          : message
      );
      
      // Update unread count
      state.unreadCount = Math.max(0, state.unreadCount - unreadMessages.length);
      
      // Update conversation unread count
      const conversationIndex = state.conversations.findIndex(
        conv => conv.id === conversationId
      );
      if (conversationIndex !== -1) {
        state.conversations[conversationIndex].unreadCount = 0;
      }
    },

    // Set the list of conversations
    setConversations: (state, action) => {
      state.conversations = action.payload;
      state.loading = false;
      state.error = null;
      
      // Calculate total unread count from all conversations
      state.unreadCount = action.payload.reduce(
        (total, conv) => total + (conv.unreadCount || 0), 0
      );
    },

    // Set the active conversation
    setActiveConversation: (state, action) => {
      state.activeConversation = action.payload;
    },

    // Clear the active conversation
    clearActiveConversation: (state) => {
      state.activeConversation = null;
    },

    // Add a new conversation
    addConversation: (state, action) => {
      const newConversation = action.payload;
      const existingIndex = state.conversations.findIndex(
        conv => conv.id === newConversation.id
      );
      
      if (existingIndex === -1) {
        state.conversations.unshift(newConversation); // Add to beginning
      } else {
        state.conversations[existingIndex] = newConversation;
      }
    },

    // Update a conversation
    updateConversation: (state, action) => {
      const { id, updates } = action.payload;
      const conversationIndex = state.conversations.findIndex(
        conv => conv.id === id
      );
      
      if (conversationIndex !== -1) {
        state.conversations[conversationIndex] = {
          ...state.conversations[conversationIndex],
          ...updates,
        };
        
        // Recalculate unread count if conversation unread count changed
        if (updates.unreadCount !== undefined) {
          state.unreadCount = state.conversations.reduce(
            (total, conv) => total + (conv.unreadCount || 0), 0
          );
        }
      }
    },

    // Set typing status for a user in a conversation
    setTypingStatus: (state, action) => {
      const { conversationId, userId, isTyping } = action.payload;
      
      if (!state.typingUsers[conversationId]) {
        state.typingUsers[conversationId] = {};
      }
      
      state.typingUsers[conversationId][userId] = isTyping;
    },

    // Clear typing status for a conversation
    clearTypingStatus: (state, action) => {
      const conversationId = action.payload;
      delete state.typingUsers[conversationId];
    },

    // Delete a message by ID
    deleteMessage: (state, action) => {
      const messageId = action.payload;
      const messageToDelete = state.messages.find(msg => msg.id === messageId);
      
      if (messageToDelete && !messageToDelete.isRead && messageToDelete.sender !== 'me') {
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
      
      state.messages = state.messages.filter(
        message => message.id !== messageId
      );
    },

    // Delete an entire conversation
    deleteConversation: (state, action) => {
      const conversationId = action.payload;
      
      // Remove conversation from list
      state.conversations = state.conversations.filter(
        conv => conv.id !== conversationId
      );
      
      // Remove messages from that conversation
      const deletedMessages = state.messages.filter(
        msg => msg.conversationId === conversationId
      );
      
      // Update unread count
      const unreadDeleted = deletedMessages.filter(
        msg => !msg.isRead && msg.sender !== 'me'
      ).length;
      state.unreadCount = Math.max(0, state.unreadCount - unreadDeleted);
      
      state.messages = state.messages.filter(
        msg => msg.conversationId !== conversationId
      );
      
      // Clear active conversation if it's the one being deleted
      if (state.activeConversation?.id === conversationId) {
        state.activeConversation = null;
      }
    },

    // Reset messages state to initial values
    resetMessages: (state) => {
      return initialState;
    },
  },
});

// Export actions for use in components and thunks
export const {
  setLoading,
  setError,
  clearError,
  setMessages,
  addMessage,
  updateMessage,
  markConversationAsRead,
  setConversations,
  setActiveConversation,
  clearActiveConversation,
  addConversation,
  updateConversation,
  setTypingStatus,
  clearTypingStatus,
  deleteMessage,
  deleteConversation,
  resetMessages,
} = messageSlice.actions;

// Selectors for accessing message state
export const selectMessages = (state) => state.messages.messages;
export const selectMessagesLoading = (state) => state.messages.loading;
export const selectMessagesError = (state) => state.messages.error;
export const selectConversations = (state) => state.messages.conversations;
export const selectActiveConversation = (state) => state.messages.activeConversation;
export const selectUnreadCount = (state) => state.messages.unreadCount;
export const selectTypingUsers = (state) => state.messages.typingUsers;

// Complex selectors with derived data
export const selectMessagesByConversation = (state, conversationId) => 
  state.messages.messages
    .filter(message => message.conversationId === conversationId)
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

export const selectConversationById = (state, conversationId) =>
  state.messages.conversations.find(conv => conv.id === conversationId);

export const selectTypingUsersInActiveConversation = (state) => {
  const activeConv = state.messages.activeConversation;
  if (!activeConv) return [];
  
  const typingData = state.messages.typingUsers[activeConv.id];
  return typingData ? Object.keys(typingData).filter(userId => typingData[userId]) : [];
};

export const selectUnreadCountByConversation = (state, conversationId) =>
  state.messages.messages.filter(
    message => message.conversationId === conversationId && 
              !message.isRead && 
              message.sender !== 'me'
  ).length;

// Export the reducer for store configuration
export default messageSlice.reducer;