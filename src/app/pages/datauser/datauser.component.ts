import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm, FormBuilder, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RespPaises } from 'src/app/Models/respPaises.models';
import { RespCiudades } from '../../Models/respCiudades.models';
import { RespTipoDireccion } from '../../Models/respTipodirecciones.models';
import { RespDepartamentos } from 'src/app/Models/respDepartamentos.models';
import { jsonServicios } from '../../services/jsonServicios.service';
import { compraModel } from '../../Models/compraModel.models';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-datauser',
  templateUrl: './datauser.component.html',
  styleUrls: ['./datauser.component.css']
})
export class DatauserComponent implements OnInit {

  paises!: RespPaises[];
  departamentos!: RespDepartamentos[];
  ciudades!: RespCiudades[];
  tipoDirecciones!: RespTipoDireccion[];

  


  forma!: FormGroup; 
  forma2!: FormGroup; 
  forma3!: FormGroup;
  compra!: compraModel;


  cant: any;
  precio: any;
  valTotal: any = 0;
  valTotalCompra: any = 0;
  val: boolean = false;
  verCompra: boolean = false;
  moneda = 0;
  arrayPiezas: any[] = [];
  objCliente: any[] = [];
  flagSelectDepto = false;
  flagSelectCiudad = false;
  animacionEnviando = false;
  animacionGuardado = false;
  verDiv = true;

  




  botones = {
    botonSiguiente1 : {
    estado : false
    },
    botonSiguiente2 : {
      estado : false
      }
  }

  botonSiguiente2 = {
    estado : false
  }

  descPais: string = '';
  descDepartamento: string = '';
  descCiudad: string = '';
  descTipoDir: string = '';


  
  valoresHtml = {
    nombreusuario: '',
    nit: '',
    descripcion: '',
    pais: '',
    depto: '',
    ciudad: '',
    tipoDir: '',
    precioUni: '',
    cantidad: '',
    descPieza: ''
  }

  constructor( private fb: FormBuilder,
               private jsonServices : jsonServicios,
               public router: Router) { 
    this.createForm();
    this.createFormParts();
    this.createFormCompras();

    this.compra = {
      "id": "",
      "idPais": "",
      "nombre": "",
      "nit": "",
      "ubicaciones": [
          {
              "idDepartamento": "",
              "idCiudad": "",
              "direcciones": [
                  {
                      "idTipoDireccion": "",
                      "direccion": ""
                  }
              ]           
          },
      ],
      "piezas": [
          {
              "cantidad": "",
              "descripcion": "",
              "precioUnitario": "",
              "total": ""
          }
      ],
      "total": "" 
    }
  }

  ngOnInit(): void {
    this.getPaises();
    this.getTipoDeDireccion();
  }

  get paisNoValido(){
    return this.forma.get('pais')?.invalid && this.forma.get('pais')?.touched;
  }

  get nombreNoValido(){
    return this.forma.get('nombre')?.invalid && this.forma.get('nombre')?.touched;
  }

  get nitNoValido(){
    return this.forma.get('nit')?.invalid && this.forma.get('nit')?.touched;
  }

  get departamentoNoValido(){
    return this.forma.get('ubicaciones.departamento')?.invalid && this.forma.get('ubicaciones.departamento')?.touched;
  }

  get ciudadNoValida(){
    return this.forma.get('ubicaciones.ciudad')?.invalid && this.forma.get('ubicaciones.ciudad')?.touched;
  }

  get tipoDireccionNoValida(){
    return this.forma.get('direcciones.tipoDireccion')?.invalid && this.forma.get('direcciones.tipoDireccion')?.touched;
  }

  get descripcionNoValida(){
    return this.forma.get('direcciones.descripcion')?.invalid && this.forma.get('direcciones.descripcion')?.touched;
  }

  get precioUnitarioNoValido(){
    return this.forma.get('precioUnitario')?.invalid && this.forma.get('precioUnitario')?.touched;
  }

  get cantidadNoValida(){
    return this.forma.get('cantidad')?.invalid && this.forma.get('cantidad')?.touched;
  }

  get descripcionPiezaNoValida(){
    return this.forma.get('descripcionPieza')?.invalid && this.forma.get('descripcionPieza')?.touched;
  }

  createForm(){
    this.forma = this.fb.group({
      pais: ['', Validators.required],
      nombre: ['', Validators.required],
      nit: ['', Validators.required],
      ubicaciones : this.fb.group({
        departamento: [{value: ''}, Validators.required],
        ciudad: ['', Validators.required],
      }),
      direcciones : this.fb.group({
        tipoDireccion: ['', Validators.required],
        descripcion: ['', Validators.required],
      })
    });
  }

