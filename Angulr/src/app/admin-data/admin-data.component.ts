import { Component } from '@angular/core';
import { AdminservceService } from '../Services/AdminServceDataAll/adminservce.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-data',
  templateUrl: './admin-data.component.html',
  styleUrls: ['./admin-data.component.css']
})
export class AdminDataComponent {

  alldata:any;
  userId: string;
  getsngledata:any;

  constructor(private adminalldata: AdminservceService, private router: Router, private activatedRoute: ActivatedRoute ){}

  ngOnInit():void{
    // RETRIEVING ALL DATA
    this.adminalldata.AdminAcc().subscribe(result => {
      this.alldata = result; 
      console.log(result);
    },
    error => {
      console.log("ERROR IN FETCHING THE DATA :" +error);
    }
    )
  }

  token:string=window.localStorage.getItem('token');
  
  Logout(){
    console.log(this.token);
    localStorage.removeItem('token');
    window.localStorage.clear;
    this.router.navigateByUrl('Home');
    alert("LOGGED OUT SUCCESSFUL");
  }

  //id:number;
  Delete(userId){
    const confirmation = window.confirm('Are you sure you want to delete this item?');
    if (confirmation) {
      this.adminalldata.DeleteByAdmin(userId).subscribe(
        (response) => {
          console.log('Item deleted successfully:',response);
          // window.location.reload();
        }
      )
    }
  }

}
