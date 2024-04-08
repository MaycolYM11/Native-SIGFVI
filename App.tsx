import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './components/View/Login'
import Home from './components/View/Home'
import HomeDeudores from './components/View/Home_Deudor'
import EditarDeudor from './components/View/actualizarDeudor'
import RegisterDeudor from './components/View/RegistrarDeudor';


 const Stack= createStackNavigator();


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName='Login'
      >
        <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
        <Stack.Screen name='Home' component={HomeDeudores} />
        <Stack.Screen name='EditarDeudor' component={EditarDeudor} />
        <Stack.Screen name='Register' component={RegisterDeudor} />

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