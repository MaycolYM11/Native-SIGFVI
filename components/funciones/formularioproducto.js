
export const Mayus = (caracteres) => {
    let palabras = caracteres.toLowerCase().split(" ");
    for (let i = 0; i < palabras.length; i++) {
      palabras[i] =
        palabras[i].charAt(0).toUpperCase() + palabras[i].substring(1);
    }
    return palabras.join(" ");
  };
  
  export const idDuplicado = async (id, productos) => {
    const producto = productos.find((p) => p.ID_Producto_PK === id);
    return Boolean(producto);
  };
  
  export const generarId = async (pre, productos) => {
    let num = 1;
    let formatoId = `${pre}-${num.toString().padStart(3, "0")}`;
  
    while (await idDuplicado(formatoId, productos)) {
      num++;
      formatoId = `${pre}-${num.toString().padStart(3, "0")}`;
    }
  
    return formatoId;
  };
  
  export const descripcionCompleta = (descripcion, medida) => {
    return `${descripcion} ${medida}`;
  };