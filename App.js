import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { Provider} from "react-redux"
import { store } from './store';
import HomeScreen from "./screens/HomeScreen";
import { SafeAreaProvider} from "react-native-safe-area-context";
import { Platform } from 'react-native';
// import ./screens/MapScreen.js 
import MapScreen from "./screens/MapScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import keyboard

import 'react-native-gesture-handler';


export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
      <SafeAreaProvider>

         <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}

          >
        <Stack.Navigator>
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{
            headerShown: false,
          
          }} />
          <Stack.Screen name="MapScreen" component={MapScreen} 
          options={{
            headerShown: false,
          }}
          />
        </Stack.Navigator>
        </KeyboardAvoidingView>
    </SafeAreaProvider>
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
