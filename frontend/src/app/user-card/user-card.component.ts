import { Component, OnInit, VERSION } from '@angular/core';
import { User } from '../user';
import { UserService } from '../services/user-service.service';
import { FormBuilder, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router'

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  ngVersion: string = VERSION.full;
  matVersion: string = '5.1.0';
  breakpoint: number;

  users = new Array<User>();
  user = new User();  

  constructor(private userService: UserService, private r: Router) {
      //this.users = ['Andy', 'Bryce', 'Carson', 'Chris'];
   }

  ngOnInit() {
    this.getUsers();
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 6;
  }

  ngOnDestroy() {
    
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 6;
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(data => {
      console.log(data);
      this.users = data
    });
  }

  addUser(firstName: string, lastName: string, email: string): void {
    this.user.first_name = firstName;
    this.user.last_name = lastName;
    this.user.email = email;
    this.userService.addUser(this.user).subscribe(data => {
      console.log('DATA: ' + data[3])
    });
    this.r.navigate([this.r.url]);
  }


}
