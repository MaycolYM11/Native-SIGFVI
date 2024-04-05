import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, Button, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ALERT_TYPE, AlertNotificationRoot, Dialog, Toast } from 'react-native-alert-notification';

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
            // Alert.alert('Inicio de Sesion', 'Exitoso', [
            //     {text: 'OK', onPress: () => console.log('OK Pressed')},
            //   ]);
            Dialog.show({
              type: ALERT_TYPE.SUCCESS,
              title: `Bienvenido ${peticion.data.name}`,
              textBody: 'Sesion iniciada con exito',
              autoClose: false,
              onHide: ()=>navigation.navigate('Home'),
              button: 'OK'
            });
            
        }else{
            // Alert.alert('nao nao', 'mano', [
            //     {text: 'OK', onPress: () => console.log('OK Pressed')},
            //   ]);
            Dialog.show({
              type: ALERT_TYPE.DANGER,
              title: 'Credenciales incorrectas',
              textBody: 'Verifique su usuario o contraseña',
              autoClose: false,
              button: 'OK'
            });
        }
    } catch (error) {
        console.log('pailas',error);
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Credenciales incorrectas',
          textBody: 'Verifique su usuario o contraseña',
          autoClose: false,
          button: 'OK'
        });
        
    }
    
    

  };

  return (
    <AlertNotificationRoot>
      <View style={styles.container}>
        <LinearGradient
          colors={['#f9de07','red']}
          style={styles.container}
        />
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
            SIGFVI
          </Text>
          <Text style={styles.logoText}>
            Tiendecita Alemana
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
    </AlertNotificationRoot>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#ffaf46',
  },
  imageBackground: {
      width: '100%',
      height: '100%',
      opacity: 0.7,
      bottom: '30%',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },
  form: {
      width: '100%',
      height: '40%',
      backgroundColor: '#363631',
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
