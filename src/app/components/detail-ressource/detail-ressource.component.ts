import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RessourceService} from '../service/ressource.service';
import { ToastrService } from 'ngx-toastr';
import { Ressource} from '../model/ressource';

@Component({
  selector: 'app-detail-ressource',
  templateUrl: './detail-ressource.component.html',
  styleUrls: ['./detail-ressource.component.css']
})
export class DetailRessourceComponent implements OnInit {

  host :string = "http://localhost:8085";
  errorMessage = '';
  ressource: Ressource ;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private crudApi: RessourceService) {
  }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getRessource(id);
    }
  }
 
  getRessource(id: number) {
    this.crudApi.getData(id).subscribe(
      response =>{this.ressource = response;},
      error => this.errorMessage = <any>error);
  }

  onBack(): void {
    this.router.navigate(['/base/detailressource']);
  }


}
