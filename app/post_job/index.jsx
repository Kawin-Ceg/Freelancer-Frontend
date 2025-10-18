import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather,  MaterialIcons } from '@expo/vector-icons';
import { styled } from 'nativewind';
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from 'react-native-toast-message';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);

const jobTypes = ['Remote', 'On-site', 'Hybrid'];

export default function PostJobScreen() {
  const router = useRouter();
  
  // Form state
  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    jobDescription: '',
    requiredSkills: '',
    jobType: '',
    budget: '',
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Default: 1 week from now
  });

  const [errors, setErrors] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!formData.jobTitle.trim()) newErrors.jobTitle = 'Job title is required';
    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!formData.jobDescription.trim()) newErrors.jobDescription = 'Job description is required';
    if (!formData.requiredSkills.trim()) newErrors.requiredSkills = 'Skills are required';
    if (!formData.jobType) newErrors.jobType = 'Job type is required';
    if (!formData.budget.trim()) newErrors.budget = 'Budget is required';
    if (isNaN(parseFloat(formData.budget))) newErrors.budget = 'Budget must be a number';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      // Simulate API call
      setTimeout(() => {
        Toast.show({
          type: 'success',
          text1: 'Job Posted Successfully!',
          text2: 'Your job listing is now live.',
          position: 'bottom',
        });

        // Clear form
        setFormData({
          jobTitle: '',
          companyName: '',
          jobDescription: '',
          requiredSkills: '',
          jobType: '',
          budget: '',
          deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        
        setErrors({});
      }, 1000);
    }
  };

  // Handle date change
  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setFormData({ ...formData, deadline: selectedDate });
    }
  };

  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const InputField = ({ 
    label, 
    value, 
    onChangeText, 
    placeholder, 
    icon, 
    error, 
    multiline = false,
    numberOfLines = 1 
  }) => (
    <StyledView className="mb-6">
      <StyledText className="text-gray-700 font-medium mb-2 text-base">
        {label}
      </StyledText>
      <StyledView className={`flex-row items-center bg-white rounded-2xl px-4 border-2 ${
        error ? 'border-red-300' : 'border-gray-200'
      } ${multiline ? 'py-3' : 'py-4'}`}>
        <MaterialIcons name={icon} size={20} color={error ? '#ef4444' : '#6b7280'} />
        <StyledTextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          multiline={multiline}
          numberOfLines={multiline ? 4 : 1}
          className={`flex-1 ml-3 text-gray-800 text-base ${multiline ? 'text-left align-top' : ''}`}
          placeholderTextColor="#9ca3af"
        />
      </StyledView>
      {error && (
        <StyledText className="text-red-500 text-sm mt-1 ml-1">
          {error}
        </StyledText>
      )}
    </StyledView>
  );

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
            Post a Job
          </StyledText>
        </StyledView>
        <StyledText className="text-gray-500 text-base ml-10">
          Find the perfect freelancer for your project
        </StyledText>
      </StyledView>

      <StyledScrollView 
        className="flex-1"
        contentContainerStyle={{ padding: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Job Title */}
        <InputField
          label="Job Title *"
          value={formData.jobTitle}
          onChangeText={(text) => setFormData({ ...formData, jobTitle: text })}
          placeholder="e.g., Senior React Native Developer"
          icon="work-outline"
          error={errors.jobTitle}
        />

        {/* Company Name */}
        <InputField
          label="Company / Client Name *"
          value={formData.companyName}
          onChangeText={(text) => setFormData({ ...formData, companyName: text })}
          placeholder="Your company or client name"
          icon="business"
          error={errors.companyName}
        />

        {/* Job Description */}
        <InputField
          label="Job Description *"
          value={formData.jobDescription}
          onChangeText={(text) => setFormData({ ...formData, jobDescription: text })}
          placeholder="Describe the project, requirements, and expectations..."
          icon="description"
          error={errors.jobDescription}
          multiline={true}
          numberOfLines={4}
        />

        {/* Required Skills */}
        <InputField
          label="Required Skills *"
          value={formData.requiredSkills}
          onChangeText={(text) => setFormData({ ...formData, requiredSkills: text })}
          placeholder="e.g., React Native, TypeScript, Firebase, UI/UX"
          icon="code"
          error={errors.requiredSkills}
        />

        {/* Job Type */}
        <StyledView className="mb-6">
          <StyledText className="text-gray-700 font-medium mb-2 text-base">
            Job Type *
          </StyledText>
          <StyledView className="flex-row flex-wrap -mx-1">
            {jobTypes.map((type) => (
              <StyledTouchableOpacity
                key={type}
                onPress={() => setFormData({ ...formData, jobType: type })}
                className={`flex-1 mx-1 mb-2 py-3 rounded-2xl border-2 items-center ${
                  formData.jobType === type 
                    ? 'bg-blue-50 border-blue-500' 
                    : 'bg-white border-gray-200'
                }`}
              >
                <StyledText className={`font-medium ${
                  formData.jobType === type ? 'text-blue-600' : 'text-gray-600'
                }`}>
                  {type}
                </StyledText>
              </StyledTouchableOpacity>
            ))}
          </StyledView>
          {errors.jobType && (
            <StyledText className="text-red-500 text-sm mt-1 ml-1">
              {errors.jobType}
            </StyledText>
          )}
        </StyledView>

        {/* Budget */}
        <InputField
          label="Budget / Salary *"
          value={formData.budget}
          onChangeText={(text) => setFormData({ ...formData, budget: text })}
          placeholder="e.g., 5000 or 50/hr"
          icon="attach-money"
          error={errors.budget}
          keyboardType="numeric"
        />

        {/* Deadline */}
        <StyledView className="mb-8">
          <StyledText className="text-gray-700 font-medium mb-2 text-base">
            Deadline *
          </StyledText>
          <StyledTouchableOpacity
            onPress={() => setShowDatePicker(true)}
            className="flex-row items-center bg-white rounded-2xl px-4 py-4 border-2 border-gray-200"
          >
            <MaterialIcons name="date-range" size={20} color="#6b7280" />
            <StyledText className="flex-1 ml-3 text-gray-800 text-base">
              {formatDate(formData.deadline)}
            </StyledText>
            <Feather name="calendar" size={20} color="#6b7280" />
          </StyledTouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={formData.deadline}
              mode="date"
              display="default"
              onChange={onDateChange}
              minimumDate={new Date()}
            />
          )}
        </StyledView>

        {/* Submit Button */}
        <StyledTouchableOpacity
          onPress={handleSubmit}
          className="bg-blue-600 rounded-2xl py-4 items-center shadow-lg"
        >
          <StyledText className="text-white font-bold text-lg">
            Submit Job
          </StyledText>
        </StyledTouchableOpacity>

        {/* Help Text */}
        <StyledView className="mt-6 p-4 bg-blue-50 rounded-2xl">
          <StyledView className="flex-row items-start">
            <MaterialIcons name="info" size={20} color="#3b82f6" />
            <StyledView className="flex-1 ml-3">
              <StyledText className="text-blue-800 font-medium mb-1">
                Tips for a great job post:
              </StyledText>
              <StyledText className="text-blue-600 text-sm">
                • Be specific about project requirements{'\n'}
                • Include clear deliverables and timeline{'\n'}
                • Set a realistic budget for quality work
              </StyledText>
            </StyledView>
          </StyledView>
        </StyledView>
      </StyledScrollView>

      {/* Toast Component */}
      <Toast />
    </StyledView>
  );
}