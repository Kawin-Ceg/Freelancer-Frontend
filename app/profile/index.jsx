import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather, Ionicons } from '@expo/vector-icons';
import { styled } from 'nativewind';
import * as Animatable from 'react-native-animatable';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);
const AnimatableView = Animatable.View;

// Mock user data
const userData = {
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  role: 'Senior Full Stack Developer',
  rating: 4.9,
  reviews: 47,
  bio: 'Passionate full-stack developer with 5+ years of experience building scalable web and mobile applications. Specialized in React Native, Node.js, and cloud technologies.',
  joinDate: 'March 2023',
  stats: {
    totalProjects: 24,
    completedJobs: 18,
    totalEarnings: '$18,450',
    ongoingProjects: 3
  },
  skills: ['React Native', 'JavaScript', 'Node.js', 'TypeScript', 'Python', 'AWS', 'Firebase', 'MongoDB', 'UI/UX'],
  portfolio: [
    {
      id: 1,
      title: 'E-commerce App',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop',
      category: 'Mobile App'
    },
    {
      id: 2,
      title: 'Finance Dashboard',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop',
      category: 'Web App'
    },
    {
      id: 3,
      title: 'Travel Booking',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=300&h=200&fit=crop',
      category: 'Mobile App'
    },
    {
      id: 4,
      title: 'Social Platform',
      image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=300&h=200&fit=crop',
      category: 'Web App'
    }
  ]
};

const StatCard = ({ title, value, subtitle, icon, delay }) => (
  <AnimatableView 
    animation="fadeInUp"
    delay={delay}
    className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex-1 mx-1"
  >
    <StyledView className="flex-row items-center justify-between mb-2">
      <StyledText className="text-2xl font-bold text-gray-800">{value}</StyledText>
      <StyledView className="bg-purple-50 p-2 rounded-lg">
        <Ionicons name={icon} size={20} color="#7c3aed" />
      </StyledView>
    </StyledView>
    <StyledText className="text-gray-600 text-sm font-medium">{title}</StyledText>
    <StyledText className="text-gray-400 text-xs mt-1">{subtitle}</StyledText>
  </AnimatableView>
);

const SkillChip = ({ skill, onRemove, isEditing }) => (
  <StyledView className="bg-purple-50 px-3 py-2 rounded-full mr-2 mb-2 flex-row items-center">
    <StyledText className="text-purple-600 text-sm font-medium">{skill}</StyledText>
    {isEditing && (
      <StyledTouchableOpacity 
        onPress={() => onRemove(skill)}
        className="ml-2"
      >
        <Ionicons name="close-circle" size={16} color="#7c3aed" />
      </StyledTouchableOpacity>
    )}
  </StyledView>
);

const PortfolioCard = ({ project, index }) => (
  <AnimatableView 
    animation="fadeInRight"
    delay={index * 150}
    className="bg-white rounded-2xl p-4 mr-4 w-48 shadow-sm border border-gray-100"
  >
    <Image 
      source={{ uri: project.image }} 
      className="w-full h-24 rounded-xl mb-3"
    />
    <StyledText className="font-semibold text-gray-800 text-base mb-1">
      {project.title}
    </StyledText>
    <StyledText className="text-purple-600 text-xs font-medium">
      {project.category}
    </StyledText>
  </AnimatableView>
);

const EditableField = ({ label, value, onChange, isEditing, placeholder, keyboardType = 'default' }) => (
  <StyledView className="mb-4">
    <StyledText className="text-gray-700 font-medium mb-2 text-sm">
      {label}
    </StyledText>
    {isEditing ? (
      <StyledTextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        keyboardType={keyboardType}
        className="bg-white rounded-2xl px-4 py-3 border-2 border-gray-200 text-gray-800 text-base"
        placeholderTextColor="#9ca3af"
      />
    ) : (
      <StyledText className="bg-gray-50 rounded-2xl px-4 py-3 text-gray-800 text-base">
        {value}
      </StyledText>
    )}
  </StyledView>
);

