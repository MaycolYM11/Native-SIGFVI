import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { BUSCAR_DEUDORES, BUSCAR_DEUDORES_PERSONALIZADO } from '../../Funciones/deudor';

const DeudoresHome = () => {
  const [deudores, setDeudores] = useState([]);
  const navigation = useNavigation();
  const [busqueda, setBusqueda] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      const data = await BUSCAR_DEUDORES();
      setDeudores(data);
    };
    fetchData();
  }, []);

  console.log('Esto me trae los deudores: ', deudores);


  const busquedaPersonalizada = async () => {
    try {
      if (busqueda.trim() === '') {
        const data = await BUSCAR_DEUDORES();
        setDeudores(data);
      } else {
        const data = await BUSCAR_DEUDORES_PERSONALIZADO(busqueda, busqueda, busqueda);
        setDeudores(data);
      }
    } catch (error) {
      console.error('Error al buscar deudores:', error);
      setDeudores([]);
    }
  };


  const irRegistrar = () => {
    navigation.navigate('Register', { consulta: actualizarDeudores })
  }

  const actualizarDeudores = async () => {
    try {
      const data = await BUSCAR_DEUDORES();
      setDeudores(data);
    } catch (error) {
      console.error('Error al actualizar los deudores:', error);
    }
  };

  const handleVolver = async () => { }

  const handleEditarDeudor = (deudor) => {
    navigation.navigate('EditarDeudor', { deudor, consulta: actualizarDeudores });
  };


  return (
    <ScrollView>
      <View style={styles.container2}>
        <View style={styles.container}>
          <View style={styles.header2}>
            <Text style={styles.headerText}>Deudores<Text style={styles.TextNaranja}>.</Text></Text>
            <View style={styles.BarMini2}></View>
          </View>
          <View style={styles.containerTop}>
            <Text style={{ marginBottom: 10 }}>En este panel es el encargado de gestionar los Deudores.</Text>
            <View>
              <TextInput
                placeholder="Buscar Deudor por ID o Nombre."
                style={styles.searchInput}
                onChangeText={(text) => setBusqueda(text)}
                value={busqueda}
              />
              <TouchableOpacity onPress={busquedaPersonalizada}>
                <Text style={styles.buscarDeudor}>Buscar Deudor</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.containerButton}>
              <TouchableOpacity onPress={irRegistrar}>
                <Text style={styles.volverText}>Agregar Deudor</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.BarMini2}></View>
          </View>
          {deudores.map((item, index) => (
            <TouchableOpacity key={index} style={styles.card} onPress={() => handleEditarDeudor(item)}>
              <View style={styles.containerEstados}>
                <Text style={styles.TextTittle}>ID: <Text style={styles.TextNaranja}>{item.id}</Text></Text>
                <View>
                  {/* <Text style={styles.TextTittle2}>Estado:</Text> */}
                  <Text style={[styles.estado, item.estado == 'Activo' ? styles.activo : styles.inactivo]}>
                    {item.estado}
                  </Text>
                </View>
              </View>
              <Text style={styles.TextTittle}>Nombres y Apellidos: <Text style={styles.NormalText}>{item.Primer_Nombre} {item.Segundo_Nombre} {item.Primer_Apellido} {item.Segundo_Apellido}</Text></Text>
              <Text style={styles.TextTittle}>Dirección: <Text style={styles.NormalText}>{item.Direccion_Deudor}</Text></Text>
              <Text style={styles.TextTittle}>Teléfono: <Text style={styles.NormalText}>{item.Telefono_Deudor}</Text></Text>
              <Text style={styles.TextTittle}>Saldo: $<Text style={styles.NormalText}>{item.saldo}</Text></Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={stylesFooter.footer}>
          <Text style={stylesFooter.footerText}>Gracias por utilizar nuestro sistema<Text style={styles.TextNaranja}>.</Text></Text>
          <View style={styles.containerButton}>
            <TouchableOpacity onPress={() => { navigation.navigate('Login') }}>
              <Text style={stylesFooter.footerButton}>Cerrar Sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerTop: {
    marginBottom: 10,
    width: '100%',
  },
  containerButton: {
    marginTop: 10,
  },
  searchInput: {
    width: '100%',
    padding: 5,
    borderRadius: 8,
    marginBottom: 10,
    borderColor: "#c1c4c9",
    borderWidth: 1,
    backgroundColor: 'white',
  },
  TextTittle: {
    fontWeight: '600',
  },
  TextTittle2: {
    fontWeight: '600',
  },
  NormalText: {
    color: '#3d3a45',
    fontWeight: '400',
  },
  TextNaranja: {
    textTransform: 'uppercase',
    fontWeight: '800',
    color: '#ff9414',
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  container2: {
    backgroundColor: '#050d27',
  },
  header2: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  header3: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    width: '100%',
    backgroundColor: 'grey',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#06185c',
    textAlign: 'center',
  },
  buscarDeudor: {
    padding: 10,
    fontSize: 16,
    color: '#ffffff',
    borderRadius: 10,
    backgroundColor: '#2391ef',
    textAlign: 'center',
  },
  volverText: {
    padding: 10,
    fontSize: 16,
    color: '#ffffff',
    borderRadius: 10,
    backgroundColor: '#ff9414',
    textAlign: 'center'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
  },
  containerEstados: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  estado: {
    marginLeft: 3,
    paddingTop: 0.5,
    paddingBottom: 0.5,
    paddingLeft: 8,
    paddingRight: 8,
    color: '#fff',
    borderRadius: 15,
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  activo: {
    backgroundColor: '#ff9414',
  },
  inactivo: {
    backgroundColor: '#a5a9b5',
  },
  BarMini: {
    width: '50%',
    height: 3,
    opacity: .2,
    borderRadius: 50,
    backgroundColor: '#171824',
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 85,
  },
  BarMini2: {
    width: '100%',
    height: 1,
    opacity: .2,
    borderRadius: 50,
    backgroundColor: '#171824',
    marginTop: 10,
    marginBottom: 5,
  },
});

const stylesFooter = StyleSheet.create({
  footer: {
    width: '100%',
    marginTop: 5,
    padding: 10,
    backgroundColor: '#050d27',
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  footerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  footerButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#ff9414',
    padding: 10,
    paddingLeft: 120,
    paddingRight: 120,
    borderRadius: 10,
  },
})

export default DeudoresHome;
