import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private http: HttpClient) {}

  public upload(data: FormData): Observable<any> {
    return this.http.post(`${this.getApi()}/upload`, data);
  }

  private getApi(): string {
    return `${environment.server}/file`;
  }
}
