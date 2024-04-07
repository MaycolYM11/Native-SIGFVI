import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Image, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { ALERT_TYPE, AlertNotificationRoot, Dialog, Toast } from 'react-native-alert-notification';
import { useNavigation } from '@react-navigation/native';



const EditDeudor = ({ route }) => {
  
  const navigation = useNavigation();

  console.log(route.params);

  const editarRegistro = async () =>{
    try {
        // console.log(datos.idEstado);
        const response = await axios.put(`http://192.168.0.15:3001/usuario/updatedeudor/${route.params.id}`,{
            name1:name1,
            name2:name2,
            lastname1:lastname1,
            lastname2:lastname2,
            address:address,
            tel:tel,
        }).then(()=>{
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
              title: `Edición`,
              textBody: 'Datos actualizados exitosamente',
              autoClose: 5000,
              onHide: ()=>navigation.navigate('Home'),
          })
        });
        // console.log(response.data);
    } catch (error) {
        console.error(`no se pudo hacer la actualizacion ${error}`);
    }
  }

  const [name1,setName1] = useState('');
    const [name2,setName2] = useState('');
    const [lastname1,setLastname1] = useState('');
    const [lastname2,setLastname2] = useState('');
    const [address,setAddress] = useState('');
    const [tel,setTel] = useState('');

    useEffect(() => {
      if (route.params) {
        const { name1, name2, lastname1, lastname2, address, tel } = route.params;
        setName1(name1);
        setName2(name2);
        setLastname1(lastname1);
        setLastname2(lastname2);
        setAddress(address);
        setTel(tel);
      }
    }, [route.params]);

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

        <Button title="Actualizar" onPress={editarRegistro} />
      </View>
    </AlertNotificationRoot>
    
    
  )
}

export default EditDeudor