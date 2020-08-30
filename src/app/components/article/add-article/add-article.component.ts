import { Component, OnInit,Inject } from '@angular/core';
import { ArticleService} from '../../service/article.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Article} from '../../model/article';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {
  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: String;
  wcode : string = '';
  userFile ;
  imgURL: any;
  public message: string;
  constructor(public crudApi: ArticleService ,public fb: FormBuilder,public toastr: ToastrService, private router : Router , private route: ActivatedRoute ,@Inject(MAT_DIALOG_DATA)  public data,
  public dialogRef:MatDialogRef<AddArticleComponent>) { }
  get f() { return this.crudApi.dataForm.controls; }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Article';
      this.crudApi.getData(+id).subscribe(
        res => {
          this.crudApi.dataForm.patchValue({
            titre: res.titre,
           auteur: res.auteur,
            date: res.date,
            corps: res.corps,
            id: res.id
          });
          this.imagePath = res.image;
        }
      );
    } else {
      this.pageTitle = 'Create Article';
    }
   this.infoForm();
    
  }
  infoForm() {
    this.crudApi.dataForm = this.fb.group({
      id: [''],
        titre: ['', [Validators.required]],
        auteur: ['', [Validators.required]],
        date: ['', [Validators.required]],
        corps: ['', [Validators.required]],
        image: ['']
      });
    }
    ResetForm() {
      this.crudApi.dataForm.reset();
  }
  onSubmit() {
    const formData = new  FormData();
  const article = this.crudApi.dataForm.value;
  formData.append('article',JSON.stringify(article));
  formData.append('file',this.userFile);

    const id = this.crudApi.dataForm.get('id').value;

    if (id) {
      this.crudApi.updatedata(+id,article).subscribe( data => {
        this.toastr.success( 'Validation Faite avec Success');
        this.router.navigate(['/admin/larticle']); 
      });
    } else {
      this.crudApi.createData(formData).subscribe( data => {
        this.toastr.success( 'Validation Faite avec Success');
        this.router.navigate(['/admin/larticle']); 
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