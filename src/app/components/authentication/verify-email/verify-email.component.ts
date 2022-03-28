import { Component, OnInit } from '@angular/core';
import { AuthentictionService } from 'src/app/service/authentiction.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  constructor(public authService:AuthentictionService) { }

  ngOnInit(): void {
  }

}
