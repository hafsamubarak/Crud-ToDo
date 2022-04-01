import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from 'src/app/models/todo.model';
import { TodosService } from 'src/app/service/todos.service';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss']
})
export class EditTodoComponent implements OnInit {
  todoForm!:FormGroup;
  @Input() todo!:Todo;
  todoo!:Todo;
  disabled:boolean=true;

  constructor(private todoService:TodosService,private formBuilder:FormBuilder,private router:Router,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.todoForm=this.formBuilder.group({
      title:['',Validators.required],
      priority:['',Validators.required],
      date:['',Validators.required],
      description:[''],
      status:[''],
      created:[''],
      uid:['']
    });
    const id=this.activatedRoute.snapshot.paramMap.get('id');
    this.todoService.getTodo(id).subscribe((data:any)=>{
      this.todoForm.setValue(data)
    })
  }
  update(){
    const items:Todo={
    title:this.todoForm.value.title,
      description:this.todoForm.value.description,
      priority:this.todoForm.value.priority
    }
    this.todoService.updateTodo(items)
      this.router.navigate(['/todoList'])
    // .then(()=>{

    // }).catch((error)=>{
    //   console.log(error.message)
    // })
  }
  remove(id:any){
    this.todoService.removeTodo(id);
  }
  cancel(){
    this.router.navigate(['todoList'])
  }
  // edit(todo:Todo){
  //   const todos={
  //     title:this.todoForm.value.title,
  //     description:this.todoForm.value.description,
  //     priority:this.todoForm.value.priority,
  //     date:this.todoForm.value.date,
  //     created:new Date().toUTCString(),
  //     status:true,
  //     uid:localStorage.getItem('user')
  //   };
  //   console.log(todos)
  //   this.todoService.updateTodo(todos,todo.id);
  //   this.router.navigate(['/todoList'])
  // }

}
