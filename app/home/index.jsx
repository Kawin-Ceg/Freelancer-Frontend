import React, {  useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';
import { styled } from 'nativewind';
import * as Animatable from 'react-native-animatable';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);
const AnimatableView = Animatable.View;


// Mock data
const userData = {
  name: 'Alex Johnson',
  stats: {
    activeProjects: 3,
    completedJobs: 24,
    earnings: '$12,450'
  }
};

const recommendedFreelancers = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'UI/UX Designer',
    rating: 4.9,
    projects: 47,
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    hourlyRate: '$85'
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    role: 'Full Stack Dev',
    rating: 4.8,
    projects: 32,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    hourlyRate: '$75'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Marketing Expert',
    rating: 4.7,
    projects: 28,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    hourlyRate: '$65'
  }
];

const recentMessages = [
  {
    id: 1,
    name: 'Sarah Chen',
    message: 'Looking forward to collaborating!',
    time: '2 min ago',
    unread: true,
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 2,
    name: 'TechCorp Inc',
    message: 'Project requirements updated',
    time: '1 hour ago',
    unread: false,
    image: 'https://images.unsplash.com/photo-1560250056-07ba64664864?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 3,
    name: 'Marcus Johnson',
    message: 'API integration completed',
    time: '3 hours ago',
    unread: true,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  }
];

const StatCard = ({ title, value, subtitle, icon, delay }) => (
  <AnimatableView 
    animation="fadeInUp"
    delay={delay}
    className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex-1 mx-1"
  >
    <StyledView className="flex-row items-center justify-between mb-2">
      <StyledText className="text-2xl font-bold text-gray-800">{value}</StyledText>
      <StyledView className="bg-blue-50 p-2 rounded-lg">
        <Feather name={icon} size={20} color="#3b82f6" />
      </StyledView>
    </StyledView>
    <StyledText className="text-gray-600 text-sm font-medium">{title}</StyledText>
    <StyledText className="text-gray-400 text-xs mt-1">{subtitle}</StyledText>
  </AnimatableView>
);

const FreelancerCard = ({ freelancer, index }) => (
  <AnimatableView 
    animation="fadeInRight"
    delay={index * 200}
    className="bg-white rounded-2xl p-4 mr-4 w-64 shadow-sm border border-gray-100"
  >
    <StyledView className="flex-row items-center mb-3">
      <Image 
        source={{ uri: freelancer.image }} 
        className="w-12 h-12 rounded-full mr-3"
      />
      <StyledView className="flex-1">
        <StyledText className="font-semibold text-gray-800 text-base">
          {freelancer.name}
        </StyledText>
        <StyledText className="text-gray-500 text-sm">
          {freelancer.role}
        </StyledText>
      </StyledView>
    </StyledView>
    
    <StyledView className="flex-row items-center justify-between mb-3">
      <StyledView className="flex-row items-center">
        <Ionicons name="star" size={16} color="#f59e0b" />
        <StyledText className="text-gray-700 font-medium text-sm ml-1">
          {freelancer.rating}
        </StyledText>
      </StyledView>
      <StyledText className="text-gray-500 text-sm">
        {freelancer.projects} projects
      </StyledText>
    </StyledView>
    
    <StyledView className="flex-row items-center justify-between">
      <StyledText className="text-blue-600 font-bold text-lg">
        {freelancer.hourlyRate}
        <StyledText className="text-gray-500 text-sm font-normal">/hr</StyledText>
      </StyledText>
      <Link href={`/freelancers/${freelancer.id}`} asChild>
        <StyledTouchableOpacity className="bg-blue-600 px-4 py-2 rounded-lg">
          <StyledText className="text-white font-medium text-sm">View</StyledText>
        </StyledTouchableOpacity>
      </Link>
    </StyledView>
  </AnimatableView>
);

const MessageCard = ({ message, index }) => (
  <AnimatableView 
    animation="fadeInUp"
    delay={400 + (index * 100)}
    className="bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100"
  >
    <StyledView className="flex-row items-center">
      <Image 
        source={{ uri: message.image }} 
        className="w-12 h-12 rounded-full mr-3"
      />
      <StyledView className="flex-1">
        <StyledView className="flex-row justify-between items-start mb-1">
          <StyledText className="font-semibold text-gray-800 text-base">
            {message.name}
          </StyledText>
          <StyledText className="text-gray-400 text-xs">
            {message.time}
          </StyledText>
        </StyledView>
        <StyledView className="flex-row items-center">
          <StyledText 
            className={`text-sm flex-1 ${message.unread ? 'text-gray-800 font-medium' : 'text-gray-500'}`}
            numberOfLines={1}
          >
            {message.message}
          </StyledText>
          {message.unread && (
            <StyledView className="w-2 h-2 bg-blue-600 rounded-full ml-2" />
          )}
        </StyledView>
      </StyledView>
    </StyledView>
  </AnimatableView>
);

