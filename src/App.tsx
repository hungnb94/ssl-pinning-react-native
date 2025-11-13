/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { fetch } from 'react-native-ssl-pinning';

export const HASH1 = 'sha256/68qDVtVz9DOhHKHKX0clwySoFneRjUa6gRWpBYmsb10=';
export const HASH2 = 'sha256/kIdp6NNEd8wsugYyyIYFsi1ylMCED3hZbSR8ZFsa/A4=';
export const HASH3 = 'sha256/mEflZT5enoR1FuXLgYYGqnVEoZvmf9c2bVBpiOjYQ0c=';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  useEffect(() => {
    console.log('start fetch')
    fetch('https://finance-api.tekome.com/api/finance/vn30', {
      method: 'GET',
      pkPinning: true,
      sslPinning: {
        certs: [
            HASH1,
            // HASH2,
            // HASH3,
        ],
      },
    })
      .then(res => console.log('result', res))
      .catch(err => console.warn('error', err));
    return () => {};
  }, []); // 👈 Empty dependency array = run once

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <NewAppScreen
        templateFileName="App.tsx"
        safeAreaInsets={safeAreaInsets}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
