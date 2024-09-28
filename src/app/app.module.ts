import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { StoreModule } from '@ngrx/store';
import { taskReducer } from './shared/store/task.reducer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormComponent,
    StoreModule.forRoot({tasks: taskReducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
