import { Component ,ViewChild ,OnInit ,Inject} from '@angular/core';
import {SlickCarouselComponent} from 'ngx-slick-carousel';
import {
  state,
  style,
  transition,
  animate,
  trigger
} from "@angular/animations";
import { ArticleService} from '../../service/article.service';
import { ToastrService } from 'ngx-toastr';
import { Article} from '../../model/article';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';

import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { AddArticleComponent } from '../../article/add-article/add-article.component';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  animations: [
    trigger("flyInOut", [
      state("in", style({ transform: "translateX(0)" })),
      transition("void => *", [
        style({ transform: "translateX(-100%)" }),
        animate(100)
      ]),
      transition("* => void", [
        animate(100, style({ transform: "translateX(100%)" }))
      ])
    ])
  ]

})
export class ArticleComponent implements OnInit {
  slideConfig = {"slidesToShow": 3, "slidesToScroll": 1,"nextArrow": "<div class='nav-btn next-slide'></div>",
  "prevArrow": "<div class='nav-btn prev-slide'></div>",
  "dots": true,
  "infinite": false};
  @ViewChild('slickModal')
	slickModal: SlickCarouselComponent;
 
  show:boolean = true;
  article : Article;
  dernier:Boolean =false;
  control: FormControl = new FormControl('');
  constructor(public crudApi: ArticleService, public toastr: ToastrService,
    private router : Router,public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<AddArticleComponent>,) { }
 
  ngOnInit() {
    
      this.getLast();
      this.getData();
   
    
  }
  addarticle()
  {
    this.crudApi.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    
    this.matDialog.open(AddArticleComponent, dialogConfig);
  }
 
  

  
  getData() {
    this.crudApi.getAll().subscribe(
      response =>{this.crudApi.listData = response;}
     );
   
  }

  getLast() {
    this.crudApi.getLast().subscribe(
      response =>{this.crudApi.lastData = response;}
     );
   
  }
  
 
  removeData(id: number) {
    if (window.confirm('Are sure you want to delete this Article ?')) {
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
  selectData(item : Article) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    
    this.matDialog.open(AddArticleComponent, dialogConfig);
  }

  carouselConfig = {
		infinite: true, centerMode: true, variableWidth: true
	};
  slickInit(e) {
    console.log('slick initialized');
  }
  
  breakpoint(e) {
    console.log('breakpoint');
  }
  
  afterChange(e) {
    console.log('afterChange');
  }
  
  beforeChange(e) {
    console.log('beforeChange');
  }

  
  
}
