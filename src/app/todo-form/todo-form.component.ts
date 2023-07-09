import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Todo } from '../Todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css'],
})
export class TodoFormComponent {
  todoForm: FormGroup;
  submitted = false;
  @Output() formDataEvent = new EventEmitter<Todo>();

  constructor(private todoService: TodoService) {
    this.todoForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      due_date: new FormControl('',[Validators.required])
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.todoForm.valid) {
      const ma = new Date();
      const ev = ma.getFullYear().toString().padStart(4, '0'); // Év, 4 karakterre kiegészítve nullákkal
      const honap = (ma.getMonth() + 1).toString().padStart(2, '0'); // Hónap, 2 karakterre kiegészítve nullákkal
      const nap = ma.getDate().toString().padStart(2, '0'); // Nap, 2 karakterre kiegészítve nullákkal

      const formattedDatum = ev + '-' + honap + '-' + nap;
      const todo: Todo = {
        title: this.todoForm.get('title')?.value,
        description: this.todoForm.get('description')?.value,
        created_at: formattedDatum,
        due_date: this.todoForm.get('due_date')?.value
      };
      console.log(todo);
      this.todoService.create(todo).subscribe(
        (result) => {
          console.log(result);
        },
        (error) => console.log(error)
      );
      this.formDataEvent.emit(todo);
      this.clearForm();
    }
  }

  clearForm() {
    this.todoForm.reset();
    Object.keys(this.todoForm.controls).forEach(key => {
      this.todoForm.get(key)?.clearValidators();
      this.todoForm.get(key)?.updateValueAndValidity();
    });
  }
}
