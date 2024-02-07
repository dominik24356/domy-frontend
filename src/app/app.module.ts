import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BoardComponent } from './components/board/board.component';
import { SettingsComponent } from './components/settings/settings.component';
import {HttpClientModule} from "@angular/common/http";
import { DeleteTaskListAlertComponent } from './components/board/alerts/delete-task-list-alert/delete-task-list-alert.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TaskModalComponent } from './components/board/modals/task-modal/task-modal.component';
import { LoginComponent } from './components/login/login.component';
import {RouterModule, Routes} from "@angular/router";
import { BackgroundDirective } from './background.directive';
import {AuthGuard} from "./guards/auth.guard";


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'board', component: BoardComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BoardComponent,
    SettingsComponent,
    DeleteTaskListAlertComponent,
    TaskModalComponent,
    LoginComponent,
    BackgroundDirective,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
