import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin} from '../model/admin';
import { DatePipe } from '@angular/common';


import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  
  
  private baseUrl = '/api/users';
  private baseUrl1 = 'http://localhost:8085/api/users/5';

  islogin = false;
  admin = false;
  suser = false;
  choixmenu : string  = 'A';
  listData : Admin[];
  public dataForm:  FormGroup; 
  constructor(private http: HttpClient,private datePipe: DatePipe) { }
  login(login: String): Observable<Object> {
    
    return this.http.get(`${this.baseUrl1}/${login}`);
  }  
 
  getData(id: number): Observable<Object> {
    return this.http.get(`http://localhost:8085/api/users/${id}`);
  }
 
  createData(info: Object): Observable<Object> {
    return this.http.post('http://localhost:8085/api/users', info);
  }
  
  updatedata(id: number, value: any): Observable<Object> {
    return this.http.put(`http://localhost:8085/api/users/${id}`, value);
  }
 
  deleteData(id: number): Observable<any> {
   
    return this.http.delete(`http://localhost:8085/api/users/${id}`, { responseType: 'text' });
  }

  getAll(): Observable<any> {
   
    return this.http.get('http://localhost:8085/api/users');
  }
  transformDate(date){
    return this.datePipe.transform(date, 'dd-MM-yyyy');
  }
}
