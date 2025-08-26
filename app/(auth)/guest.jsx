import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Dimensions, SafeAreaViewBase } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { theme } from '../../utils/themes';
import { StatusBar } from 'expo-status-bar';


const guest = () => {

  const handleOnPress = () => {
    router.replace('/');
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.content}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Hello there!</Text>
          <Text style={styles.subtitle}>You are now Operating as a guest</Text>
        </View>

        {/* Login Form */}
        <View style={styles.loginBox}>
          <View style={styles.form}>
            {/* Email Input */}
            <TouchableOpacity 
              style={[styles.button, styles.buttonActive]}
              onPress={handleOnPress}  
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Click Here to continue Browsing</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Don't have an account?{' '}
            <Text
              style={styles.signUpText}
              onPress={() => router.push('/(auth)/register')}
            >
              Sign up
            </Text>
          </Text>
        </View>

      </View>

    </SafeAreaView>
  )
}

export default guest

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.accent.orange[100],
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.xl,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xxxxl,
  },
  welcomeText: {
    fontSize: theme.typography.fontSizes.heading1,
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: theme.typography.fontSizes.bodyLarge,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
  loginBox: {
    backgroundColor: theme.colors.accent.orange[400],
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.xxl,
    ...theme.shadows.lg,
    shadowColor: theme.colors.neutral[900],
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 8,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
  },
  button: {
    height: theme.componentSizes.button.large.height,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  buttonActive: {
    backgroundColor: theme.colors.accent.orange[200],
    shadowColor: theme.colors.accent.blue[500],
  },
  buttonText: {
    color: theme.colors.text.primary,
    fontSize: theme.typography.fontSizes.bodyLarge,
    fontWeight: theme.typography.fontWeights.semibold,
  },
  footer: {
    alignItems: 'center',
    marginTop: theme.spacing.xxxxl,
  },
  footerText: {
    fontSize: theme.typography.fontSizes.bodyMedium,
    color: theme.colors.text.secondary,
  },
  signUpText: {
    color: theme.colors.accent.blue[600],
    fontWeight: theme.typography.fontWeights.semibold,
  },
})