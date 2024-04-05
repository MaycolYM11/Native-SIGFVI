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

const EditProducto = ({ closeModal, datos }) => {
    {/** 
  const [nombre, setNombre] = useState(datos.nombre || "");
  const [descripcion, setDescripcion] = useState(datos.descripcion || "");
  const [precioCompra, setPrecioC] = useState(datos.precioCompra || "");
  const [precioVenta, setPrecioV] = useState(datos.precioVenta || "");
  const [estado, setEstado] = useState("");
  const [con, setCon] = useState(true);
  */}

  const editarRegistro = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/producto/ActualizarProducto/${id}`,
        {
          Nombre_Producto: nombre,
          Descripcion: descripcion,
          Precio_Proveedor: precioCompra,
          Precio_Venta: precioVenta,
          ID_Estado_FK: estado,
        }
      );
      setCon(true);
      consulta();
      console.log(response.data);
    } catch (err) {
      console.error("No se pudo hacer la petición put", err);
      setCon(false);
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
    <Modal visible={true} animationType="slide">
      <View style={styles.container}>
        <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
          <Text style={styles.closeText}>X</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Editar Producto</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          onChangeText={(text) => setNombre(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Descripción"
      
          onChangeText={(text) => setDescripcion(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Precio Compra"
          
          onChangeText={(text) => setPrecioC(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Precio Venta"
        
          onChangeText={(text) => setPrecioV(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Estado"
          
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