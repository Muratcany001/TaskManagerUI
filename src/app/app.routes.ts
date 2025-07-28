import { Routes } from '@angular/router';
import { Home } from './Pages/home/home';
import { Login } from './Pages/login/login';
import { Register } from './Pages/register/register';
import { Header } from './Shared/header/header';
import { Sidebar } from './Shared/sidebar/sidebar';
import { Tasks } from './Pages/tasks/tasks';
import { Auth } from './auth';

export const routes: Routes = [

    {
        path: '',
        component: Tasks,
        canActivate: [Auth]
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'register',
        component: Register
    },
    {
        path : 'header',
        component : Header,
        canActivate: [Auth]
    },
    {
        path : 'sidebar',
        component : Sidebar,
        canActivate: [Auth]
    },
    {
        path : 'task',
        component : Tasks,
        canActivate: [Auth]
    },
    {
        path : 'document',
        component : Document,
        canActivate: [Auth]
    }
];
