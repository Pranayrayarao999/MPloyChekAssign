import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginUsrData } from 'src/app/Models/login-usr-data';

@Injectable({
  providedIn: 'root'
})
export class LogsignService {

  // LOGIN
  logindata:LoginUsrData;

  constructor(private Http:HttpClient) { }

  loginApi:string = "http://localhost:3000/Api/Login";

  logincheck(data : LoginUsrData){
    return this.Http.post<any>(this.loginApi, data);
  }


}
