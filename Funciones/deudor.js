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


export const ELIMINAR_DEUDORE = async () => {
  try {
    const respuesta = await axios.get(`http://${IP}:3001/usuario/consdeudor`);
    return respuesta.data;
  } catch (error) {
    console.error('Error al consultar los datos:', error);
    return [];
  }
};


