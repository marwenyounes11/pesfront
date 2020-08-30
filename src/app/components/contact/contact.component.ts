import { Component, OnInit ,Inject} from '@angular/core';
import { ContactService} from '../service/contact.service'
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  constructor(public crudApi: ContactService ,public fb: FormBuilder,public toastr: ToastrService,
    private router : Router) { }

  ngOnInit() {
  
    if (this.crudApi.choixmenu == "A")
    {this.infoForm()};
   }

 
  infoForm() {
    this.crudApi.dataForm = this.fb.group({
       
        nom: ['', [Validators.required]],
        prenom: ['', [Validators.required]],
        email: ['',[Validators.required, Validators.pattern(/[^@]+@[^\.]+\..+/)]],
        sujet: ['', [Validators.required]],
        message: ['', [Validators.required]],
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
  
   

addData() {
  this.crudApi.createData(this.crudApi.dataForm.value).
  subscribe( data => {
    this.toastr.success( 'Validation Faite avec Success'); 
    this.router.navigate(['/contact']);
  });
}
  updateData()
  {
  
    this.crudApi.updatedata(this.crudApi.dataForm.value.id,this.crudApi.dataForm.value).
    subscribe( data => {
      this.toastr.success( 'Modification Faite avec Success');
     this.ResetForm();
      this.router.navigate(['/contact']);
    });
  }
    

}
