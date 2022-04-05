import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {User} from '../models/user.model'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private dbPath='/Users';

  constructor(private angularFireStore:AngularFirestore) { }
  addNewUSer(user:User){
    return this.angularFireStore.collection(this.dbPath).add(user);
  }
  getAllUser(){
    return this.angularFireStore.collection(this.dbPath).snapshotChanges();
  }
  getUserById(id:string){
    return this.angularFireStore.collection(this.dbPath).doc(id).valueChanges();
  }
  updateUSerByID(user:User){
    console.log(user);
    return this.angularFireStore.collection(this.dbPath).doc(user.uid).update({displayName:user.displayName,email:user.email,password:user.password});
  }

}
