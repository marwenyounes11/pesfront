import { Component, OnInit ,Inject} from '@angular/core';
import { InscrireService} from '../service/inscrire.service'
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { Router } from '@angular/router';
import { Inscrire} from '../model/inscrire';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatDialogRef } from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
@Component({
  selector: 'app-inscrire',
  templateUrl: './inscrire.component.html',
  styleUrls: ['./inscrire.component.css']
})

export class InscrireComponent implements OnInit {
  constructor(public crudApi: InscrireService ,public fb: FormBuilder,public toastr: ToastrService,
    private router : Router ,  private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    
    public dialogRef:MatDialogRef<InscrireComponent>,) { }
    
  ngOnInit() {
  
    if (this.crudApi.choixmenu == "A")
    {this.infoForm()};
   }

 
  infoForm() {
    this.crudApi.dataForm = this.fb.group({ 
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]   
        });
    }
   ;
    
  

  ResetForm() {
      this.crudApi.dataForm.reset();
  }
  onSubmit() {
    if (this.crudApi.choixmenu == "A")
    {
      this.addData();
    }
    
   
}
  
   

addData() {
  this.crudApi.createData(this.crudApi.dataForm.value).
  subscribe( data => {
    this.toastr.success( 'inscription Faite avec Success'); 
    this.router.navigate(['/contact']);
  });
}
  
}
