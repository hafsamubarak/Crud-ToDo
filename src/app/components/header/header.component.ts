import { Component, OnInit } from '@angular/core';
import { AuthentictionService } from 'src/app/service/authentiction.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public authService:AuthentictionService) { }
  local!:boolean;
  ngOnInit(): void {
    this.islocal()
  }
  islocal(){
    if(localStorage.getItem('user')){
      this.local=true;
    }else{
      this.local=false;
    }
  }

}
