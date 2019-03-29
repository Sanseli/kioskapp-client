import { Routes } from '@angular/router';
import {
    HomeComponent,
    LoginComponent,
    LoginCompanyComponent,
    LoginPrivateComponent,
    LogoutComponent,
    ManagementComponent,
    EmployeeManagementComponent,
    LoginExistentComponent
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
        component: ManagementComponent,
        resolve: { visitorList: VisitorResolverService, employeeList: EmployeeResolverService }
    },
    {
        path: 'management/employee',
        component: EmployeeManagementComponent,
        resolve: { employeeList: EmployeeResolverService }
    },
    {
        path: 'login/existent',
        component: LoginExistentComponent,
        resolve: { visitorList: VisitorResolverService }
    }
];
