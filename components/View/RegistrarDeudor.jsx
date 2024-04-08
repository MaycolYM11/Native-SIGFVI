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
      axios.post("http://192.168.0.6:3001/usuario/createdeudor", {
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
            title: `Edición`,
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
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [lastname1, setLastname1] = useState('');
  const [lastname2, setLastname2] = useState('');
  const [address, setAddress] = useState('');
  const [tel, setTel] = useState('');
  const [saldo, setSaldo] = useState('');

  return (
    <AlertNotificationRoot>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.containerInputs}>
            <Text style={styles.textEstilo}>Primer nombre</Text>
            <TextInput
              style={styles.input}
              placeholder="name1"
              onChangeText={setName1}
              value={name1}
            />
            
            <Text style={styles.textEstilo}>Segundo nombre</Text>
            <TextInput
              style={styles.input}
              placeholder="name2"
              onChangeText={setName2}
              value={name2}
            />

            <Text style={styles.textEstilo}>Primer apellido</Text>
            <TextInput
              style={styles.input}
              placeholder="lastname1"
              onChangeText={setLastname1}
              value={lastname1}
            />

            <Text style={styles.textEstilo}>Segundo apellido</Text>
            <TextInput
              style={styles.input}
              placeholder="lastname2"
              onChangeText={setLastname2}
              value={lastname2}
            />

            <Text style={styles.textEstilo}>Ingresa tu identificacion</Text>
            <TextInput
              style={styles.input}
              placeholder="ID"
              onChangeText={setId}
              value={id}
            />

            <Text style={styles.textEstilo}>Direccion</Text>
            <TextInput
              style={styles.input}
              placeholder="Address"
              onChangeText={setAddress}
              value={address}
            />

            <Text style={styles.textEstilo}>Telefono</Text>
            <TextInput
              style={styles.input}
              placeholder="tel"
              onChangeText={setTel}
              value={tel}
            />

            <Text style={styles.textEstilo}>Saldo</Text>
            <TextInput
              style={styles.input}
              placeholder="saldo"
              onChangeText={setSaldo}
              value={saldo}
            />
          </View>
          <View>
          <TouchableOpacity style={styles.buttonGuardar} onPress={agregarRegistro}>
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
});

export default RegisterDeudor