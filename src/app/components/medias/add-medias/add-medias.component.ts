import { Component, OnInit,Inject } from '@angular/core';
import { MediasService} from '../../service/medias.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { Medias} from '../../model/medias';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-add-medias',
  templateUrl: './add-medias.component.html',
  styleUrls: ['./add-medias.component.css']
})
export class AddMediasComponent implements OnInit {
  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: String;
  wcode : string = '';
  userFile ;
  imgURL: any;
  public message: string;
  constructor(public crudApi: MediasService ,public fb: FormBuilder,public toastr: ToastrService, private router : Router , private route: ActivatedRoute ,@Inject(MAT_DIALOG_DATA)  public data,
  public dialogRef:MatDialogRef<AddMediasComponent>) { }

  get f() { return this.crudApi.dataForm.controls; }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Medias';
      this.crudApi.getData(+id).subscribe(
        res => {
          this.crudApi.dataForm.patchValue({
            type: res.type,
            titre: res.titre,
            id: res.id
          });
          this.imagePath = res.image;
        }
      );
    } else {
      this.pageTitle = 'Create Medias';
    }
   this.infoForm();
    
  }
  infoForm() {
    this.crudApi.dataForm = this.fb.group({
      id: [''],
      type: ['', [Validators.required]],
        titre: ['', [Validators.required]],
        image: ['']
      });
    }
    ResetForm() {
      this.crudApi.dataForm.reset();
  }
  onSubmit() {
    const formData = new  FormData();
  const medias = this.crudApi.dataForm.value;
  formData.append('medias',JSON.stringify(medias));
  formData.append('file',this.userFile);

    const id = this.crudApi.dataForm.get('id').value;

    if (id) {
      this.crudApi.updatedata(+id,medias).subscribe( data => {
        this.toastr.success( 'Validation Faite avec Success');
        this.router.navigate(['/admin/lmedias']); 
      });
    } else {
      this.crudApi.createData(formData).subscribe( data => {
        this.toastr.success( 'Validation Faite avec Success');
        this.router.navigate(['/admin/lmedias']); 
      });
    }
    
  }
  
  


  onSelectFile(event) {
    if (event.target.files.length > 0)
    {
      const file = event.target.files[0];
      this.userFile = file;
     const nomfile = event.target.files[0].name
      this.crudApi.dataForm.get('image').setValue(nomfile);
    
 
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    
    this.imagePath = file;
    reader.readAsDataURL(file); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }
}



}