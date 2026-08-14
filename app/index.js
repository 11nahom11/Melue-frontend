// app/index.js
//
// Expo Router entry point. Expo Router already supplies a NavigationContainer
// at the app root, so RootNavigator is rendered directly here (do not wrap
// it in another NavigationContainer).
//
// Copy this file to the `app/` folder at the ROOT of your Expo Router
// project (next to _layout.js), not inside `src/`.

import { AuthProvider } from '../src/context/AuthContext';
import RootNavigator from '../src/navigation/RootNavigator';

export default function Index() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
