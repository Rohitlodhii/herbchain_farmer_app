import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';

export default function SuccessScreen() {
  const { herbId, herbName } = useLocalSearchParams();
  const [scaleAnim] = useState(new Animated.Value(0));
  const [fadeAnim] = useState(new Animated.Value(0));

  // Generate QR code data
  const qrData = JSON.stringify({
    herbId: herbId || Math.random().toString(36).substr(2, 9),
    herbName: herbName || 'Unknown Herb',
    timestamp: new Date().toISOString(),
    type: 'herb_submission',
    url: `herblink://herb/${herbId || 'sample'}`,
  });

  useEffect(() => {
    // Animate the success screen
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out my herb submission on HerbLink! Herb: ${herbName}, ID: ${herbId}`,
        title: 'HerbLink Submission',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleGoHome = () => {
    router.replace('/tabs');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Animated.View
          style={[
            styles.successIcon,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Ionicons name="checkmark-circle" size={80} color="#4ade80" />
        </Animated.View>

        <Animated.View
          style={[
            styles.textContainer,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <Text style={styles.title}>Submission Successful!</Text>
          <Text style={styles.subtitle}>
            Your herb data has been successfully recorded
          </Text>
          <Text style={styles.herbId}>
            Submission ID: {herbId || 'ABC123XYZ'}
          </Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.qrContainer,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <View style={styles.qrWrapper}>
            <QRCode
              value={qrData}
              size={160}
              backgroundColor="white"
              color="black"
            />
          </View>
          <Text style={styles.qrLabel}>
            Scan this QR code to view your submission
          </Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.buttonContainer,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
            <Ionicons name="share-outline" size={20} color="#4ade80" />
            <Text style={styles.shareButtonText}>Share</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.homeButton} onPress={handleGoHome}>
            <Text style={styles.homeButtonText}>Go to Home</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  successIcon: {
    marginBottom: 24,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#065f46',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  herbId: {
    fontSize: 14,
    color: '#4ade80',
    fontWeight: '600',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#4ade80',
  },
  qrContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  qrWrapper: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    marginBottom: 16,
  },
  qrLabel: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    maxWidth: 200,
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#4ade80',
    borderRadius: 12,
    paddingVertical: 14,
    gap: 8,
  },
  shareButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4ade80',
  },
  homeButton: {
    backgroundColor: '#4ade80',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  homeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});