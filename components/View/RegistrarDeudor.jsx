import axios from 'axios';
import React, { useState } from 'react'
import { Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { ALERT_TYPE, AlertNotificationRoot, Dialog, Toast } from 'react-native-alert-notification';
import { useNavigation } from '@react-navigation/native';

const RegisterDeudor = ({ route }) => {

    const { consulta } = route.params;
  const navigation = useNavigation();

  const agregarRegistro = () => {
    try {
      axios.post("http://192.168.0.15:3001/usuario/createdeudor", {
        "id": id,
        "name1": name1,
        "name2": name2,
        "lastname1": lastname1,
        "lastname2": lastname2,
        "address": address,
        "tel": tel,
        "saldo": saldo
      }).then(()=>{
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
            title: `Registro`,
            textBody: 'Datos Agregados exitosamente',
            autoClose: 5000,
            onHide: ()=>{consulta();navigation.navigate('Home');},
        })
      })
    } catch (error) {
      console.log('no se pudo editar',error);
    }
  }

  const [id, setId] = useState('');
  const [idError, setIdError] = useState('');
  const [name1, setName1] = useState('');
  const [name1Error, setName1Error] = useState('');
  const [name2, setName2] = useState('');
  const [name2Error, setName2Error] = useState('');
  const [lastname1, setLastname1] = useState('');
  const [lastname1Error, setLastname1Error] = useState('');
  const [lastname2, setLastname2] = useState('');
  const [lastname2Error, setLastname2Error] = useState('');
  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState('');
  const [tel, setTel] = useState('');
  const [telError, setTelError] = useState('');
  const [saldo, setSaldo] = useState('');
  const [saldoError, setSaldoError] = useState('');


  const validarId = () => {
    if (!id.trim()) {
      setIdError('Este espacio no puede quedar en blanco');
      return false;
    } else if (!/^\d+$/.test(id)) {
      setIdError('Digitar solo números');
      return false;
    } else {
      setIdError('');
      return true;
    }
  }
  const validarNombre1 = () => {
    if (!name1.trim()) {
      setName1Error('Este espacio no puede quedar en blanco');
      return false;
    } else if (!/^[A-Za-zÁÉÍÓÚÑáéíóúü\s]+$/.test(name1)) {
      setName1Error('Digitar solo letras');
      return false;
    } else {
      setName1Error('');
      return true;
    }
  };

  const validarNombre2 = () => {
    if (!name2.trim()) {
      setName2Error('Este espacio no puede quedar en blanco');
      return false;
    } else if (!/^[A-Za-zÁÉÍÓÚÑáéíóúü\s]+$/.test(name2)) {
      setName2Error('Digitar solo letras');
      return false;
    } else {
      setName2Error('');
      return true;
    }
  };
  
  const validarApellido1 = () => {
    if (!lastname1.trim()) {
      setLastname1Error('Este espacio no puede quedar en blanco');
      return false;
    } else if (!/^[A-Za-zÁÉÍÓÚÑáéíóúü\s]+$/.test(lastname1)) {
      setLastname1Error('Digitar solo letras');
      return false;
    } else {!/^[A-Za-zÁÉÍÓÚÑáéíóúü\s]+$/
      setLastname1Error('');
      return true;
    }
  }

  const validarApellido2 = () => {
    if (!lastname2.trim()) {
      setLastname2Error('Este espacio no puede quedar en blanco');
      return false;
    } else if (!/^[A-Za-zÁÉÍÓÚÑáéíóúü\s]+$/.test(lastname2)) {
      setLastname2Error('Digitar solo letras');
      return false;
    } else {
      setLastname2Error('');
      return true;
    }
  };

  const validarDireccion = () => {
    if (!address.trim()) {
      setAddressError('Este espacio no puede quedar en blanco');
      return false;
    } else {
      setAddressError('');
      return true;
    }
  };

  const validarTelefono = () => {
    if (!tel.trim()) {
      setTelError('Este espacio no puede quedar en blanco');
      return false;
    } else if (!/^\d+$/.test(tel)) {
      setTelError('Digitar solo números');
      return false;
    } else {
      setTelError('');
      return true;
    }
  };

  const validarSaldo = () => {
    if (!saldo.trim()) {
      setSaldoError('Este espacio no puede quedar en blanco');
      return false;
    } else if (!/^\d+(\.\d+)?$/.test(saldo)) {
      setSaldoError('Ingrese un valor numérico válido');
      return false;
    } else {
      setSaldoError('');
      return true;
    }
  };

  const verificarRegistro = () => {
    let con = true;

    if (!validarId()){
      con = false;
    }
    if (!validarNombre1()) {
      con = false;
    }
    if (!validarNombre2()) {
      con = false;
    }
    if (!validarApellido1()) {
      con = false;
    }
    if (!validarApellido2()) {
      con = false;
    }
    if (!validarDireccion()) {
      con = false;
    }
    if (!validarTelefono()) {
      con = false;
    }
    if (!validarSaldo()) {
      con = false;
    }

    if (con) {
      agregarRegistro();
    } else {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: 'Rellene los campos del formulario para continuar',
      });
    }
  }

  return (
    <AlertNotificationRoot>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.containerInputs}>
          <Text style={styles.textEstilo}>Ingresa tu identificación</Text>
            <TextInput
              style={styles.input}
              placeholder="ID"
              onChangeText={text => setId(text)}
              value={id}
            />
            {idError ? <Text style={styles.errorText}>{idError}</Text> : null}
          
          <Text style={styles.textEstilo}>Primer nombre</Text>
            <TextInput
              style={styles.input}
              placeholder="name1"
              onChangeText={text => setName1(text)}
              onBlur={validarNombre1}
              value={name1}
            />
            {name1Error ? <Text style={styles.errorText}>{name1Error}</Text> : null}

            <Text style={styles.textEstilo}>Segundo nombre</Text>
            <TextInput
              style={styles.input}
              placeholder="name2"
              onChangeText={text => setName2(text)}
              onBlur={validarNombre2}
              value={name2}
            />
            {name2Error ? <Text style={styles.errorText}>{name2Error}</Text> : null}

            <Text style={styles.textEstilo}>Primer apellido</Text>
            <TextInput
              style={styles.input}
              placeholder="lastname1"
              onChangeText={text => setLastname1(text)}
              onBlur={validarApellido1}
              value={lastname1}
            />
            {lastname1Error ? <Text style={styles.errorText}>{lastname1Error}</Text> : null}

            <Text style={styles.textEstilo}>Segundo apellido</Text>
            <TextInput
              style={styles.input}
              placeholder="lastname2"
              onChangeText={text => setLastname2(text)}
              onBlur={validarApellido2}
              value={lastname2}
            />
            {lastname2Error ? <Text style={styles.errorText}>{lastname2Error}</Text> : null}

            <Text style={styles.textEstilo}>Dirección</Text>
            <TextInput
              style={styles.input}
              placeholder="address"
              onChangeText={text => setAddress(text)}
              onBlur={validarDireccion}
              value={address}
            />
            {addressError ? <Text style={styles.errorText}>{addressError}</Text> : null}

            <Text style={styles.textEstilo}>Teléfono</Text>
            <TextInput
              style={styles.input}
              placeholder="tel"
              onChangeText={text => setTel(text)}
              onBlur={validarTelefono}
              value={tel}
              keyboardType='numeric'
            />
            {telError ? <Text style={styles.errorText}>{telError}</Text> : null}

            <Text style={styles.textEstilo}>Saldo</Text>
            <TextInput
              style={styles.input}
              placeholder="saldo"
              onChangeText={text => setSaldo(text)}
              onBlur={validarSaldo}
              value={saldo}
              keyboardType='numeric'
            />
            {saldoError ? <Text style={styles.errorText}>{saldoError}</Text> : null}
          </View>
          <View>
          <TouchableOpacity style={styles.buttonGuardar} onPress={verificarRegistro}>
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </AlertNotificationRoot>
    
  )
};

const styles = StyleSheet.create({
  scrollContainer: {
      flexGrow: 1,
  },
  container: {
      flex: 1,
      paddingTop: 10,
      alignItems: 'center',
  },
  containerInputs: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 15,
      width: '90%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
  },
  textEstilo: {
      marginBottom: 10,
      fontSize: 13,
      color: '#ff9414',
  },
  input: {
      width: '100%',
      height: 40,
      borderColor: '#cccacf',
      borderWidth: 1,
      marginBottom: 10,
      borderRadius: 5,
      paddingHorizontal: 10,
  },
  ContainerButtonsAbajo: {
      width: '100%',
      position: 'absolute',
      bottom: 0,
      flexDirection: 'row',
  },
  buttonEliminar: {
      flex: 1,
      backgroundColor: '#de2c44',
      paddingVertical: 20,
      paddingHorizontal: 20,
  },
  buttonGuardar: {
      flex: 1,
      backgroundColor: '#ff9414',
      paddingVertical: 35,
      paddingHorizontal: 35,
  },
  buttonText: {
      color: '#f5ebe0',
      fontSize: 16,
      textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default RegisterDeudor