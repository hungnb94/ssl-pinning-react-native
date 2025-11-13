/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { configReactotron } from "./src/lib/log/ReactotronConfig";

if (__DEV__) {
    configReactotron()
}

AppRegistry.registerComponent(appName, () => App);
