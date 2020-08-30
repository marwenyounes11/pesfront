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
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {

  
  constructor(public crudApi: MediasService, public toastr: ToastrService,
    private router : Router,public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<AddMediasComponent>,) { }
 
  ngOnInit() {
    
     
     
   
    
  }
 

}