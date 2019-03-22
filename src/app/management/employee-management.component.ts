
import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../shared/models';
import { EmployeeService } from '../shared/employee.service';
import { MatSort, MatTableDataSource, MatDialog, MatDialogConfig, } from '@angular/material';
import { EmployeeDialogComponent } from './employee-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component ({
    templateUrl: 'employee-management.component.html',
    styles: [`.example-container { height: 100%; overflow: auto; }
    .search-div mat-form-field { width: 90%; }
    .search-div button { width: 5%; margin-right: 1%; }
    .search-div { width: 95%; margin-left: 3%; margin-right: 3%; font-size: 14px; }
    .refreshbut { float: right;}
    mat-table { max-height: 550px; overflow: auto;}
    .back { margin-left: 1%; margin-top: 1%;} 
    `]
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

    deleteEmployee(employee) {
      if (this.emplService.deleteEmployee(employee.id).subscribe()) {
        this.loadData();
        window.confirm(`De werknemer ${employee.name} is nu verwijderd uit de database`);
      }
      console.log(employee);
    }

    back() {
      this.router.navigate(['/management']);
    }

 }


