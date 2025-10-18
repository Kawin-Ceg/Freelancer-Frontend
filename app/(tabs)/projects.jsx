import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);

// Placeholder data for projects
const projectsData = [
  {
    id: 1,
    name: 'E-commerce Mobile App',
    client: 'TechCorp Inc',
    status: 'Open',
    statusColor: 'bg-green-500',
    budget: '$4,500 - $6,000',
    deadline: 'Dec 15, 2024',
    description: 'Build a React Native e-commerce app with payment integration and admin dashboard.',
    proposals: 12,
    clientInitials: 'TC',
    duration: '3-4 weeks'
  },
  {
    id: 2,
    name: 'Website Redesign',
    client: 'Design Studio Co',
    status: 'In Progress',
    statusColor: 'bg-blue-500',
    budget: '$2,800 - $3,500',
    deadline: 'Nov 30, 2024',
    description: 'Modern website redesign with responsive layout and CMS integration.',
    proposals: 8,
    clientInitials: 'DS',
    duration: '2 weeks'
  },
  {
    id: 3,
    name: 'API Integration Service',
    client: 'StartupXYZ',
    status: 'Open',
    statusColor: 'bg-green-500',
    budget: '$1,200 - $1,800',
    deadline: 'Jan 10, 2025',
    description: 'Integrate third-party APIs with existing mobile application.',
    proposals: 5,
    clientInitials: 'SX',
    duration: '1 week'
  },
  {
    id: 4,
    name: 'UI/UX Design System',
    client: 'Creative Agency',
    status: 'Completed',
    statusColor: 'bg-gray-500',
    budget: '$3,200',
    deadline: 'Dec 22, 2024',
    description: 'Create comprehensive design system for brand consistency.',
    proposals: 15,
    clientInitials: 'CA',
    duration: '4 weeks'
  },
  {
    id: 5,
    name: 'AI Chatbot Development',
    client: 'Innovation Labs',
    status: 'Open',
    statusColor: 'bg-green-500',
    budget: '$5,000 - $7,500',
    deadline: 'Jan 20, 2025',
    description: 'Develop intelligent chatbot using machine learning and natural language processing.',
    proposals: 21,
    clientInitials: 'IL',
    duration: '6-8 weeks'
  },
  {
    id: 6,
    name: 'Social Media Marketing',
    client: 'Fashion Brand',
    status: 'In Progress',
    statusColor: 'bg-blue-500',
    budget: '$1,500 - $2,000',
    deadline: 'Dec 10, 2024',
    description: '3-month social media campaign management and content creation.',
    proposals: 7,
    clientInitials: 'FB',
    duration: '3 months'
  }
];

const statusFilters = [
  { id: 'all', name: 'All Projects', count: projectsData.length },
  { id: 'open', name: 'Open', count: projectsData.filter(p => p.status === 'Open').length },
  { id: 'in-progress', name: 'In Progress', count: projectsData.filter(p => p.status === 'In Progress').length },
  { id: 'completed', name: 'Completed', count: projectsData.filter(p => p.status === 'Completed').length }
];

const ProjectCard = ({ project }) => (
  <StyledView className="bg-white rounded-2xl p-6 mb-4 shadow-lg border border-gray-100">
    {/* Header with Client Info and Status */}
    <StyledView className="flex-row items-start justify-between mb-4">
      <StyledView className="flex-row items-center flex-1">
        <StyledView className="w-12 h-12 bg-purple-100 rounded-full items-center justify-center mr-4">
          <StyledText className="text-purple-600 font-bold text-sm">
            {project.clientInitials}
          </StyledText>
        </StyledView>
        <StyledView className="flex-1">
          <StyledText className="text-xl font-bold text-gray-800 mb-1">
            {project.name}
          </StyledText>
          <StyledText className="text-gray-600 text-base">
            {project.client}
          </StyledText>
        </StyledView>
      </StyledView>
      <StyledView className={`px-3 py-1 rounded-full ${project.statusColor}`}>
        <StyledText className="text-white text-xs font-semibold">
          {project.status}
        </StyledText>
      </StyledView>
    </StyledView>

    {/* Project Description */}
    <StyledText className="text-gray-600 text-sm mb-4 leading-5">
      {project.description}
    </StyledText>

    {/* Project Details Grid */}
    <StyledView className="flex-row justify-between mb-4 bg-gray-50 rounded-xl p-3">
      <StyledView className="flex-1">
        <StyledText className="text-gray-500 text-xs mb-1">Budget</StyledText>
        <StyledText className="text-gray-800 font-semibold text-sm">{project.budget}</StyledText>
      </StyledView>
      <StyledView className="flex-1">
        <StyledText className="text-gray-500 text-xs mb-1">Deadline</StyledText>
        <StyledText className="text-gray-800 font-semibold text-sm">{project.deadline}</StyledText>
      </StyledView>
      <StyledView className="flex-1">
        <StyledText className="text-gray-500 text-xs mb-1">Duration</StyledText>
        <StyledText className="text-gray-800 font-semibold text-sm">{project.duration}</StyledText>
      </StyledView>
    </StyledView>

    {/* Footer with Proposals and Action Buttons */}
    <StyledView className="flex-row justify-between items-center pt-4 border-t border-gray-100">
      <StyledView className="flex-row items-center">
        <StyledText className="text-gray-500 text-sm mr-2">
          {project.proposals} proposals
        </StyledText>
        <StyledView className="w-1 h-1 bg-gray-300 rounded-full mr-2"></StyledView>
        <StyledText className="text-gray-500 text-sm">
          Fixed Price
        </StyledText>
      </StyledView>
      
      <StyledView className="flex-row space-x-2">
        <StyledTouchableOpacity className="bg-gray-100 px-4 py-2 rounded-lg">
          <StyledText className="text-gray-700 font-medium text-sm">Save</StyledText>
        </StyledTouchableOpacity>
        <StyledTouchableOpacity className="bg-purple-600 px-4 py-2 rounded-lg">
          <StyledText className="text-white font-medium text-sm">Apply Now</StyledText>
        </StyledTouchableOpacity>
      </StyledView>
    </StyledView>
  </StyledView>
);

