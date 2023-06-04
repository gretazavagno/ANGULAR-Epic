import { Injectable } from '@angular/core';
import { InterfaceTodo } from '../modules/interface-todo';

@Injectable({
  providedIn: 'root'
})



export class TodoServiceService {

  private todos: InterfaceTodo[]= [] //array dove inserisco i task
  private completedTodo: InterfaceTodo[] = [] //array dove vengono inseriti gli elementi checkati
  newTodo: string = '';

  constructor() { }

  //Metodo 1: caricamento task
  getTasks(): InterfaceTodo[] {
    return this.todos;
  }

  //Metodo 1: Aggiungere task
  addItem(item: InterfaceTodo): void{
    this.todos.push(item);
  }

  //Metodo 3: rimuovere un task
  deleteTask(todo: InterfaceTodo) {
    const index = this.todos.indexOf(todo); //infexOf lo uso per risalire all'indice dell'elemento nell'array
    if (index !== -1) {
      this.todos.splice(index, 1); //splice metodo per eliminare l'elemento a partire dall'indice index fino a 1
    }
    for (let i = index; i < this.todos.length; i++) {
      this.todos[i].id = i + 1;
    }
  }

  //Metodo 4: inserire un task completato nell'array taskCompleted
  getcompletedTodo(){
    for(const todo of this.todos){
      //verifico sia che il todo sia checcato e anche se non sia già presente nell'array con metodo find
      if(todo.completed && !this.completedTodo.find(ct => ct.title === todo.title)){
        this.completedTodo.push({
          id: todo.id,
          title: todo.title,
          completed: todo.completed
        })
      }
    }
    console.log(this.completedTodo)
  }

  //Metodo 5: rimuovere un task completato dall'array se questo viene rimosso dall'user
  removeTodoFromCompleted(todo: InterfaceTodo): void {
    const index = this.completedTodo.findIndex(ct => ct.id === todo.id);
    if (index !== -1) {
      this.completedTodo.splice(index, 1);
    }
  }

  spostaCompletati(task: InterfaceTodo): void {
    const index = this.todos.findIndex((i) => i.id === task.id);
    if (index !== -1) {
      this.todos.splice(index, 1);
      this.completedTodo.push(task);
    }
  }

  //metodo per caricare le task completate
  gettaskCompletate(): InterfaceTodo[] {
    return this.completedTodo;
  }
//metodo per cancellare le task da completare
  cancellaTask(task: InterfaceTodo): void {
    const index = this.todos.findIndex((t) => t.id === task.id);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
  }
//metodo per cancellare le task completate
  cancellaTaskCompletate(task: InterfaceTodo): void {
    const index = this.completedTodo.findIndex((t) => t.id === task.id);
    if (index !== -1) {
      this.completedTodo.splice(index, 1);
    }
  }

//PASSAGGIO VALORI DA COMPONENT TODO A COMPLETATI
private value: any;

  setValue(newValue: any): void {
    this.value = newValue;
  }

  getValue(): any {
    return this.value;
  }



}
