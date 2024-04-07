import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Button, Image, Text, View } from 'react-native'

const Home = () => {

  const data={
    id:'4653789',
    name1:'Deudor ',
    name2:'Movil',
    lastname1:'Prueba',
    lastname2:'Bucheush',
    address:'Cra tales calle tales',
    tel:'3212345678',

  }

  const navigation = useNavigation();

  const irRegistrar = () =>{
    navigation.navigate('Register')
  }

  const irEditar = () =>{
    navigation.navigate('Editar',data)
  }

  return (
    <View>
      <Image 
        source={require('../assets/dosecat.jpg')}
      />
      <Text>home</Text>
      <Button title="Agregar Deudor" onPress={irRegistrar} />
      <Button title="Editar Deudor" onPress={irEditar} />
    </View>
    
  )
}

export default Home