  createFormParts(){
    this.forma2 = this.fb.group({
      descripcionPieza: ['', Validators.required],
      cantidad: ['', Validators.required],
      precioUnitario: ['', Validators.required],
      total: ['', Validators.required],
      totalCompra: ['', Validators.required]
      // ArrayPiezas: this.fb.array([
      //   {
      //     descripcion: '',
      //     cantidad: '',
      //     preci: '',
      //     precioUnitario: '',
      //     total: ''
      //   }
      // ])
    });
  }

  createFormCompras(){
    this.forma3 = this.fb.group({
      paisClien: ['', Validators.required],
      nombreClien: ['', Validators.required],
      nitClien: ['', Validators.required],
      ubicacionesClien : this.fb.group({
        departamentoClien: [{value: ''}, Validators.required],
        ciudadClien: ['', Validators.required],
      }),
      direccionesClien : this.fb.group({
        tipoDireccionClien: ['', Validators.required],
        descripcionClien: ['', Validators.required],
      }),
      descripcionPiezaClien: ['', Validators.required],
      cantidadClien: ['', Validators.required],
      precioUnitarioClien: ['', Validators.required],
      totalClien: ['', Validators.required],
      ArrayPiezasClien: this.fb.array([
        {
          descripcionClien: '',
          cantidadClien: '',
          precioClien: '',
          precioUnitarioClien: '',
          totalClien: ''
        }
      ]),
      totalCompraClien: ['', Validators.required]
    });
  }


  guardarForm2(){
    // console.log("Function guardarForm2");
    this.arrayPiezas.push(this.forma2.value);

    if(this.forma.invalid){
      return Object.values(this.forma2.controls).forEach(control => {
        if(control instanceof FormGroup){
          return Object.values(control.controls).forEach(control => control.markAllAsTouched());
        }
        else {
          control.markAsTouched();
        }
      })
    }
  } 
  
