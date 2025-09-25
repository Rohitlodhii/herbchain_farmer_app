import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [locationServices, setLocationServices] = useState(true);
  const [autoSync, setAutoSync] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>Customize your HerbLink experience</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.sectionContainer}>
            <View style={styles.settingItem}>
              <View style={styles.settingIcon}>
                <Ionicons name="notifications-outline" size={24} color="#4ade80" />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Push Notifications</Text>
                <Text style={styles.settingSubtitle}>Receive updates and reminders</Text>
              </View>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: '#d1d5db', true: '#4ade80' }}
                thumbColor="#ffffff"
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingIcon}>
                <Ionicons name="location-outline" size={24} color="#4ade80" />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Location Services</Text>
                <Text style={styles.settingSubtitle}>Allow location access for better experience</Text>
              </View>
              <Switch
                value={locationServices}
                onValueChange={setLocationServices}
                trackColor={{ false: '#d1d5db', true: '#4ade80' }}
                thumbColor="#ffffff"
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingIcon}>
                <Ionicons name="sync-outline" size={24} color="#4ade80" />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Auto Sync</Text>
                <Text style={styles.settingSubtitle}>Automatically sync data when online</Text>
              </View>
              <Switch
                value={autoSync}
                onValueChange={setAutoSync}
                trackColor={{ false: '#d1d5db', true: '#4ade80' }}
                thumbColor="#ffffff"
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.sectionContainer}>
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingIcon}>
                <Ionicons name="information-circle-outline" size={24} color="#4ade80" />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>App Version</Text>
                <Text style={styles.settingSubtitle}>1.0.0</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingIcon}>
                <Ionicons name="document-text-outline" size={24} color="#4ade80" />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Terms of Service</Text>
                <Text style={styles.settingSubtitle}>Read our terms and conditions</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingIcon}>
                <Ionicons name="shield-outline" size={24} color="#4ade80" />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Privacy Policy</Text>
                <Text style={styles.settingSubtitle}>Learn how we protect your data</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.feedbackButton}>
            <Ionicons name="chatbubble-outline" size={20} color="#4ade80" />
            <Text style={styles.feedbackText}>Send Feedback</Text>
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
    paddingHorizontal: 24,
  },
  header: {
    paddingTop: 16,
    paddingBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#065f46',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  sectionContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingVertical: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  settingIcon: {
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  footer: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  feedbackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  feedbackText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4ade80',
    marginLeft: 8,
  },
});