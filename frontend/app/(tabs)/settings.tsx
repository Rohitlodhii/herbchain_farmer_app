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

  const settingsItems = [
    {
      section: 'Preferences',
      items: [
        {
          icon: 'notifications-outline',
          title: 'Push Notifications',
          subtitle: 'Receive updates and reminders',
          type: 'switch',
          value: notifications,
          onToggle: setNotifications,
        },
        {
          icon: 'location-outline',
          title: 'Location Services',
          subtitle: 'Allow location access for better experience',
          type: 'switch',
          value: locationServices,
          onToggle: setLocationServices,
        },
        {
          icon: 'sync-outline',
          title: 'Auto Sync',
          subtitle: 'Automatically sync data when online',
          type: 'switch',
          value: autoSync,
          onToggle: setAutoSync,
        },
      ],
    },
    {
      section: 'About',
      items: [
        {
          icon: 'information-circle-outline',
          title: 'App Version',
          subtitle: '1.0.0',
          type: 'info',
        },
        {
          icon: 'document-text-outline',
          title: 'Terms of Service',
          subtitle: 'Read our terms and conditions',
          type: 'link',
        },
        {
          icon: 'shield-outline',
          title: 'Privacy Policy',
          subtitle: 'Learn how we protect your data',
          type: 'link',
        },
      ],
    },
  ];

  const renderSettingItem = (item: any, index: number) => {
    return (
      <View key={index} style={styles.settingItem}>
        <View style={styles.settingIcon}>
          <Ionicons name={item.icon} size={24} color="#4ade80" />
        </View>
        <View style={styles.settingContent}>
          <Text style={styles.settingTitle}>{item.title}</Text>
          <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
        </View>
        {item.type === 'switch' && (
          <Switch
            value={item.value}
            onValueChange={item.onToggle}
            trackColor={{ false: '#d1d5db', true: '#4ade80' }}
            thumbColor={item.value ? '#ffffff' : '#ffffff'}
          />
        )}
        {item.type === 'link' && (
          <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>Customize your HerbLink experience</Text>
        </View>

        {settingsItems.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.section}</Text>
            <View style={styles.sectionContainer}>
              {section.items.map((item, itemIndex) => renderSettingItem(item, itemIndex))}
            </View>
          </View>
        ))}

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
</absolute_file_name>
    </file>