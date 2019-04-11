import { Routes } from '@angular/router';
import {
    HomeComponent,
    LoginComponent,
    LoginCompanyComponent,
    LoginPrivateComponent,
    LogoutComponent,
    LoginExistentComponent,
    NotFoundComponent
} from './index';
import { EmployeeResolverService, VisitorResolverService } from './shared';

export const appRoutes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'login/bedrijf',
        component: LoginCompanyComponent,
        resolve: { employeeList: EmployeeResolverService }
    },
    {
        path: 'login/particulier',
        component: LoginPrivateComponent,
        resolve: { employeeList: EmployeeResolverService }
    },
    {
        path: 'logout',
        component: LogoutComponent,
        resolve: { visitorList: VisitorResolverService }
    },
    {
        path: 'management',
        loadChildren: './management/management.module#ManagementModule',
    },
    {
        path: 'login/existent',
        component: LoginExistentComponent,
        resolve: { visitorList: VisitorResolverService }
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
