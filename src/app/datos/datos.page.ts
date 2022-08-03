import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Datos } from '../models/datos';
import { ConexionService } from '../services/conexion.service';
import { Subscription } from 'rxjs'
import { CreateDatosPage } from './create-datos/create-datos.page'

@Component({
  selector: 'app-datos',
  templateUrl: './datos.page.html',
  styleUrls: ['./datos.page.scss'],
})
export class DatosPage implements OnInit {
  nombre:string = ""
  datos: Datos[]
  subscription: Subscription
  constructor(private activatedRoute: ActivatedRoute,
              private conexion: ConexionService,
              private alertController: AlertController,
              private toastController: ToastController,
              private modalCrtl:ModalController) { }

  
  mostrarElegido:{[key: number]: boolean} = {}

  ngOnInit() {
    this.nombre = this.activatedRoute.snapshot.paramMap.get('id')
    this.agregarDatos()
    this.subscription = this.conexion.refresh$.subscribe(() =>{
      this.agregarDatos()
    })
  }

  agregarDatos(){
    this.conexion.getAllDatos().subscribe(
      data => {
        this.datos = data
      }
    )
  }

  elegido(i){
    if(this.mostrarElegido[i]){
      this.mostrarElegido[i] = false;
    }else{
      this.mostrarElegido[i] = true;
    }
  }

  removeDatos(datId:any){
    console.log("ingresó a remove:"+datId)
    let remove={}
    remove["datId"] = datId
    this.alertController.create({
        header: 'Eliminar',
        message: '¿Está seguro que desea eliminar?',
        buttons: [
          {
            text: 'Si',
            handler: () => {
                this.conexion.removeDatos(remove).subscribe(
                  data=> {
                    this.presentToast()
                  }
                )
              }
          },
          {
            text: 'No',
          }
        ]
      })
      .then((alert) => {alert.present()})
    }
  
  
  async presentToast() {
    const toast = await this.toastController.create({
      header: 'Eliminado',
      message: 'El dato fué eliminado con éxito.',
      duration: 2000
    });
    toast.present();
  }

  doRefresh(event){
    this.datos = []
    this.conexion.getAllDatos()
    .subscribe((response) => {
      this.datos = response
      event.target.complete()
    })
  }

  create(){
    this.modalCrtl.create({
      component: CreateDatosPage
    })
    .then((modal) =>{
      modal.present();
      return modal.onDidDismiss()
    })
      
  }

}
