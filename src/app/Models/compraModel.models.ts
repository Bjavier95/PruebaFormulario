export interface compraModel{
    idPais;
    nombre;
    nit;
    ubicaciones: ubicacionesModel[];
    piezas: piezasModel[];
    total;
}

export interface ubicacionesModel{
    idDepartamento;
    idCiudad;
    direcciones: direccionesModel[]; 
}

export interface direccionesModel{
    idTipoDireccion;
    direccion;
}

export interface piezasModel{
    cantidad;
    descripcion;
    precioUnitario;
    total;
}