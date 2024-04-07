import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './components/Login'
import Home from './components/Home'
import RegisterDeudor from './components/RegistrarDeudor';
import EditDeudor from './components/EditarDeudor';


 const Stack= createStackNavigator();


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName='Login'
      >
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Register' component={RegisterDeudor} />
        <Stack.Screen name='Editar' component={EditDeudor} />

      </Stack.Navigator>
    </NavigationContainer>
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


export  default App;