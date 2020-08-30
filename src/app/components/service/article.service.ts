import { Injectable } from '@angular/core';
import { HttpClient , HttpRequest, HttpEvent} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article} from '../model/article'
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  host :string = "http://localhost:8085";
  choixmenu : string  = 'A';
  listData : Article[];
  data:Article;
  lastData : Article[];
  public dataForm:  FormGroup; 
  constructor(private http: HttpClient) { }
 
  

  getData(id: number): Observable<Article> {
    return this.http.get<Article>(`http://localhost:8085/api/articles/${id}`);
  }
 
  createData(formData: FormData): Observable<any> {
    return this.http.post('http://localhost:8085/api/articles', formData);
  }
  
  updatedata(id: number, value: any): Observable<Object> {
    return this.http.put(`http://localhost:8085/api/articles/${id}`, value);
  }
 
  deleteData(id: number): Observable<any> {
   
    return this.http.delete(`http://localhost:8085/api/articles/${id}`, { responseType: 'text' });
  }

  getAll(): Observable<any> {
   
    return this.http.get('http://localhost:8085/api/articles');
  }

  getLast(): Observable<any> {
   
    return this.http.get('http://localhost:8085/api/larticles');
  }

  uploadFile(file: File): Observable<HttpEvent<{}>> {
		const formdata: FormData = new FormData();
		formdata.append('file', file);
		const req = new HttpRequest('POST', '<Server URL of the file upload>', formdata, {
			  reportProgress: true,
			  responseType: 'text'
		});
	
		return this.http.request(req);
   }
}