  guardarForm1(){
    this.objCliente.push(this.forma.value);

    this.valoresHtml.nombreusuario = this.objCliente[0].nombre;
    this.valoresHtml.nit = this.objCliente[0].nit;
    this.valoresHtml.pais = this.objCliente[0].pais;
    this.valoresHtml.depto = this.objCliente[0].ubicaciones.departamento;
    this.valoresHtml.ciudad = this.objCliente[0].ubicaciones.ciudad;
    this.valoresHtml.tipoDir = this.objCliente[0].direcciones.tipoDireccion;
    this.valoresHtml.descripcion = this.objCliente[0].direcciones.descripcion;

    this.obtenerDesc();


    if(this.forma.invalid){
      return Object.values(this.forma.controls).forEach(control => {
        if(control instanceof FormGroup){
          return Object.values(control.controls).forEach(control => control.markAllAsTouched());
        }
        else {
          control.markAsTouched();
        }
      })
    }
  }

obtenerDesc(){
    for(let i = 0; i<this.departamentos.length; i++){
      if(this.departamentos[i].idDepartamento == parseInt(this.valoresHtml.depto)){
        this.descDepartamento = this.departamentos[i].descripcion;
      }
    } 

    for(let i = 0; i<this.ciudades.length; i++){
      if(this.ciudades[i].idCiudad == parseInt(this.valoresHtml.ciudad)){
        this.descCiudad = this.ciudades[i].descripcion;
      }
    }

    for(let i = 0; i<this.paises.length; i++){
      if(this.paises[i].idPais == parseInt(this.valoresHtml.pais)){
        this.descPais = this.paises[i].descripcion;
      }
    }

    for(let i = 0; i<this.tipoDirecciones.length; i++){
      if(this.tipoDirecciones[i].idTipoDesc == parseInt(this.valoresHtml.tipoDir)){
        this.descTipoDir = this.tipoDirecciones[i].descripcion;
      }
    }
  
  
}
getPaises(){
    this.jsonServices.getPaisesService('../../../assets/paises.json').subscribe(data =>{
      const resp = data as any;
      this.paises = resp;  
    });
}

getDeptos(){
  this.flagSelectDepto = true;
  // this.forma.get('departamento')?.enable();

  let idPais =  (<HTMLInputElement>document.getElementById('pais')).value;

  this.jsonServices.getDepartamentosService('../../../assets/departamentos.json').subscribe(data =>{
      const resp = data as any;
      let res = resp.filter( item => item.idPais == idPais );
      this.departamentos = res; 
  });
}

getCiudades(){
  this.flagSelectCiudad= true;
  let idDep = (<HTMLInputElement>document.getElementById('idDepto')).value;

  this.jsonServices.getCiudadesService('../../../assets/ciudades.json').subscribe(data =>{
      const resp = data as any;
      let res = resp.filter( item => item.idDepartamento == idDep );
      this.ciudades = res;  
  });
}

getTipoDeDireccion(){
  this.jsonServices.getTiposDireccionesService('../../../assets/tipoDireccion.json').subscribe(data =>{
      const resp = data as any;
      this.tipoDirecciones = resp;       
  });
}


validarBotonSiguiente() {
  this.valoresHtml.nombreusuario = (<HTMLInputElement>document.getElementById('nombreusuario')).value;
  this.valoresHtml.nit = (<HTMLInputElement>document.getElementById('nit')).value;
  this.valoresHtml.descripcion = (<HTMLInputElement>document.getElementById('descripcion')).value;
  this.valoresHtml.pais = (<HTMLInputElement>document.getElementById('pais')).value;
  this.valoresHtml.depto = (<HTMLInputElement>document.getElementById('idDepto')).value;
  this.valoresHtml.ciudad = (<HTMLInputElement>document.getElementById('ciudad')).value;
  this.valoresHtml.tipoDir = (<HTMLInputElement>document.getElementById('tipoDireccion')).value;


  if( this.valoresHtml.nombreusuario.length > 0 &&
      this.valoresHtml.nit.length > 0 &&
      this.valoresHtml.descripcion.length > 0 &&
      parseInt(this.valoresHtml.pais)> 0 &&
      this.valoresHtml.ciudad.length > 0 &&
      this.valoresHtml.tipoDir.length > 0 &&
      this.valoresHtml.depto.length > 0){
        this.botones.botonSiguiente1.estado = true;
  } else {
    this.botones.botonSiguiente1.estado = false;
  }

}

setMoneda(){
  const idPais = (<HTMLInputElement>document.getElementById('pais')).value;
  switch(idPais){
    case '1':
      this.moneda = 1;
      break; 
      
    case '2':
      this.moneda = 2;
      break; 
      
    case '3':
      this.moneda = 3;
      break;

    default:
      this.moneda = 0;
  }
}


validarBotonSiguienteForm2() {
  this.valoresHtml.descPieza = (<HTMLInputElement>document.getElementById('descPieza')).value;
  this.valoresHtml.precioUni = (<HTMLInputElement>document.getElementById('precioUni')).value;
  this.valoresHtml.cantidad = (<HTMLInputElement>document.getElementById('cant')).value;

  this.cant =   this.valoresHtml.cantidad;
  this.precio =   this.valoresHtml.precioUni;


  if( this.valoresHtml.precioUni.length > 0 &&
      this.valoresHtml.cantidad.length > 0 ){
      this.val = true; 

} 
  if( this.valoresHtml.descPieza.length > 0 &&
      this.valoresHtml.precioUni.length > 0 &&
      this.valoresHtml.cantidad.length > 0 ){
        this.botones.botonSiguiente2.estado = true;   
  } else {
    this.botones.botonSiguiente2.estado = false;
  }

}

calcularTotal(){
  this.valTotal = this.cant * this.precio;
};


cambiarFlagCompra(){
  this.verCompra = true;
  // var filas=document.querySelectorAll("#miTabla tfoot tr td");
  // console.log('total------->', filas[1].textContent=this.valTotal.toFixed(2));
  // console.log('total------->', filas[1].textContent=this.valTotal.toFixed(2));
}



guardarCompra(){
  console.log('funcion guardarCompra');
  // console.log('Forma: ', this.forma.value);
  // console.log('Forma2: ', this.forma2.value);


  Swal.fire({
    title: 'Espere',
    text: 'Guardando información...',
    icon: 'info'
  });
  Swal.showLoading();


  this.compra.nombre = this.forma.value.nombre;
  this.compra.idPais = this.forma.value.pais;
  this.compra.nit  = this.forma.value.nit;
  this.compra.ubicaciones[0].idDepartamento  = this.forma.value.ubicaciones.departamento;
  this.compra.ubicaciones[0].idCiudad  = this.forma.value.ubicaciones.ciudad;
  this.compra.ubicaciones[0].direcciones[0].direccion  = this.forma.value.direcciones.tipoDireccion;
  this.compra.ubicaciones[0].direcciones[0].idTipoDireccion  = this.forma.value.direcciones.descripcion;
  this.compra.piezas[0].cantidad  = this.forma2.value.cantidad;
  this.compra.piezas[0].descripcion  = this.forma2.value.descripcion;
  this.compra.piezas[0].precioUnitario  = this.forma2.value.precioUnitario;
  this.compra.piezas[0].total  = this.valTotal;
  this.compra.total = 9000;


  // console.log('Compra: ', this.compra);


  this.jsonServices.guardarCompra(this.compra).subscribe(resp => {
    if(resp){
      setTimeout(() => {        
        Swal.fire({
          title: 'Guardado',
          text: 'Registro insertado con exito!',
          timer: 3000,
          icon: 'success'
        });

        setTimeout(() => {
          this.router.navigateByUrl('home');
        }, 1500);

      }, 3000);
    }
    // console.log('resp: ', resp);
  })
 }
}
