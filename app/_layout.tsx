import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* O (tabs) é tratado como uma única rota aqui */}
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}