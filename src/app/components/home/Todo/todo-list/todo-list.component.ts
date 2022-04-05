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
  todoo!:Todo;
  title!:string;
  date!:string;
  constructor(private todoService:TodosService) { }

  ngOnInit(): void {
    this.todoService.findAllTodos().subscribe(res=>{
      this.todo=res;

      this.todos=
      this.todo.filter(res=>res.uid ==localStorage.getItem('user'));
      console.log(this.todos);
    });
  }
  searchTitle(){
    if(this.title !=""){
      this.todos=this.todos.filter(res=>{
        return res.title.toLowerCase().match(this.title.toLowerCase());
      })
    }else if(this.title==""){
      this.ngOnInit();
    }
  }
  reset(){
    this.ngOnInit();
  }
  sortAsc(){
    this.todoService.findAllTodos().subscribe(res=>{
      this.todo=res;
      this.todos=this.todo.filter(res=>res.uid ==localStorage.getItem('user')).sort((val1,val2)=>+new Date(val1.date)- +new Date(val2.date));
      console.log(this.todos)
    })
  }
  sortDesc(){
    this.todoService.findAllTodos().subscribe(res=>{
      this.todo=res;
      this.todos=this.todo.filter(res=>res.uid ==localStorage.getItem('user')).sort((val1,val2)=>+new Date(val2.date)- +new Date(val1.date));
      console.log(this.todos)
    })
  }
  sortByField(fieldName:string, criteria:any){
    const userId = localStorage.getItem('user');
    this.todoService.findAllTodos().subscribe(res => {
      this.todos = res.filter(todo => todo.uid ==userId )
      this.todos = criteria?this.todos.filter(todo => todo[fieldName] == criteria):this.todos
    })
  }
  notCompleted(){
    this.todoService.findAllTodos().subscribe(res=>{
      this.todo=res;
      this.todos=this.todo.filter(res=>res.uid ==localStorage.getItem('user')).filter(res=>res.status==false)
  })


}}
