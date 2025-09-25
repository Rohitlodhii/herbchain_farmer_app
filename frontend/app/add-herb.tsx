import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function AddHerbScreen() {
  const { type } = useLocalSearchParams();
  const [herbName, setHerbName] = useState('');
  const [harvestDate, setHarvestDate] = useState(new Date());
  const [quantity, setQuantity] = useState('');
  const [location, setLocation] = useState('');
  const [selectedFarm, setSelectedFarm] = useState('');
  const [pesticidesUsed, setPesticidesUsed] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const farms = [
    'Green Valley Farm',
    'Organic Paradise',
    'Natural Herbs Co.'
  ];

  const onDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || harvestDate;
    setShowDatePicker(Platform.OS === 'ios');
    setHarvestDate(currentDate);
  };

  const handleSubmit = async () => {
    if (!herbName || !quantity || !location || !selectedFarm) {
      Alert.alert('Missing Fields', 'Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const herbData = {
        herb_name: herbName,
        harvest_date: harvestDate.toISOString().split('T')[0],
        quantity: parseFloat(quantity),
        location,
        farm: selectedFarm,
        pesticides_used: pesticidesUsed,
        submission_type: type,
        created_at: new Date().toISOString(),
      };

      const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/herbs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(herbData),
      });

      if (response.ok) {
        const result = await response.json();
        router.replace(`/success?herbId=${result.id}`);
      } else {
        throw new Error('Failed to submit herb data');
      }
    } catch (error) {
      console.error('Error submitting herb:', error);
      Alert.alert('Error', 'Failed to submit herb data. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#065f46" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Herb</Text>
        <View style={styles.placeholder} />
      </View>

      <KeyboardAwareScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
        extraHeight={100}
      >
        <View style={styles.typeIndicator}>
          <Ionicons
            name={type === 'online' ? 'cloud-upload' : 'document-text'}
            size={20}
            color={type === 'online' ? '#4ade80' : '#3b82f6'}
          />
          <Text style={[
            styles.typeText,
            { color: type === 'online' ? '#4ade80' : '#3b82f6' }
          ]}>
            {type === 'online' ? 'Online Submission' : 'Offline Submission'}
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Herb Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter herb name"
              placeholderTextColor="#9ca3af"
              value={herbName}
              onChangeText={setHerbName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Harvest Date *</Text>
            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.dateText}>
                {harvestDate.toDateString()}
              </Text>
              <Ionicons name="calendar-outline" size={20} color="#6b7280" />
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={harvestDate}
                mode="date"
                display="default"
                onChange={onDateChange}
                maximumDate={new Date()}
              />
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Quantity (kg) *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter quantity in kg"
              placeholderTextColor="#9ca3af"
              value={quantity}
              onChangeText={setQuantity}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Location *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter location"
              placeholderTextColor="#9ca3af"
              value={location}
              onChangeText={setLocation}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Select Farm *</Text>
            <View style={styles.farmContainer}>
              {farms.map((farm, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.farmOption,
                    selectedFarm === farm && styles.farmOptionSelected
                  ]}
                  onPress={() => setSelectedFarm(farm)}
                >
                  <Text style={[
                    styles.farmOptionText,
                    selectedFarm === farm && styles.farmOptionTextSelected
                  ]}>
                    {farm}
                  </Text>
                  {selectedFarm === farm && (
                    <Ionicons name="checkmark" size={20} color="#ffffff" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Pesticides Used</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter pesticides used (optional)"
              placeholderTextColor="#9ca3af"
              value={pesticidesUsed}
              onChangeText={setPesticidesUsed}
              multiline={true}
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>

          <TouchableOpacity
            style={[
              styles.submitButton,
              isSubmitting && styles.submitButtonDisabled
            ]}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            <Text style={styles.submitButtonText}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fffe',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    backgroundColor: '#ffffff',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#065f46',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  typeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  typeText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  form: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#ffffff',
  },
  textArea: {
    height: 80,
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
  },
  dateText: {
    fontSize: 16,
    color: '#374151',
  },
  farmContainer: {
    gap: 12,
  },
  farmOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    backgroundColor: '#ffffff',
  },
  farmOptionSelected: {
    borderColor: '#4ade80',
    backgroundColor: '#4ade80',
  },
  farmOptionText: {
    fontSize: 16,
    color: '#374151',
  },
  farmOptionTextSelected: {
    color: '#ffffff',
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#4ade80',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonDisabled: {
    backgroundColor: '#d1d5db',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});