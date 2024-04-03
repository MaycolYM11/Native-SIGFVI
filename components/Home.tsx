import React from 'react'
import { Image, Text, View } from 'react-native'

const Home = () => {
  return (
    <View>
      <Image 
        source={require('../assets/dosecat.jpg')}
      />
      <Text>home</Text>
    </View>
    
  )
}

export default Home