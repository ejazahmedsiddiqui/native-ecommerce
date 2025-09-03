import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {
  Ionicons,
  MaterialIcons,
  Feather,
  Zocial
} from '@expo/vector-icons';
import { router } from 'expo-router';
import { theme } from '../utils/themes'

const profile = ({ userDetails }) => {

  const menuItems = [
    { icon: 'heart', iconSet: Ionicons, label: 'Your Favourites', color: theme.colors.accent.red[700] },
    { icon: 'wallet', iconSet: Ionicons, label: 'Wallet', color: theme.colors.accent.green[400] },
    { icon: 'card', iconSet: Ionicons, label: 'Payment', color: theme.colors.accent.blue[600] },
    { icon: 'people', iconSet: Ionicons, label: 'Friends', color: '#8b5cf6' },
    { icon: 'percent', iconSet: MaterialIcons, label: 'Promotions', color: '#f59e0b' },
    { icon: 'settings', iconSet: Ionicons, label: 'Settings', color: '#6b7280' },
    { icon: 'log-out', iconSet: Feather, label: 'Logout', color: theme.colors.accent.red[800] },
  ];

  const handleMenuPress = (label) => {
    console.log(`Pressed: ${label}`);

    switch (label) {
      case 'Your Favourites':
        router.push('/(profileMenu)/Favourites');
        break;
      case 'Wallet':
        router.push('/(profileMenu)/Wallet');
        break;
      case 'Payment':
        router.push('/(profileMenu)/Payment');
        break;
      case 'Friends':
        router.push('/(profileMenu)/Friends');
        break;
      case 'Promotions':
        router.push('/(profileMenu)/Promotions');
        break;
      case 'Settings':
        router.push('/(profileMenu)/Settings');
        break;
      case 'Logout':
        // For logout, you might want to clear everything and go to auth
        router.dismissAll();
        router.replace('/(auth)/signIn');
        break;
      default:
        console.log('Unknown menu item');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>

        {/* User Info Section */}
        <View style={styles.userSection}>
          {/* User Image */}
          <View style={styles.userImage}>
            <Text style={styles.userInitials}>JD</Text>
          </View>

          {/* User Details */}
          <View style={styles.userInfo}>
            <Text style={styles.userName}>John Doe</Text>
            <Text style={styles.userDesignation} numberOfLines={1}>
              Senior Software Developer
            </Text>
          </View>
        </View>

        {/* Contact Info */}
        <View style={styles.contactInfo}>
          <View style={styles.contactItem}>
            <Ionicons name="call" size={16} color="#6b7280" />
            <Text style={styles.contactText}>+1 (555) 123-4567</Text>
          </View>
          <View style={styles.contactItem}>
            <Ionicons name="mail" size={16} color="#6b7280" />
            <Text style={styles.contactText}>john.doe@email.com</Text>
          </View>
        </View>
      </View>

      {/* Menu Items */}
      <ScrollView>
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => {
            const IconComponent = item.iconSet;
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.menuItem,
                  index === menuItems.length - 1 && styles.lastMenuItem
                ]}
                onPress={() => handleMenuPress(item.label)}
                activeOpacity={0.7}
              >
                <View style={styles.menuIconContainer}>
                  <IconComponent name={item.icon} size={20} color={item.color} />
                </View>
                <Text style={styles.menuLabel}>{item.label}</Text>
                <Ionicons name="chevron-forward" size={16} color="#d1d5db" />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingVertical: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 24,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  userImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userInitials: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  userDesignation: {
    fontSize: 14,
    color: '#6b7280',
  },
  contactInfo: {
    gap: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  contactText: {
    fontSize: 14,
    color: '#374151',
  },
  menuContainer: {
    backgroundColor: '#ffffff',
    marginTop: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
});

export default profile;