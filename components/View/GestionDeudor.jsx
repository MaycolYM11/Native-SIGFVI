import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useLocation } from 'react-router-native';

const GestionDeudor = ({ deudor }) => {
  const [nuevoDeudor, setNuevoDeudor] = useState(deudor);

  const handleActualizar = () => {
    // Lógica para actualizar el deudor
    console.log('Actualizar deudor:', nuevoDeudor);
  };

  const handleEliminar = () => {
    // Lógica para eliminar el deudor
    console.log('Eliminar deudor:', deudor.id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Gestión de Deudor</Text>
      <TextInput
        style={styles.input}
        value={nuevoDeudor.Primer_Nombre}
        onChangeText={(text) => setNuevoDeudor({...nuevoDeudor, Primer_Nombre: text})}
        placeholder="Primer Nombre"
      />
      {/* Repite este bloque para los otros campos */}
      <TouchableOpacity onPress={handleActualizar} style={styles.button}>
        <Text style={styles.buttonText}>Actualizar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleEliminar} style={styles.button}>
        <Text style={styles.buttonText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default GestionDeudor;
