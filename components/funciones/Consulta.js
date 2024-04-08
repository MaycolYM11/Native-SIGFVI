import { useState, useEffect } from "react";
import axios from "axios";

const useConsultaProductos = () => {

  const [datos, setDatos] = useState([]);
  const [searchId, setSearchId] = useState("");

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

  const handleDelete = (id) => {
    axios
      .delete(`http://192.168.1.4:3001/producto/BorrarDatos/${id}`)
      .then(() => {
        console.log("Dato eliminado correctamente");
        consulta(); // Refresh data after deletion
      })
      .catch((error) => {
        console.error("Error al borrar el inventario:", error);
      });
  };

  useEffect(() => {
    console.log("Realizando solicitud...");
    consulta();
  }, []);

  return { datos, searchId, setSearchId, handleSearch, handleDelete };
};

export default useConsultaProductos;