
import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../../shared/models';
import { EmployeeService } from '../../shared/employee.service';
import { MatSort, MatTableDataSource, MatDialog, MatDialogConfig, MatDialogRef, } from '@angular/material';
import { EmployeeDialogComponent } from '../employee-dialog/employee-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeEditDialogComponent } from '../employee-edit-dialog/employee-edit-dialog.component';
import { DialogComponent } from 'src/app/shared/dialog-component/dialog.component';

@Component ({
    templateUrl: 'employee-management.component.html',
    styleUrls: [`employee-management.component.css`]
})
export class EmployeeManagementComponent implements OnInit {

    employees: Employee[];
    listData: MatTableDataSource<Employee>;
    displayedColumns = ['id', 'name', 'firstname', 'email', 'actions'];
    searchKey: string;

    @ViewChild(MatSort) sort: MatSort;

    constructor(private emplService: EmployeeService, private router: Router,
      public dialog: MatDialog, private route: ActivatedRoute) {
      this.listData = this.route.snapshot.data['employeeList'];
    }

    ngOnInit() {
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
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      const dialogRef = this.dialog.open(EmployeeDialogComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(result => {
        console.log('dialogref = closed');
        this.loadData();
      });
    }

    editEmployee(employee) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.data = { employee: employee };
      const dialogRef = this.dialog.open(EmployeeEditDialogComponent, dialogConfig);
    }

    deleteEmployee(employee) {
      let dialogres = '';

      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = { message: `Weet u zeker dat u ${employee.firstname} ${employee.name} wilt verwijderen uit de database?` };
      const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(result => {
          dialogres = `${result}`;

          if (dialogres === 'yes') {
            if (this.emplService.deleteEmployee(employee.id).subscribe()) {
              this.loadData();
            }
          }
      });
    }

    back() {
      this.router.navigate(['/management']);
    }

    openDialog(mes: string) {

    }
 }

