import { Component, OnInit } from '@angular/core';
import { AuthentictionService } from 'src/app/service/authentiction.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(public authService:AuthentictionService) { }

  ngOnInit(): void {
  }

}
