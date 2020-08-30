import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Statistique} from '../model/statistique';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class StatistiqueService {

  
  private baseUrl = '/api/statistiques';
 

 
  choixmenu : string  = 'A';
  listData : Statistique[];
  public dataForm:  FormGroup; 
  constructor(private http: HttpClient,private datePipe: DatePipe) { }
  
 
  getData(id: number): Observable<Object> {
    return this.http.get(`http://localhost:8085/api/statistiques/${id}`);
  }
 
  createData(info: Object): Observable<Object> {
    return this.http.post('http://localhost:8085/api/statistiques', info);
  }
  
  updatedata(id: number, value: any): Observable<Object> {
    return this.http.put(`http://localhost:8085/api/statistiques/${id}`, value);
  }
 
  deleteData(id: number): Observable<any> {
   
    return this.http.delete(`http://localhost:8085/api/statistiques/${id}`, { responseType: 'text' });
  }

  getAll(): Observable<any> {
   
    return this.http.get('http://localhost:8085/api/statistiques');
  }

  getLast(): Observable<any> {
   
    return this.http.get('http://localhost:8085/api/statistiques/lastdate');
  }
  
}
