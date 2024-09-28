import { Component } from '@angular/core';
import { FormComponent } from './form/form.component';
import { Task } from './models/task.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { updateTask } from './shared/store/task.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isOpenModal = false;
  tasks$: Observable<Task[]>;
  filteredTasks$: Observable<Task[]>;
  constructor(private store: Store<{ tasks: Task[] }>) {
    this.tasks$ = this.store.select('tasks');
    this.filteredTasks$ = this.tasks$;
  }
  
  toggleTask(task: Task): void {
    this.store.dispatch(updateTask({ task}));
    this.tasks$.subscribe(tasks => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    });
  }

  filterTasks(filter: String): void {
    this.filteredTasks$ = this.tasks$.pipe(
      map(tasks => {
        if (filter === 'all') {
          return tasks;
        }
        if (filter === 'completed') {
          return tasks.filter(task => task.completed);
        }
        if (filter === 'pending') {
          return tasks.filter(task => !task.completed);
        }
        return tasks;
      })
    );
  }

  openModal(): void {
    this.isOpenModal = true;
  }

  closeModal(): void {
    this.isOpenModal = false;
  }



}
