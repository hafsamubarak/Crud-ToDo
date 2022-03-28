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
  updateUSerByID(id:string|undefined,obj:any){
    return this.angularFireStore.collection(this.dbPath).doc(id).update({"Todos":obj})
  }

}
