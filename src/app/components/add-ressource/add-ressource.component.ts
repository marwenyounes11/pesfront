import { Component, OnInit,Inject } from '@angular/core';
import { RessourceService} from '../service/ressource.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { Router ,ActivatedRoute} from '@angular/router';
import { Ressource} from '../model/ressource';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-ressource',
  templateUrl: './add-ressource.component.html',
  styleUrls: ['./add-ressource.component.css']
})
export class AddRessourceComponent implements OnInit {
  pageTitle: string;
  error: string;
  uploadError: string;
  wcode : string = '';
  userFile1 ;
  userFile2 ;
  public imagePath1;
  public imagePath2;
  imgURL1: any;
  imgURL2: any;
  public message: string;
  constructor(public crudApi: RessourceService ,public fb: FormBuilder,public toastr: ToastrService, private router : Router ,private route: ActivatedRoute ,@Inject(MAT_DIALOG_DATA)  public data,
  public dialogRef:MatDialogRef<AddRessourceComponent>) { }
  get f() { return this.crudApi.dataForm.controls; }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Ressource';
      this.crudApi.getData(+id).subscribe(
        res => {
          this.crudApi.dataForm.patchValue({
            nom: res.nom,
           prenom: res.prenom,
            email: res.email,
            telephone: res.telephone,
            description: res.description,
            type: res.type,
            id: res.id
          });
          this.imagePath1 = res.image;
          this.imagePath2 = res.cv;
        }
      );
    } else {
      this.pageTitle = 'Create Ressource';
    }
   this.infoForm();
    
  }
  infoForm() {
    this.crudApi.dataForm = this.fb.group({
        id: [''],
        nom: ['', [Validators.required]],
        prenom: ['', [Validators.required]],
        email: ['', [Validators.required]],
        telephone: ['', [Validators.required]],
        description: ['', [Validators.required]],
        type: ['', [Validators.required]],
        image: [''],
        cv: ['']
      });
    }
    ResetForm() {
      this.crudApi.dataForm.reset();
  }
  onSubmit() {
    const formData = new  FormData();
    const ressource = this.crudApi.dataForm.value;
    formData.append('ressource',JSON.stringify(ressource));
  formData.append('file1',this.userFile1);
  formData.append('file2',this.userFile2);
  
      const id = this.crudApi.dataForm.get('id').value;
  
      if (id) {
        this.crudApi.updatedata(+id,ressource).subscribe( data => {
          this.toastr.success( 'Validation Faite avec Success');
          this.router.navigate(['/admin/lressource']); 
        });
      } else {
        this.crudApi.createData(formData).subscribe( data => {
          this.toastr.success( 'Validation Faite avec Success');
          this.router.navigate(['/admin/lressource']); 
        });
      }
      
    }


  onSelectFile1(event) {
    if (event.target.files.length > 0)
    {
      const file1 = event.target.files[0];
     
      this.userFile1 = file1;
      const nomfile1 = event.target.files[0].name
      this.crudApi.dataForm.get('image').setValue(nomfile1);
    
 
    var mimeType1 = event.target.files[0].type;
    if (mimeType1.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
    
    var reader = new FileReader();
    
    this.imagePath1 = file1;
    reader.readAsDataURL(file1); 
    reader.onload = (_event) => { 
      this.imgURL1 = reader.result; 
    }

    
  }
}


onSelectFile2(event) {
  if (event.target.files.length > 0)
  {
    const file2 = event.target.files[0];
   
    this.userFile2 = file2;
    const nomfile2 = event.target.files[0].name
      this.crudApi.dataForm.get('image').setValue(nomfile2);
  

  var mimeType2 = event.target.files[0].type;
  if (mimeType2.match(/image\/*/) == null) {
    this.message = "Only images are supported.";
    return;
  }
  
  var reader = new FileReader();
  
  this.imagePath2 = file2;
  reader.readAsDataURL(file2); 
  reader.onload = (_event) => { 
    this.imgURL2 = reader.result; 
  }

  
}
}
}
