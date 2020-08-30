import { Injectable } from '@angular/core';
import { HttpClient , HttpRequest, HttpEvent} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inscrire} from '../model/inscrire'
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class InscrireService {

  choixmenu : string  = 'A';
  listData : Inscrire[];
  public dataForm:  FormGroup; 
  constructor(private http: HttpClient) { }
 
 
  createData(info: Object): Observable<Object> {
    return this.http.post('http://localhost:8085/api/inscription', info);
  }
  
 
}