export default function ProfileScreen() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(userData);
  const [newSkill, setNewSkill] = useState('');

  const handleSaveProfile = () => {
    setIsEditing(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !user.skills.includes(newSkill.trim())) {
      setUser({
        ...user,
        skills: [...user.skills, newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setUser({
      ...user,
      skills: user.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Ionicons key={i} name="star" size={16} color="#f59e0b" />);
    }

    if (hasHalfStar) {
      stars.push(<Ionicons key="half" name="star-half" size={16} color="#f59e0b" />);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Ionicons key={`empty-${i}`} name="star-outline" size={16} color="#f59e0b" />);
    }

    return stars;
  };

  return (
    <StyledView className="flex-1 bg-gray-50">
      {/* Header */}
      <StyledView className="bg-white pt-12 pb-4 px-6 border-b border-gray-200">
        <StyledView className="flex-row items-center mb-2">
          <StyledTouchableOpacity 
            onPress={() => router.back()}
            className="mr-4"
          >
            <Feather name="arrow-left" size={24} color="#374151" />
          </StyledTouchableOpacity>
          <StyledText className="text-2xl font-bold text-gray-800">
            Profile
          </StyledText>
        </StyledView>
      </StyledView>

      <StyledScrollView 
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <StyledView className="bg-white pb-6">
          <StyledView className="items-center px-6 pt-8">
            <AnimatableView animation="fadeInDown" duration={800}>
              <StyledView className="relative">
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' }}
                  className="w-24 h-24 rounded-2xl mb-4"
                />
                <StyledTouchableOpacity className="absolute bottom-4 right-0 bg-purple-600 w-8 h-8 rounded-full items-center justify-center">
                  <Ionicons name="camera" size={16} color="white" />
                </StyledTouchableOpacity>
              </StyledView>
              
              <StyledText className="text-2xl font-bold text-gray-800 mb-1">
                {user.name}
              </StyledText>
              <StyledText className="text-gray-600 text-base mb-2">
                {user.role}
              </StyledText>
              
              <StyledView className="flex-row items-center mb-1">
                {renderStars(user.rating)}
                <StyledText className="text-gray-700 font-medium text-sm ml-2">
                  {user.rating}
                </StyledText>
                <StyledText className="text-gray-500 text-sm mx-1">•</StyledText>
                <StyledText className="text-gray-500 text-sm">
                  {user.reviews} reviews
                </StyledText>
              </StyledView>
              
              <StyledText className="text-gray-400 text-sm">
                Member since {user.joinDate}
              </StyledText>
            </AnimatableView>
          </StyledView>
        </StyledView>

        {/* Stats Overview */}
        <StyledView className="px-6 mt-6">
          <StyledText className="text-lg font-bold text-gray-800 mb-4">Overview</StyledText>
          <StyledView className="flex-row -mx-1 mb-2">
            <StatCard 
              title="Total Projects" 
              value={user.stats.totalProjects} 
              subtitle="All time"
              icon="briefcase-outline"
              delay={200}
            />
            <StatCard 
              title="Completed Jobs" 
              value={user.stats.completedJobs} 
              subtitle="Successful"
              icon="checkmark-done-outline"
              delay={300}
            />
          </StyledView>
          <StyledView className="flex-row -mx-1">
            <StatCard 
              title="Ongoing" 
              value={user.stats.ongoingProjects} 
              subtitle="Active projects"
              icon="time-outline"
              delay={400}
            />
            <StatCard 
              title="Total Earnings" 
              value={user.stats.totalEarnings} 
              subtitle="Lifetime"
              icon="cash-outline"
              delay={500}
            />
          </StyledView>
        </StyledView>

        {/* Personal Information */}
        <StyledView className="px-6 mt-6">
          <StyledView className="flex-row justify-between items-center mb-4">
            <StyledText className="text-lg font-bold text-gray-800">
              Personal Information
            </StyledText>
            <StyledTouchableOpacity 
              onPress={() => setIsEditing(!isEditing)}
              className="flex-row items-center"
            >
              <Ionicons 
                name={isEditing ? "close" : "pencil"} 
                size={18} 
                color="#7c3aed" 
              />
              <StyledText className="text-purple-600 font-medium ml-1">
                {isEditing ? 'Cancel' : 'Edit'}
              </StyledText>
            </StyledTouchableOpacity>
          </StyledView>

          <StyledView className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <EditableField
              label="Full Name"
              value={user.name}
              onChange={(text) => setUser({ ...user, name: text })}
              isEditing={isEditing}
              placeholder="Enter your full name"
            />
            
            <EditableField
              label="Email Address"
              value={user.email}
              onChange={(text) => setUser({ ...user, email: text })}
              isEditing={isEditing}
              placeholder="Enter your email"
              keyboardType="email-address"
            />
            
            <EditableField
              label="Phone Number"
              value={user.phone}
              onChange={(text) => setUser({ ...user, phone: text })}
              isEditing={isEditing}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
            />
            
            <EditableField
              label="Location"
              value={user.location}
              onChange={(text) => setUser({ ...user, location: text })}
              isEditing={isEditing}
              placeholder="Enter your location"
            />

            {isEditing && (
              <StyledTouchableOpacity
                onPress={handleSaveProfile}
                className="bg-purple-600 rounded-xl py-3 items-center mt-2"
              >
                <StyledText className="text-white font-semibold text-base">
                  Save Changes
                </StyledText>
              </StyledTouchableOpacity>
            )}
          </StyledView>
        </StyledView>

        {/* Skills Section */}
        <StyledView className="px-6 mt-6">
          <StyledText className="text-lg font-bold text-gray-800 mb-4">
            Skills & Expertise
          </StyledText>
          <StyledView className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <StyledView className="flex-row flex-wrap mb-4">
              {user.skills.map((skill, index) => (
                <SkillChip 
                  key={index} 
                  skill={skill} 
                  onRemove={handleRemoveSkill}
                  isEditing={isEditing}
                />
              ))}
            </StyledView>

            {isEditing && (
              <StyledView className="flex-row items-center">
                <StyledTextInput
                  value={newSkill}
                  onChangeText={setNewSkill}
                  placeholder="Add a new skill..."
                  className="flex-1 bg-gray-50 rounded-xl px-4 py-3 border-2 border-gray-200 text-gray-800 text-base"
                  placeholderTextColor="#9ca3af"
                />
                <StyledTouchableOpacity
                  onPress={handleAddSkill}
                  className="bg-purple-600 w-12 h-12 rounded-xl items-center justify-center ml-2"
                >
                  <Ionicons name="add" size={24} color="white" />
                </StyledTouchableOpacity>
              </StyledView>
            )}
          </StyledView>
        </StyledView>

        {/* Portfolio Section */}
        <StyledView className="px-6 mt-6 mb-8">
          <StyledView className="flex-row justify-between items-center mb-4">
            <StyledText className="text-lg font-bold text-gray-800">
              Portfolio
            </StyledText>
            <StyledTouchableOpacity>
              <StyledText className="text-purple-600 font-medium">
                View All
              </StyledText>
            </StyledTouchableOpacity>
          </StyledView>

          <StyledScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 24 }}
          >
            {user.portfolio.map((project, index) => (
              <PortfolioCard key={project.id} project={project} index={index} />
            ))}
          </StyledScrollView>
        </StyledView>
      </StyledScrollView>

      {/* Floating Edit Button */}
      {!isEditing && (
        <AnimatableView 
          animation="bounceIn"
          duration={1000}
          className="absolute bottom-6 right-6"
        >
          <StyledTouchableOpacity
            onPress={() => setIsEditing(true)}
            className="bg-purple-600 w-16 h-16 rounded-2xl items-center justify-center shadow-xl"
          >
            <Ionicons name="pencil" size={24} color="white" />
          </StyledTouchableOpacity>
        </AnimatableView>
      )}
    </StyledView>
  );
}