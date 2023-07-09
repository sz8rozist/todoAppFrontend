import { Component } from '@angular/core';
import { Todo } from './Todo';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'todo-app';
  todos: Todo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos.push(...todos);
    });
  }

  updatedTodo(data: Todo){
    this.todos.push(data);
  }
}
