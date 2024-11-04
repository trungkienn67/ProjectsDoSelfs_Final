import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/auth/services/storage/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isCustomerLoggedIn:boolean=StorageService.isCustomerLoggedIn();
  isAdminLoggedIn:boolean= StorageService.isAdminLoggedIn();

  constructor(private route: Router){}

  ngOnInit(){
    this.route.events.subscribe(event =>{
      if(event.constructor.name == "NavigationEnd"){
        this.isAdminLoggedIn =StorageService.isAdminLoggedIn();
        this.isCustomerLoggedIn = StorageService.isCustomerLoggedIn();
      }
    })
  }

  logout(){
    StorageService.logout();
    this.route.navigateByUrl('/home');
  }

}
