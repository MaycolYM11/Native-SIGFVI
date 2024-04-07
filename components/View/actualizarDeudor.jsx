import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

const EditarDeudor = () => {
    const route = useRoute();
    const { deudor } = route.params;

    console.log("Deudor seleccionado: ", deudor);

    const [primerNombre, setPrimerNombre] = useState(deudor.Primer_Nombre);
    const [segundoNombre, setSegundoNombre] = useState(deudor.Segundo_Nombre);
    const [primerApellido, setPrimerApellido] = useState(deudor.Primer_Apellido);
    const [segundoApellido, setSegundoApellido] = useState(deudor.Segundo_Apellido);
    const [direccion, setDireccion] = useState(deudor.Direccion_Deudor);
    const [telefono, setTelefono] = useState(deudor.Telefono_Deudor);
    const [estado, setEstado] = useState(deudor.estado);
    const [saldo, setSaldo] = useState(deudor.saldo);

    const handleGuardarCambios = () => {
        // Aquí puedes enviar los datos actualizados al servidor
        console.log('Guardando cambios...');
    };

    const handleEliminar = () => {
        // Aquí puedes agregar la lógica para eliminar al deudor
        console.log('Eliminando deudor...');
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
                        <Text style={styles.buttonText}>Eliminar</Text>
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
