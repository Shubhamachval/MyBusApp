import { Routes } from '@angular/router';
import { Homepage } from './homepage/homepage';
import { LoginComponent } from './login/login';
import { MainContent } from './main-content/main-content';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'homepage', component: Homepage },
  { path: 'main-content', component: MainContent }
];
