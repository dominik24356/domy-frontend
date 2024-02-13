import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
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
import { MainNavbarComponent } from './components/navbar/main-navbar/main-navbar.component';
import { AboutComponent } from './components/about/about.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { MainPanelComponentComponent } from './components/main-panel-component/main-panel-component.component';



const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'board/:boardId', component: BoardComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomePageComponent},
  { path: 'about', component: AboutComponent},
  { path: 'signup', component: SignUpComponent},
  { path: 'main-panel', component: MainPanelComponentComponent, canActivate: [AuthGuard] },
  { path: '', component: HomePageComponent},
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    SettingsComponent,
    DeleteTaskListAlertComponent,
    TaskModalComponent,
    LoginComponent,
    BackgroundDirective,
    HomePageComponent,
    MainNavbarComponent,
    AboutComponent,
    SignUpComponent,
    MainPanelComponentComponent,
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
