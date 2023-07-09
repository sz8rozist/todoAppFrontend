import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from './Todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private baseUrl="http://localhost:8000/api";

  constructor(private http: HttpClient) { }

  create(todo: Todo){
    return this.http.post<Todo>(`${this.baseUrl}/todos`, todo);
  }

  getTodos(){
    return this.http.get<Todo[]>(`${this.baseUrl}/todos`);
  }

  deleteTodo(id: number){
    return this.http.delete<Todo>(`${this.baseUrl}/todos/`+id);
  }

  updateTodo(todo: Todo){
    return this.http.put<Todo>(`${this.baseUrl}/todos/`+ todo.id as string, todo);
  }
}
