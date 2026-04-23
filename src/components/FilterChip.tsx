import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import type { MealType } from '../storage/meals';
export default function FilterChip({selected, type, onPress}: { selected: boolean, type: MealType, onPress: (type: MealType) => void }) {
    let baseStyle = styles[type] || styles.default;
    return (
        <TouchableOpacity onPress={() => onPress(type)} style={[baseStyle, selected && styles.selected]}>
            <Text style={{ color: baseStyle.color }}>
            {type}
            </Text>
        </TouchableOpacity>
    )
}
let styles = StyleSheet.create<any>({
  default: {
    backgroundColor: '#555',
    color: '#fff',
    padding: 16,
    borderRadius: 10,
    fontSize: 16,
    marginTop: 16,
  },
  "Breakfast": {
    backgroundColor: '#2a2a4a',
    color: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  "Lunch": {
    backgroundColor: '#2a2a4a',
    color: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  "Dinner": {
    backgroundColor: '#2a2a4a',
    color: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  "Snack": {
    backgroundColor: '#2a2a4a',
    color: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  selected: {
    backgroundColor: 'pink',
  },
});
