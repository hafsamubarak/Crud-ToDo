import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthentictionService } from 'src/app/service/authentiction.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  @Input() user!:User

  constructor(public authService:AuthentictionService,private userService:UserService,private acticatedRoute:ActivatedRoute) { }
  ngOnInit(): void {
    // console.log(this.userService.getUserById(this.user.email))
  }

}
