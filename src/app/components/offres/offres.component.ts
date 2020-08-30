import { Component, OnInit ,Inject} from '@angular/core';
import { Offre } from '../model/offre';
import { OffreService} from '../service/offre.service';
import { ToastrService } from 'ngx-toastr';

import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatDialogRef } from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AddOffreComponent } from '../add-offre/add-offre.component';

@Component({
  selector: 'app-offres',
  templateUrl: './offres.component.html',
  styleUrls: ['./offres.component.css']
})
export class OffresComponent implements OnInit {
  offre : Offre[];
  constructor(public crudApi: OffreService, public toastr: ToastrService,
    private router : Router,public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    
    public dialogRef:MatDialogRef<AddOffreComponent>,) { }
 
  ngOnInit() {
    this.getData();
  }
  
  getData() {
    this.crudApi.getAll().subscribe(
      response =>{this.crudApi.listData = response;}
     );
   
  }
  
  addoffre()
  {
    this.crudApi.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width="20px";
    dialogConfig.height="20px";
    this.matDialog.open(AddOffreComponent, dialogConfig);
  }
  removeData(id: number) {
    if (window.confirm('Are sure you want to delete this Offre ?')) {
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
  selectData(item : Offre) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    
  }


}
