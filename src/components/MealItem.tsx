import { deleteMeal } from '@/storage/meals';
import { colors } from '@/styles/global';
import Entypo from '@expo/vector-icons/Entypo';
import { useRouter } from 'expo-router';
import { Alert, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import * as Haptics from 'expo-haptics';

type MealItemProps = {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  type: string;
  onDelete: () => void;
};

export default function MealItem({
  id,
  name,
  calories,
  protein,
  carbs,
  fat,
  type,
  onDelete,
}: MealItemProps) {

    const router = useRouter();
    const handleLongPress = () => {
        Alert.alert('Delete Meal', `Are you sure you want to delete "${name}"?`, [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: async () => {
              await deleteMeal(id);
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
              onDelete();
            },
          },
        ]);
    };

  return (
    <TouchableOpacity style={styles.container} onLongPress={handleLongPress}>
        <View style={{flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <View style={{ flex: 1, flexFlow: 'column' }}>
                <Text style={styles.name}>{type} - {name}</Text>

                <Text style={styles.macros}>
                    {calories} cal • {protein}g P • {carbs}g C • {fat}g F
                </Text>
            </View>

            <Pressable onPress={() => router.push(
              {
                  pathname: '/(tabs)/add-meal',
                  params: { mealId: id }
              }
            )} style={{ width: 36, flex: 1, maxWidth: 36, justifyContent: 'center', alignItems: 'center', borderRadius: 10, height: 36, backgroundColor:'#3B3B68', color: '#fff' }}>
                <Entypo name="edit" size={16} color="pink" />
            </Pressable>
        </View>
    </TouchableOpacity>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  macros: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
  },
});