import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/board-navbar/navbar.component';
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
import { HomePageComponent } from './components/home-page/home-page.component';
import { HomeNavbarComponent } from './components/navbar/home-navbar/home-navbar.component';
import { AboutComponent } from './components/about/about.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'board', component: BoardComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomePageComponent},
  { path: '', component: HomePageComponent},
  { path: '**', redirectTo: '/login' },
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
    HomePageComponent,
    HomeNavbarComponent,
    AboutComponent,
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
