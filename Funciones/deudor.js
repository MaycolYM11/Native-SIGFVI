import axios from 'axios';

const IP = process.env.IP_GLOBAL || '192.168.0.15';


export const BUSCAR_DEUDORES = async () => {
  try {
    const respuesta = await axios.get(`http://${IP}:3001/usuario/consdeudor`);
    return respuesta.data;
  } catch (error) {
    console.error('Error al consultar los datos:', error);
    return [];
  }
};

export const ELIMINAR_DEUDOR = async (id) => {
  try {
    console.log(`Me llega este id: ${id}, a la función para ELIMINAR_DEUDOR.`);
    const respuesta = await axios.put(`http://${IP}:3001/usuario/cambiarestado/${id}`, { state: 0 });
    return respuesta.data;
  } catch (error) {
    console.error('Error al eliminar el deudor:', error);
    return { success: false, message: 'Error al eliminar el deudor.' };
  }
};
