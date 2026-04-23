import FilterChip from '@/components/FilterChip';
import MealItem from '@/components/MealItem';
import { clearAllMeals, getMeals, Meal, MealOptions, MealType } from '@/storage/meals';
import { globalStyles } from '@/styles/global';
import { useFocusEffect } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function AllMealsScreen() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [selectedType, setSelectedType] = useState<MealType | null>(null);
  const loadMeals = useCallback(async () => {
    const data = await getMeals();
    setMeals(data);
  }, []);

  const handleClearAll = async () => {
    Alert.alert('Clear All Meals', 'Are you sure you want to clear all meals?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear All',
        style: 'destructive',
        onPress: async () => {
          await clearAllMeals();
          loadMeals();
        },
      },
    ]);
  };

  useFocusEffect(
    useCallback(() => {
      loadMeals();
    }, [loadMeals]),
  );

  const handleChipPress = (type: MealType) => {
    setSelectedType((prev) => (prev === type ? null : type));
  };

  const displayedMeals = useMemo(
    () => (selectedType ? meals.filter((meal) => meal.type === selectedType) : meals),
    [meals, selectedType],
  );

  return (
    <ScrollView style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.title}>All Meals</Text>
        <TouchableOpacity onPress={handleClearAll}>
          <Text style={styles.clearButton}>Remove All</Text>
        </TouchableOpacity>
      </View>

      {meals.length > 0 && (
        <View>
          <Text style={{ fontSize: 14, color: '#fff', marginBottom: 8 }}>Filter Meals</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}>
            {MealOptions.map((type) => (
              <FilterChip
                selected={selectedType === type}
                key={type}
                type={type}
                onPress={handleChipPress}
              />
            ))}
          </View>
        </View>
      )}

      <View style={{ marginTop: 30 }}>
        {selectedType && (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>
              Filtered Meals
            </Text>
            <TouchableOpacity onPress={() => setSelectedType(null)}>
              <Text style={{ color: 'red', fontSize: 14 }}>Clear Filter</Text>
            </TouchableOpacity>
          </View>
        )}

        {displayedMeals.length === 0 ? (
          <Text style={globalStyles.empty}>No meals logged yet.</Text>
        ) : (
          displayedMeals.map((meal) => (
            <MealItem
              key={meal.id}
              id={meal.id}
              name={meal.name}
              calories={meal.calories}
              protein={meal.protein}
              carbs={meal.carbs}
              fat={meal.fat}
              type={meal.type}
              onDelete={loadMeals}
            />
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = {
  clearButton: {
    color: 'red',
    fontSize: 16,
  },
};