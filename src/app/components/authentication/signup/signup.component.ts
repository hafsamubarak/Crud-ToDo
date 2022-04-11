import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentictionService } from 'src/app/service/authentiction.service';
import { ConfirmPasswordValidator } from './confirm-password.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  signUp!: any;
  fieldTextType!: boolean;
  repeatFieldTextType!: boolean;

  constructor(
    public authService: AuthentictionService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    //validation of signup form
    this.signupForm = this.formBuilder.group(
      {
        displayName: [
          '',
          //pattern to prevent empty string
          [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: ConfirmPasswordValidator('password', 'confirmPassword'),
      }
    );
  }
  get f() {
    return this.signupForm.controls;
  }
  //when submitting signup form to firebase authentication
  onSubmit() {
    this.authService.signUp(this.signupForm.value);
    this.router.navigate(['home']);
  }
  //toggle the first show/hide password
  toggle() {
    this.fieldTextType = !this.fieldTextType;
  }
  //toggle the second show/hide password
  toggleRepeat() {
    this.repeatFieldTextType = !this.repeatFieldTextType;
  }
}
