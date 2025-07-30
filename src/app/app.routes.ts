import { Routes } from '@angular/router';
import { Home } from './Pages/home/home';
import { Login } from './Pages/login/login';
import { Register } from './Pages/register/register';
import { Header } from './Shared/header/header';
import { Sidebar } from './Shared/sidebar/sidebar';
import { Tasks } from './Pages/tasks/tasks';
import { Auth } from './auth';
import { AddTask } from './Pages/add-task/add-task';
import { Document } from './Pages/document/document';
import { TaskVersion } from './Pages/task-version/task-version';

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
        path: 'document',
        children: [
            { path: '', component: Tasks },
            { path: ':taskId/version', component: TaskVersion },
            { path: ':taskId/version/:versionId/documents', component: Document }
        ]
    },
    {
        path: 'addTask',
        component : AddTask,
        canActivate: [Auth]
    },
    {
        path: 'tasks/:id/versions',
        component: TaskVersion,
        canActivate: [Auth]
    }
];
