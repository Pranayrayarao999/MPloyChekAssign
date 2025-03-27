import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUsrData } from '../Models/login-usr-data';
import { LogsignService } from '../Services/LogSigninService/logsign.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  LoginForm : FormGroup;
  logindata:LoginUsrData;

  constructor(private router:Router,private fb:FormBuilder, private logsignservce: LogsignService){
    this.LoginForm = this.fb.group({
      "userId": new FormControl('',[Validators.required]),
      "password": new FormControl('',[Validators.required]),
      "role": new FormControl('',[Validators.required]) 
    }); 
  }

  LoginCheck(){
    window.localStorage.clear();
    this.logindata = this.LoginForm.value;
    console.log(this.logindata);
    this.logsignservce.logincheck(this.logindata).subscribe(
      success =>{
        // Check if token is available
        if(success && success.body.token && success.body) {
          // json-stringify : converts json objects to strings
          window.localStorage.setItem('token',success.body.token);
          alert("LOGGEDIN SUCCESSFULLY");
          let tk = window.localStorage.getItem('token');
          console.log(tk);

          //WE NEED TO CHANGE SHOW DATA OF USER TO USER, ALL DATAS TO ONLY ADMIN
          const role = success.body.user.role;
          if(role === "Admin"){
            setTimeout(() => {
              alert("Welcome Admin : "+success.body.user.userId);
            }, 3000); // Wait for 1 seconds (1000 milliseconds)
          this.router.navigateByUrl('Admin');
          }
          else if(role === "GeneralUser"){
            setTimeout(() => {
              alert("Welcome User : "+success.body.user.userId);
            }, 3000); // Wait for 1 seconds (1000 milliseconds)
          this.router.navigateByUrl('GUser');
          } 
        }
        else if(!success && !success.body.token && !success.body.user){
          alert("Login failed. Please try again");
          return null; // Stop further execution
        }
        else{
          alert("Try again after Some time...!!!");
          return "Try again after Some time...!!!";
        }
        // json-stringify : converts json objects to strings
        // window.localStorage.setItem('token',JSON.stringify(success));
        // alert("LOGGEDIN SUCCESSFULLY");
        return null;
      },
      error => {
        console.log(error);
        alert("LOGIN FAILED....CHECK THE CREDENTIALS");
        this.router.navigateByUrl('Login');
        this.LoginForm.reset();  
      }
    )
}
}
