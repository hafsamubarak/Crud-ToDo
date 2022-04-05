import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  loading:boolean = false;
  constructor(private todoService:TodosService,private activatedRoute:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    // this.todo.status=!this.todo.status
  }
  // edit(todo:Todo){
  //   this.todoService.updateTodo(todo)
  // }
  remove(id:any){
    let message= window.confirm("Are You Sure You want To remove This Todo?!");
    if(message==true){
    this.todoService.removeTodo(id);
    window.location.reload();
   }else{
     this.cancel();
   }
  }
  cancel(){
    this.router.navigate(['todoList'])
  }

  toggleStatus(){
    this.loading = true;
    const items:Todo={
      ...this.todo,
      status: !this.todo.status,
      id:this.todo.id
    }
    this.todoService.updateTodo(items).then(()=>{
      this.todo.status = !this.todo.status;
    }).finally(()=>{this.loading = false});
  }

}
