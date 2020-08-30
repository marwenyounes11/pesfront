import { Injectable } from '@angular/core';
import { HttpClient , HttpRequest, HttpEvent} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact} from '../model/contact'
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
   
    choixmenu : string  = 'A';
    public dataForm:  FormGroup; 
    constructor(private http: HttpClient) { }
   
   
    getData(id: number): Observable<Object> {
      return this.http.get(`http://localhost:8085/api/contacts/${id}`);
    }
   
    createData(info: Object): Observable<Object> {
      return this.http.post('http://localhost:8085/api/contacts', info);
    }
    
    updatedata(id: number, value: any): Observable<Object> {
      return this.http.put(`http://localhost:8085/api/contacts/${id}`, value);
    }
   
    deleteData(id: number): Observable<any> {
     
      return this.http.delete(`http://localhost:8085/api/contacts/${id}`, { responseType: 'text' });
    }
  
    getAll(): Observable<any> {
    
      return this.http.get('http://localhost:8085/api/contacts');
    }


 
}