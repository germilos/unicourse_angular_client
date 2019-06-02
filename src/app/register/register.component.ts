import { Component, OnInit } from '@angular/core';
import { SignUpDto } from '../shared/entity/sign-up-dto';
import { AuthService } from '../shared/security/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  signupInfo: SignUpDto;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) { }

  ngOnInit() { }

  onSubmit(form: NgForm) {
    console.log(form.value);

    // this.signupInfo = new SignUpDto(
    //   this.form.name,
    //   this.form.username,
    //   this.form.email,
    //   this.form.password);
      console.log("DTO: ", form.value);

    this.authService.signUp(form.value).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
