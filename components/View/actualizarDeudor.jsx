import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ALERT_TYPE, AlertNotificationRoot, Dialog, Toast } from 'react-native-alert-notification';

import { ELIMINAR_DEUDOR } from '../../Funciones/deudor';

const EditarDeudor = ({ route }) => {
    const { deudor, consulta } = route.params;
    const navigation = useNavigation();

    console.log("Deudor seleccionado: ", deudor);

    const [idDeudor, setIdDeudor] = useState(deudor.id);
    const [primerNombre, setPrimerNombre] = useState(deudor.Primer_Nombre);
    const [segundoNombre, setSegundoNombre] = useState(deudor.Segundo_Nombre);
    const [primerApellido, setPrimerApellido] = useState(deudor.Primer_Apellido);
    const [segundoApellido, setSegundoApellido] = useState(deudor.Segundo_Apellido);
    const [direccion, setDireccion] = useState(deudor.Direccion_Deudor);
    const [telefono, setTelefono] = useState(deudor.Telefono_Deudor);
    const [estado, setEstado] = useState(deudor.estado);
    const [saldo, setSaldo] = useState(deudor.saldo);
    
    console.log('Id del deudor seleccionado: ', idDeudor);

    const handleGuardarCambios = () => {
        // Aquí puedes enviar los datos actualizados al servidor
        console.log('Guardando cambios...');
        Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: `¡Actualizado con éxito!`,
            textBody: `Cambios Actualizados correctamente para ${primerNombre} ${primerApellido}.`,
            autoClose: false,
            onHide: () => navigation.navigate('Home'),
            button: 'OK'
        });
    };

    const handleEliminar = async () => {
        Alert.alert(
          'Eliminar deudor',
          '¿Estás seguro de que deseas eliminar este deudor?',
          [
            {
              text: 'Cancelar',
              style: 'cancel'
            },
            {
              text: 'Desactivar',
              onPress: async () => {
                try {
                  await ELIMINAR_DEUDOR(idDeudor);
                  Alert.alert(
                    'Deudor desactivado',
                    'El deudor ha sido desactivado exitosamente.',
                    [{ text: 'OK', onPress: () => { navigation.navigate('Home'); consulta(); } }]
                  );                            
                } catch (error) {
                  Alert.alert('Error', 'Ha ocurrido un error al intentar eliminar el deudor.');
                  console.error('Error al eliminar el deudor:', error);
                }
              }
            }
          ]
        );
      };
      
      

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <View style={styles.containerInputs}>
                    <Text style={styles.textEstilo}>Primer Nombre</Text>
                    <TextInput
                        style={styles.input}
                        value={primerNombre}
                        onChangeText={setPrimerNombre}
                        placeholder="Primer Nombre"
                    />
                    <Text style={styles.textEstilo}>Segundo Nombre</Text>
                    <TextInput
                        style={styles.input}
                        value={segundoNombre}
                        onChangeText={setSegundoNombre}
                        placeholder="Segundo Nombre"
                    />
                    <Text style={styles.textEstilo}>Primer Apellido</Text>
                    <TextInput
                        style={styles.input}
                        value={primerApellido}
                        onChangeText={setPrimerApellido}
                        placeholder="Primer Apellido"
                    />
                    <Text style={styles.textEstilo}>Segundo Apellido</Text>
                    <TextInput
                        style={styles.input}
                        value={segundoApellido}
                        onChangeText={setSegundoApellido}
                        placeholder="Segundo Apellido"
                    />
                    <Text style={styles.textEstilo}>Dirección</Text>
                    <TextInput
                        style={styles.input}
                        value={direccion}
                        onChangeText={setDireccion}
                        placeholder="Dirección"
                    />
                    <Text style={styles.textEstilo}>Teléfono</Text>
                    <TextInput
                        style={styles.input}
                        value={telefono}
                        onChangeText={setTelefono}
                        placeholder="Teléfono"
                    />
                    <Text style={styles.textEstilo}>Estado</Text>
                    <TextInput
                        style={styles.input}
                        value={estado}
                        onChangeText={setEstado}
                        placeholder="Estado"
                    />
                    <Text style={styles.textEstilo}>Saldo</Text>
                    <TextInput
                        style={styles.input}
                        value={saldo.toString()}
                        onChangeText={(text) => setSaldo(parseFloat(text))}
                        placeholder="Saldo"
                    />
                </View>
                <View style={styles.ContainerButtonsAbajo}>
                    <TouchableOpacity style={styles.buttonEliminar} onPress={handleEliminar}>
                        <Text style={styles.buttonText}>Desactivar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonGuardar} onPress={handleGuardarCambios}>
                        <Text style={styles.buttonText}>Guardar Cambios</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
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
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    buttonText: {
        color: '#f5ebe0',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default EditarDeudor;
