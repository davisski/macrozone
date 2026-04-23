import ReminderToggle from '@/components/ReminderToggle';
import { globalStyles } from '@/styles/global';
import { Platform, ScrollView, Text, View } from 'react-native';

export default function AllMealsScreen() {
  return (
    <ScrollView style={globalStyles.container}>
      <View style={{ marginTop: 30 }}>
        <Text style={globalStyles.title}>Settings</Text>
        {
          Platform.OS !== 'android' && <ReminderToggle />
        }
      </View>
    </ScrollView>
  );
}
