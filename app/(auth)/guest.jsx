import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Dimensions, SafeAreaViewBase } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { theme } from '../../utils/themes';
import { StatusBar } from 'expo-status-bar';


const guest = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content"/>
      <Text>You are now Operating as a guest</Text>
      <TouchableOpacity>
        <Text>Click Here to continue Browsing</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default guest

const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: theme.colors.background.primary,
    },
})