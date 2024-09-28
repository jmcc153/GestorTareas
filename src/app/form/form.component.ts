import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormArray, Validators } from '@angular/forms';
import { Task } from '../models/task.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { addTask } from '../shared/store/task.action';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  form: FormGroup;
  tasks$: Observable<Task[]>;
  @Output() closeModal = new EventEmitter<void>();



  constructor(private formBuilder: FormBuilder, private store: Store<{ tasks: Task[] }>) {
    this.tasks$ = this.store.select('tasks');
    this.form = this.formBuilder.group({
      id: [this.generateId()],
      title: ['', Validators.required],
      deadline: ['', Validators.required],
      completed: [false],
      people: this.formBuilder.array([this.createPerson()]) 
    });
  }

  onClose(){
    this.closeModal.emit();
  }

  addTask(): void {
  this.store.dispatch(addTask({ task: this.form.value }));
  this.tasks$.subscribe(tasks => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  });
  }
  //generate incremental id to length of tasks
  generateId(): number {
    let id = 0;
    this.tasks$.subscribe(tasks => {
      id = tasks.length;
    }).unsubscribe();
    return id;
  }


  get people(): FormArray {
    return this.form.get('people') as FormArray;
  }

  skills(personIndex: number): FormArray {
    return this.people.at(personIndex).get('skills') as FormArray;
  }

  createPerson(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18)]],
      skills: this.formBuilder.array([this.formBuilder.control('',[Validators.required])])
    });
  }

  addPerson(): void {
    this.people.push(this.createPerson());
  }

  addSkill(personIndex: number): void {
    this.skills(personIndex).push(this.formBuilder.control('',[Validators.required]));
  }

  removePerson(index: number): void {
    this.people.removeAt(index);
  }

  removeSkill(personIndex: number, skillIndex: number): void {
    const skills = this.people.at(personIndex).get('skills') as FormArray;
    skills.removeAt(skillIndex);
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.addTask();
      this.form.reset();
    }
    console.log(this.tasks$);
  }
}
