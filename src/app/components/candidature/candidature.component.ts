import { Component, OnInit ,Inject} from '@angular/core';
import { CandidatureService} from '../service/candidature.service';
import { ToastrService } from 'ngx-toastr';
import { Candidature} from '../model/candidature';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';

import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { AddCandidatureComponent } from '../add-candidature/add-candidature.component'
@Component({
  selector: 'app-candidature',
  templateUrl: './candidature.component.html',
  styleUrls: ['./candidature.component.css']
})
export class CandidatureComponent implements OnInit {
  candidature : Candidature;
  control: FormControl = new FormControl('');
  constructor(public crudApi: CandidatureService, public toastr: ToastrService,
    private router : Router,public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<AddCandidatureComponent>,) { }
 
  ngOnInit() {
    
    this.getData();
  }
  addcandidature()
  {
    this.crudApi.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width="50%";
    
    this.matDialog.open(AddCandidatureComponent, dialogConfig);
  }
 
  

  
  getData() {
    this.crudApi.getAll().subscribe(
      response =>{this.crudApi.listData = response;}
     );
   
  }
  
 
  removeData(id: number) {
    if (window.confirm('Are sure you want to delete this Candidature ?')) {
    this.crudApi.deleteData(id)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.warning(' data successfully deleted!'); 
          this.getData();
        },
        error => console.log(error));
  }
  }
  selectData(item : Candidature) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width="50%";
    
    this.matDialog.open(AddCandidatureComponent, dialogConfig);
  }

}
