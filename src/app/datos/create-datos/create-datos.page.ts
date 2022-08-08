import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { ConexionService } from 'src/app/services/conexion.service';
import { Datos } from '../../models/datos';

@Component({
  selector: 'app-create-datos',
  templateUrl: './create-datos.page.html',
  styleUrls: ['./create-datos.page.scss'],
})
export class CreateDatosPage implements OnInit {

  @Input() datos: Partial<Datos>
  isUpdate: boolean = false

  constructor(private conexion: ConexionService,
              private toastController: ToastController,
              private modalCrtl: ModalController) { }

  ngOnInit() {
    this.updateDatos()
  }

  form = new FormGroup({
    datNombre: new FormControl('',[
      Validators.required,
      Validators.minLength(3)
    ]),
    datApellido: new FormControl('',[
      Validators.required,
      Validators.minLength(4)
    ]),
    datEdad: new FormControl("",[
      Validators.required,
    ]),
    datDeporte: new FormControl("",[
      Validators.required,
      Validators.minLength(3)
    ]),
    datImagen: new FormControl("",[
      Validators.required,
      Validators.minLength(3)
    ]),
  })

  updateDatos(){
    
      if(this.datos){
        this.isUpdate = true
        this.form.patchValue(
          {
            datNombre: this.datos.datNombre, 
            datApellido: this.datos.datApellido,
            datEdad: this.datos.datEdad.toString(),
            datDeporte: this.datos.datDeporte,
            datImagen: this.datos.datImagen
          }
        )
    }else{
      this.isUpdate = false
    }
  }

  onSubmit(){
    const dat = this.form.value
    if(this.isUpdate){
      let id = this.datos.datId
      this.datos = dat
      this.datos.datId = id
      this.conexion.updateDatos(this.datos).subscribe(
        data =>{
          this.presentToast('Usuario Actualizado','El usuario fué actualizado con éxito')
          this.modalCrtl.dismiss(null, 'close')
        , error =>{
          this.presentToast('Error','Ocurrió un error al actualizar la base de datos')
        }}
        )
    }else{
      this.datos = dat
      this.datos.datId = 0
      this.conexion.addDatos(this.datos).subscribe(
        data =>{
          this.presentToast('Usuario Creado','El usuario fué creado con éxito')
          this.modalCrtl.dismiss(null, 'close')
        , error =>{
          this.presentToast('Error','Ocurrió un error al crear los datos')
        }
        })
    }
  }

  async presentToast(encabezado, mensaje) {
    const toast = await this.toastController.create({
      header: encabezado,
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

}
