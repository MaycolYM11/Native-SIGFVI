import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { BUSCAR_DEUDORES } from '../../Funciones/deudor';

const DeudoresHome = () => {
  const [deudores, setDeudores] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const data = await BUSCAR_DEUDORES();
      setDeudores(data);
    };
    fetchData();
  }, []);

  console.log('Esto me trae los deudores: ', deudores);

  const handleVolver = () => {
    // Tu lógica para volver
  };

  const handleEditarDeudor = (deudor) => {
    navigation.navigate('EditarDeudor', { deudor });
  };

  const getColorStyle = (estado) => {
    if (estado === 'activo') {
      return {
        color: 'white',
        backgroundColor: 'green',
        padding: 5,
      };
    } else if (estado === 'inactivo') {
      return {
        color: 'white',
        backgroundColor: 'red',
        padding: 5,
      };
    }
  };


  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header2}>
          <Text style={styles.headerText}>Deudores<Text style={styles.TextNaranja}>.</Text></Text>
          <View style={styles.BarMini2}></View>
        </View>
        <View style={styles.containerTop}>
          <Text style={{ marginBottom: 10 }}>En este panel es el encargado de gestionar los Deudores.</Text>
          <View>
            <TextInput
              placeholder="Buscar productos"
              style={styles.searchInput}
            />
            <Button title="Buscar" />
          </View>
          <View style={styles.containerButton}>
            <Button title="Agregar Producto" />
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
        <View style={styles.header2}>
          <TouchableOpacity onPress={handleVolver}>
            <Text style={styles.volverText}>Cerrar Sesión</Text>
          </TouchableOpacity>
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
    // backgroundColor: '#f7f8fa',
  },
  header2: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#06185c',
  },
  volverText: {
    padding: 10,
    fontSize: 16,
    color: '#f5ebe0',
    borderRadius: 10,
    backgroundColor: '#ff9414',
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

export default DeudoresHome;
