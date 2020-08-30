import { Component, OnInit ,Inject} from '@angular/core';
import { OffreService} from '../service/offre.service'
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { Router } from '@angular/router';
import { Offre} from '../model/offre';
@Component({
  selector: 'app-add-offre',
  templateUrl: './add-offre.component.html',
  styleUrls: ['./add-offre.component.css']
})
export class AddOffreComponent implements OnInit {

  constructor(public crudApi: OffreService ,public fb: FormBuilder,public toastr: ToastrService,
    private router : Router) { }
    minDate = new Date(2014, 0, 3);
  maxDate = new Date(2020,0,1);
  ngOnInit() {
  
    if (this.crudApi.choixmenu == "A")
    {this.infoForm()};
   }

 
  infoForm() {
    this.crudApi.dataForm = this.fb.group({
       
        reference: ['', [Validators.required]],
        nomPoste: ['', [Validators.required]],
        descriptionPoste: ['', [Validators.required]],
        dateEcheance: ['', [Validators.required]],
       
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
    this.router.navigate(['/admin']);
  });
}
  updateData()
  {
  
    this.crudApi.updatedata(this.crudApi.dataForm.value.id,this.crudApi.dataForm.value).
    subscribe( data => {
      this.toastr.success( 'Modification Faite avec Success');

      this.router.navigate(['/admin']);
    });
  }
    

}
