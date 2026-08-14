// app/_layout.tsx
//
// Required by Expo Router - this is the root layout every route renders
// inside of. Kept minimal: just renders whichever route is active
// (app/index.tsx -> SessionStack) with no extra header/chrome.

import { Stack } from 'expo-router';

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
