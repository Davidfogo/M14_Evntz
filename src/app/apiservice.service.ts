import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(
    public http: HttpClient
  ) { }

  apiLogin(data){
    return this.http.post('http://localhost:90/events/login', data);
  }

  apiRegistre(data){
    return this.http.post('http://localhost:90/events/users', data);
  }

  apiAgregarEvento(data, headers){
    return this.http.post('http://localhost:90/events/events', data, headers);
  }
  
  apiGetEvents(){
    return this.http.get('http://localhost:90/events/events');
  }

}
