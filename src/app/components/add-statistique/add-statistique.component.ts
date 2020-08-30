import { Component, OnInit ,Inject} from '@angular/core';
import { StatistiqueService} from '../service/statistique.service'
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { Router } from '@angular/router';
import { Statistique} from '../model/statistique';

@Component({
  selector: 'app-add-statistique',
  templateUrl: './add-statistique.component.html',
  styleUrls: ['./add-statistique.component.css']
})
export class AddStatistiqueComponent implements OnInit {
  constructor(public crudApi: StatistiqueService ,public fb: FormBuilder,public toastr: ToastrService,
    private router : Router) { }
    minDate = new Date(2014, 0, 3);
  ngOnInit() {
  
    if (this.crudApi.choixmenu == "A")
    {this.infoForm()};
   }

 
  infoForm() {
    this.crudApi.dataForm = this.fb.group({ 
      dateStatistique: ['', [Validators.required]],
      nbFormer: ['', [Validators.required]],
      nbEmbaucher: ['', [Validators.required]],
      nbCertifier: ['', [Validators.required]],
       
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
