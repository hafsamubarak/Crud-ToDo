import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentictionService } from 'src/app/service/authentiction.service';
import { ConfirmPasswordValidator } from './confirm-password.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!:FormGroup;
  signUp!:any;
  fieldTextType!:boolean;
  repeatFieldTextType!:boolean;

  constructor(public authService:AuthentictionService,private formBuilder:FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.signupForm=this.formBuilder.group({
      displayName:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]],
      confirmPassword:['',Validators.required]
    },
    {
      validator:ConfirmPasswordValidator('password','confirmPassword')
    }
    )
  }
  onSubmit(){
    this.authService.signUp(this.signupForm.value);
    this.router.navigate(['home'])
  }
  //toggle the first show/hide password
  toggle(){
    this.fieldTextType=!this.fieldTextType;
  }
   //toggle the second show/hide password
  toggleRepeat(){
    this.repeatFieldTextType=!this.repeatFieldTextType;
  }

}
