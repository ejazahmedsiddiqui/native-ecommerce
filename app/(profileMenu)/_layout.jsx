import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Favourites" />
      <Stack.Screen name="Settings" />
      <Stack.Screen name="Wallet" />
      <Stack.Screen name="Friends" />
      <Stack.Screen name="Promotions" />
      <Stack.Screen name="Payment" />
    </Stack>
  );
}