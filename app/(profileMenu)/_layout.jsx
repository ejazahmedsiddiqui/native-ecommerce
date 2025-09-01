import { Stack } from 'expo-router';
import { useRouter } from 'expo-router';

export default function ProfileMenuLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        gestureEnabled: true,
      }}
    >
      <Stack.Screen 
        name="Favourites"
        options={{
          title: 'Favourites',
        }}
      />
      <Stack.Screen 
        name="Wallet"
        options={{
          title: 'Wallet',
        }}
      />
      <Stack.Screen 
        name="Payment"
        options={{
          title: 'Payment',
        }}
      />
      <Stack.Screen 
        name="Friends"
        options={{
          title: 'Friends',
        }}
      />
      <Stack.Screen 
        name="Promotions"
        options={{
          title: 'Promotions',
        }}
      />
      <Stack.Screen 
        name="Settings"
        options={{
          title: 'Settings',
        }}
      />
    </Stack>
  );
}