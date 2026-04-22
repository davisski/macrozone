import { addMeal, findMealById, updateMeal } from '@/storage/meals';
import { colors, globalStyles } from '@/styles/global';
import { useRouter, useFocusEffect, useLocalSearchParams } from 'expo-router';
import {  useCallback, useState } from 'react';
import { Platform } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import * as Haptics from 'expo-haptics';

import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function AddMealScreen() {
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
  const [meals, setMeals] = useState('');
  const { mealId } = useLocalSearchParams();
  const [selectedType, setSelectedType] = useState(null);
  const isEditing = !!mealId && mealId !== 'null';
  const TYPES = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

  const router = useRouter();
  const resetForm = () => {
      setName('');
      setCalories('');
      setProtein('');
      setCarbs('');
      setFat('');
      setSelectedType(null);
  }
  useFocusEffect(() => {
    resetForm();
    if (!isEditing) return;

    const loadMeal = async () => {
      let meal = await findMealById(mealId);
      if (!meal) return;
      setName(meal.name);
      setCalories(String(meal.calories));
      setProtein(String(meal.protein));
      setCarbs(String(meal.carbs));
      setFat(String(meal.fat));
      setSelectedType(meal.type);
    };
    loadMeal();
  });

  const handleMealUpdate = async () => {
        if(!selectedType) {
          Alert.alert('Error', 'Please select a meal type.');
          return;
       }
    if (name == '' || calories == '') {
      Alert.alert('Error', 'Please enter a meal name and calories.');
      return;
    }
    await updateMeal({
        id: mealId,
        name: name,
        calories: Number(calories),
        protein: Number(protein),
        carbs: Number(carbs),
        fat: Number(fat),
        type: selectedType,
    });

    resetForm();

    Alert.alert('Success', 'Meal updated successfully!');
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    router.push({
        pathname: '/(tabs)/',
        params: { mealId: null }
    });
  }

  const handleAddMeal = async () => {
     if(!selectedType) {
         Alert.alert('Error', 'Please select a meal type.');
         return;
     }
     if (name == '' || calories == '') {
        Alert.alert('Error', 'Please enter a meal name and calories.');
        return;
     }
    await addMeal({
      type:selectedType,
      name,
      calories: Number(calories),
      protein: Number(protein) || 0,
      carbs: Number(carbs) || 0,
      fat: Number(fat) || 0,
    });

    resetForm();
    Alert.alert('Success', 'Meal added successfully!');
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    router.push('/(tabs)/');
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>{isEditing ? 'Edit Meal' : 'Add Meal'}</Text>

        <View style={styles.dropdown.container}>
              <View style={styles.dropdown.wrapper}>
                <Picker
                  selectedValue={selectedType}
                  onValueChange={(val) => setSelectedType(val)}
                  style={styles.dropdown.picker}
                  itemStyle={styles.dropdown.item}
                  dropdownIconColor="#a0a0a0"
                  mode="dropdown"
                >
                <Picker.Item
                  key='placeholder'
                  label='Select meal type'
                  value={null}
                  style={styles.dropdown.item}
                  color={Platform.OS === "android" ? "#a0a0b0" : undefined}
                />
                  {TYPES.map((opt) => (
                    <Picker.Item
                      key={opt}
                      label={opt}
                      value={opt}
                      style={styles.dropdown.item}
                      color={Platform.OS === "android" ? "#a0a0b0" : undefined}
                    />
                  ))}
                </Picker>
              </View>
            </View>

      <TextInput
        style={styles.input}
        placeholder='Meal name'
        placeholderTextColor={colors.textSecondary}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder='Calories'
        placeholderTextColor={colors.textSecondary}
        keyboardType='numeric'
        value={calories}
        onChangeText={setCalories}
      />

      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.rowInput]}
          placeholder='Protein (g)'
          placeholderTextColor={colors.textSecondary}
          keyboardType='numeric'
          value={protein}
          onChangeText={setProtein}
        />
        <TextInput
          style={[styles.input, styles.rowInput]}
          placeholder='Carbs (g)'
          placeholderTextColor={colors.textSecondary}
          keyboardType='numeric'
          value={carbs}
          onChangeText={setCarbs}
        />
        <TextInput
          style={[styles.input, styles.rowInput]}
          placeholder='Fat (g)'
          placeholderTextColor={colors.textSecondary}
          keyboardType='numeric'
          value={fat}
          onChangeText={setFat}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={isEditing ? handleMealUpdate : handleAddMeal}>
        <Text style={styles.buttonText}>{isEditing ? 'Update Meal' : 'Add Meal'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.surface,
    color: colors.text,
    padding: 16,
    borderRadius: 10,
    fontSize: 16,
    marginTop: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  rowInput: {
    flex: 1,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdown: {
    container: {
        backgroundColor: "#1a1a2e",
    },
    wrapper: {
        backgroundColor: colors.surface,
        borderRadius: 10,
        marginTop: 16,
        overflow: "hidden",
        paddingLeft: 8,
        paddingRight: 8,
        color: colors.text,
    },
    item: {
        color: colors.textSecondary,
        backgroundColor: colors.surface,
        fontSize: 16,
    },
    picker: {
        color: colors.text,
        backgroundColor: "transparent",
        borderRadius: 10,
    }
  },
});