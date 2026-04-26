import { Routes } from '@angular/router';
import { LoginComponent } from '@features/pages/login/login.component';
import { DashboardComponent } from './features/pages/dashboard/dashboard.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: '' }
];
