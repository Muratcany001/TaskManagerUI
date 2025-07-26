import { Routes } from '@angular/router';
import { Home } from './Pages/home/home';
import { Login } from './Pages/login/login';
import { Register } from './Pages/register/register';
import { Header } from './Shared/header/header';
import { Sidebar } from './Shared/sidebar/sidebar';
import { Tasks } from './Pages/tasks/tasks';

export const routes: Routes = [

    {
        path: '',
        component: Tasks
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
        component : Header
    },
    {
        path : 'sidebar',
        component : Sidebar
    },
    {
        path : 'task',
        component : Tasks
    },
    {
        path : 'document',
        component : Document
    }







];
