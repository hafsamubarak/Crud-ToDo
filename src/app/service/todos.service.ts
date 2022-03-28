import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(private angularFireStore:AngularFirestore) { }
  private dbPath='/Todos';
  // findLastCreatedTodos(){}
  findAllTodos(){
    return this.angularFireStore.collection(this.dbPath).snapshotChanges();
  }
  updateTodo(id:string,obj:any ){
    return this.angularFireStore.collection(this.dbPath).doc(id).update({'Todos':obj})
  }
  createTodo(todo:Todo){
    return this.angularFireStore.collection(this.dbPath).add(todo);
  }
  // findLastCreatedTodos(limit:number){
  //   return  this.angularFireStore.collection('Todos', ref =>
  //        ref.orderBy('date', 'desc').limit(limit)).snapshotChanges();
  // }
  // findAllTodos(){
  //   return this.angularFireStore.collection('Todos',ref=>
  //   ref.orderBy('date','desc')).snapshotChanges();
  // }
  // updateTodo(id:string,todo:{}){
  //   return this.angularFireStore.collection('Todos').doc(id).set(todo,{
  //     merge:true
  //   })
  // }
  // createTodo(todo:{}){
  //   return new Promise<any>((resolve,reject)=>{
  //     this.angularFireStore.collection('Todos').add(todo)
  //     .then(res=>{},err=>reject(err))
  //   })
  // }
}
