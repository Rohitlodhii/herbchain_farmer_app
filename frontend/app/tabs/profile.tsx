import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const profileItems = [
    { icon: 'person-outline', title: 'Edit Profile', subtitle: 'Update your personal information' },
    { icon: 'leaf-outline', title: 'My Herbs', subtitle: 'View all your herb submissions' },
    { icon: 'location-outline', title: 'My Farms', subtitle: 'Manage your farm locations' },
    { icon: 'analytics-outline', title: 'Statistics', subtitle: 'View your farming analytics' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>R</Text>
          </View>
          <Text style={styles.userName}>Ramesh</Text>
          <Text style={styles.userPhone}>+91 98765 43210</Text>
        </View>

        <View style={styles.menuContainer}>
          {profileItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <View style={styles.menuIcon}>
                <Ionicons name={item.icon as any} size={24} color="#4ade80" />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <Ionicons name="help-circle-outline" size={24} color="#4ade80" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Help & Support</Text>
              <Text style={styles.menuSubtitle}>Get help with your account</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <Ionicons name="log-out-outline" size={24} color="#ef4444" />
            </View>
            <View style={styles.menuContent}>
              <Text style={[styles.menuTitle, { color: '#ef4444' }]}>Logout</Text>
              <Text style={styles.menuSubtitle}>Sign out of your account</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fffe',
  },
  content: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4ade80',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#065f46',
    marginBottom: 4,
  },
  userPhone: {
    fontSize: 16,
    color: '#6b7280',
  },
  menuContainer: {
    backgroundColor: '#ffffff',
    marginHorizontal: 24,
    borderRadius: 16,
    paddingVertical: 8,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  section: {
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  menuIcon: {
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
});
</absolute_file_name>
    </file>