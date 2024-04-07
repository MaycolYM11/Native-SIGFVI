import axios from 'axios';
import React, { useState } from 'react'
import { Button, Image, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { ALERT_TYPE, AlertNotificationRoot, Dialog, Toast } from 'react-native-alert-notification';
import { useNavigation } from '@react-navigation/native';

const RegisterDeudor = () => {

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
            title: `Edición`,
            textBody: 'Datos Agregados exitosamente',
            autoClose: 5000,
            onHide: ()=>navigation.navigate('Home'),
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
      <View>
        <Text>Primer nombre</Text>
        <TextInput
          placeholder="name1"
          onChangeText={setName1}
          value={name1}
        />
        
        <Text>Segundo nombre</Text>
        <TextInput
          placeholder="name2"
          onChangeText={setName2}
          value={name2}
        />

        <Text>Primer apellido</Text>
        <TextInput
          placeholder="lastname1"
          onChangeText={setLastname1}
          value={lastname1}
        />

        <Text>Segundo apellido</Text>
        <TextInput
          placeholder="lastname2"
          onChangeText={setLastname2}
          value={lastname2}
        />

        <Text>Ingresa tu identificacion</Text>
        <TextInput
          placeholder="ID"
          onChangeText={setId}
          value={id}
        />

        <Text>Direccion</Text>
        <TextInput
          placeholder="Address"
          onChangeText={setAddress}
          value={address}
        />

        <Text>Telefono</Text>
        <TextInput
          placeholder="tel"
          onChangeText={setTel}
          value={tel}
        />

        <Text>Saldo</Text>
        <TextInput
          placeholder="saldo"
          onChangeText={setSaldo}
          value={saldo}
        />

        <Button title="Registrarse" onPress={agregarRegistro} />
      </View>
    </AlertNotificationRoot>
    
  )
}

export default RegisterDeudor