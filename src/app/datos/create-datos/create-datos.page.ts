import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-datos',
  templateUrl: './create-datos.page.html',
  styleUrls: ['./create-datos.page.scss'],
})
export class CreateDatosPage implements OnInit {

  constructor() { }

  ngOnInit() {
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

  onSubmit(){

  }
}
