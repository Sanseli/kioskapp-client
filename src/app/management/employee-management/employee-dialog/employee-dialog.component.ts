import { Component, Injectable, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MatTableDataSource } from '@angular/material';
import { Employee, EmployeeService } from 'src/app/shared';

@Component ({
    templateUrl: 'employee-dialog.component.html',
    styleUrls: [`employee-dialog.component.css`]
})
export class EmployeeDialogComponent {
  loading = true;
  progress = false;
  cancel: boolean;
  listData: MatTableDataSource<Employee>;
  employeelist: Employee[] = [];
  listFilled: boolean = false;
  displayedColumns = ['name', 'firstname', 'email'];

  constructor(private service: EmployeeService, public dialogRef: MatDialogRef<EmployeeDialogComponent>,
    private snackBar: MatSnackBar) {
  }

  onSubmit(formValues) {
    this.progress = true;
    if (this.cancel !== true) {
      if (formValues.firstname != null) {
        this.addEmployee(formValues.name, formValues.email, formValues.firstname);
      } else {
        this.addWOname(formValues.name, formValues.email); }
    }
    this.dialogRef.close();
  }

  addEmployee(name: string,  email: string, firstname: string, ) {
    const newEmployee: Employee = {name, firstname, email} as Employee;
    console.log(newEmployee);
    this.service.addEmployee(newEmployee).subscribe(res => {
      console.log(res);
      if (res['id'] !== undefined) {
        this.snackBar.open('Nieuwe werknemer is opgeslagen.', '', {
          panelClass: ['blue-snackbar'], verticalPosition: 'top', horizontalPosition: 'center'
        });
        this.progress = false;
      }
    });
  }

  addWOname(name: string, email: string) {
    const newEmployee: Employee = {name, email} as Employee;
    console.log(newEmployee);
    this.service.addEmployee(newEmployee).subscribe(res => {
      console.log(res);
      if (res['id'] !== undefined) {
        this.snackBar.open('Nieuwe werknemer is opgeslagen.', '', {
          panelClass: ['blue-snackbar'], verticalPosition: 'top', horizontalPosition: 'center'
        });
        this.progress = false;
      }
    });
  }

  onCancel() {
    console.log('cancel')
    this.cancel = true;
    this.dialogRef.close();
  }

  public changeListener(files: FileList){
    console.log(files);
    if(files && files.length > 0) {
      let file : File = files.item(0); 
        console.log(file.name);
        console.log(file.size);
        console.log(file.type);
        let reader: FileReader = new FileReader();
        reader.readAsText(file);

        reader.onload = (e) => {
          let csv: string = reader.result as string;
          csv =  csv.replace(/\n/g, ';');
          console.log(csv);
          let res = csv.split(';');
          console.log(res)
          let i = 0;
          console.log(res[res.length - 1])
          if (res[res.length - 1] === '') {
            res.splice(res.length - 1, 1)
          }
          for (let i = 0; i < res.length; i = i + 3) {
            console.log(i)

            let name = res[i];
            let firstname = res[i + 1];
            let email = res[i + 2];

            let employee = {name, firstname, email} as Employee;
            this.employeelist.push(employee);
          }

          console.log(this.employeelist);

          this.listData = new MatTableDataSource(this.employeelist);
          this.listFilled = true;
        }
      }
  }

  addList() {
    this.progress = true;
    let count = 0
    var last = this.employeelist.length

    for (let e = 0; e < last; e++) {
      this.service.addEmployee(this.employeelist[e]).subscribe(res => {
        if (res['id'] !== undefined) {
          console.log(res)
          count++;
        }
        if (e === last - 1) {
          this.snackBar.open(`U hebt ${count} nieuwe werknemer(s) toegevoegd.`, '',
            { panelClass: ['blue-snackbar'], verticalPosition: 'top', horizontalPosition: 'center'});
          this.dialogRef.close();
          this.progress = false;
        }
      });
      
    }

  }

  
}
