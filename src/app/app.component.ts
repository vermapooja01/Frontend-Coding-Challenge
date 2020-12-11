import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EnrolleService } from './enrolle.service';

export interface Enrolle {
  id: string;
  name: string;
  active: Boolean;
  dateOfBirth: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  title = 'enrollee-ang';
  displayedColumns: string[] = ['id', 'name', 'active', 'dateOfBirth', 'action'];
  dataSource!: MatTableDataSource<Enrolle>;
  EnrollesData: any;
  editrowId: any = -1;

  constructor(private enrolleService: EnrolleService) {
  }
  ngOnInit() {
    this.fetchEnrolleList();
  }
  fetchEnrolleList() {
    this.enrolleService.getEnrolleList().subscribe((response) => {
      this.EnrollesData = response;
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  upadeRowIndexRecord(index: number) {
    this.editrowId = -1;
    this.editrowId = index;
  }

  getRecord(enrolleData: any) {
    this.enrolleService.getEnrolle(enrolleData).subscribe((response) => { /* TODO */ }, (error) => {
      alert("Failed to get details check console");
      console.log(error);
    });
  }

  saveRecord(index: number, enrolleData: Enrolle) {
    console.log(enrolleData)
    this.enrolleService.updateEnrolle(enrolleData).subscribe((response) => {
      let updated: any = new Array<any>();
      for (var original of this.EnrollesData) {
        if (original.id === response.id) {
          updated.push(response);
        }
        else
          updated.push(original);
      }
      this.EnrollesData = updated;
      this.dataSource = new MatTableDataSource(updated);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.editrowId = -1;
      alert("Sucessfully updated");
    }, (error) => {
      alert("Failed to updatecheck console");
      console.log(error);
    });
  }

}
