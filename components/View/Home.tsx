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
import RegisterProd from "../modal/agregar";
import EditProducto from "../modal/editar";

const Tabla_Producto = () => {
  const [datos, setDatos] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [registerform, setRegisterform] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const openModal2 = () => {
    setIsModalOpen2(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSearch = () => {
    if (searchId.trim() !== "") {
      axios
        .get(`http://192.168.1.4:3001/producto/BuscarDatoPorId/${searchId}`)
        .then((response) => {
          setDatos(response.data.datos ? response.data.datos : []);
        })
        .catch((error) => {
          console.error("Error al buscar el dato:", error);
        });
    } else {
      consulta();
    }
  };

  const consulta = () => {
    axios
      .get("http://192.168.1.4:3001/producto/Datos")
      .then((response) => {
        console.log("Datos recibidos:", response.data.datos);
        setDatos(response.data.datos);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  };

  useEffect(() => {
    console.log("Realizando solicitud...");
    consulta();
  }, []);

  const confirmDelete = (id) => {
    axios
      .delete(`http://192.168.1.4:3001/producto/BorrarDatos/${id}`)
      .then(() => {
        console.log("Dato eliminado correctamente");
        consulta();
      })
      .catch((error) => {
        console.error("Error al borrar el inventario:", error);
      });
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
          <Button title="Agregar Producto" onPress={openModal} />
          <RegisterProd
            isOpen={isModalOpen}
            closeModal={closeModal}
            reConsulta={consulta}
          />
        </View>
      </View>
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
                <Button title="Editar" onPress={() => openModal2(item)} />
                <Button
                  title="Borrar"
                  onPress={() => confirmDelete(item.ID_Producto_PK)}
                />
              </View>
            </View>
          )}
        />
      </View>
      <Modal visible={isModalOpen2} animationType="slide">
        <View style={styles.modalContainer}>
          <EditProducto
            closeModal={closeModal}
            datos={selectedItem}
            reConsulta={consulta}
          />
        </View>
      </Modal>
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
