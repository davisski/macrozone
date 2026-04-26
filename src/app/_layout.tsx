import { useStore } from '@/storage/store';
import { Stack } from 'expo-router';

export default function RootLayout() {
  const { isAuthenticated } = useStore();
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name='(tabs)' />
      </Stack.Protected>

      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name='login' />
        <Stack.Screen name='register' />
      </Stack.Protected>
    </Stack>
  );
}