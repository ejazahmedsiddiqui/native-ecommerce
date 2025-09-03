import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useNavigation } from 'expo-router';
import { useCallback } from 'react';
import { theme } from '../../utils/themes';

const Settings = () => {
  // Navigation
  const navigation = useNavigation();

  // Effect to handle navigation listener
  useEffect(() => { 
    const listener = navigation.addListener('beforeRemove', (e) => {
      e.preventDefault(); // Prevent default navigation
      console.log('onback');
      
      // Always go back to profile, regardless of navigation history
      router.replace('/profile');
    });

    return () => {
      navigation.removeListener('beforeRemove', listener);
    };
  }, []);

  const handleBackPress = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      // Navigate to profile tab if no back stack
      router.replace('/profile'); // Adjust this path to match your tab structure
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBackPress}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Settings</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Your screen content here */}
      <View style={styles.content}>
        <Text style={styles.contentText}>Your Settings Content</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
    textAlign: 'center',
    marginRight: 40, // Compensate for back button width
  },
  placeholder: {
    width: 40, // Same as back button to center title
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  contentText: {
    fontSize: 16,
    color: '#6b7280',
  },
});

export default Settings;