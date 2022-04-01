import { Component, Input, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { TodosService } from 'src/app/service/todos.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() todo!:Todo;
  todos!:Todo[];
  statuss:boolean=true;

  constructor(private todoService:TodosService) { }

  ngOnInit(): void {
    this.todo.status=!this.todo.status
  }
  // edit(todo:Todo){
  //   this.todoService.updateTodo(todo)
  // }
  remove(id:any){
    this.todoService.removeTodo(id);
  }
  toggleStatus(val:boolean){
    // this.todoService.updateTodo(this.todo.status)
    // this.todos.map(item=>{
    //   if(item.id == id){
    //     item.status=!item.status
    //   }
    // })
  }

}
