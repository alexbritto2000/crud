import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatTableModule} from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { Appservice } from './app.service';
import { TodoComponent } from './todo/todo.component';
import { TodoService } from './todo/todo.service';
import { FormsModule } from '@angular/forms';
import { DialogEditComponent } from './dialog-edit/dialog-edit.component';
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogAddComponent } from './dialog-add/dialog-add.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatListModule} from '@angular/material/list';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    DialogEditComponent,
    DialogAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatListModule,
    MatRadioModule
  ],
  providers: [Appservice,TodoService],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogAddComponent,
    ],
})
export class AppModule { }
