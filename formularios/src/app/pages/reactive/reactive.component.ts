import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {


  forma: FormGroup;
  validadores: any;

  constructor( private fb: FormBuilder){

    this.crearFormulario();
    this.cargarDataAlFormulario();

  }

  ngOnInit(): void {
  }

  get pasatiempos (){
    return this.forma.get('pasatiempos') as FormArray ;
  }

  get nombreNoValido() {
    return this.forma.get('nombre')?.invalid && this.forma.get('nombre')?.touched
  }

  get apellidoNoValido() {
    return this.forma.get('apellido')?.invalid && this.forma.get('apellido')?.touched
  }

  get correoNoValido() {
    return this.forma.get('correo')?.invalid && this.forma.get('correo')?.touched
  }

  get distritoNoValido() {
    return this.forma.get('direccion.distrito')?.invalid && this.forma.get('direccion.distrito')?.touched
  }

  get ciudadNoValido() {
    return this.forma.get('direccion.ciudad')?.invalid && this.forma.get('direccion.ciudad')?.touched
  }

  get pass1NoValido() {
    return this.forma.get('pass1')?.invalid && this.forma.get('pass1')?.touched
  }

  get pass2NoValido() {
    const pass1 = this.forma.get('pass1')?.value;
    const pass2 = this.forma.get('pass1')?.value;

    return ( pass1 === pass2) ? false : true;

  }




  crearFormulario() {

    this.forma = this.fb.group({
      nombre  : ['', [ Validators.minLength(5), Validators.required  ] ],
      apellido: ['', Validators.required ],
      correo  : ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
      pass1   : ['',Validators.required],
      pass12   : ['',Validators.required],
      direccion: this.fb.group({
        distrito: ['', Validators.required],
        ciudad  : ['', Validators.required],
      }),
      pasatiempos: this.fb.array([
      ])
    },{
      Validators: this.validadores.passwordsIguales('pass1', 'pass2')
    });

  }


  cargarDataAlFormulario() {

    this.forma.reset({
      nombre: 'Fernando',
      apellido: 'Perez',
      correo: 'juam@gmail.com',
      direccion: {
        distrito: 'Ontario',
        ciudad: 'Ottawa'
      }
    });

  }

  agregarPasatiempo(){
    this.pasatiempos.push( this.fb.control('Nuevo elemento', Validators.required));
  }

  borrarPasatiempos(i : number){
    this.pasatiempos.removeAt(i);
  }




  guardar(){
    console.log( this.forma );

    if( this.forma.invalid){
      Object.values( this.forma.controls).forEach(control =>{
        control.markAllAsTouched();
        console.log( control );
      });
    }


    // Posteo de informacion
    this.forma.reset({
      nombre: 'sin nombre'
    });
  }

}
