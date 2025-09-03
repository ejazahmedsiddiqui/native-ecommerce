// Example for Wallet.jsx (apply this pattern to all your profile menu screens)
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import { useCallback } from 'react';

const Wallet = () => {
  // Custom back button handler
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        // Navigate back to the Profile tab specifically
        router.navigate('/profile');
        return true; // Prevent default back behavior
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      
      return () => subscription?.remove();
    }, [])
  );

  const handleBackPress = () => {
    router.navigate('/profile');
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
        <Text style={styles.headerTitle}>Your Wallet</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Your screen content here */}
      <View style={styles.content}>
        <Text style={styles.contentText}>Your Wallet Content</Text>
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

export default Wallet;