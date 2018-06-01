import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from '../services/user-service.service';
import { User } from '../user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  user = new Array<User>();
  private sub: any;

  constructor(private router:Router, private route:ActivatedRoute, private userService: UserService) { 
    
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.userService.getUser(params['id']).subscribe(data => {
        console.log(data);
        this.user = data
      });
    });
    console.log(this.user);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
