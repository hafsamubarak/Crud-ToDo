import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { Todo } from 'src/app/models/todo.model';
import { TodosService } from 'src/app/service/todos.service';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss'],
})
export class EditTodoComponent implements OnInit {
  todoForm!: FormGroup;
  @Input() todo!: Todo;
  todoo!: Todo;
  disabled: boolean = true;

  constructor(
    private todoService: TodosService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //displaying todo info when editing
    this.todoForm = this.formBuilder.group({
      title: ['', Validators.required],
      priority: ['', Validators.required],
      date: ['', Validators.required],
      status: ['', Validators.required],
      description: [''],
      created: [''],
      uid: [''],
    });
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.todoService
      .getTodo(id)
      .pipe(take(1))
      .subscribe((data: any) => {
        this.todoForm.setValue(data);
      });
  }
  //updating todo
  update() {
    //first, extract the todo id from URL
    //then submit the edits by sending the new form values to the firebase
    const id = this.activatedRoute.snapshot.paramMap.get('id') || '';
    const items: Todo = {
      title: this.todoForm.value.title,
      description: this.todoForm.value.description,
      priority: this.todoForm.value.priority,
      status: this.todoForm.value.status,
      date: this.todoForm.value.date,
      id: id,
    };
    console.log(items.status);
    this.todoService.updateTodo(items).then(() => {
      this.router.navigate(['/todoList']);
    });
  }
  remove() {
    // console.log(this.todo.id)
    const id2 = this.activatedRoute.snapshot.paramMap.get('id');
    let message = window.confirm('Are You Sure You want To remove This Todo?!');
    if (message == true) {
      this.todoService.removeTodo(id2);
      this.cancel();
    } else {
      this.cancel();
    }
  }
  cancel() {
    this.router.navigate(['todoList']);
  }
}
