import { Component, OnInit } from '@angular/core';
import { InterfaceTodo } from 'src/app/modules/interface-todo'; //importato interfaccia
import { TodoServiceService } from 'src/app/services/todo-service.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})


export class TodoComponent implements OnInit {
  taskCompleted: InterfaceTodo[] = []
  todos: InterfaceTodo[]= [] //array di task preso dall'interface
  // caricamento: boolean = false; //caricamento della pagina
  // checkTask: boolean = false; //variabile checkbox
  taskNuova: string = '';   //è il valore che viene inserito nel campo input

  messaggioNoTask: boolean = false; //messaggio no task disabilitato
  aggiuntaTask: boolean = false; // messaggio di aggiunta task disabilitato
  messaggioRecuperoTask: boolean = false; // messaggio di ricerca task
  //Nel costruttore metto il services
  constructor(private todoService: TodoServiceService) {}

  //al caricamento della pagina, passano due secondi e mi cambi il valore di caricamento
  ngOnInit(): void {

  }


  // getInput mi salva il task che ho inserito nell'input e lo mette in array todos
  addTask(){
    //se la casella input non è vuota
    if(this.taskNuova !== ''){
      this.todos = this.todoService.getTasks();
      setTimeout(()=> {
        let newTask: InterfaceTodo = {
          id: this.todos.length +1,
          title: this.taskNuova,
          completed: false,
        }
          console.log(this.taskNuova)
          this.todoService.addItem(newTask);
        //appena carica il task la casella di input si svuota
        this.taskNuova = '';
      },2000)
    }
    console.log(this.todos)
  }

  //Metodo 3: rimozione del task
  removeTodo(todo:InterfaceTodo):void{
    this.todoService.deleteTask(todo)
  }

  //CAMBIO STATO CHECKBOX: la funzione viene chiamata ogni volta che viene modificato lo stato della checkbox tramite l'evento (ngModelChange). Il ciclo for fa accedere ai valori aggiornati della proprietà completed di ciascun todo
  isChecked: boolean = false;
  // toggledCheckbox(){
  //   for (const todo of this.todos) {
  //     console.log(todo.completed);
  //   }
  //   this.todoService.completedTodo()

  // }

  //metodo per spostare le task da un array all altro
  toggledCheckbox(task: InterfaceTodo) {
    setTimeout(() => {
      this.todoService.spostaCompletati(task);
       //messaggio no task se sposto tutti i task in completati
    }, 2000);
  }





  setValueInDataService(): void {
    const value = 'Hello, World!';
    this.todoService.setValue(value);
  }




}
