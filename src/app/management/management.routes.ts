import { ManagementComponent, EmployeeManagementComponent } from './index';
import { VisitorResolverService, EmployeeResolverService } from '../shared';

export const managementRoutes = [
    {
        path: '',
        component: ManagementComponent,
        resolve: { visitorList: VisitorResolverService, employeeList: EmployeeResolverService }
    },
    {
        path: 'employee',
        component: EmployeeManagementComponent,
        resolve: { employeeList: EmployeeResolverService }
    }
]
