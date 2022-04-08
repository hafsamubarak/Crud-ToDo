import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthentictionService {
  userData: any;

  constructor(
    public firebaseAuth: AngularFireAuth,
    public ngZone: NgZone,
    public router: Router,
    public afs: AngularFirestore
  ) {
    this.firebaseAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', this.userData.uid);
        localStorage.getItem('user');
      }
    });
  }
  //when user log in
  signIn(email: string, password: string) {
    return this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['home']);
        });
      })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  //when user sign up
  signUp(form: any) {
    return this.firebaseAuth
      .createUserWithEmailAndPassword(form.email, form.password)
      .then((result) => {
        this.sendVerificationEmail();
        this.setUserData(result.user as unknown as User, form.displayName);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // sending user data and receiveing it
  setUserData(user: User, displayName: string) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    console.log(user);
    this.userData = {
      uid: user.uid,
      email: user.email,
      displayName: displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(this.userData, {
      merge: true,
    });
  }

  //  authLogin(provider:any){
  //    return this.firebaseAuth.signInWithPopup(provider)
  //    .then((result)=>{
  //      this.ngZone.run(()=>{
  //        this.router.navigate(['home']);
  //      })
  //    }).then(()=> {
  //     window.location.reload();
  //   }).catch((error) => {
  //     window.alert(error)
  //   })
  //  }
  //verifying the user email
  sendVerificationEmail() {
    return this.firebaseAuth.authState.subscribe((user) =>
      user?.sendEmailVerification().then(() => {
        this.router.navigate(['verify-email-address']);
      })
    );
  }
  //if the user forget the password
  forgotPassword(passwordResetEmail: any) {
    return this.firebaseAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  //when user sign out , the id is deleted from local storage
  signOut() {
    return this.firebaseAuth
      .signOut()
      .then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['']);
      })
      .then(() => {
        window.location.reload();
      });
  }
}
