import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUsrData } from 'src/app/Models/login-usr-data';

@Injectable({
  providedIn: 'root'
})
export class AdminservceService {

  constructor(private Http:HttpClient) { }

  //AdminDataALL
  AdminDataAllApi:string = "http://localhost:3000/Api/Admin";

  AdminAcc(){
    return this.Http.get<any>(this.AdminDataAllApi);
  }

  //Delete Data By Admin
  AdminMangeApi:string = "http://localhost:3000/Api/Delete/";

  DeleteByAdmin(userId: string){
    return this.Http.delete<any>(`${this.AdminMangeApi}${userId}`);
  }

  // GeneralUserDat
  GeneralUsrData:string = "http://localhost:3000/Api/Users";

  GUserData(){
    return this.Http.get<any>(this.GeneralUsrData);
  }
}
