import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASIC = "http://localhost:8080/"
@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http:HttpClient) { }

  getAllCar():Observable<any>{
    return this.http.get(BASIC + 'home');
  }


  getCarById(carId:number):Observable<any>{
    return this.http.get(BASIC + `car/${carId}`)
  }
}
