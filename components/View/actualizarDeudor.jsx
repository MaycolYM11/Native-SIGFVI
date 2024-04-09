import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ALERT_TYPE, AlertNotificationRoot, Dialog, Toast } from 'react-native-alert-notification';
import axios from 'axios';

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
    
    const textoBoton = estado === 'Activo' ? 'Desactivar' : 'Activar';
    const estiloBoton = estado === 'Activo' ? styles.buttonEliminar : styles.buttonActivar;

    console.log('Id del deudor seleccionado: ', idDeudor);

    const handleGuardarCambios = async () => {
        try {
            // console.log(datos.idEstado);
            await axios.put(`http://192.168.0.15:3001/usuario/updatedeudor/${idDeudor}`, {
                name1: primerNombre,
                name2: segundoNombre,
                lastname1: primerApellido,
                lastname2: segundoApellido,
                address: direccion,
                tel: telefono,
            }).then(() => {
                Dialog.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: `¡Actualizado con éxito!`,
                    textBody: `Cambios Actualizados correctamente para ${primerNombre} ${primerApellido}.`,
                    autoClose: false,
                    onHide: () => { navigation.navigate('Home'); consulta(); },
                    button: 'OK'
                });
                console.log('Guardando cambios...');
                // console.log(response.data);
            });
        } catch (error) {
            console.error(`no se pudo hacer la actualizacion ${error}`);
        }
    };

    const handleEliminar = async () => {
        let nuevoEstado =  0;
        if (estado === 'Activo') {
            nuevoEstado = 0;
        } else {
            nuevoEstado = 1;            
        }
   
        let accion =  '';
        if (estado === 'Activo') {
            accion =  'Desactivar';
        } else {
            accion = 'Activar';            
        }

        Alert.alert(
            `${accion} deudor`,
            `¿Estás seguro de que deseas ${accion.toLowerCase()} este deudor?`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: accion,
                    onPress: async () => {
                        try {
                            await ELIMINAR_DEUDOR(idDeudor, nuevoEstado);
                            Dialog.show({
                                type: ALERT_TYPE.SUCCESS,
                                title: `${accion}`,
                                textBody: `Datos ${accion.toLowerCase()} exitosamente`,
                                autoClose: false,
                                onHide: () => { consulta(); navigation.navigate('Home'); },
                                button: 'Ok'
                            })
                        } catch (error) {
                            Dialog.show({
                                type: ALERT_TYPE.DANGER,
                                title: `${accion}`,
                                textBody: `Ha ocurrido un error al intentar ${accion.toLowerCase()} el deudor.`,
                                autoClose: false,
                                onHide: () => { consulta(); navigation.navigate('Home'); },
                                button: 'Ok'
                            })
                            console.error(`Error al ${accion.toLowerCase()} el deudor:`, error);
                        }
                    }
                }
            ]
        );
    };
    
      


    return (
        <AlertNotificationRoot>
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
                            editable={false}

                        />
                        {/*
                        <Text style={styles.textEstilo}>Saldo</Text>
                        <TextInput
                            style={styles.input}
                            value={saldo.toString()}
                            onChangeText={(text) => setSaldo(parseFloat(text))}
                            placeholder="Saldo"
                        />*/}
                    </View>
                    <View style={styles.ContainerButtonsAbajo}>
                        <TouchableOpacity style={estiloBoton} onPress={handleEliminar}>
                            <Text style={styles.buttonText}>{textoBoton}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonGuardar} onPress={handleGuardarCambios}>
                            <Text style={styles.buttonText}>Guardar Cambios</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </AlertNotificationRoot>
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
    buttonActivar: {
        flex: 1,
        backgroundColor: '#2391ef',
        paddingVertical: 20,
        paddingHorizontal: 20,
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
