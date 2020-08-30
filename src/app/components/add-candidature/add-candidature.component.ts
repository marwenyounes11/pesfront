import { Component, OnInit,Inject } from '@angular/core';
import { CandidatureService} from '../service/candidature.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { Router } from '@angular/router';
import { Candidature} from '../model/candidature';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { OffreService} from '../service/offre.service';
import { Offre} from '../model/offre';
@Component({
  selector: 'app-add-candidature',
  templateUrl: './add-candidature.component.html',
  styleUrls: ['./add-candidature.component.css']
})
export class AddCandidatureComponent implements OnInit {
  wcode : string = '';
  userFile1 ;
  userFile2 ;
  public imagePath1;
  public imagePath2;
  listOffre:Offre[];
  imgURL1: any;
  imgURL2: any;
  public message: string;
  constructor(public crudApi: CandidatureService,public offreApi: OffreService ,public fb: FormBuilder,public toastr: ToastrService, private router : Router ,@Inject(MAT_DIALOG_DATA)  public data,
  public dialogRef:MatDialogRef<AddCandidatureComponent>) { }
  get f() { return this.crudApi.dataForm.controls; }
  ngOnInit(): void {
    this. getData();
    if (this.crudApi.choixmenu == "A")
    {this.infoForm()};
    
  }
  getData() {
    this.offreApi.getAll().subscribe(
      response =>{this.listOffre = response;}
     );
   
  }
  infoForm() {
    this.crudApi.dataForm = this.fb.group({
      
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      telephone: ['', [Validators.required, Validators.pattern(this.getPhoneRegex())]],
      email: ['',[Validators.required, Validators.pattern(/[^@]+@[^\.]+\..+/)]],
      type: ['', [Validators.required]],
      idOffre: ['', Validators.required]
      });
    }
    ResetForm() {
      this.crudApi.dataForm.reset();
  }
  onSubmit() {
    if (this.crudApi.choixmenu == "A")
    {
      this.addData();
    }
    else
    {
    this.updateData()
    }   
}

getPhoneRegex() {
  
    return /^\+216\d{2}\d{3}\d{3}$/;
  
}
addData() {
  const formData = new  FormData();
  const candidature = this.crudApi.dataForm.value;
  formData.append('candidature',JSON.stringify(candidature));
  formData.append('file1',this.userFile1);
  formData.append('file2',this.userFile2);
  this.crudApi.createData(formData).subscribe( data => {
    this.toastr.success( 'Validation Faite avec Success');
    this.userFile1="";
    this.userFile2="";
    formData.delete('file1');
    formData.delete('file2');
    this.crudApi.dataForm.reset();
    this.router.navigate(['/candidature/response']); 
    
  });
}
  updateData()
  {
    this.crudApi.updatedata(this.crudApi.dataForm.value.id,this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
      this.router.navigate(['/lcandidature']); 
      
    });
  }

  onSelectFile1(event) {
    if (event.target.files.length > 0)
    {
      const file1 = event.target.files[0];
     
      this.userFile1 = file1;
      
    
 
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
