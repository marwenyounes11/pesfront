import { Injectable } from '@angular/core';
import { HttpClient , HttpRequest, HttpEvent} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medias} from '../model/medias'
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MediasService {
  host :string = "http://localhost:8085";
  choixmenu : string  = 'A';
  listData : Medias[];
 evenement : Medias[];
  atelier : Medias[];
  press : Medias[];
  public dataForm:  FormGroup; 
  constructor(private http: HttpClient) { }
 
  

  getData(id: number): Observable<Medias> {
    return this.http.get<Medias>(`http://localhost:8085/api/medias/${id}`);
  }
 
  createData(formData: FormData): Observable<any> {
    return this.http.post('http://localhost:8085/api/medias', formData);
  }
  
  updatedata(id: number, value: any): Observable<Object> {
    return this.http.put(`http://localhost:8085/api/medias/${id}`, value);
  }
 
  deleteData(id: number): Observable<any> {
   
    return this.http.delete(`http://localhost:8085/api/medias/${id}`, { responseType: 'text' });
  }
  
  getMediasCoach(): Observable<any> {
   
    return this.http.get('http://localhost:8085/api/mediascoach');
  }

  getMediasCtp(): Observable<any> {
   
    return this.http.get('http://localhost:8085/api/mediasctp');
  }
  getMediasEvenement(): Observable<any> {
   
    return this.http.get('http://localhost:8085/api/mediasevenement');
  }
  getMediasAtelier(): Observable<any> {
   
    return this.http.get('http://localhost:8085/api/mediasatelier');
  }
  getMediasPress(): Observable<any> {
   
    return this.http.get('http://localhost:8085/api/mediaspress');
  }
  getAll(): Observable<any> {
   
    return this.http.get('http://localhost:8085/api/medias');
  }

 

 
  uploadFile(file1: File): Observable<HttpEvent<{}>> {
		const formdata: FormData = new FormData();
        formdata.append('file1', file1);
		const req = new HttpRequest('POST', '<Server URL of the file upload>', formdata, {
			  reportProgress: true,
			  responseType: 'text'
		});
	
		return this.http.request(req);
   }
}
