import { Component, OnInit } from '@angular/core';
import { TodosService } from 'src/app/service/todos.service';
import { Todo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  public todos:Todo[]=[];
  todo!:Todo[];
  title!:string;
  constructor(private todoService:TodosService) { }

  ngOnInit(): void {
    this.todoService.findAllTodos().subscribe(res=>{
      this.todo=res.map(actions=>{
        const data=actions.payload.doc.data() as Todo;
        data.id=actions.payload.doc.id;
        return{...data}
      })

      this.todos=
      this.todo.filter(res=>res.uid ==localStorage.getItem('user'));
      console.log(this.todos);
    })
  }
  search(){
    if(this.title !=""){
      this.todos=this.todos.filter(res=>{
        return res.title.toLowerCase().match(this.title.toLowerCase());
      })
    }else if(this.title==""){
      this.ngOnInit();
    }
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
