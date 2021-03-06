import { Component, OnInit } from '@angular/core';
import { TodosService } from 'src/app/service/todos.service';
import { Todo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  public todos: Todo[] = [];
  todo!: Todo[];
  todoo!: Todo;
  title!: string;
  date!: string;
  constructor(private todoService: TodosService) {}

  ngOnInit(): void {
    //for displaying todos for each user by id
    this.todoService.findAllTodos().subscribe((res) => {
      this.todo = res;

      this.todos = this.todo.filter(
        (res) => res.uid == localStorage.getItem('user')
      );
      console.log(this.todos);
    });
  }
  //serach by title
  searchTitle() {
    if (this.title != '') {
      this.todos = this.todos.filter((res) => {
        return res.title.toLowerCase().match(this.title.toLowerCase());
      });
    } else if (this.title == '') {
      this.ngOnInit();
    }
  }
  //display all todos
  reset() {
    this.ngOnInit();
  }
  //sort todos ascending by date
  sortAsc() {
    this.todoService.findAllTodos().subscribe((res) => {
      this.todo = res;
      this.todos = this.todo
        .filter((res) => res.uid == localStorage.getItem('user'))
        .sort((val1, val2) => +new Date(val1.date) - +new Date(val2.date));
      console.log(this.todos);
    });
  }
  //sort todos descending by date
  sortDesc() {
    this.todoService.findAllTodos().subscribe((res) => {
      this.todo = res;
      this.todos = this.todo
        .filter((res) => res.uid == localStorage.getItem('user'))
        .sort((val1, val2) => +new Date(val2.date) - +new Date(val1.date));
      console.log(this.todos);
    });
  }
  //used this to filter todos by priority and mark it completed
  sortByField(fieldName: string, criteria: any) {
    const userId = localStorage.getItem('user');
    this.todoService.findAllTodos().subscribe((res) => {
      this.todos = res.filter((todo) => todo.uid == userId);
      this.todos = criteria
        ? this.todos.filter((todo) => todo[fieldName] == criteria)
        : this.todos;
    });
  }
  //mark todo as not completed
  notCompleted() {
    this.todoService.findAllTodos().subscribe((res) => {
      this.todo = res;
      this.todos = this.todo
        .filter((res) => res.uid == localStorage.getItem('user'))
        .filter((res) => res.status == false);
    });
  }
}
