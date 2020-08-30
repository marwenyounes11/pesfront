import { Component, OnInit ,Inject} from '@angular/core';
import { MediasService} from '../service/medias.service';
import { ToastrService } from 'ngx-toastr';
import { Medias} from '../model/medias';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';

import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { AddMediasComponent } from '../medias/add-medias/add-medias.component';


@Component({
  selector: 'app-press',
  templateUrl: './press.component.html',
  styleUrls: ['./press.component.css']
})
export class PressComponent implements OnInit {

  medias : Medias;
  dernier:Boolean =false;
  control: FormControl = new FormControl('');
  constructor(public crudApi: MediasService, public toastr: ToastrService,
    private router : Router,public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<AddMediasComponent>,) { }
 
  ngOnInit() {
    
     
      this.getData();
      this.getPress();
   
    
  }
  addmedias()
  {
    this.crudApi.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    
    this.matDialog.open(AddMediasComponent, dialogConfig);
  }
 
  

  
  getData() {
    this.crudApi.getAll().subscribe(
      response =>{this.crudApi.listData = response;}
     );
   
  }

 
  getEvenement() {
    this.crudApi.getMediasEvenement().subscribe(
      response =>{this.crudApi.evenement = response;}
     );
   
  }
  getAtelier() {
    this.crudApi.getMediasAtelier().subscribe(
      response =>{this.crudApi.atelier = response;}
     );
   
  }
  getPress() {
    this.crudApi.getMediasPress().subscribe(
      response =>{this.crudApi.press = response;}
     );
   
  }
 
  removeData(id: number) {
    if (window.confirm('Are sure you want to delete this Medias ?')) {
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
  selectData(item : Medias) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    
    this.matDialog.open(AddMediasComponent, dialogConfig);
  }

}
