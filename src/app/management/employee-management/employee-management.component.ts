import { Component, ViewChild } from '@angular/core';
import { Employee, AuthService, User } from 'src/app/shared';
import { EmployeeService } from 'src/app/shared/employee.service';
import { MatSort, MatTableDataSource, MatDialog, MatDialogConfig, MatDialogRef, MatSnackBar } from '@angular/material';
import { EmployeeDialogComponent } from './employee-dialog/employee-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeEditDialogComponent } from './employee-edit-dialog/employee-edit-dialog.component';
import { DialogComponent } from 'src/app/shared/dialog-component/dialog.component';

@Component ({
    templateUrl: 'employee-management.component.html',
    styleUrls: [`employee-management.component.css`]
})
export class EmployeeManagementComponent {
  loading = true;

  employees: Employee[];
  listData: MatTableDataSource<Employee>;
  displayedColumns = ['name', 'firstname', 'email', 'actions'];
  searchKey: string;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private emplService: EmployeeService, private router: Router,
    public dialog: MatDialog, private route: ActivatedRoute, private snackBar: MatSnackBar,
    private authService: AuthService) {
    this.employees = this.route.snapshot.data['employeeList'];
    this.listData = new MatTableDataSource(this.employees);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.listData.sort = this.sort;
    }, 100);
  }

  loadData() {
    this.emplService.getEmployees().subscribe(
      data => (this.listData = new MatTableDataSource(data))
    );
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(EmployeeDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.loadData();
    });
  }

  editEmployee(employee) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = { employee: employee };
    const dialogRef = this.dialog.open(EmployeeEditDialogComponent, dialogConfig);
  }

  delete(employee) {
    let dialogres = '';

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { message: `Weet u zeker dat u ${employee.firstname} ${employee.name} wilt verwijderen uit de database?` };
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      dialogres = `${result}`;
      if (dialogres === 'yes') {
        if (employee.user_token !== null) {
          this.deleteUser(employee);
        } else {
          this.deleteEmployee(employee);
        }
      } else {
      }
    });
  }

  deleteUser(employee){
    let user: User;
    let userjson;
    this.authService.details(employee.user_token).subscribe(res => {
      userjson = res['success'];
      setTimeout(() => {
        if (userjson !== undefined) {
        const name = userjson['name']; const email = userjson['email']; const id = userjson['id'];
        user = { name, email, id } as User;
        setTimeout(() => {
          this.authService.delete(user.id).subscribe(res => {
            this.deleteEmployee(employee);
          })
        }, 100);
        }
      }, 0);
    });
  }
  deleteEmployee(employee) {
    let result: any;
    this.emplService.deleteEmployee(employee.id).subscribe(res => {
      result = res;
      if (res === 204) {
        this.snackBar.open(`Werknemer ${employee.firstname} ${employee.name} is verwijderd.`, '',
            { panelClass: ['blue-snackbar'], verticalPosition: 'top', horizontalPosition: 'center'});
        this.loadData();
      }
    });
  }

  back() {
    this.router.navigate(['/management/appointments']);
  }

  openDialog(mes: string) {

  }


 }


