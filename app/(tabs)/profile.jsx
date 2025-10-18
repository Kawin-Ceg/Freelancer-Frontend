import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);

// Placeholder user data
const userData = {
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  role: 'Full Stack Developer',
  location: 'San Francisco, CA',
  joinDate: 'Member since March 2023',
  rating: 4.9,
  reviews: 47,
  bio: 'Passionate full-stack developer with 5+ years of experience building scalable web and mobile applications. Specialized in React Native, Node.js, and cloud technologies.',
  skills: ['React Native', 'JavaScript', 'Node.js', 'Python', 'AWS', 'Firebase', 'MongoDB', 'UI/UX'],
  stats: {
    projectsCompleted: 24,
    paymentsMade: 18,
    ongoingProjects: 3,
    totalEarnings: '$18,450'
  }
};

const StatCard = ({ value, label, subtitle }) => (
  <StyledView className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex-1 mx-1">
    <StyledText className="text-2xl font-bold text-gray-800 text-center">{value}</StyledText>
    <StyledText className="text-gray-600 text-sm font-medium text-center mt-1">{label}</StyledText>
    {subtitle && (
      <StyledText className="text-gray-400 text-xs text-center mt-1">{subtitle}</StyledText>
    )}
  </StyledView>
);

const SkillTag = ({ skill }) => (
  <StyledView className="bg-purple-50 px-3 py-2 rounded-full mr-2 mb-2">
    <StyledText className="text-purple-600 text-sm font-medium">{skill}</StyledText>
  </StyledView>
);

