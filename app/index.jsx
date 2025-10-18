import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar, Animated } from 'react-native';
import { styled } from 'nativewind';
import { useNavigation } from '@react-navigation/native';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const AnimatedView = Animated.View;


export default function LandingScreen() {
  const navigation = useNavigation();
  
  // Animation values
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(50))[0];
  const scaleAnim = useState(new Animated.Value(0.8))[0];
  const pulseAnim = useState(new Animated.Value(1))[0];

  useEffect(() => {
    // Start animations when component mounts
    Animated.parallel([
      // Fade in animation
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      // Slide up animation
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      // Scale animation
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    // Pulse animation for the button
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleGetStarted = () => {
    // Navigate to login screen
    navigation.navigate('Login');
  };

  return (
    <StyledView className="flex-1 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
      <StatusBar barStyle="light-content" backgroundColor="#4f46e5" />
      
      {/* Main Content */}
      <StyledView className="flex-1 justify-center items-center px-8">
        {/* Animated Logo/Icon */}
        <AnimatedView 
          style={{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }}
          className="mb-8"
        >
          <StyledView className="w-24 h-24 bg-white/20 rounded-3xl items-center justify-center backdrop-blur-sm border border-white/30">
            <StyledText className="text-3xl">🚀</StyledText>
          </StyledView>
        </AnimatedView>

        {/* Animated App Name */}
        <AnimatedView
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
          className="mb-4"
        >
          <StyledText className="text-5xl font-bold text-white text-center mb-2">
            FreelanceHub
          </StyledText>
          <StyledText className="text-3xl text-white/90">🚀</StyledText>
        </AnimatedView>

        {/* Animated Tagline */}
        <AnimatedView
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
          className="mb-12"
        >
          <StyledText className="text-xl text-white/80 text-center leading-7">
            Connect with Top Talent{'\n'}
            <StyledText className="text-white/90 font-semibold">
              Build Amazing Projects
            </StyledText>
          </StyledText>
        </AnimatedView>

        {/* Animated Get Started Button */}
        <AnimatedView
          style={{
            transform: [
              { translateY: slideAnim },
              { scale: pulseAnim }
            ],
            opacity: fadeAnim,
          }}
        >
          <StyledTouchableOpacity 
            onPress={handleGetStarted}
            className="bg-white rounded-2xl px-12 py-4 shadow-2xl border border-white/30"
            activeOpacity={0.8}
          >
            <StyledText className="text-purple-600 text-lg font-bold text-center">
              Get Started
            </StyledText>
          </StyledTouchableOpacity>
        </AnimatedView>

        {/* Additional Info */}
        <AnimatedView
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
          className="mt-8"
        >
          <StyledText className="text-white/60 text-center text-sm">
            Join thousands of freelancers and clients{'\n'}
            building the future together
          </StyledText>
        </AnimatedView>

        {/* Feature Highlights */}
        <AnimatedView
          style={{
            opacity: fadeAnim,
          }}
          className="flex-row mt-12 space-x-6"
        >
          <StyledView className="items-center">
            <StyledText className="text-white text-2xl mb-1">⭐</StyledText>
            <StyledText className="text-white/80 text-xs">Top Rated</StyledText>
          </StyledView>
          <StyledView className="items-center">
            <StyledText className="text-white text-2xl mb-1">⚡</StyledText>
            <StyledText className="text-white/80 text-xs">Fast</StyledText>
          </StyledView>
          <StyledView className="items-center">
            <StyledText className="text-white text-2xl mb-1">🔒</StyledText>
            <StyledText className="text-white/80 text-xs">Secure</StyledText>
          </StyledView>
        </AnimatedView>
      </StyledView>

      {/* Footer */}
      <StyledView className="pb-8 items-center">
        <StyledText className="text-white/40 text-xs">
          Already have an account?{' '}
          <StyledText 
            className="text-white/60 font-semibold underline"
            onPress={() => navigation.navigate('Login')}
          >
            Sign In
          </StyledText>
        </StyledText>
      </StyledView>
    </StyledView>
  );
}