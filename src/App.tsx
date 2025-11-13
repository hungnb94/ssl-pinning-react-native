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
import { initializeSslPinning } from 'react-native-ssl-public-key-pinning';
// import { fetch } from "react-native-ssl-pinning";

export const HASH1 = 'sha256/68qDVtVz9DOhHKHKX0clwySoFneRjUa6gRWpBYmsb10=';
export const HASH2 = 'sha256/kIdp6NNEd8wsugYyyIYFsi1ylMCED3hZbSR8ZFsa/A4=';
export const HASH3 = 'sha256/mEflZT5enoR1FuXLgYYGqnVEoZvmf9c2bVBpiOjYQ0c=';
export const PREFIX_LENGTH = 7;

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const loadData = async () => {
    await initializeSslPinning({
      'tekome.com': {
        includeSubdomains: true,
        publicKeyHashes: [
          HASH1.substring(PREFIX_LENGTH),
          HASH2.substring(PREFIX_LENGTH),
          HASH3.substring(PREFIX_LENGTH),
        ],
      },
    });

    console.log('start fetch');
    fetch('https://finance-api.tekome.com/api/finance/vn30', {
      // method: 'GET',
      // pkPinning: true,
      // sslPinning: {
      //   certs: [
      //       HASH1,
      //       HASH2,
      //       HASH3,
      //   ],
      // },
    })
      .then(res => console.log('result', res))
      .catch(err => console.warn('error', err));
  };
  useEffect(() => {
    loadData();
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
