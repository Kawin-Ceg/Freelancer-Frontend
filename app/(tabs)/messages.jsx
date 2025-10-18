import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StatusBar, TextInput } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);

// Placeholder data for chat threads
const chatThreadsData = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'UI/UX Designer',
    lastMessage: 'Looking forward to collaborating on the project!',
    timestamp: '2 min ago',
    unreadCount: 3,
    isOnline: true,
    profileInitials: 'SC',
    project: 'E-commerce App Design',
    isTyping: false
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    role: 'Full Stack Developer',
    lastMessage: 'I have completed the API integration. Please review.',
    timestamp: '1 hour ago',
    unreadCount: 0,
    isOnline: false,
    profileInitials: 'MJ',
    project: 'Website Development',
    isTyping: false
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Project Manager',
    lastMessage: 'Can we schedule a meeting for tomorrow?',
    timestamp: '3 hours ago',
    unreadCount: 1,
    isOnline: true,
    profileInitials: 'ER',
    project: 'Marketing Campaign',
    isTyping: true
  },
  {
    id: 4,
    name: 'Alex Thompson',
    role: 'AI/ML Engineer',
    lastMessage: 'The model training is progressing well.',
    timestamp: 'Yesterday',
    unreadCount: 0,
    isOnline: false,
    profileInitials: 'AT',
    project: 'Chatbot Development',
    isTyping: false
  },
  {
    id: 5,
    name: 'Priya Sharma',
    role: 'Mobile Developer',
    lastMessage: 'Sent you the latest build for testing.',
    timestamp: 'Yesterday',
    unreadCount: 5,
    isOnline: true,
    profileInitials: 'PS',
    project: 'React Native App',
    isTyping: false
  },
  {
    id: 6,
    name: 'Design Team',
    role: 'Group Chat',
    lastMessage: 'Sarah: I have updated the design files',
    timestamp: '2 days ago',
    unreadCount: 12,
    isOnline: true,
    profileInitials: 'DT',
    project: 'Brand Redesign',
    isTyping: false
  }
];

const ChatThreadCard = ({ thread }) => (
  <StyledTouchableOpacity className="bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100 active:bg-gray-50">
    <StyledView className="flex-row items-start">
      {/* Profile Avatar */}
      <StyledView className="relative">
        <StyledView className="w-14 h-14 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl items-center justify-center mr-4">
          <StyledText className="text-white font-bold text-lg">
            {thread.profileInitials}
          </StyledText>
        </StyledView>
        {/* Online Status Indicator */}
        {thread.isOnline && (
          <StyledView className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
        )}
      </StyledView>

      {/* Message Content */}
      <StyledView className="flex-1">
        <StyledView className="flex-row justify-between items-start mb-1">
          <StyledView className="flex-1">
            <StyledText className="text-lg font-semibold text-gray-800">
              {thread.name}
            </StyledText>
            <StyledText className="text-gray-500 text-sm">
              {thread.role}
            </StyledText>
          </StyledView>
          <StyledView className="items-end">
            <StyledText className="text-gray-400 text-xs mb-1">
              {thread.timestamp}
            </StyledText>
            {thread.unreadCount > 0 && (
              <StyledView className="bg-purple-600 px-2 py-1 rounded-full min-w-6">
                <StyledText className="text-white text-xs font-bold text-center">
                  {thread.unreadCount}
                </StyledText>
              </StyledView>
            )}
          </StyledView>
        </StyledView>

        {/* Project and Last Message */}
        <StyledView className="mt-2">
          <StyledText className="text-purple-600 text-xs font-medium mb-1">
            {thread.project}
          </StyledText>
          <StyledView className="flex-row items-center">
            {thread.isTyping ? (
              <StyledView className="flex-row items-center">
                <StyledText className="text-blue-500 text-sm font-medium italic">
                  typing...
                </StyledText>
                <StyledView className="flex-row ml-1">
                  <StyledView className="w-1 h-1 bg-blue-500 rounded-full mx-1 animate-bounce" />
                  <StyledView className="w-1 h-1 bg-blue-500 rounded-full mx-1 animate-bounce" style={{animationDelay: '0.2s'}} />
                  <StyledView className="w-1 h-1 bg-blue-500 rounded-full mx-1 animate-bounce" style={{animationDelay: '0.4s'}} />
                </StyledView>
              </StyledView>
            ) : (
              <StyledText 
                className={`text-sm flex-1 ${thread.unreadCount > 0 ? 'text-gray-800 font-medium' : 'text-gray-500'}`}
                numberOfLines={1}
              >
                {thread.lastMessage}
              </StyledText>
            )}
          </StyledView>
        </StyledView>
      </StyledView>
    </StyledView>
  </StyledTouchableOpacity>
);

