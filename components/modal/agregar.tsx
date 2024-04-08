
import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import agregarDatos from "../funciones/agregarProducto"; // Importa la función agregarDatos

const AgregarProducto = ({ onSave }) => {
  const [nombre, setNombre] = useState("");
  const [tProducto, setTproducto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [medida, setMedida] = useState("");
  const [precioCompra, setPrecioCompra] = useState("");
  const [precioVenta, setPrecioVenta] = useState("");
  const [estado, setEstado] = useState("");

  const handleSave = () => {
    // Save the new product using the provided `onSave` function
    onSave({
      nombre,
      tProducto,
      descripcion,
      medida,
      precioCompra,
      precioVenta,
      estado,
    });
  
  
    // Clear the form fields after saving
    setNombre("");
    setTproducto("");
    setDescripcion("");
    setMedida("");
    setPrecioCompra("");
    setPrecioVenta("");
    setEstado("");
  };
  return (
    <View>
      <Text>Agregar Producto</Text>
      <TextInput
        placeholder="Nombre"
        value={nombre}
        onChangeText={(text) => setNombre(text)}
      />
      <RNPickerSelect
        onValueChange={(value) => setTproducto(value)}
        items={[
          { label: "Botella", value: "1" },
          { label: "Lata", value: "2" },
          { label: "Paquete", value: "3" },
          { label: "Caja", value: "4" },
          { label: "Vaso", value: "5" },
        ]}
      />
      <TextInput
        placeholder="Descripcion"
        value={descripcion}
        onChangeText={(text) => setDescripcion(text)}
      />
      <RNPickerSelect
        onValueChange={(value) => setMedida(value)}
        items={[
          { label: "Gramos", value: "Gramos" },
          { label: "Kilo(s)", value: "Kilo(s)" },
          { label: "Mililitros", value: "Mililitros" },
          { label: "Litro(s)", value: "Litro(s)" },
          { label: "Unidades", value: "Unidades" },
        ]}
      />
      <TextInput
        placeholder="Precio Proveedor"
        value={precioCompra}
        onChangeText={(text) => setPrecioCompra(text)}
      />
      <TextInput
        placeholder="Precio Venta"
        value={precioVenta}
        onChangeText={(text) => setPrecioVenta(text)}
      />
      <RNPickerSelect
        onValueChange={(value) => setEstado(value)}
        items={[
          { label: "Inactivo", value: "0" },
          { label: "Activo", value: "1" },
        ]}
      />
      <Button title="Registrar Producto" onPress={handleSave} />
    </View>
  );
};

export default AgregarProducto;
