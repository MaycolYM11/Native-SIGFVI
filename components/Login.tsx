import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, Button, Image, StyleSheet, Text, TextInput, View } from 'react-native';

const createTwoButtonAlert = () =>
    Alert.alert('Alert Title', 'My Alert Msg', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);

export default function App() {
  const [user,setUser]=useState('');
  const [pass,setPass]=useState('');
  const navigation = useNavigation();

  const handleLogin = async() => {
    // e.preventDefault();

    console.log('usuario:', user,'contra:',pass);
    try {
        const peticion = await axios.post('http://192.168.0.15:3001/usuario/autenticar',{
                idEntra:user,
                contrasenaEntra:pass
        })
        console.log('autenticacion done');
        console.log('esta es la respuesta del server → ',peticion.data);
        if(peticion.data.ingreso){
            Alert.alert('Inicio de Sesion', 'Exitoso', [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ]);
            navigation.navigate('Home')
        }else{
            Alert.alert('nao nao', 'mano', [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ]);
        }
    } catch (error) {
        console.log('pailas',error);
        Alert.alert('nao nao', 'mano', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
        
    }
    
    

  };

  return (
    <View style={styles.container}>
      {/* <Image
        source={require( './assets/fondo.jpg')}
        style={styles.imageBackground}
      /> */}
      <View style={styles.logoContainer}>
        <Image 
          source={require('../assets/logo.jpg')}
          style={styles.logoImage}
        />
        <Text style={styles.logoText}>
          SIGFVI Tiendecita Alemana
        </Text>
      </View>
      <View style={styles.form} >
        <Text>
          User
        </Text>
        <TextInput 
          onChangeText={setUser}
          value={user}
        />
        <Text>
          Contraseña
        </Text>
        <TextInput 
          secureTextEntry
          onChangeText={setPass}
          value={pass}
        />
        <Button title='Ingresar' onPress={handleLogin}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffaf46',
  },
  imageBackground: {
      width: '100%',
      height: '100%',
      opacity: 0.7,
      bottom: '30%',
  },
  form: {
      width: '100%',
      height: '40%',
      backgroundColor: 'gray',
      position: 'absolute',
      bottom: 0,
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      padding: 30,
  },
  formText: {
      fontWeight: 'bold',
      fontSize: 16,
  },
  formRegister: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 30,
  },

  formRegisterText: {
      fontStyle: 'italic',
      color: 'orange',
      borderBottomWidth: 1,
      borderBottomColor: 'orange',
      fontWeight: 'bold',
      marginLeft: 10,
  },
  logoContainer: {
      position: 'absolute',
      alignSelf: 'center',
      top: '15%',
  },
  logoImage: {
      width: 100,
      height: 100,
  },
  logoText: {
      color: 'white',
      textAlign: 'center',
      fontSize: 20,
      marginTop: 10,
      fontWeight: 'bold',
}
});
