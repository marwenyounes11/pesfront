import { Component ,ViewChild ,OnInit ,Inject} from '@angular/core';
import {SlickCarouselComponent} from 'ngx-slick-carousel';
import {
  state,
  style,
  transition,
  animate,
  trigger
} from "@angular/animations";
import { RessourceService} from '../service/ressource.service';
import { ToastrService } from 'ngx-toastr';
import { Ressource} from '../model/ressource';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';

import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { AddRessourceComponent } from '../add-ressource/add-ressource.component';

@Component({
  selector: 'app-ressources',
  templateUrl: './ressources.component.html',
  styleUrls: ['./ressources.component.css']
})
export class RessourcesComponent implements OnInit {

 
 
  show:boolean = true;
  ressource : Ressource;
  dernier:Boolean =false;
  control: FormControl = new FormControl('');
  constructor(public crudApi: RessourceService, public toastr: ToastrService,
    private router : Router,public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<AddRessourceComponent>,) { }
 
  ngOnInit() {
    this.getData();
  }
  addressource()
  {
    this.crudApi.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width="50%";
    
    this.matDialog.open(AddRessourceComponent, dialogConfig);
  }
 
  

  
  getData() {
    this.crudApi.getAll().subscribe(
      response =>{this.crudApi.listData = response;}
     );
   
  }

  
  
 
  removeData(id: number) {
    if (window.confirm('Are sure you want to delete this Ressource ?')) {
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
  selectData(item : Ressource) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
  }

 

}
