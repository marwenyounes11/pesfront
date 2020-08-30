import { Component, OnInit ,Inject} from '@angular/core';
import {  Statistique } from '../model/statistique';
import {  StatistiqueService} from '../service/statistique.service';
import { ToastrService } from 'ngx-toastr';

import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatDialogRef } from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AddStatistiqueComponent } from '../add-statistique/add-statistique.component';

@Component({
  selector: 'app-souspresentation',
  templateUrl: './souspresentation.component.html',
  styleUrls: ['./souspresentation.component.css']
})
export class SouspresentationComponent implements OnInit {
  statistique : Statistique[];
  last:Statistique;
  constructor(public crudApi: StatistiqueService, public toastr: ToastrService,
    private router : Router,public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    
    public dialogRef:MatDialogRef<AddStatistiqueComponent>,) { }
 
  ngOnInit() {
    this.getData();
  }
  
  getData() {
    this.crudApi.getLast().subscribe(
      response =>{this.last = response;}
     );
   
  }
  
  addstatistique()
  {
    this.crudApi.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    //dialogConfig.data="gdddd";
    this.matDialog.open(AddStatistiqueComponent, dialogConfig);
  }
  removeData(id: number) {
    if (window.confirm('Are sure you want to delete this statistique ?')) {
    this.crudApi.deleteData(id)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.success(' data successfully deleted!'); 
          this.getData();
        },
        error => console.log(error));
  }
  }
  selectData(item : Statistique) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    
    this.matDialog.open(AddStatistiqueComponent, dialogConfig);
  }

}
