import { Stack } from 'expo-router';

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Hide default headers since we're using custom ones
        animation: 'slide_from_right', // Smooth animation
      }}
    >
      <Stack.Screen name="Favourites" />
      <Stack.Screen name="Friends" />
      <Stack.Screen name="Payment" />
      <Stack.Screen name="Promotions" />
      <Stack.Screen name="Cart" />
      <Stack.Screen name="Settings" />
      <Stack.Screen name="Wallet" />
    </Stack>
  );
}