const FilterButton = ({ filter, isActive, onPress }) => (
  <StyledTouchableOpacity 
    onPress={onPress}
    className={`px-4 py-3 rounded-xl mr-3 flex-row items-center ${
      isActive ? 'bg-purple-600' : 'bg-gray-100'
    }`}
  >
    <StyledText className={`font-semibold text-sm ${
      isActive ? 'text-white' : 'text-gray-700'
    }`}>
      {filter.name}
    </StyledText>
    <StyledView className={`ml-2 px-2 py-1 rounded-full ${
      isActive ? 'bg-white' : 'bg-gray-200'
    }`}>
      <StyledText className={`text-xs font-bold ${
        isActive ? 'text-purple-600' : 'text-gray-600'
      }`}>
        {filter.count}
      </StyledText>
    </StyledView>
  </StyledTouchableOpacity>
);

export default function ProjectsScreen() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [projects] = useState(projectsData);

  const filteredProjects = projects.filter(project => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'open') return project.status === 'Open';
    if (selectedFilter === 'in-progress') return project.status === 'In Progress';
    if (selectedFilter === 'completed') return project.status === 'Completed';
    return true;
  });

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
          <StyledView className="flex-row justify-between items-center mb-2">
            <StyledView>
              <StyledText className="text-2xl font-bold text-gray-800">
                Projects
              </StyledText>
              <StyledText className="text-gray-500 mt-1">
                Find your next opportunity
              </StyledText>
            </StyledView>
            <StyledTouchableOpacity className="bg-purple-600 w-10 h-10 rounded-full items-center justify-center">
              <StyledText className="text-white font-bold text-lg">+</StyledText>
            </StyledTouchableOpacity>
          </StyledView>
        </StyledView>

        {/* Status Filters */}
        <StyledView className="px-6 py-4 bg-white border-b border-gray-200">
          <StyledScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 20 }}
          >
            {statusFilters.map((filter) => (
              <FilterButton
                key={filter.id}
                filter={filter}
                isActive={selectedFilter === filter.id}
                onPress={() => setSelectedFilter(filter.id)}
              />
            ))}
          </StyledScrollView>
        </StyledView>

        {/* Results Count */}
        <StyledView className="px-6 pt-6 pb-4">
          <StyledText className="text-gray-600">
            Showing {filteredProjects.length} projects
            {selectedFilter !== 'all' && ` • ${statusFilters.find(f => f.id === selectedFilter)?.name}`}
          </StyledText>
        </StyledView>

        {/* Projects List */}
        <StyledView className="px-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </StyledView>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <StyledView className="flex-1 items-center justify-center py-20 px-6">
            <StyledText className="text-6xl mb-4">📋</StyledText>
            <StyledText className="text-xl font-bold text-gray-800 mb-2 text-center">
              No projects found
            </StyledText>
            <StyledText className="text-gray-500 text-center mb-6">
              There are no projects matching your current filter
            </StyledText>
            <StyledTouchableOpacity 
              className="bg-purple-600 px-6 py-3 rounded-xl"
              onPress={() => setSelectedFilter('all')}
            >
              <StyledText className="text-white font-semibold">
                View All Projects
              </StyledText>
            </StyledTouchableOpacity>
          </StyledView>
        )}
      </StyledScrollView>
    </StyledView>
  );
}