import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import * as Location from 'expo-location';

type Props = {
  onChange: (coords: { latitude: number; longitude: number }) => void;
  value?: { latitude: number; longitude: number } | null;
};

export default function LocationInput({ onChange, value }: Props) {
  const [loading, setLoading] = useState(false);

  const handleGetLocation = async () => {
    try {
      setLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required');
        setLoading(false);
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      const coords = { latitude: loc.coords.latitude, longitude: loc.coords.longitude };
      onChange(coords); // pass back to parent form
    } catch (error) {
      Alert.alert('Error', 'Unable to fetch location');
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity style={styles.inputBox} onPress={handleGetLocation}>
      {loading ? (
        <ActivityIndicator color="#4ade80" />
      ) : value ? (
        <Text style={styles.text}>
          📍 {value.latitude.toFixed(6)}, {value.longitude.toFixed(6)}
        </Text>
      ) : (
        <Text style={styles.placeholder}>Tap to add current location</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  inputBox: {
    borderWidth: 2,
    borderColor: '#d1d5db',
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  placeholder: {
    fontSize: 16,
    color: '#6b7280',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: '#065f46',
  },
});
