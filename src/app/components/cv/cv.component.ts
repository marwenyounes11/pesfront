import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RessourceService} from '../service/ressource.service';
import { ToastrService } from 'ngx-toastr';
import { Ressource} from '../model/ressource';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CvComponent implements OnInit {
  host :string = "http://localhost:8085";
  errorMessage = '';
  ressource: Ressource ;
  pdfSrc:string;
  pdf:any;

objectURL:any;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private crudApi: RessourceService,
    private dom:DomSanitizer) {
      

  }
 
  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getRessource(id);
     this.pdfSrc='http://localhost:8085/api/Cvressources/'+id;
     
     
    }
    
  }
 // getSafeUrl() {
  //  return this.dom.bypassSecurityTrustResourceUrl(this.url);     
//}
  getRessource(id: number) {
    this.crudApi.getData(id).subscribe(
      response =>{this.ressource = response;},
      error => this.errorMessage = <any>error);
  }
  
  onBack(): void {
    this.router.navigate(['/base/detailressource']);
  }

}
