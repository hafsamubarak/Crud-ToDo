import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthentictionService } from 'src/app/service/authentiction.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public authService: AuthentictionService) {}
  local!: boolean;
  @Input() user!: User;
  ngOnInit(): void {
    this.islocal();
  }
  //this function see if the user logged in or not to toggle the login/signup buttons
  islocal() {
    if (localStorage.getItem('user')) {
      this.local = true;
    } else {
      this.local = false;
    }
  }
}
