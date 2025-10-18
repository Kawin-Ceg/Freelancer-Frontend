import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);

// Placeholder data
const statsData = {
  totalProjects: 24,
  freelancersHired: 8,
  paymentsDone: 18,
  totalEarnings: '$12,450'
};

const recentProjects = [
  {
    id: 1,
    name: 'E-commerce Mobile App',
    client: 'TechCorp Inc',
    status: 'In Progress',
    statusColor: 'bg-blue-500',
    budget: '$4,500',
    deadline: 'Dec 15, 2024',
    clientInitials: 'TC'
  },
  {
    id: 2,
    name: 'Website Redesign',
    client: 'Design Studio',
    status: 'Completed',
    statusColor: 'bg-green-500',
    budget: '$2,800',
    deadline: 'Nov 30, 2024',
    clientInitials: 'DS'
  },
  {
    id: 3,
    name: 'API Integration',
    client: 'StartupXYZ',
    status: 'Pending',
    statusColor: 'bg-yellow-500',
    budget: '$1,200',
    deadline: 'Jan 10, 2025',
    clientInitials: 'SX'
  },
  {
    id: 4,
    name: 'UI/UX Design',
    client: 'Creative Agency',
    status: 'In Progress',
    statusColor: 'bg-blue-500',
    budget: '$3,200',
    deadline: 'Dec 22, 2024',
    clientInitials: 'CA'
  }
];

const StatCard = ({ title, value, subtitle, icon }) => (
  <StyledView className="bg-white rounded-2xl p-6 shadow-lg flex-1 mx-1">
    <StyledView className="flex-row items-center justify-between mb-2">
      <StyledText className="text-2xl font-bold text-gray-800">{value}</StyledText>
      <StyledView className="bg-purple-100 p-2 rounded-lg">
        {icon}
      </StyledView>
    </StyledView>
    <StyledText className="text-gray-600 text-sm font-medium">{title}</StyledText>
    <StyledText className="text-gray-400 text-xs mt-1">{subtitle}</StyledText>
  </StyledView>
);

const ProjectCard = ({ project }) => (
  <StyledView className="bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100">
    <StyledView className="flex-row items-start justify-between mb-3">
      <StyledView className="flex-row items-center flex-1">
        <StyledView className="w-10 h-10 bg-purple-100 rounded-full items-center justify-center mr-3">
          <StyledText className="text-purple-600 font-bold text-sm">
            {project.clientInitials}
          </StyledText>
        </StyledView>
        <StyledView className="flex-1">
          <StyledText className="text-lg font-semibold text-gray-800 mb-1">
            {project.name}
          </StyledText>
          <StyledText className="text-gray-500 text-sm">
            {project.client}
          </StyledText>
        </StyledView>
      </StyledView>
      <StyledView className={`px-3 py-1 rounded-full ${project.statusColor}`}>
        <StyledText className="text-white text-xs font-medium">
          {project.status}
        </StyledText>
      </StyledView>
    </StyledView>
    
    <StyledView className="flex-row justify-between items-center pt-3 border-t border-gray-100">
      <StyledView>
        <StyledText className="text-gray-500 text-xs mb-1">Budget</StyledText>
        <StyledText className="text-gray-800 font-semibold">{project.budget}</StyledText>
      </StyledView>
      <StyledView>
        <StyledText className="text-gray-500 text-xs mb-1">Deadline</StyledText>
        <StyledText className="text-gray-800 font-semibold text-sm">{project.deadline}</StyledText>
      </StyledView>
      <StyledTouchableOpacity className="bg-gray-100 px-4 py-2 rounded-lg">
        <StyledText className="text-purple-600 font-medium text-sm">View</StyledText>
      </StyledTouchableOpacity>
    </StyledView>
  </StyledView>
);

