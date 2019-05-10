import { AppointmentComponent, EmployeeManagementComponent, ManagementComponent, ResetPasswordComponent } from './index';
import { VisitorResolverService, EmployeeResolverService } from '../shared';
import { AuthGuardService } from '../guards/auth-guard.service';
import { ResetPasswordTokenComponent } from './reset-password/reset-password-token/reset-password-token.component';

export const managementRoutes = [
    {
        path: '',
        component: ManagementComponent
    },
    {
        path: 'appointments',
        component: AppointmentComponent,
        resolve: { visitorList: VisitorResolverService, employeeList: EmployeeResolverService },
        //canActivate: [AuthGuardService]
    },
    {
        path: 'employee',
        component: EmployeeManagementComponent,
        resolve: { employeeList: EmployeeResolverService },
        //canActivate: [AuthGuardService]
    },
    {
        path: 'reset',
        component: ResetPasswordComponent
    },
    {
        path: 'reset/:token',
        component: ResetPasswordTokenComponent
    }
]
