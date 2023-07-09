import { Component, Input } from '@angular/core';
import { Todo } from '../Todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  @Input() todos: Todo[] = [];

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
    this.refreshList(todo);
  }

  refreshList(t: Todo) {
    const index = this.todos.findIndex((todo) => todo.id === t.id);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
  }
}
