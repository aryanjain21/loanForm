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

  msg = "";
  user: {};
  otpValid: {};
  constructor(private router: Router, private service: DataService) { }

  ngOnInit() {
    this.resendCounter = 0;

    this.user = {
      "city": "abc",
      "panNumber": "ARYAN8384R",
      "fullname": "Siddhesh",
      "email": "sid@gmail.com",
      "mobile": "9829983849"
    };

    this.otpValid = {
      "mobile": this.user['mobile'],
      "otp": ""
    }

  }

  responseObj = {
    status: "",
  };
  flag: boolean;

  onSignup() {
    //console.log(this.user);
    if (this.validateForm()) {
      let observableResult = this.service.insertUserDetails(this.user);
      observableResult.subscribe((result: any) => {
        console.log(result);
        this.responseObj = result;
        this.flag = this.responseObj.status == "Success" ? true : false;
        // 
        // let otpdiv = document.getElementById("otpDiv");
        // otpdiv.hidden = !this.flag;
        console.log(this.flag);
        this.flag ? this.getModal() : alert("Invalid form");
      }, error => {
        alert("error" + error);
      });
    }
    else {
      if (this.validateUser() == false) {
        this.msg = "Name is required";
      }
      if (this.ValidatePAN() == false) {
        this.msg = "PAN is required";
      }
      if (this.validateEmail() == false) {
        this.msg = "Email is required";
      }
      if (this.validateCity() == false) {
        this.msg = "City is required";
      }
      if (this.validateMobile() == false) {
        this.msg = "Mobile is required";
      }
    }
  }

  ValidatePAN() {
    let panNumber = document.getElementById("panNumber");
    // let errorPAN = document.getElementById("errorPAN")
    let regex = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
    if (regex.test(panNumber["value"].toUpperCase())) {
      // errorPAN.style.visibility = "hidden";
      return true;
    } else {
      // errorPAN.style.visibility = "visible";
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
    //this.onSignup()
    return regex.test(mobile) ? true : false;
  }
  validateOtp() {
    let op = this.otpValid["otp"];
    console.log(op);
    let regex: RegExp = /([0-9]){4}/;
    console.log(regex.test(op));
    return regex.test(op) ? true : false;
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
    //console.log("validate pan " + this.ValidatePAN());

    // Get the modal
    let modal = document.getElementById("myModal");

    // Get the button that opens the modal
    let btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    let span = document.getElementsByClassName("close")[0];

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

  resendCounter: number;

  resendOtp() {
    let resendBtn = document.getElementById("Resend-btn");
    resendBtn.setAttribute("disabled", "true");
    ++this.resendCounter;

    if (this.resendCounter < 3) {
      this.onSignup();
      setTimeout(() => {
        resendBtn.removeAttribute("disabled");
        console.log(this.resendCounter);
      }, 180000)
    }
    else if (this.resendCounter === 3) {
      alert("Please try again after an hour.");
      this.onSignup();
      resendBtn.setAttribute("disabled", "true");
    }

  }

  responseOtp = {
    status: "",
  }
  flag2: boolean;

  getOtp() {
    console.log(this.user['mobile']);
    console.log(this.otpValid)
    if (this.validateOtp() == true) {
      let observableResult = this.service.insertOtpDetails(this.otpValid);
      console.log(observableResult);
      observableResult.subscribe((result: any) => {
        console.log(result);
        this.responseOtp = result;
        this.flag2 = this.responseOtp.status == "Success" ? true : false;
        //this.flag ? alert(`Thank you for verification xxxx . xxxx is fullname filled by user in form`) : alert("Invalid OTP");
        if (this.flag2 == true) {
          alert(`Thank you for verification ${this.user["mobile"]}. ${this.user["fullname"]} is fullname filled by user in form`)
          // Get the modal
          let modal = document.getElementById("myModal");
          modal.style.display = "none";
        }
      }, error => {
        alert("error" + error);
      });
    } else {
      alert("Invalid OTP");
    }
    this.router.navigate(['/verify'])
  }

}
