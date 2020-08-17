import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  user: {};
  otpValid: {};
  constructor(private router: Router, private service: DataService) { }

  ngOnInit() {
    this.user = {
      "city": "ppppppapa",
      "panNumber": "llllaoala2222",
      "fullname": "PPPPOAA",
      "email": "llllll@mamaa.com",
      "mobile": "111111222"
    }

    this.otpValid = {
      "mobile": "this.user.mobile",
      "otp": "2222"
    }

  }

  responseObj = {
    status: "",
  };
  flag: boolean;

  onSignup() {
    if (this.validateUser() == false) {
      alert("Name is required.");
    } else if (this.ValidatePAN() == false) {
      alert('PAN is required');
    } else if (this.validateEmail() == false) {
      alert('Email is required.');
    } else if (this.validateMobile() == false) {
      alert('Mobile is required');
    } else if (this.validateCity() == false) {
      alert("City is required.");
    } else
      if (this.validateForm()) {
        let observableResult = this.service.insertUserDetails(this.user);
        observableResult.subscribe((result: any) => {
          console.log(result);
          this.responseObj = result;
          this.flag = this.responseObj.status == "Success" ? true : false;
          // console.log(this.flag);
          this.flag ? this.getModal() : alert("Invalid form");
        }, error => {
          alert("error" + error);
        });
      }
  }

  ValidatePAN() {
    var panNumber = document.getElementById("panNumber");
    var errorPAN = document.getElementById("errorPAN")
    var regex = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
    if (regex.test(panNumber["value"].toUpperCase())) {
      errorPAN.style.visibility = "hidden";
      return true;
    } else {
      errorPAN.style.visibility = "visible";
      return false;
    }
  }

  validateForm() {
    //console.log(this.ValidatePAN());
    return this.ValidatePAN() && this.validateUser() && this.validateEmail() && this.validateMobile() && this.validateCity();

  }
  validateEmail() {
    let email = this.user["email"];
    let regex: RegExp = /^\w{2,}@\w{2,}\.\w{2,4}$/;
    return regex.test(email) ? true : false;
  }
  validateMobile() {
    let mobile = this.user["mobile"];
    let regex: RegExp = /^[7-9][0-9]{9}$/;
    return regex.test(mobile) ? true : false;
  }
  validateCity() {
    if (this.user["city"] !== "") {
      return true;
    } return false;
  }

  validateUser() {
    if (this.user["fullname"] !== ""
      && this.user["fullname"].length < 140) {
      return true;
    } return false;
  }

  getModal() {
    console.log("validate pan " + this.ValidatePAN());

    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal 


    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.addEventListener("click", (e) => {
      modal.style.display = "none";
    })

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }

  otpValidate() {
    // var btn = document.getElementById('Resend-btn');
    // setTimeout(function(){
    //   btn.
    // },2000)
    let observableResult = this.service.insertOtpDetails(this.otpValid);
    console.log(observableResult);
    observableResult.subscribe((result: any) => {
      console.log(result);
      this.responseObj = result;
      this.flag = this.responseObj.status == "Success" ? true : false;
      //this.flag ? alert(`Thank you for verification xxxx . xxxx is fullname filled by user in form`) : alert("Invalid OTP");

    }, error => {
      alert("error" + error);
    });
    if (this.flag == true) {
      alert(`Thank you for verification ${this.user}. ${this.user} is fullname filled by user in form`)
      // Get the modal
      var modal = document.getElementById("myModal");
      modal.style.display = "none";
    }
    window.location.reload();
  }

}
