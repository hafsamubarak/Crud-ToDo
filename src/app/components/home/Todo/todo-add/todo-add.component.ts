import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from 'src/app/models/todo.model';
import { User } from 'src/app/models/user.model';
import { TodosService } from 'src/app/service/todos.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.scss']
})
export class TodoAddComponent implements OnInit {
  todoForm!:FormGroup;
  to:Todo[]=[];
  user!:User

  constructor(private todoService:TodosService,private formBuilder:FormBuilder,private router:Router,private activatedRoute:ActivatedRoute,private userService:UserService) { }

  ngOnInit(): void {
    this.todoForm=this.formBuilder.group({
      title:['',Validators.required],
      priority:['',Validators.required],
      date:['',Validators.required],
      description:['']
    })
    // this.todoService.findAllTodos().subscribe(res =>{
    //   this.to=res.map(actions=>{
    //     const data=actions.payload.doc.data() as Todo;
    //     data.id=actions.payload.doc.id;
    //     return {...data}
    //   })
    // })
  }
  onSubmit(){
    if(!this.todoForm.valid){
      return;
    }
    const todo:Todo={
      title:this.todoForm.value.title,
      description:this.todoForm.value.description,
      priority:this.todoForm.value.priority,
      date:this.todoForm.value.date,
      created:new Date(),
      status:true,
    };
    console.log(todo);
    // const id=localStorage.getItem('user') as string;
    // this.userService.updateUSerByID(id,this.to);
    this.todoService.createTodo(todo);
    this.router.navigate(['/todoList'])
  }

}
