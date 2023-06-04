import { Component, OnInit } from '@angular/core';
import { Todos } from 'src/app/modules/todos';
import { TodosService } from 'src/app/services/todos.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  caricato: boolean = true;
  todos: Todos[] = []; //array di tutti i todos
  completedTodos: Todos[] = [];  //array todos completati
  newInput: string = '';

  constructor(private serviceMethod: TodosService) { }

  ngOnInit(): void {
    setTimeout(()=>{
      this.caricamentoTodos();
    },2000)
  }

  //Metodo caricamento della pagina todos dopo 2 secondi
  caricamentoTodos(): void{
    this.caricato = false;
  }

  //CARICAMENTO TASK
  addNewTask(){
    if(this.newInput !== ''){
      this.todos = this.serviceMethod.getTask();
      setTimeout(()=>{
        let newTask: Todos = {
          id: this.todos.length + 1,
          title: this.newInput,
          completed: false
        }
        console.log(this.newInput)
        this.serviceMethod.addTask(newTask);
        this.newInput = ''
      }, 2000)
    }
    console.log(this.todos)
  }

  //CHECKBOX
  toggledCheckbox(task: Todos){
    setTimeout(()=>{
      this.serviceMethod.moveCompleted(task)
    }, 2000)
  }

  //RIMOZIONE TASK CON DELETE
  deleteTask(todo: Todos){
    this.serviceMethod.removeTask(todo)
  }
}
