import { Component, OnInit } from '@angular/core';
import { AdminService} from '../../components/service/admin.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  name  = '';
  annee = 0;
  constructor(public userService : AdminService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem('name');
    this.annee = parseInt(localStorage.getItem('annee'));

  }
  public logout() {
    localStorage.removeItem('name');
    location.reload();
  }

}
