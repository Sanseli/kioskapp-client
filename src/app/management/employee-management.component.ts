
import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../shared/models';
import { EmployeeService } from '../shared/employee.service';
import { MatSort, MatTableDataSource, MatDialog, MatDialogConfig, } from '@angular/material';
import { EmployeeDialogComponent } from './employee-dialog.component';

@Component ({
    templateUrl: 'employee-management.component.html',
    styles: [`.example-container {
      height: 100%;
      overflow: auto;
    }

    button {
      margin: 16px 8px;
    }

    .search-form-field {
      width: 70%;
    }

    .search-div button {
      margin: 20px;
    }

    .refreshbut { float: right;}

    `]
})
export class EmployeeManagementComponent implements OnInit {

    // //dataSource = this.employees;
    // dataSource = new MatTableDataSource(this.employees)
    // name:string
    // email:string



    constructor(private emplService: EmployeeService,
     public dialog: MatDialog) {
    }

    employees: Employee[];
    listData: MatTableDataSource<Employee>;
    displayedColumns = ['id', 'name', 'firstname', 'email', 'actions'];
    searchKey: string;

    @ViewChild(MatSort) sort: MatSort;
    ngOnInit() {
      this.loadData();
      // this.listData.sort = this.sort

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
      this.dialog.open(EmployeeDialogComponent, dialogConfig);
    }

    deleteEmployee(employee) {
      if (this.emplService.deleteEmployee(employee.id).subscribe()) {
        this.loadData();
        window.confirm(`De werknemer ${employee.name} is nu verwijderd uit de database`);
      }
      console.log(employee);
    }

 }


