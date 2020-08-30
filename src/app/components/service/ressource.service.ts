import { Injectable } from '@angular/core';
import { HttpClient , HttpRequest, HttpEvent} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ressource} from '../model/ressource'
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RessourceService {

  host :string = "http://localhost:8085";
  
  choixmenu : string  = 'A';
  listData : Ressource[];
  data : Ressource;
  public dataForm:  FormGroup; 
  constructor(private http: HttpClient) { }
 
  

  getData(id: number): Observable<Ressource> {
    return this.http.get<Ressource>(`http://localhost:8085/api/ressources/${id}`);
  }
 
  getRessource(cv:String ): Observable<Ressource> {
    return this.http.get<Ressource>(`http://localhost:8085/api/ressources/${cv}`);
  }
  createData(formData: FormData): Observable<any> {
    return this.http.post('http://localhost:8085/api/ressources', formData);
  }
  
  updatedata(id: number, value: any): Observable<Object> {
    return this.http.put(`http://localhost:8085/api/ressources/${id}`, value);
  }
 
  deleteData(id: number): Observable<any> {
   
    return this.http.delete(`http://localhost:8085/api/ressources/${id}`, { responseType: 'text' });
  }

  getAll(): Observable<any> {
   
    return this.http.get('http://localhost:8085/api/ressources');
  }

  getRessourceCoach(): Observable<any> {
   
    return this.http.get('http://localhost:8085/api/ressourcecoach');
  }

  getRessourceCtp(): Observable<any> {
   
    return this.http.get('http://localhost:8085/api/ressourcectp');
  }

  getRessourceManager(): Observable<any> {
   
    return this.http.get('http://localhost:8085/api/ressourcemanager');
  }

  uploadFile(file1: File,file2: File): Observable<HttpEvent<{}>> {
		const formdata: FormData = new FormData();
        formdata.append('file1', file1);
        formdata.append('file2', file2);
		const req = new HttpRequest('POST', '<Server URL of the file upload>', formdata, {
			  reportProgress: true,
			  responseType: 'text'
		});
	
		return this.http.request(req);
   }
}
