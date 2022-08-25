
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';


@Injectable()
export class ApiService {
  public constructor(private http: HttpClient) {}

  public testGet(){
    return this.http.get('/data').pipe(tap((d)=>{console.log(d)}));
  }

  public testPost(){
    return this.http.post('/data', {data: 'some data'}).pipe(tap((d)=>{console.log(d)}));
  }
}
