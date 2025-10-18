import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather, Ionicons } from '@expo/vector-icons';
import { styled } from 'nativewind';
import * as Animatable from 'react-native-animatable';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);
const AnimatableView = Animatable.View;

// Mock data for chat
const chatData = {
  contact: {
    id: 1,
    name: 'Sarah Chen',
    role: 'UI/UX Designer',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    isOnline: true,
    lastSeen: '2 min ago',
  },
  messages: [
    {
      id: 1,
      text: 'Hey! Thanks for reaching out about the project.',
      sender: 'them',
      timestamp: new Date(Date.now() - 3600000),
      status: 'delivered',
    },
    {
      id: 2,
      text: 'No problem! I really liked your portfolio. Are you available for a React Native project?',
      sender: 'me',
      timestamp: new Date(Date.now() - 3500000),
      status: 'read',
    },
    {
      id: 3,
      text: 'Absolutely! I have experience with React Native and Expo. What kind of app are you building?',
      sender: 'them',
      timestamp: new Date(Date.now() - 3400000),
      status: 'delivered',
    },
    {
      id: 4,
      text: "It's a freelance marketplace app similar to Upwork. We need someone to help with the UI implementation and some frontend features.",
      sender: 'me',
      timestamp: new Date(Date.now() - 3300000),
      status: 'read',
    },
    {
      id: 5,
      text: 'That sounds interesting! I built a similar app last month. Would you like to see the case study?',
      sender: 'them',
      timestamp: new Date(Date.now() - 3200000),
      status: 'delivered',
    },
    {
      id: 6,
      text: "Yes, please share it! Also, what's your hourly rate for React Native projects?",
      sender: 'me',
      timestamp: new Date(Date.now() - 3100000),
      status: 'read',
    },
  ],
};

const MessageBubble = ({ message, isMe }) => (
  <AnimatableView
    animation="fadeInUp"
    duration={500}
    className={`flex-row mb-4 ${isMe ? 'justify-end' : 'justify-start'}`}
  >
    <StyledView
      className={`max-w-[80%] rounded-3xl px-4 py-3 ${
        isMe
          ? 'bg-purple-600 rounded-br-md'
          : 'bg-white border border-gray-200 rounded-bl-md'
      } shadow-sm`}
    >
      <StyledText
        className={`text-base leading-5 ${
          isMe ? 'text-white' : 'text-gray-800'
        }`}
      >
        {message.text}
      </StyledText>
      <StyledView className="flex-row items-center justify-end mt-1">
        <StyledText
          className={`text-xs ${
            isMe ? 'text-purple-200' : 'text-gray-500'
          } mr-2`}
        >
          {formatTime(message.timestamp)}
        </StyledText>
        {isMe && (
          <Ionicons
            name={
              message.status === 'read'
                ? 'checkmark-done'
                : message.status === 'delivered'
                ? 'checkmark'
                : 'time'
            }
            size={12}
            color={isMe ? '#e9d5ff' : '#9ca3af'}
          />
        )}
      </StyledView>
    </StyledView>
  </AnimatableView>
);

const TypingIndicator = () => (
  <AnimatableView
    animation="fadeInUp"
    className="flex-row mb-4 justify-start"
  >
    <StyledView className="bg-white border border-gray-200 rounded-3xl rounded-bl-md px-4 py-3 shadow-sm">
      <StyledView className="flex-row items-center">
        <StyledView className="flex-row space-x-1">
          <AnimatableView
            animation="bounce"
            duration={1000}
            iterationCount="infinite"
            className="w-2 h-2 bg-gray-400 rounded-full"
          />
          <AnimatableView
            animation="bounce"
            duration={1000}
            iterationCount="infinite"
            delay={200}
            className="w-2 h-2 bg-gray-400 rounded-full"
          />
          <AnimatableView
            animation="bounce"
            duration={1000}
            iterationCount="infinite"
            delay={400}
            className="w-2 h-2 bg-gray-400 rounded-full"
          />
        </StyledView>
        <StyledText className="text-gray-500 text-sm ml-2">typing...</StyledText>
      </StyledView>
    </StyledView>
  </AnimatableView>
);

