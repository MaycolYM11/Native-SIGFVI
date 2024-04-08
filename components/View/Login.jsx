import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, Button, Image, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ALERT_TYPE, AlertNotificationRoot, Dialog, Toast } from 'react-native-alert-notification';

export default function App() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    // e.preventDefault();

    console.log('usuario:', user, 'contra:', pass);
    try {
      const peticion = await axios.post('http://192.168.0.6:3001/usuario/autenticar', {
        idEntra: user,
        contrasenaEntra: pass
      })
      console.log('autenticacion done');
      console.log('esta es la respuesta del server → ', peticion.data);
      if (peticion.data.ingreso) {
        // Alert.alert('Inicio de Sesion', 'Exitoso', [
        //     {text: 'OK', onPress: () => console.log('OK Pressed')},
        //   ]);
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: `Bienvenido ${peticion.data.name}`,
          textBody: 'Sesion iniciada con exito',
          autoClose: false,
          onHide: () => navigation.navigate('Home'),
          button: 'OK'
        });

      } else {
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
      console.log('pailas', error);
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
        {/* <LinearGradient
          colors={['#0b0f17','#42658f']}
          style={styles.container}
        /> */}
        {/* <Image
          source={require( './assets/fondo.jpg')}
          style={styles.imageBackground}
        /> */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/logo.jpg')}
            style={styles.logoImage}
          />
          <Text style={styles.logoText}>
            Tiendecita Alemana
          </Text>
          <Text style={styles.logoText}>
            SIGFVI
          </Text>
        </View>

        <View style={styles.form} >
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>
              Iniciar Sesión<Text style={styles.subrayar}>.</Text>
            </Text>
            <Text style={styles.subHeaderText}>
              inicie sesion con sus <Text style={styles.subrayarTexto}>credenciales.</Text>
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>User</Text>
            <TextInput
              style={styles.input}
              onChangeText={setUser}
              value={user}
              placeholder="Ingrese su ID"
              placeholderTextColor="#375180"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Contraseña</Text>
            <TextInput
              style={styles.input}
              onChangeText={setPass}
              value={pass}
              secureTextEntry
              placeholder="Ingrese su Contraseña"
              placeholderTextColor="#375180"
            />
          </View>
          <View>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={styles.footerButton}>Ingresar</Text>
            </TouchableOpacity>
          </View>
        </View>


      </View>
    </AlertNotificationRoot>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0f17',
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
    height: '50%',
    opacity: 1,
    backgroundColor: '#060e25',
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  logoText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 10,
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  footerButton: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#ff9414',
    padding: 10,
    paddingLeft: 120,
    paddingRight: 120,
    borderRadius: 50,
  },
  inputContainer: {
    marginBottom: 20,
    backgroundColor: '#0b0d4b',
    borderRadius: 30,
    padding: 10,
    paddingRight: 20,
    paddingLeft: 20,
  },
  label: {
    color: '#f9871c',
  },
  input: {
    color: '#375180',
    width: '100%',
  },
  footerButtonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subrayar: {
    color: '#f9871c',
  },
  subHeaderText: {
    color: '#3e5b8d',
    fontSize: 13,
  },
  subrayarTexto: {
    color: '#f9871c',
  }
});