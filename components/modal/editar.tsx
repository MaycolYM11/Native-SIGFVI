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

const EditProducto = ({ isOpen, closeModal, datos }) => {
  const [nombre, setNombre] = useState(datos.Nombre_Producto || "");
  const [descripcion, setDescripcion] = useState(datos.Descripcion || "");
  const [precioCompra, setPrecioC] = useState(datos.Precio_Proveedor || "");
  const [precioVenta, setPrecioV] = useState(datos.Precio_Venta || "");
  const [estado, setEstado] = useState(datos.Estado || "");

  const editarRegistro = async (id) => {
    
  };

  const handleSubmit = () => {
    editarRegistro(datos.ID_Producto_PK);
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <Modal visible={true} animationType="slide">
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
