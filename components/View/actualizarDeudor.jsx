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
    const [name1Error, setName1Error] = useState('');
    const [name2Error, setName2Error] = useState('');
    const [lastname1Error, setLastname1Error] = useState('');
    const [lastname2Error, setLastname2Error] = useState('');
    const [addressError, setAddressError] = useState('');
    const [telError, setTelError] = useState('');
  
    
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
    
    const validarNombre1 = () => {
        if (!primerNombre.trim()) {
          setName1Error('Este espacio no puede quedar en blanco');
          return false;
        } else if (!/^[A-Za-zÁÉÍÓÚÑáéíóúü\s]+$/.test(primerNombre)) {
          setName1Error('Digitar solo letras');
          return false;
        } else {
          setName1Error('');
          return true;
        }
      };
    
      const validarNombre2 = () => {
        if (!segundoNombre.trim()) {
          setName2Error('Este espacio no puede quedar en blanco');
          return false;
        } else if (!/^[A-Za-zÁÉÍÓÚÑáéíóúü\s]+$/.test(segundoNombre)) {
          setName2Error('Digitar solo letras');
          return false;
        } else {
          setName2Error('');
          return true;
        }
      };
      
      const validarApellido1 = () => {
        if (!primerApellido.trim()) {
          setLastname1Error('Este espacio no puede quedar en blanco');
          return false;
        } else if (!/^[A-Za-zÁÉÍÓÚÑáéíóúü\s]+$/.test(primerApellido)) {
          setLastname1Error('Digitar solo letras');
          return false;
        } else {
          setLastname1Error('');
          return true;
        }
      }
    
      const validarApellido2 = () => {
        if (!segundoApellido.trim()) {
          setLastname2Error('Este espacio no puede quedar en blanco');
          return false;
        } else if (!/^[A-Za-zÁÉÍÓÚÑáéíóúü\s]+$/.test(segundoApellido)) {
          setLastname2Error('Digitar solo letras');
          return false;
        } else {
          setLastname2Error('');
          return true;
        }
      };
    
      const validarDireccion = () => {
        if (!direccion.trim()) {
          setAddressError('Este espacio no puede quedar en blanco');
          return false;
        } else {
          setAddressError('');
          return true;
        }
      };
    
      const validarTelefono = () => {
        if (!telefono.trim()) {
          setTelError('Este espacio no puede quedar en blanco');
          return false;
        } else if (!/^\d+$/.test(telefono)) {
          setTelError('Digitar solo números');
          return false;
        } else {
          setTelError('');
          return true;
        }
      };

      const verificarRegistro = () => {
        let con = true;
    
        if (!validarNombre1()) {
          con = false;
        }
        if (!validarNombre2()) {
          con = false;
        }
        if (!validarApellido1()) {
          con = false;
        }
        if (!validarApellido2()) {
          con = false;
        }
        if (!validarDireccion()) {
          con = false;
        }
        if (!validarTelefono()) {
          con = false;
        }
    
        if (con) {
          handleGuardarCambios();
        } else {
          Toast.show({
            type: ALERT_TYPE.WARNING,
            title: 'Rellene los campos del formulario para continuar',
          });
        }
      }


    return (
        <AlertNotificationRoot>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    <View style={styles.containerInputs}>
                        <Text style={styles.textEstilo}>Primer nombre</Text>
                        <TextInput
                        style={styles.input}
                        placeholder="name1"
                        onChangeText={text => setPrimerNombre(text)}
                        onBlur={validarNombre1}
                        value={primerNombre}
                        />
                        {name1Error ? <Text style={styles.errorText}>{name1Error}</Text> : null}

                        <Text style={styles.textEstilo}>Segundo nombre</Text>
                        <TextInput
                        style={styles.input}
                        placeholder="name2"
                        onChangeText={text => setSegundoNombre(text)}
                        onBlur={validarNombre2}
                        value={segundoNombre}
                        />
                        {name2Error ? <Text style={styles.errorText}>{name2Error}</Text> : null}

                        <Text style={styles.textEstilo}>Primer apellido</Text>
                        <TextInput
                        style={styles.input}
                        placeholder="lastname1"
                        onChangeText={text => setPrimerApellido(text)}
                        onBlur={validarApellido1}
                        value={primerApellido}
                        />
                        {lastname1Error ? <Text style={styles.errorText}>{lastname1Error}</Text> : null}

                        <Text style={styles.textEstilo}>Segundo apellido</Text>
                        <TextInput
                        style={styles.input}
                        placeholder="lastname2"
                        onChangeText={text => setSegundoApellido(text)}
                        onBlur={validarApellido2}
                        value={segundoApellido}
                        />
                        {lastname2Error ? <Text style={styles.errorText}>{lastname2Error}</Text> : null}

                        <Text style={styles.textEstilo}>Dirección</Text>
                        <TextInput
                        style={styles.input}
                        placeholder="address"
                        onChangeText={text => setDireccion(text)}
                        onBlur={validarDireccion}
                        value={direccion}
                        />
                        {addressError ? <Text style={styles.errorText}>{addressError}</Text> : null}

                        <Text style={styles.textEstilo}>Teléfono</Text>
                        <TextInput
                        style={styles.input}
                        placeholder="tel"
                        onChangeText={text => setTelefono(text)}
                        onBlur={validarTelefono}
                        value={telefono}
                        keyboardType='numeric'
                        />
                        {telError ? <Text style={styles.errorText}>{telError}</Text> : null}
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
                        <TouchableOpacity style={styles.buttonGuardar} onPress={verificarRegistro}>
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
    errorText: {
        color: 'red',
        marginBottom: 10,
    }
});

export default EditarDeudor;
