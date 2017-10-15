import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;
  constructor(
    private authservice: AuthService,
    private router : Router,
    private flashmessage : FlashMessagesService
  ) { }

  ngOnInit() {
  }
  
  onLoginSubmit(){
    const user={
      username: this.username,
      password: this.password
    }
    this.authservice.authenticateUser(user).subscribe(data=>{
     if(data.success){
       console.log(data);
    this.authservice.storeUserData(data.token,data.user);
    this.flashmessage.show('You are now logged in',
    { cssClass: 'alert-success', timeout: 3000 });
    this.router.navigate(['/dashbord']);
     }
     else if(data.msg==null) {
      this.flashmessage.show('Invalid Username',
         { cssClass: 'alert-danger', timeout: 3000 });
      this.router.navigate(['/login']);
     } else{
        this.flashmessage.show(data.msg,
           { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/login']);
       }
     });
  }
}
