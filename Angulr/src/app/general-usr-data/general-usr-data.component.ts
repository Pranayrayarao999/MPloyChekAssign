import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminservceService } from '../Services/AdminServceDataAll/adminservce.service';

@Component({
  selector: 'app-general-usr-data',
  templateUrl: './general-usr-data.component.html',
  styleUrls: ['./general-usr-data.component.css']
})
export class GeneralUsrDataComponent {

  constructor(private router: Router, private adminalldata: AdminservceService){}

  items:any;

  ngOnInit():void{
    this.adminalldata.GUserData().subscribe(result => {
      this.items = result;
      console.log(result);
    },
    error => {
      console.log("ERROR IN FETCHING THE DATA :" +error);
    })
  }

  token:string=window.localStorage.getItem('token');
  
  Logout(){
    console.log(this.token);
    localStorage.removeItem('token');
    window.localStorage.clear;
    this.router.navigateByUrl('Home');
    alert("LOGGED OUT SUCCESSFUL");
  }

}
