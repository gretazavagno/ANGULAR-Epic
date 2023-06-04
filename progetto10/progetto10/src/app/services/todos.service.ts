import { Injectable } from '@angular/core';
import { Todos } from '../modules/todos'; //importazione interfaccia

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  private todos: Todos[] = [] //array interfaccia dove interisco i task
  private completedTodos: Todos[] = [] //array dove vado a inserire solo i task completati

  //Caricare i task
  getTask(): Todos[]{
    return this.todos;
  }

  //Aggiungere i task
  addTask(newTask: Todos): void{
    this.todos.push(newTask);
  }

  //Spostare i task all'array dei task completati completedTodos
  moveCompleted(completedTask: Todos): void{
    const index = this.todos.findIndex((i) => i.id === completedTask.id);
    if(index !== -1){
      this.todos.splice(index, 1); //eliminazione dall'array principale
      this.completedTodos.push(completedTask) //popolamento array completed
    }
    for (let i = index; i < this.todos.length; i++) { //ripristino ordine id
      this.todos[i].id = i + 1;
    }
    console.log(this.completedTodos)
    console.log(this.todos)
  }

  //Caricare i task completati
  getCompletedTask(): Todos[]{
    return this.completedTodos;
  }


  //Remove task
  removeTask(removeTask: Todos): void{
    const index = this.todos.findIndex((i) => i.id === removeTask.id);
    if(index !== -1){
      this.todos.splice(index, 1);
    }
    for (let i = index; i < this.todos.length; i++) { //ripristino ordine id
      this.todos[i].id = i + 1;
    }
  }
}
