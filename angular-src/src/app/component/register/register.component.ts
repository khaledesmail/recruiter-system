import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router} from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name:String;
  username: String;
  email: String;
  password: String;
  constructor(private validateservice: ValidateService,
    private flashmessage:FlashMessagesService,
    private authservice : AuthService,
    private router:Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user={
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }
 // required data
    if(!this.validateservice.valdiateRegister(user))
      {
        this.flashmessage.show('pleas fill all fileds', { cssClass: 'alert-danger', timeout: 3000 });
        return false;
      }
    // valid email
    if(!this.validateservice.validateemail(user.email))
      {
        this.flashmessage.show('please enter a valid email', { cssClass: 'alert-danger', timeout: 3000 });
        return false;
      }
      // Register user

      this.authservice.registerUser(user).subscribe(data=>{
        if(data==null){
          this.flashmessage.show('something went wrong', { cssClass: 'alert-danger', timeout: 3000}); 
          this.router.navigate(['/register']);
        }
        else
          {
            this.flashmessage.show('regsering success', { cssClass: 'alert-success', timeout: 3000});
            this.router.navigate(['/login']);
          }
      });

  }

  
 
}
