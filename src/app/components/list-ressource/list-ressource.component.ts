import { Component,Input, OnInit ,Inject} from '@angular/core';
import { RessourceService} from '../service/ressource.service';
import { ToastrService } from 'ngx-toastr';
import { Ressource} from '../model/Ressource';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';

import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { AddRessourceComponent } from '../add-ressource/add-ressource.component';
import {trigger, style, animate, transition,state,group} from '@angular/animations';
@Component({
  selector: 'app-list-ressource',
  templateUrl: './list-ressource.component.html',
  styleUrls: ['./list-ressource.component.css'],
  animations: [
]
})
  
export class ListRessourceComponent implements OnInit {
  _listFilter = '';
 
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredRessource = this.listFilter  ? this.performFilter(this.listFilter) : this.ressources;
  }
 
 
  @Input() pageSize = 1;
  pageOfItems: Array<any>;
  ressources : Ressource[];
  filteredRessource : Ressource[];
  ctp : Ressource[];
  coach: Ressource[];
  manager: Ressource[];
  dernier:Boolean =false;
  control: FormControl = new FormControl('');
  constructor(public crudApi: RessourceService, public toastr: ToastrService,
    private router : Router,public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<AddRessourceComponent>,) { }
    performFilter(filterBy: string): Ressource[] {
      filterBy = filterBy.toLocaleLowerCase();
      return this.ressources.filter((ressource: Ressource) =>
        ressource.nom.toLocaleLowerCase().localeCompare(filterBy) == 0);
    }
  ngOnInit() {
     
      this.getData();
      this.getCoach();
      this.getCtp();
      this.getManager();
   
    
  }
  addmedias()
  {
    this.crudApi.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width="50%";
    
    this.matDialog.open(AddRessourceComponent, dialogConfig);
  }
 
  

  
  getData() {
    this.crudApi.getAll().subscribe(
      response =>{
        this.ressources = response;
        this.filteredRessource = response;
      }
     );
   
  }

  getCoach() {
    this.crudApi.getRessourceCoach().subscribe(
      response =>{this.coach = response;}
     );
   
  }
 
  getCtp() {
    this.crudApi.getRessourceCtp().subscribe(
      response =>{this.ctp = response;}
     );
   
  }

  getManager() {
    this.crudApi.getRessourceManager().subscribe(
      response =>{this.manager = response;}
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
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width="50%";
    
    this.matDialog.open(AddRessourceComponent, dialogConfig);
  }
  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
}

}
