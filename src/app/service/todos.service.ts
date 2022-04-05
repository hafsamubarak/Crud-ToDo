import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {  map, take } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(private angularFireStore:AngularFirestore) { }
  private dbPath='/Todos';
  findAllTodos(){
    return this.angularFireStore.collection(this.dbPath).snapshotChanges().pipe(take(1), map((res:any)=>
    res.map(
      (doc)=>{
        return {...doc.payload.doc.data(), id:doc.payload.doc.id}
      }
    )));
  }

  getTodo(id:any){
    return this.angularFireStore.collection(this.dbPath).doc(id).valueChanges();
  }
   updateTodo(todo:Todo){
     console.log(todo)
    //  debugger
    return this.angularFireStore.collection(this.dbPath).doc(todo.id).update({title:todo.title,description:todo.description,priority:todo.priority,status:todo.status})
    // return this.angularFireStore.collection(this.dbPath).doc(id).update({'Todos':obj})
    // return this.angularFireStore.collection(this.dbPath).doc(todoId.id).update(todoId)
  }
  createTodo(todo:Todo){
    return this.angularFireStore.collection(this.dbPath).add(todo);
  }
  removeTodo(id:any){
    return this.angularFireStore.doc('Todos/'+id).delete();
  }
}
