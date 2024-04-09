import axios from 'axios';

const IP = process.env.IP_GLOBAL || '192.168.0.6';


export const BUSCAR_DEUDORES = async () => {
  try {
    const respuesta = await axios.get(`http://${IP}:3001/usuario/consdeudor`);
    return respuesta.data;
  } catch (error) {
    console.error('Error al consultar los datos:', error);
    return [];
  }
};

export const ELIMINAR_DEUDOR = async (id, estado) => {
  try {
    console.log(`\nMe llega este id: ${id}, a la función para ELIMINAR_DEUDOR.`);
    console.log(`\nMe esta llegando este estado: ${estado}, a la función para ELIMINAR_DEUDOR.\n`);
    const respuesta = await axios.put(`http://${IP}:3001/usuario/cambiarestado/${id}`, { state: estado });
    return respuesta.data;
  } catch (error) {
    console.error('Error al eliminar el deudor:', error);
    return { success: false, message: 'Error al eliminar el deudor.' };
  }
};




export const BUSCAR_DEUDORES_PERSONALIZADO = async (nombre, apellido, id) => {
  try {
    const respuesta = await axios.post(`http://${IP}:3001/usuario/buscardeudorlong`, { nombre, apellido, id });
    console.log('La consulta personalizada trae: ', respuesta.data);
    return respuesta.data;
  } catch (error) {
    console.error('Error al consultar los datos:', error);
    return [];
  }
};