import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput, StatusBar, Image } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);

// Placeholder data for freelancers
const freelancersData = [
  {
    id: 1,
    name: 'Sarah Chen',
    title: 'Senior UI/UX Designer',
    rating: 4.9,
    completedProjects: 47,
    hourlyRate: '$85',
    skills: ['Figma', 'Prototyping', 'User Research'],
    profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    title: 'Full Stack Developer',
    rating: 4.8,
    completedProjects: 32,
    hourlyRate: '$75',
    skills: ['React', 'Node.js', 'MongoDB'],
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    title: 'Digital Marketing Expert',
    rating: 4.7,
    completedProjects: 28,
    hourlyRate: '$65',
    skills: ['SEO', 'Google Ads', 'Social Media'],
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 4,
    name: 'Alex Thompson',
    title: 'AI/ML Engineer',
    rating: 5.0,
    completedProjects: 19,
    hourlyRate: '$120',
    skills: ['Python', 'TensorFlow', 'Deep Learning'],
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 5,
    name: 'Priya Sharma',
    title: 'Mobile App Developer',
    rating: 4.9,
    completedProjects: 41,
    hourlyRate: '$70',
    skills: ['React Native', 'Flutter', 'Firebase'],
    profileImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face'
  }
];

const skillsFilter = [
  { id: 'all', name: 'All' },
  { id: 'design', name: 'Design' },
  { id: 'development', name: 'Development' },
  { id: 'marketing', name: 'Marketing' },
  { id: 'ai-ml', name: 'AI/ML' },
  { id: 'writing', name: 'Writing' },
  { id: 'consulting', name: 'Consulting' }
];

const FreelancerCard = ({ freelancer }) => (
  <StyledView className="bg-white rounded-2xl p-6 mb-4 shadow-lg border border-gray-100">
    <StyledView className="flex-row items-start justify-between mb-4">
      <StyledView className="flex-row items-center flex-1">
        <Image 
          source={{ uri: freelancer.profileImage }} 
          className="w-16 h-16 rounded-full mr-4"
        />
        <StyledView className="flex-1">
          <StyledText className="text-xl font-bold text-gray-800 mb-1">
            {freelancer.name}
          </StyledText>
          <StyledText className="text-gray-600 text-sm mb-2">
            {freelancer.title}
          </StyledText>
          <StyledView className="flex-row items-center">
            <StyledText className="text-yellow-500 text-sm mr-1">⭐</StyledText>
            <StyledText className="text-gray-700 font-semibold text-sm">
              {freelancer.rating}
            </StyledText>
            <StyledText className="text-gray-500 text-sm mx-1">•</StyledText>
            <StyledText className="text-gray-500 text-sm">
              {freelancer.completedProjects} projects
            </StyledText>
          </StyledView>
        </StyledView>
      </StyledView>
      <StyledView className="items-end">
        <StyledText className="text-2xl font-bold text-purple-600">
          {freelancer.hourlyRate}
        </StyledText>
        <StyledText className="text-gray-500 text-sm">/hour</StyledText>
      </StyledView>
    </StyledView>

    {/* Skills */}
    <StyledView className="flex-row flex-wrap mb-6">
      {freelancer.skills.map((skill, index) => (
        <StyledView 
          key={index}
          className="bg-purple-50 px-3 py-1 rounded-full mr-2 mb-2"
        >
          <StyledText className="text-purple-600 text-xs font-medium">
            {skill}
          </StyledText>
        </StyledView>
      ))}
    </StyledView>

    {/* Action Buttons */}
    <StyledView className="flex-row space-x-3">
      <StyledTouchableOpacity className="flex-1 bg-purple-600 py-3 rounded-xl items-center">
        <StyledText className="text-white font-semibold text-base">
          Hire Now
        </StyledText>
      </StyledTouchableOpacity>
      <StyledTouchableOpacity className="w-12 bg-gray-100 py-3 rounded-xl items-center justify-center">
        <StyledText className="text-gray-600 text-lg">💬</StyledText>
      </StyledTouchableOpacity>
    </StyledView>
  </StyledView>
);

const SkillFilterButton = ({ skill, isActive, onPress }) => (
  <StyledTouchableOpacity 
    onPress={onPress}
    className={`px-4 py-2 rounded-full mr-2 ${
      isActive ? 'bg-purple-600' : 'bg-gray-100'
    }`}
  >
    <StyledText className={`font-medium text-sm ${
      isActive ? 'text-white' : 'text-gray-700'
    }`}>
      {skill.name}
    </StyledText>
  </StyledTouchableOpacity>
);

export default function FreelancersScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('all');
  const [freelancers] = useState(freelancersData);

  const filteredFreelancers = freelancers.filter(freelancer => {
    const matchesSearch = freelancer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         freelancer.skills.some(skill => 
                           skill.toLowerCase().includes(searchQuery.toLowerCase())
                         );
    const matchesSkill = selectedSkill === 'all' || 
                        freelancer.skills.some(skill => 
                          skill.toLowerCase().includes(selectedSkill)
                        );
    return matchesSearch && matchesSkill;
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
          <StyledView className="flex-row justify-between items-center mb-6">
            <StyledView>
              <StyledText className="text-2xl font-bold text-gray-800">
                Find Freelancers
              </StyledText>
              <StyledText className="text-gray-500 mt-1">
                Discover talented professionals
              </StyledText>
            </StyledView>
            <StyledTouchableOpacity className="bg-purple-600 w-10 h-10 rounded-full items-center justify-center">
              <StyledText className="text-white font-bold text-lg">🔍</StyledText>
            </StyledTouchableOpacity>
          </StyledView>

          {/* Search Bar */}
          <StyledView className="bg-gray-100 rounded-2xl px-4 py-3 flex-row items-center">
            <StyledText className="text-gray-400 mr-2">🔍</StyledText>
            <StyledTextInput
              placeholder="Search by name or skill..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="flex-1 text-gray-800 text-base"
              placeholderTextColor="#9ca3af"
            />
          </StyledView>
        </StyledView>

        {/* Skills Filter */}
        <StyledView className="px-6 py-4 bg-white border-b border-gray-200">
          <StyledScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 20 }}
          >
            {skillsFilter.map((skill) => (
              <SkillFilterButton
                key={skill.id}
                skill={skill}
                isActive={selectedSkill === skill.id}
                onPress={() => setSelectedSkill(skill.id)}
              />
            ))}
          </StyledScrollView>
        </StyledView>

        {/* Results Count */}
        <StyledView className="px-6 pt-6 pb-4">
          <StyledText className="text-gray-600">
            Showing {filteredFreelancers.length} freelancers
            {selectedSkill !== 'all' && ` in ${skillsFilter.find(s => s.id === selectedSkill)?.name}`}
            {searchQuery && ` for "${searchQuery}"`}
          </StyledText>
        </StyledView>

        {/* Freelancers List */}
        <StyledView className="px-6">
          {filteredFreelancers.map((freelancer) => (
            <FreelancerCard key={freelancer.id} freelancer={freelancer} />
          ))}
        </StyledView>

        {/* Empty State */}
        {filteredFreelancers.length === 0 && (
          <StyledView className="flex-1 items-center justify-center py-20 px-6">
            <StyledText className="text-6xl mb-4">👥</StyledText>
            <StyledText className="text-xl font-bold text-gray-800 mb-2 text-center">
              No freelancers found
            </StyledText>
            <StyledText className="text-gray-500 text-center">
              Try adjusting your search or filter criteria
            </StyledText>
          </StyledView>
        )}
      </StyledScrollView>
    </StyledView>
  );
}