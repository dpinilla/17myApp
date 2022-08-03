import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConexionService {
  
  private _refresh$ = new Subject<void>(); 

  get refresh$(){
    return this._refresh$
  }

  constructor(public http: HttpClient) { }
  url = "http://127.0.0.1:80" //Dirección del Backend

  getAllDatos():Observable<any> {
    return this.http
    .get(this.url+"/getAllDatos")
  }

  removeDatos(id:any){
    console.log("removeDatos backend")
     return this.http
     .post(this.url+"/removeDatos", JSON.stringify(id))
     .pipe(tap(() =>{
        this._refresh$.next();
     }
     ))
  }

  addDatos(data){
     return this.http
     .post(this.url+"/createDatos", JSON.stringify(data))
     .pipe(tap(() =>{
        this._refresh$.next();
     }
     ))
  }

}
