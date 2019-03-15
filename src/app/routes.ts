import { Routes } from '@angular/router';
import { HomeComponent, LoginComponent, LoginCompanyComponent, LoginPrivateComponent,
    LogoutComponent, ManagementComponent, CalendarComponent, EmployeeManagementComponent,
    LoginExistentComponent } from './index'

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'login', component: LoginComponent },
    { path: 'login/bedrijf', component: LoginCompanyComponent},
    { path: 'login/particulier', component: LoginPrivateComponent},
    { path: 'logout', component: LogoutComponent},
    { path: 'management', component: ManagementComponent },
    { path: 'calendar', component: CalendarComponent},
    { path: 'management/employee', component: EmployeeManagementComponent},
    { path: 'login/existent', component: LoginExistentComponent}
]