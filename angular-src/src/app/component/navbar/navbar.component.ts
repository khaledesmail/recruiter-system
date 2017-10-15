import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authservice: AuthService,
    private router : Router,
    private flashmessage : FlashMessagesService
  ) { }

  ngOnInit() {
  }
  onLogoutClick(){
   this.authservice.logout();
   this.flashmessage.show('You are logged out',
   { cssClass: 'alert-success', timeout: 3000 });
}
}
