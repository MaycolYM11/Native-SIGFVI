import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import axios from "axios";
import AgregarProducto from "../modal/agregar";
import useConsultaProductos from "../funciones/Consulta";

const Tabla_Producto = () => {
  const { datos, searchId, setSearchId, handleSearch, handleDelete } =
    useConsultaProductos();

  const [isFormAgregarVisible, setIsFormAgregarVisible] = useState(false);

  const handleAddProduct = () => {
    setIsFormAgregarVisible(true);
  };

  const handleSaveProduct = (newProduct) => {
    // Save the new product using an API call or other logic
    console.log("New product saved:", newProduct);
    // Hide the form after saving
    setIsFormAgregarVisible(false);
  };

  return (
    <View>
      <View>
        <Text>Producto</Text>
        <Text>En este panel es el encargado de gestionar los productos.</Text>
      </View>
      <View>
        <View>
          <TextInput
            placeholder="Buscar productos"
            value={searchId}
            onChangeText={(text) => setSearchId(text)}
          />
          <Button title="Buscar" onPress={handleSearch} />
        </View>
        <View>
          <Button title="Agregar Producto" onPress={handleAddProduct} />
        </View>
      </View>
      {isFormAgregarVisible && <AgregarProducto onSave={handleSaveProduct} />}

      <View>
        <FlatList
          data={datos}
          keyExtractor={(item) => item.ID_Producto_PK.toString()}
          renderItem={({ item }) => (
            <View>
              <Image
                source={{ uri: item.Foto_Url }}
                style={{ width: 60, height: 60, borderRadius: 5 }}
              />
              <Text>{item.ID_Producto_PK}</Text>
              <Text>{item.Nombre_Producto}</Text>
              <Text>{item.Tipo_Producto}</Text>
              <Text>{item.Descripcion}</Text>
              <Text>{item.Precio_Proveedor}</Text>
              <Text>{item.Precio_Venta}</Text>
              <Text>{item.Estado}</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginTop: 10,
                }}
              >
                <Button title="Editar" />
                <Button
                  title="Borrar"
                  onPress={() => handleDelete(item.ID_Producto_PK)}
                />
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  itemContainer: {
    marginBottom: 20,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Tabla_Producto;