export default function ProfileScreen() {
  return (
    <StyledView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
      
      <StyledScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Header with Profile Info */}
        <StyledView className="bg-white pb-6">
          {/* Background Header */}
          <StyledView className="bg-gradient-to-r from-purple-600 to-blue-600 pt-12 pb-20 px-6">
            <StyledView className="flex-row justify-between items-center mb-4">
              <StyledText className="text-2xl font-bold text-white">Profile</StyledText>
              <StyledTouchableOpacity className="bg-white/20 w-10 h-10 rounded-full items-center justify-center">
                <StyledText className="text-white text-lg">⚙️</StyledText>
              </StyledTouchableOpacity>
            </StyledView>
          </StyledView>

          {/* Profile Card Overlay */}
          <StyledView className="px-6 -mt-16">
            <StyledView className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
              {/* Profile Header */}
              <StyledView className="flex-row items-start justify-between mb-6">
                <StyledView className="flex-row items-center flex-1">
                  <StyledView className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl items-center justify-center mr-4">
                    <StyledText className="text-white text-2xl font-bold">AJ</StyledText>
                  </StyledView>
                  <StyledView className="flex-1">
                    <StyledText className="text-xl font-bold text-gray-800 mb-1">
                      {userData.name}
                    </StyledText>
                    <StyledText className="text-gray-600 text-sm mb-2">
                      {userData.role}
                    </StyledText>
                    <StyledView className="flex-row items-center">
                      <StyledText className="text-yellow-500 text-sm mr-1">⭐</StyledText>
                      <StyledText className="text-gray-700 font-semibold text-sm">
                        {userData.rating}
                      </StyledText>
                      <StyledText className="text-gray-500 text-sm mx-1">•</StyledText>
                      <StyledText className="text-gray-500 text-sm">
                        {userData.reviews} reviews
                      </StyledText>
                    </StyledView>
                  </StyledView>
                </StyledView>
              </StyledView>

              {/* Contact Info */}
              <StyledView className="space-y-2 mb-6">
                <StyledView className="flex-row items-center">
                  <StyledText className="text-gray-400 text-lg mr-3">📧</StyledText>
                  <StyledText className="text-gray-600 text-sm">{userData.email}</StyledText>
                </StyledView>
                <StyledView className="flex-row items-center">
                  <StyledText className="text-gray-400 text-lg mr-3">📍</StyledText>
                  <StyledText className="text-gray-600 text-sm">{userData.location}</StyledText>
                </StyledView>
                <StyledView className="flex-row items-center">
                  <StyledText className="text-gray-400 text-lg mr-3">📅</StyledText>
                  <StyledText className="text-gray-600 text-sm">{userData.joinDate}</StyledText>
                </StyledView>
              </StyledView>

              {/* Edit Profile Button */}
              <StyledTouchableOpacity className="bg-purple-600 py-3 rounded-xl items-center">
                <StyledText className="text-white font-semibold text-base">
                  Edit Profile
                </StyledText>
              </StyledTouchableOpacity>
            </StyledView>
          </StyledView>
        </StyledView>

        {/* Stats Section */}
        <StyledView className="px-6 mt-6">
          <StyledText className="text-lg font-bold text-gray-800 mb-4">Overview</StyledText>
          <StyledView className="flex-row -mx-1 mb-2">
            <StatCard 
              value={userData.stats.projectsCompleted} 
              label="Projects Completed" 
            />
            <StatCard 
              value={userData.stats.paymentsMade} 
              label="Payments Made" 
            />
          </StyledView>
          <StyledView className="flex-row -mx-1">
            <StatCard 
              value={userData.stats.ongoingProjects} 
              label="Ongoing" 
            />
            <StatCard 
              value={userData.stats.totalEarnings} 
              label="Total Earnings" 
              subtitle="Lifetime"
            />
          </StyledView>
        </StyledView>

        {/* Bio Section */}
        <StyledView className="px-6 mt-6">
          <StyledText className="text-lg font-bold text-gray-800 mb-3">About</StyledText>
          <StyledView className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <StyledText className="text-gray-600 leading-6">
              {userData.bio}
            </StyledText>
          </StyledView>
        </StyledView>

        {/* Skills Section */}
        <StyledView className="px-6 mt-6">
          <StyledText className="text-lg font-bold text-gray-800 mb-3">Skills & Expertise</StyledText>
          <StyledView className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <StyledView className="flex-row flex-wrap">
              {userData.skills.map((skill, index) => (
                <SkillTag key={index} skill={skill} />
              ))}
            </StyledView>
          </StyledView>
        </StyledView>

        {/* Additional Sections */}
        <StyledView className="px-6 mt-6">
          <StyledText className="text-lg font-bold text-gray-800 mb-3">Account</StyledText>
          <StyledView className="bg-white rounded-2xl overflow-hidden border border-gray-100">
            {[
              { icon: '📋', title: 'My Projects', subtitle: 'View your active and past projects' },
              { icon: '💳', title: 'Payment Methods', subtitle: 'Manage your payment options' },
              { icon: '🔒', title: 'Privacy & Security', subtitle: 'Control your privacy settings' },
              { icon: '🛟', title: 'Help & Support', subtitle: 'Get help and contact support' },
            ].map((item, index) => (
              <StyledTouchableOpacity 
                key={index}
                className={`flex-row items-center px-5 py-4 ${
                  index !== 3 ? 'border-b border-gray-100' : ''
                }`}
              >
                <StyledText className="text-xl mr-4">{item.icon}</StyledText>
                <StyledView className="flex-1">
                  <StyledText className="text-gray-800 font-semibold text-base">
                    {item.title}
                  </StyledText>
                  <StyledText className="text-gray-500 text-sm mt-1">
                    {item.subtitle}
                  </StyledText>
                </StyledView>
                <StyledText className="text-gray-400 text-lg">›</StyledText>
              </StyledTouchableOpacity>
            ))}
          </StyledView>
        </StyledView>

        {/* Logout Button */}
        <StyledView className="px-6 mt-6">
          <StyledTouchableOpacity className="bg-red-50 py-4 rounded-xl items-center border border-red-200">
            <StyledText className="text-red-600 font-semibold text-base">
              Logout
            </StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      </StyledScrollView>
    </StyledView>
  );
}