const formatTime = (date) => {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

export default function ChatScreen() {
  const router = useRouter();
  const [messages, setMessages] = useState(chatData.messages);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      setTimeout(() => {
        flatListRef.current.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  // Simulate typing indicator and auto-reply
  useEffect(() => {
    if (isTyping) {
      const timer = setTimeout(() => {
        const autoReply = {
          id: messages.length + 1,
          text: "I'd love to discuss the project details! My rate is $85/hour for React Native work. When would you like to schedule a call?",
          sender: 'them',
          timestamp: new Date(),
          status: 'delivered',
        };
        setMessages(prev => [...prev, autoReply]);
        setIsTyping(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isTyping, messages.length]);

  const sendMessage = () => {
    if (newMessage.trim() === '') return;

    const message = {
      id: messages.length + 1,
      text: newMessage.trim(),
      sender: 'me',
      timestamp: new Date(),
      status: 'sending',
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate message delivery
    setTimeout(() => {
      setMessages(prev =>
        prev.map(msg =>
          msg.id === message.id ? { ...msg, status: 'delivered' } : msg
        )
      );
      
      // Simulate typing indicator after a short delay
      setTimeout(() => setIsTyping(true), 1000);
    }, 1000);
  };

  const handleAttach = () => {
    Alert.alert('Attach File', 'This would open the file picker in a real app.');
  };

  const renderMessage = ({ item }) => (
    <MessageBubble message={item} isMe={item.sender === 'me'} />
  );

  return (
    <StyledView className="flex-1 bg-gray-50">
      {/* Header */}
      <StyledView className="bg-white pt-12 pb-4 px-4 border-b border-gray-200 shadow-sm">
        <StyledView className="flex-row items-center">
          <StyledTouchableOpacity
            onPress={() => router.back()}
            className="p-2 mr-2"
          >
            <Feather name="arrow-left" size={24} color="#374151" />
          </StyledTouchableOpacity>
          
          <Image
            source={{ uri: chatData.contact.avatar }}
            className="w-10 h-10 rounded-full mr-3"
          />
          
          <StyledView className="flex-1">
            <StyledText className="text-lg font-semibold text-gray-800">
              {chatData.contact.name}
            </StyledText>
            <StyledView className="flex-row items-center">
              <StyledView
                className={`w-2 h-2 rounded-full mr-1 ${
                  chatData.contact.isOnline ? 'bg-green-500' : 'bg-gray-400'
                }`}
              />
              <StyledText className="text-gray-500 text-sm">
                {chatData.contact.isOnline ? 'Online' : chatData.contact.lastSeen}
              </StyledText>
            </StyledView>
          </StyledView>

          <StyledTouchableOpacity className="p-2">
            <Ionicons name="call-outline" size={24} color="#374151" />
          </StyledTouchableOpacity>
          
          <StyledTouchableOpacity className="p-2 ml-1">
            <Ionicons name="videocam-outline" size={24} color="#374151" />
          </StyledTouchableOpacity>
        </StyledView>
      </StyledView>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        {/* Messages List */}
        <StyledView className="flex-1">
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 20 }}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
            onLayout={() => flatListRef.current?.scrollToEnd()}
            ListFooterComponent={
              isTyping ? <TypingIndicator /> : null
            }
          />
        </StyledView>

        {/* Input Bar */}
        <StyledView className="bg-white border-t border-gray-200 px-4 py-3">
          <StyledView className="flex-row items-center bg-gray-100 rounded-2xl px-3 py-2">
            <StyledTouchableOpacity
              onPress={handleAttach}
              className="p-2 mr-1"
            >
              <Ionicons name="attach" size={20} color="#6b7280" />
            </StyledTouchableOpacity>

            <StyledTextInput
              value={newMessage}
              onChangeText={setNewMessage}
              placeholder="Type a message..."
              multiline
              maxLength={500}
              className="flex-1 text-gray-800 text-base max-h-20 py-1 px-2"
              placeholderTextColor="#9ca3af"
              onSubmitEditing={sendMessage}
            />

            <StyledTouchableOpacity
              onPress={sendMessage}
              disabled={newMessage.trim() === ''}
              className={`p-2 ml-1 rounded-full ${
                newMessage.trim() === '' ? 'bg-gray-300' : 'bg-purple-600'
              }`}
            >
              <Ionicons
                name="send"
                size={18}
                color={newMessage.trim() === '' ? '#9ca3af' : 'white'}
              />
            </StyledTouchableOpacity>
          </StyledView>
        </StyledView>
      </KeyboardAvoidingView>
    </StyledView>
  );
}