export default function HomeScreen() {
  const scrollViewRef = useRef();

  return (
    <StyledView className="flex-1 bg-gray-50">
      {/* Gradient Header */}
      <StyledView className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 pt-16 pb-8 px-6">
        <AnimatableView animation="fadeInDown" duration={800}>
          <StyledText className="text-white text-2xl font-bold mb-1">
            Welcome back, {userData.name}!
          </StyledText>
          <StyledText className="text-blue-100 text-base">
            Ready to find your next opportunity?
          </StyledText>
        </AnimatableView>
      </StyledView>

      <StyledScrollView 
        ref={scrollViewRef}
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Stats Overview */}
        <StyledView className="px-6 -mt-6">
          <AnimatableView animation="fadeInUp" delay={200} className="flex-row -mx-1 mb-8">
            <StatCard 
              title="Active Projects" 
              value={userData.stats.activeProjects} 
              subtitle="In progress"
              icon="briefcase"
              delay={300}
            />
            <StatCard 
              title="Completed Jobs" 
              value={userData.stats.completedJobs} 
              subtitle="All time"
              icon="check-circle"
              delay={400}
            />
            <StatCard 
              title="Total Earnings" 
              value={userData.stats.earnings} 
              subtitle="Lifetime"
              icon="dollar-sign"
              delay={500}
            />
          </AnimatableView>
        </StyledView>

        {/* Quick Actions */}
        <StyledView className="px-6 mb-8">
          <AnimatableView animation="fadeInUp" delay={600}>
            <StyledText className="text-xl font-bold text-gray-800 mb-4">
              Quick Actions
            </StyledText>
            <StyledView className="flex-row space-x-4">
              <Link href="/projects" asChild>
                <StyledTouchableOpacity className="bg-white flex-1 rounded-2xl p-5 shadow-sm border border-gray-100">
                  <StyledView className="flex-row items-center">
                    <StyledView className="bg-blue-100 w-12 h-12 rounded-xl items-center justify-center mr-3">
                      <Feather name="search" size={24} color="#3b82f6" />
                    </StyledView>
                    <StyledView>
                      <StyledText className="text-gray-800 font-semibold text-lg">
                        Find Jobs
                      </StyledText>
                      <StyledText className="text-gray-500 text-sm">
                        Browse projects
                      </StyledText>
                    </StyledView>
                  </StyledView>
                </StyledTouchableOpacity>
              </Link>
              
              <Link href="/messages" asChild>
                <StyledTouchableOpacity className="bg-white flex-1 rounded-2xl p-5 shadow-sm border border-gray-100">
                  <StyledView className="flex-row items-center">
                    <StyledView className="bg-purple-100 w-12 h-12 rounded-xl items-center justify-center mr-3">
                      <Feather name="message-circle" size={24} color="#8b5cf6" />
                    </StyledView>
                    <StyledView>
                      <StyledText className="text-gray-800 font-semibold text-lg">
                        Messages
                      </StyledText>
                      <StyledText className="text-gray-500 text-sm">
                        Chat now
                      </StyledText>
                    </StyledView>
                  </StyledView>
                </StyledTouchableOpacity>
              </Link>
            </StyledView>
          </AnimatableView>
        </StyledView>

        {/* Recommended Freelancers */}
        <StyledView className="mb-8">
          <AnimatableView animation="fadeInUp" delay={700} className="px-6 mb-4">
            <StyledView className="flex-row justify-between items-center">
              <StyledText className="text-xl font-bold text-gray-800">
                Top Freelancers
              </StyledText>
              <Link href="/freelancers" asChild>
                <StyledTouchableOpacity>
                  <StyledText className="text-blue-600 font-medium">
                    View All
                  </StyledText>
                </StyledTouchableOpacity>
              </Link>
            </StyledView>
          </AnimatableView>
          
          <StyledScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24 }}
            className="flex-row"
          >
            {recommendedFreelancers.map((freelancer, index) => (
              <FreelancerCard 
                key={freelancer.id} 
                freelancer={freelancer} 
                index={index}
              />
            ))}
          </StyledScrollView>
        </StyledView>

        {/* Recent Messages */}
        <StyledView className="px-6">
          <AnimatableView animation="fadeInUp" delay={800} className="mb-4">
            <StyledView className="flex-row justify-between items-center">
              <StyledText className="text-xl font-bold text-gray-800">
                Recent Messages
              </StyledText>
              <Link href="/messages" asChild>
                <StyledTouchableOpacity>
                  <StyledText className="text-blue-600 font-medium">
                    See All
                  </StyledText>
                </StyledTouchableOpacity>
              </Link>
            </StyledView>
          </AnimatableView>
          
          <StyledView>
            {recentMessages.map((message, index) => (
              <MessageCard key={message.id} message={message} index={index} />
            ))}
          </StyledView>
        </StyledView>
      </StyledScrollView>

      {/* Floating Action Button */}
      <AnimatableView 
        animation="bounceIn"
        delay={1000}
        className="absolute bottom-6 right-6"
      >
        <Link href="/projects/new" asChild>
          <StyledTouchableOpacity className="bg-blue-600 w-16 h-16 rounded-2xl items-center justify-center shadow-xl">
            <Feather name="plus" size={24} color="white" />
          </StyledTouchableOpacity>
        </Link>
      </AnimatableView>
    </StyledView>
  );
}