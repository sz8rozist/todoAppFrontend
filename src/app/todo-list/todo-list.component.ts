import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../Todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  @Input() todos: Todo[] = [];
  @Output() updatedTodo = new EventEmitter<Todo[]>();
  constructor(private todoService: TodoService) {}

  onDelete(todo: Todo) {
    this.todoService.deleteTodo(todo.id as number).subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
    const index = this.todoIndex(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
    this.updatedTodo.emit(this.todos);
  }

  updateCompleted(todo: Todo) {
    todo.completed = !todo.completed;
    this.todoService.updateTodo(todo).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        console.log(error);
      }
    );
    this.updatedTodo.emit(this.todos);
  }

  todoIndex(todo: Todo) {
    return this.todos.findIndex((t) => t.id === todo.id);
  }
}
