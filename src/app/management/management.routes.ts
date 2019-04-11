import { AppointmentComponent, EmployeeManagementComponent, ManagementComponent } from './index';
import { VisitorResolverService, EmployeeResolverService } from '../shared';

export const managementRoutes = [
    {
        path: '',
        component: ManagementComponent
    },
    {
        path: 'appointments',
        component: AppointmentComponent,
        resolve: { visitorList: VisitorResolverService, employeeList: EmployeeResolverService }
    },
    {
        path: 'employee',
        component: EmployeeManagementComponent,
        resolve: { employeeList: EmployeeResolverService }
    }
]