export default function MessagesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [chats] = useState(chatThreadsData);

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const unreadCount = chats.reduce((total, chat) => total + chat.unreadCount, 0);

  return (
    <StyledView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
      
      <StyledScrollView 
        className="flex-1" 
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <StyledView className="bg-white pt-12 pb-6 px-6 border-b border-gray-200">
          <StyledView className="flex-row justify-between items-center mb-6">
            <StyledView>
              <StyledText className="text-2xl font-bold text-gray-800">
                Messages
              </StyledText>
              <StyledView className="flex-row items-center mt-1">
                <StyledText className="text-gray-500">
                  {unreadCount} unread messages
                </StyledText>
                {unreadCount > 0 && (
                  <StyledView className="w-2 h-2 bg-purple-600 rounded-full ml-2" />
                )}
              </StyledView>
            </StyledView>
            <StyledTouchableOpacity className="bg-purple-600 w-10 h-10 rounded-full items-center justify-center">
              <StyledText className="text-white font-bold text-lg">✏️</StyledText>
            </StyledTouchableOpacity>
          </StyledView>

          {/* Search Bar */}
          <StyledView className="bg-gray-100 rounded-2xl px-4 py-3 flex-row items-center">
            <StyledText className="text-gray-400 mr-2">🔍</StyledText>
            <StyledTextInput
              placeholder="Search conversations..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="flex-1 text-gray-800 text-base"
              placeholderTextColor="#9ca3af"
            />
            {searchQuery.length > 0 && (
              <StyledTouchableOpacity onPress={() => setSearchQuery('')}>
                <StyledText className="text-gray-400">✕</StyledText>
              </StyledTouchableOpacity>
            )}
          </StyledView>
        </StyledView>

        {/* Quick Filters */}
        <StyledView className="px-6 py-4 bg-white border-b border-gray-200">
          <StyledScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 20 }}
          >
            <StyledTouchableOpacity className="bg-purple-600 px-4 py-2 rounded-full mr-3">
              <StyledText className="text-white font-medium text-sm">All</StyledText>
            </StyledTouchableOpacity>
            <StyledTouchableOpacity className="bg-gray-100 px-4 py-2 rounded-full mr-3">
              <StyledText className="text-gray-700 font-medium text-sm">Unread</StyledText>
            </StyledTouchableOpacity>
            <StyledTouchableOpacity className="bg-gray-100 px-4 py-2 rounded-full mr-3">
              <StyledText className="text-gray-700 font-medium text-sm">Groups</StyledText>
            </StyledTouchableOpacity>
            <StyledTouchableOpacity className="bg-gray-100 px-4 py-2 rounded-full mr-3">
              <StyledText className="text-gray-700 font-medium text-sm">Archived</StyledText>
            </StyledTouchableOpacity>
          </StyledScrollView>
        </StyledView>

        {/* Results Count */}
        <StyledView className="px-6 pt-6 pb-4">
          <StyledText className="text-gray-600">
            {filteredChats.length} conversations
            {searchQuery && ` for "${searchQuery}"`}
          </StyledText>
        </StyledView>

        {/* Chat Threads List */}
        <StyledView className="px-6">
          {filteredChats.map((thread) => (
            <ChatThreadCard key={thread.id} thread={thread} />
          ))}
        </StyledView>

        {/* Empty State */}
        {filteredChats.length === 0 && (
          <StyledView className="flex-1 items-center justify-center py-20 px-6">
            <StyledText className="text-6xl mb-4">💬</StyledText>
            <StyledText className="text-xl font-bold text-gray-800 mb-2 text-center">
              No conversations found
            </StyledText>
            <StyledText className="text-gray-500 text-center mb-6">
              {searchQuery ? 'Try adjusting your search terms' : 'Start a new conversation to get started'}
            </StyledText>
            {!searchQuery && (
              <StyledTouchableOpacity className="bg-purple-600 px-6 py-3 rounded-xl">
                <StyledText className="text-white font-semibold">
                  Start New Chat
                </StyledText>
              </StyledTouchableOpacity>
            )}
          </StyledView>
        )}
      </StyledScrollView>

      {/* Floating Action Button */}
      <StyledTouchableOpacity className="absolute bottom-6 right-6 bg-purple-600 w-16 h-16 rounded-2xl items-center justify-center shadow-xl">
        <StyledText className="text-white text-2xl font-bold">+</StyledText>
      </StyledTouchableOpacity>
    </StyledView>
  );
}