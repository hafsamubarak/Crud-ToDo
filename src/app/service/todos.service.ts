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
  getTodo(id:any){
    return this.angularFireStore.collection(this.dbPath).doc(id).valueChanges();
  }
   updateTodo(todo:Todo){
     console.log(todo)
    return this.angularFireStore.collection(this.dbPath).doc(todo.id).update({title:todo.title,description:todo.description,priority:todo.priority})
    // return this.angularFireStore.collection(this.dbPath).doc(id).update({'Todos':obj})
    // return this.angularFireStore.collection(this.dbPath).doc(todoId.id).update(todoId)
  }
  createTodo(todo:Todo){
    return this.angularFireStore.collection(this.dbPath).add(todo);
  }
  removeTodo(id:any){
    return this.angularFireStore.doc('Todos/'+id).delete();
  }
  findLastCreatedTodos(limit:number){
    return  this.angularFireStore.collection('Todos', ref =>
         ref.orderBy('date', 'desc').limit(limit)).snapshotChanges();
  }
  findFirstCreatedTodos(limit:number){
    return this.angularFireStore.collection('Todos',ref =>
    ref.orderBy('date','asc').limit(limit)).snapshotChanges();
  }
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
