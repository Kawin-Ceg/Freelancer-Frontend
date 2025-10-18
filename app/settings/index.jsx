import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, Alert, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather, Ionicons } from '@expo/vector-icons';
import { styled } from 'nativewind';
import * as Animatable from 'react-native-animatable';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);
const AnimatableView = Animatable.View;

const SettingRow = ({ icon, title, subtitle, rightComponent, onPress, isLast = false }) => (
  <StyledTouchableOpacity
    onPress={onPress}
    className={`flex-row items-center py-4 px-5 bg-white ${
      !isLast ? 'border-b border-gray-100' : ''
    }`}
  >
    <StyledView className="w-10 h-10 bg-purple-50 rounded-xl items-center justify-center mr-4">
      <Ionicons name={icon} size={20} color="#7c3aed" />
    </StyledView>
    
    <StyledView className="flex-1">
      <StyledText className="text-gray-800 font-semibold text-base">{title}</StyledText>
      {subtitle && (
        <StyledText className="text-gray-500 text-sm mt-1">{subtitle}</StyledText>
      )}
    </StyledView>
    
    {rightComponent}
  </StyledTouchableOpacity>
);

const SectionHeader = ({ title, subtitle }) => (
  <StyledView className="px-5 py-3 bg-gray-50">
    <StyledText className="text-gray-800 font-bold text-lg">{title}</StyledText>
    {subtitle && (
      <StyledText className="text-gray-500 text-sm mt-1">{subtitle}</StyledText>
    )}
  </StyledView>
);

