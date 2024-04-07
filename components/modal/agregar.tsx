import React, { useState } from "react";
import { View, Text, TextInput, Button, Modal, StyleSheet } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import axios from "axios";

const RegisterProd = ({ isOpen, closeModal, reConsulta }) => {
  function Mayus(caracteres) {
    let palabras = caracteres.toLowerCase().split(" ");
    for (let i = 0; i < palabras.length; i++) {
      palabras[i] =
        palabras[i].charAt(0).toUpperCase() + palabras[i].substring(1);
    }
    return palabras.join(" ");
  }

  const nuevoProducto = async () => {
    try {
      const descripcionCompleta = `${descripcion} ${selectedMedida}`;
      const nombreMayus = nombre.toUpperCase();

      const foto = {
        filename: "imagen_de_prueba_producto.jpg",
        path: "../../assets/imagen_de_prueba_producto.jpg",
      };

      const generarId = async (pre) => {
        let num = 1;
        let formatoId = `${pre}-${num.toString().padStart(3, "0")}`;

        while (await idDuplicado(formatoId)) {
          num++;
          formatoId = `${pre}-${num.toString().padStart(3, "0")}`;
        }

        return formatoId;
      };

      const idPre = nombre.slice(0, 3).toUpperCase();
      const formatoId = await generarId(idPre);


      const response = await axios.post(
        "http://192.168.0.6:3001/producto/AgregarProducto",
        {
          ID_Producto_PK: formatoId,
          ID_Tipo_Producto_FK: tProducto,
          Nombre_Producto: nombreMayus,
          Descripcion: descripcionCompleta,
          Precio_Proveedor: precioCompra,
          Precio_Venta: precioVenta,
          ID_Estado_FK: estado,
        }
      );
      reConsulta();
      closeModal();
      console.log(response.data);
    } catch (error) {
      console.error("Error al agregar el producto:", error);
    }
  };

  const idDuplicado = async (id) => {
    try {
      const response = await axios.get(
        `http://192.168.0.6:3001/producto/VerificarDuplicado/${id}`
      );
      return response.data.duplicate;
    } catch (error) {
      console.error("Error id Duplicado:", error);
      return false;
    }
  };
  const [selectedMedida, setSelectedMedida] = React.useState(null);
  const [selectedEstado, setSelectedEstado] = React.useState(null);
  const [selectedTipoProducto, setSelectedTipoProducto] = React.useState(null);

  const medidasData = [
    { key: "Gramos", value: "Gramos" },
    { key: "Libra(s)", value: "Libra(s)" },
    { key: "Kilo(s)", value: "Kilo(s)" },
    { key: "Litro(s)", value: "Litro(s)" },
    { key: "Mililitros", value: "Mililitros" },
    { key: "Unidades", value: "Unidades" },
  ];

  const estadoData = [
    { key: 0, value: "Inactivo" },
    { key: 1, value: "Activo" },
  ];

  const tipoProductoData = [
    { key: 1, value: "Botella" },
    { key: 2, value: "Lata" },
    { key: 3, value: "Paquete" },
    { key: 4, value: "Caja" },
    { key: 5, value: "Vaso" },
  ];

  const [nombre, setNombre] = useState("");
  const [tProducto, setTproducto] = useState("1");
  const [descripcion, setDescripcion] = useState("");
  const [medida, setMedida] = useState("");
  const [precioCompra, setPrecioCompra] = useState("");
  const [precioVenta, setPrecioVenta] = useState("");
  const [estado, setEstado] = useState("1");

  console.log(nombre);
  console.log(selectedTipoProducto);
  console.log(descripcion);
  console.log(selectedMedida);
  console.log(precioCompra);
  console.log(precioVenta);
  console.log(selectedEstado);

  if (!isOpen) return null;

  return (
    <Modal visible={isOpen} animationType="slide">
      <View style={styles.container}>
        <Button title="Cerrar" onPress={closeModal} />
        <Text>Agregar Producto</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre Producto"
          value={nombre}
          onChangeText={setNombre}
        />
        {/* 
        <SelectList
          placeholder="Tipo de producto"
          onSelect={(val) => val && setSelectedTipoProducto(val.key)}
          data={tipoProductoData}
          save="value"
          setSelected={(val) => setSelectedTipoProducto(val)}
        />*/}
        <TextInput
          style={styles.input}
          placeholder="Tipo de producto"
          value={tProducto}
          onChangeText={setTproducto}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Descripcion"
          value={descripcion}
          onChangeText={setDescripcion}
        />

        <SelectList
          placeholder="Medida"
          onSelect={(val) => val && setSelectedMedida(val.key)}
          data={medidasData}
          save="value"
          setSelected={(val) => setSelectedMedida(val)}
        />
        <TextInput
          style={styles.input}
          placeholder="Precio de Compra"
          value={precioCompra}
          onChangeText={setPrecioCompra}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Precio de Venta"
          value={precioVenta}
          onChangeText={setPrecioVenta}
          keyboardType="numeric"
        />
        {/* 
        <SelectList
          placeholder="Estado"
          onSelect={(val) => val && setSelectedEstado(val.key)}
          data={estadoData}
          save="value"
          setSelected={(val) => setSelectedEstado(val)}
        />*/}
        <TextInput
          style={styles.input}
          placeholder="Estado"
          value={estado}
          onChangeText={setEstado}
          keyboardType="numeric"
        />
        <Button title="Registrar" onPress={nuevoProducto} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  input: {
    height: 40,
    // borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: "100%",
  },
});

export default RegisterProd;
