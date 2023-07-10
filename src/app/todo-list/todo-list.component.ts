import { Component } from '@angular/core';
import { Todo } from '../Todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  todos: Todo[] = [];
  modalOpen = false;
  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.loadTodo();
  }

  loadTodo() {
    this.todoService.getTodos().subscribe((result) => {
      this.todos = [...result];
    });
  }

  onDelete(todo: Todo) {
    this.todoService.deleteTodo(Number(todo.id)).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        console.log(error);
      }
    );
    const index = this.todoIndex(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
  }

  todoIndex(todo: Todo) {
    return this.todos.findIndex((t) => t.id === todo.id);
  }

  openModal() {
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }

  onDataAdded(todo: Todo) {
    console.log('new data');
    this.todos.push(todo);
  }

  onUpdateCompleted(todo: Todo) {
    todo.completed = !todo.completed;
    this.todoService.updateTodo(todo).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
