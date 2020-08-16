import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private router: Router, private http: HttpClient) {
    console.log('in dataService');
  }

  insertUserDetails(user) {
    return this.http.post('http://lab.thinkoverit.com/api/getOTP.php', user);
  }
}
