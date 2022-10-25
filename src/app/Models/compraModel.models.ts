export interface compraModel{
    id: string;
    idPais: any;
    nombre: any;
    nit: any;
    ubicaciones: ubicacionesModel[];
    piezas: piezasModel[];
    total: any;
}

export interface ubicacionesModel{
    idDepartamento: any;
    idCiudad: any;
    direcciones: direccionesModel[]; 
}

export interface direccionesModel{
    idTipoDireccion: any;
    direccion: any;
}

export interface piezasModel{
    cantidad;
    descripcion;
    precioUnitario;
    total;
}