export default function HomeScreen() {
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
          <StyledView className="flex-row justify-between items-center">
            <StyledView>
              <StyledText className="text-2xl font-bold text-gray-800">
                Dashboard
              </StyledText>
              <StyledText className="text-gray-500 mt-1">
                Welcome back! 👋
              </StyledText>
            </StyledView>
            <StyledTouchableOpacity className="bg-purple-600 w-10 h-10 rounded-full items-center justify-center">
              <StyledText className="text-white font-bold text-lg">JD</StyledText>
            </StyledTouchableOpacity>
          </StyledView>
        </StyledView>

        {/* Stats Cards */}
        <StyledView className="px-6 pt-6">
          <StyledView className="flex-row mb-2">
            <StyledText className="text-xl font-bold text-gray-800">
              Overview
            </StyledText>
          </StyledView>
          
          <StyledView className="flex-row -mx-1 mb-6">
            <StatCard 
              title="Total Projects" 
              value={statsData.totalProjects} 
              subtitle="+2 this month"
              icon={<StyledText className="text-purple-600">📋</StyledText>}
            />
            <StatCard 
              title="Freelancers Hired" 
              value={statsData.freelancersHired} 
              subtitle="Active collaborations"
              icon={<StyledText className="text-purple-600">👥</StyledText>}
            />
          </StyledView>
          
          <StyledView className="flex-row -mx-1 mb-8">
            <StatCard 
              title="Payments Done" 
              value={statsData.paymentsDone} 
              subtitle="Successful transactions"
              icon={<StyledText className="text-purple-600">💳</StyledText>}
            />
            <StatCard 
              title="Total Earnings" 
              value={statsData.totalEarnings} 
              subtitle="Lifetime revenue"
              icon={<StyledText className="text-purple-600">💰</StyledText>}
            />
          </StyledView>
        </StyledView>

        {/* Quick Actions */}
        <StyledView className="px-6 mb-8">
          <StyledText className="text-xl font-bold text-gray-800 mb-4">
            Quick Actions
          </StyledText>
          <StyledView className="flex-row space-x-4">
            <StyledTouchableOpacity className="bg-purple-600 flex-1 rounded-2xl p-5 shadow-lg">
              <StyledView className="flex-row items-center">
                <StyledView className="bg-white/20 w-10 h-10 rounded-lg items-center justify-center mr-3">
                  <StyledText className="text-white text-lg">+</StyledText>
                </StyledView>
                <StyledView>
                  <StyledText className="text-white font-semibold text-lg">
                    Post Project
                  </StyledText>
                  <StyledText className="text-purple-200 text-sm">
                    Find talent
                  </StyledText>
                </StyledView>
              </StyledView>
            </StyledTouchableOpacity>
            
            <StyledTouchableOpacity className="bg-white flex-1 rounded-2xl p-5 shadow-lg border border-gray-200">
              <StyledView className="flex-row items-center">
                <StyledView className="bg-purple-100 w-10 h-10 rounded-lg items-center justify-center mr-3">
                  <StyledText className="text-purple-600 text-lg">🔍</StyledText>
                </StyledView>
                <StyledView>
                  <StyledText className="text-gray-800 font-semibold text-lg">
                    Find Freelancer
                  </StyledText>
                  <StyledText className="text-gray-500 text-sm">
                    Browse talent
                  </StyledText>
                </StyledView>
              </StyledView>
            </StyledTouchableOpacity>
          </StyledView>
        </StyledView>

        {/* Recent Projects */}
        <StyledView className="px-6">
          <StyledView className="flex-row justify-between items-center mb-4">
            <StyledText className="text-xl font-bold text-gray-800">
              Recent Projects
            </StyledText>
            <StyledTouchableOpacity>
              <StyledText className="text-purple-600 font-medium">
                View All
              </StyledText>
            </StyledTouchableOpacity>
          </StyledView>
          
          <StyledView>
            {recentProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </StyledView>
        </StyledView>
      </StyledScrollView>
    </StyledView>
  );
}