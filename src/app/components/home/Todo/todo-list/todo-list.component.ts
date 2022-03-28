import { Component, OnInit } from '@angular/core';
import { TodosService } from 'src/app/service/todos.service';
import { Todo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  public todos:any[]=[];
  todo!:Todo[];

  constructor(private todoService:TodosService) { }

  ngOnInit(): void {
    this.todoService.findAllTodos().subscribe(res=>{
      this.todo=res.map(actions=>{
        const data=actions.payload.doc.data() as Todo;
        data.id=actions.payload.doc.id;
        return{...data}
      })
      console.log(this.todo)
    })
  }
  // findAllTodos(){
  //   this.todoService.findAllTodos().subscribe(res=>{
  //     this.todos=res;
  //   });
  // }
  // updateTodo(id:string){
  //   this.todoService.updateTodo(id,{status:false});
  // }

}
