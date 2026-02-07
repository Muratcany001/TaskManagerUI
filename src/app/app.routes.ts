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
import { AddDocument } from './Pages/add-document/add-document';

export const routes: Routes = [

    {
        path: '',
        redirectTo: 'task',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'task'
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
        path: 'header',
        component: Header,
    },
    {
        path: 'sidebar',
        component: Sidebar,
    },
    {
        path: 'task',
        component: Tasks,
    },
    {
        path: 'document',
        component: Document,
    },
    {
        path: 'addTask',
        component: AddTask,
    },
    {
        path: 'tasks/:id/versions',
        component: TaskVersion,
    },
    {
        path: ':taskId/version/:versionId/documents/addDocument',
        component: AddDocument,
    }

];
