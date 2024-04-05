import axios from "axios";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const EditProducto = ({ closeModal, datos, isOpen }) => {
  console.log('Modal abierto');
  console.log('Los datos seleccionados son: ', datos);
  const [nombre, setNombre] = useState(datos.Nombre_Producto || "");
  const [descripcion, setDescripcion] = useState(datos.Descripcion || "");
  const [precioCompra, setPrecioC] = useState(datos.Precio_Proveedor || "");
  const [precioVenta, setPrecioV] = useState(datos.Precio_Venta || "");
  const [estado, setEstado] = useState(datos.ID_Estado_FK || "1");
  const [con, setCon] = useState(true); // Estado para controlar la lógica de confirmación

  const editarRegistro = async (id) => {
    try {
      const response = await axios.put(
        `http://192.168.0.5:localhost:3001/producto/ActualizarProducto/${id}`,
        {
          Nombre_Producto: nombre,
          Descripcion: descripcion,
          Precio_Proveedor: precioCompra,
          Precio_Venta: precioVenta,
          ID_Estado_FK: estado,
        }
      );
      setCon(true); // Actualiza el estado a true si la petición fue exitosa
      consulta();
      console.log(response.data);
    } catch (err) {
      console.error("No se pudo hacer la petición put", err);
      setCon(false); // Actualiza el estado a false si hubo un error en la petición
    }
  };

  const consulta = () => {
    datos.reConsulta();
  };

  const handleSubmit = () => {
    handleClick();
  };

  const handleClick = () => {
    if (con) {
      // Aquí puedes implementar la lógica para mostrar una alerta o mensaje de éxito
      editarRegistro(datos.id);
      closeModal();
    } else {
      // Aquí puedes implementar la lógica para mostrar una alerta o mensaje de error
    }
  };

  return (
    <Modal visible={isOpen} animationType="slide">
      <View style={styles.container}>
        <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
          <Text style={styles.closeText}>X</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Editar Producto</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={nombre}
          onChangeText={(text) => setNombre(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Descripción"
          value={descripcion}
          onChangeText={(text) => setDescripcion(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Precio Compra"
          value={precioCompra}
          onChangeText={(text) => setPrecioC(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Precio Venta"
          value={precioVenta}
          onChangeText={(text) => setPrecioV(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Estado"
          value={estado}
          onChangeText={(text) => setEstado(text)}
        />
        <Button title="Guardar Cambios" onPress={handleSubmit} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  closeText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default EditProducto;
