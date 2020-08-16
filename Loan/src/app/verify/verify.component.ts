import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  user: any;
  constructor(private router: Router, private service: DataService) { }

  ngOnInit() {
    this.user = {
      "city": "Jodhpur",
      "panNumber": "ARYAN8384A",
      "fullname": "ARYAN JAIN",
      "email": "aryanjain1997@gmail.com",
      "mobile": "8384936821"
    }
  }

  onSignup() {
    console.log("onSignup() method called!!!")
    let observableResult = this.service.insertUserDetails(this.user);
    observableResult.subscribe((result: any) => {
      console.log(result);
    });
  }

}
