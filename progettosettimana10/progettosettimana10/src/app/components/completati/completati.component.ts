import { Component, OnInit } from '@angular/core';
import { TodoServiceService } from 'src/app/services/todo-service.service'; //importo il service
import { InterfaceTodo } from 'src/app/modules/interface-todo'; //importo l'interfaccia

@Component({
  selector: 'app-completati',
  templateUrl: './completati.component.html',
  styleUrls: ['./completati.component.scss']
})
export class CompletatiComponent implements OnInit {

  taskCompleted: InterfaceTodo[] = []
  todos: InterfaceTodo[]= []
  messaggioRecuperoTask: boolean = false; // messaggio di ricerca task

  constructor(private todoService: TodoServiceService) { }

  ngOnInit() {
    this.messaggioRecuperoTask=true//abilito messaggio di ricerca task
    setTimeout(() => {
      this.messaggioRecuperoTask=false//disabilito messaggio di ricerca task
    this.taskCompleted = this.todoService.gettaskCompletate();
  }, 2000);
  }


  value: any;


  getValueFromDataService(): void {
    this.value = this.todoService.getValue();
  }
}
