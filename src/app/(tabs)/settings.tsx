import ReminderToggle from '@/components/ReminderToggle';
import { logout } from '@/storage/auth';
import { useStore } from '@/storage/store';
import { globalStyles } from '@/styles/global';
import { Platform, Pressable, ScrollView, Text, View } from 'react-native';

export default function AllMealsScreen() {
  const { setUser, setIsAuthenticated } = useStore();

  const handleLogout = () => {
    logout()
      .then(() => {
        setUser(null);
        setIsAuthenticated(false);
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };
  return (
    <ScrollView style={globalStyles.container}>
      <View style={{ marginTop: 30 }}>
        <Text style={globalStyles.title}>Settings</Text>
        {
          Platform.OS !== 'android' && <ReminderToggle />
        }
        <Pressable style={globalStyles.button} onPress={handleLogout}>
          <Text style={globalStyles.buttonText}>Logout</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
