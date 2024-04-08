import React from "react";
import axios from "axios";

const agregarDatos = () => {
  
  function Mayus(caracteres) {
    let palabras = caracteres.toLowerCase().split(" ");
    for (let i = 0; i < palabras.length; i++) {
      palabras[i] =
        palabras[i].charAt(0).toUpperCase() + palabras[i].substring(1);
    }
    return palabras.join(" ");
  }

  const idDuplicado = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/producto/VerificarDuplicado/${id}`
      );
      return response.data.duplicate;
    } catch (error) {
      console.error("Error id Duplicado:", error);
      return false;
    }
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

  const descripcionCompleta = `${descripcion} ${medida}`;

  const nombreMayus = Mayus(nombre);

  const idPre = nombre.slice(0, 3).toUpperCase();

  const nuevoProducto = async () => {
    try {
      const formatoId = await generarId(idPre);

      const response = await axios.post(
        "http://localhost:3001/producto/AgregarProducto",
        {
          ID_Producto_PK: formatoId,
          Nombre_Producto: nombreMayus,
          ID_Tipo_Producto_FK: tProducto,
          Descripcion: descripcionCompleta,
          Precio_Proveedor: precioCompra,
          Precio_Venta: precioVenta,
          ID_Estado_FK: estado,
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error("Error al agregar el producto:", error);
    }
  };

  const [nombre, setNombre] = useState("");
  const [tProducto, setTproducto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [medida, setMedida] = useState("");
  const [precioCompra, setPrecioCompra] = useState("");
  const [precioVenta, setPrecioVenta] = useState("");
  const [estado, setEstado] = useState("");
};

export default agregarDatos;
