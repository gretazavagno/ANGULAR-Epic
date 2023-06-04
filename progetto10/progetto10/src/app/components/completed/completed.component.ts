import { Component, OnInit } from '@angular/core';
import { Todos } from 'src/app/modules/todos';
import { TodosService } from 'src/app/services/todos.service';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.scss']
})
export class CompletedComponent implements OnInit {
  completedTodos: Todos[] = [];  //array todos completati
  constructor(private methodService: TodosService) { }

  ngOnInit(): void {
    setTimeout(()=>{
      this.completedTodos = this.methodService.getCompletedTask()
    }, 2000)
  }

}