export default function SettingsScreen() {
  const router = useRouter();
  
  // State for toggle settings
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    emailNotifications: true,
    pushNotifications: true,
    biometricLogin: false,
  });

  // Handle toggle changes
  const handleToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
    console.log(`${setting} toggled: ${!settings[setting]}`);
  };

  // Handle logout
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            console.log('User logged out');
            // Navigate to login screen or clear auth state
            router.replace('/login');
          },
        },
      ]
    );
  };

  // Handle change password
  const handleChangePassword = () => {
    Alert.alert('Change Password', 'Password change functionality would be implemented here.');
  };

  // Handle contact support
  const handleContactSupport = () => {
    Linking.openURL('mailto:support@freelancehub.com?subject=Support Request');
  };

  // Handle privacy policy
  const handlePrivacyPolicy = () => {
    Alert.alert('Privacy Policy', 'Privacy policy would be displayed here.');
  };

  // Handle terms of service
  const handleTermsOfService = () => {
    Alert.alert('Terms of Service', 'Terms of service would be displayed here.');
  };

  const SwitchComponent = ({ value, onValueChange }) => (
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: '#f3f4f6', true: '#7c3aed' }}
      thumbColor={value ? '#ffffff' : '#f3f4f6'}
      ios_backgroundColor="#f3f4f6"
    />
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
            Settings
          </StyledText>
        </StyledView>
      </StyledView>

      <StyledScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        {/* Account Section */}
        <AnimatableView animation="fadeInUp" delay={200} className="mb-6">
          <SectionHeader 
            title="Account" 
            subtitle="Manage your account settings"
          />
          <StyledView className="bg-white rounded-2xl mx-5 shadow-sm border border-gray-100 overflow-hidden">
            <SettingRow
              icon="lock-closed-outline"
              title="Change Password"
              subtitle="Update your password regularly"
              rightComponent={
                <Feather name="chevron-right" size={20} color="#9ca3af" />
              }
              onPress={handleChangePassword}
            />
            <SettingRow
              icon="finger-print-outline"
              title="Biometric Login"
              subtitle="Use fingerprint or face ID"
              rightComponent={
                <SwitchComponent
                  value={settings.biometricLogin}
                  onValueChange={() => handleToggle('biometricLogin')}
                />
              }
            />
            <SettingRow
              icon="log-out-outline"
              title="Logout"
              subtitle="Sign out of your account"
              rightComponent={
                <Feather name="chevron-right" size={20} color="#9ca3af" />
              }
              onPress={handleLogout}
              isLast={true}
            />
          </StyledView>
        </AnimatableView>

        {/* Notifications Section */}
        <AnimatableView animation="fadeInUp" delay={300} className="mb-6">
          <SectionHeader 
            title="Notifications" 
            subtitle="Control your notification preferences"
          />
          <StyledView className="bg-white rounded-2xl mx-5 shadow-sm border border-gray-100 overflow-hidden">
            <SettingRow
              icon="notifications-outline"
              title="Push Notifications"
              subtitle="Receive push notifications"
              rightComponent={
                <SwitchComponent
                  value={settings.notifications}
                  onValueChange={() => handleToggle('notifications')}
                />
              }
            />
            <SettingRow
              icon="mail-outline"
              title="Email Notifications"
              subtitle="Get updates via email"
              rightComponent={
                <SwitchComponent
                  value={settings.emailNotifications}
                  onValueChange={() => handleToggle('emailNotifications')}
                />
              }
              isLast={true}
            />
          </StyledView>
        </AnimatableView>

        {/* Appearance Section */}
        <AnimatableView animation="fadeInUp" delay={400} className="mb-6">
          <SectionHeader 
            title="Appearance" 
            subtitle="Customize the app's look and feel"
          />
          <StyledView className="bg-white rounded-2xl mx-5 shadow-sm border border-gray-100 overflow-hidden">
            <SettingRow
              icon="moon-outline"
              title="Dark Mode"
              subtitle="Switch between light and dark themes"
              rightComponent={
                <SwitchComponent
                  value={settings.darkMode}
                  onValueChange={() => handleToggle('darkMode')}
                />
              }
              isLast={true}
            />
          </StyledView>
        </AnimatableView>

        {/* Support Section */}
        <AnimatableView animation="fadeInUp" delay={500} className="mb-6">
          <SectionHeader 
            title="Support" 
            subtitle="Get help and support"
          />
          <StyledView className="bg-white rounded-2xl mx-5 shadow-sm border border-gray-100 overflow-hidden">
            <SettingRow
              icon="help-circle-outline"
              title="Help & Support"
              subtitle="Get help with the app"
              rightComponent={
                <Feather name="chevron-right" size={20} color="#9ca3af" />
              }
              onPress={handleContactSupport}
            />
            <SettingRow
              icon="shield-checkmark-outline"
              title="Privacy Policy"
              subtitle="Read our privacy policy"
              rightComponent={
                <Feather name="chevron-right" size={20} color="#9ca3af" />
              }
              onPress={handlePrivacyPolicy}
            />
            <SettingRow
              icon="document-text-outline"
              title="Terms of Service"
              subtitle="Read our terms and conditions"
              rightComponent={
                <Feather name="chevron-right" size={20} color="#9ca3af" />
              }
              onPress={handleTermsOfService}
              isLast={true}
            />
          </StyledView>
        </AnimatableView>

        {/* App Info Section */}
        <AnimatableView animation="fadeInUp" delay={600} className="mb-8">
          <SectionHeader 
            title="App Information" 
            subtitle="About this application"
          />
          <StyledView className="bg-white rounded-2xl mx-5 shadow-sm border border-gray-100 overflow-hidden">
            <SettingRow
              icon="information-circle-outline"
              title="Version"
              subtitle="Current app version"
              rightComponent={
                <StyledText className="text-gray-500 text-sm">1.0.0</StyledText>
              }
            />
            <SettingRow
              icon="build-outline"
              title="Build Number"
              subtitle="App build identifier"
              rightComponent={
                <StyledText className="text-gray-500 text-sm">2024.1</StyledText>
              }
            />
            <SettingRow
              icon="heart-outline"
              title="Rate App"
              subtitle="Share your feedback"
              rightComponent={
                <Feather name="chevron-right" size={20} color="#9ca3af" />
              }
              onPress={() => Alert.alert('Rate App', 'Thank you for your feedback!')}
              isLast={true}
            />
          </StyledView>
        </AnimatableView>

        {/* App Description */}
        <AnimatableView animation="fadeInUp" delay={700} className="px-5 mb-8">
          <StyledView className="bg-purple-50 rounded-2xl p-5 border border-purple-100">
            <StyledView className="flex-row items-start mb-3">
              <Ionicons name="rocket-outline" size={24} color="#7c3aed" />
              <StyledView className="flex-1 ml-3">
                <StyledText className="text-purple-800 font-bold text-lg mb-1">
                  FreelanceHub
                </StyledText>
                <StyledText className="text-purple-600 text-sm leading-5">
                  Connecting talented freelancers with amazing clients worldwide. 
                  Build your career, find perfect projects, and grow your business.
                </StyledText>
              </StyledView>
            </StyledView>
            <StyledText className="text-purple-500 text-xs text-center">
              Made with ❤️ for the freelance community
            </StyledText>
          </StyledView>
        </AnimatableView>
      </StyledScrollView>
    </StyledView>
  );
}