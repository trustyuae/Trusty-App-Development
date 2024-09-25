
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import store from './src/Redux/Store/store';
import AppNavigations from './src/Navigation/AppNavigations';
import Toast from 'react-native-toast-message';
import { configureFonts, MD3LightTheme, PaperProvider } from 'react-native-paper';

const Tab = createBottomTabNavigator();


const fontConfig = {
  fontFamily: 'Intrepid Regular',
};

const theme = {

  fonts: configureFonts({ config: fontConfig }),
};
export default function App() {
  return (
    <>
      <PaperProvider theme={theme}>
        <Provider store={store}>


          <AppNavigations />

        </Provider>
        <Toast />
      </PaperProvider>
    </>
  );
}
