import { Injectable } from '@angular/core';
import { AppService } from '../../services/app.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormProyectService {

  constructor(private http: HttpClient, private appService: AppService) { }

  registerProject( body: any ): Observable<any> {
    return this.http.post( this.appService.API_URL + 'project/create-one-author', body);
}

registerProjectWithTwoAuthors( body: any ): Observable<any> {
  return this.http.post( this.appService.API_URL + 'project/create-two-authors', body);
}

chargeDataFormProject(idAutor: string): Observable<any> {
  return this.http.post(this.appService.API_URL + 'project/get-project-info', {author_id: idAutor});
}
uploadProjectImage(body: any): Observable<any> {
  return this.http.post(this.appService.API_URL + 'project/upload-image', body, {
    reportProgress: true,
    observe: 'events'
  });
}
uploadAdviserImgIne(body: any): Observable<any> {
  return this.http.post(this.appService.API_URL + 'assessor/upload-image', body, {
    reportProgress: true,
    observe: 'events'
  });
}

}
