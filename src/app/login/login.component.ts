import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { AuthenticationClient } from '../clients/authentication.client';

type AuthResp = {
  message?: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MatSnackBar, Overlay]
})

export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public badLogin: Boolean | false | undefined;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  login_validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'email', message: 'Enter a valid email' }
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'pattern', message: 'Password must be ANSI characters' }
    ],
    'token': [
      { type: 'required', message: 'Token is required' },
      { type: 'pattern', message: 'Token must be numbers and max length 4' }
    ]
  };

  constructor(private authenticationService: AuthenticationService,
    private authenticationClient: AuthenticationClient,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('c137@onecause.com', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('#th@nH@rm#y#r!$100%D0p#', Validators.required),
      token: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]{1,4}')
      ])
    });
    this.badLogin = false;
  }
  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  async onSubmit() {
    // Could not get async/await working with call to service then to client. Just call client.
    // const authReturn = await this.authenticationService.login(
    //   this.loginForm.get('email')!.value,
    //   this.loginForm!.get('password')!.value,
    //   this.loginForm.get('token')!.value
    //     ).then(value => {
    //   console.log({value});
    //   if(this.badLogin) {
    //     this.openSnackBar();
    //   }
    // });
    this.authenticationClient.login(this.loginForm.get('email')!.value,
      this.loginForm!.get('password')!.value,
      this.loginForm.get('token')!.value
    ).subscribe((response: AuthResp) => {
      if (response.message === "Status OK") {
        // localStorage.setItem(this.tokenKey, token);
        window.location.href = "https://www.onecause.com/";
        // this.router.navigate(['/success']); // Tried to get router to do this
      } else {
        this.openSnackBar('Invalid Credentials, Please Try Again');
      }
    });
  }

  openSnackBar(msg: string) {
    this._snackBar.open(msg, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ["custom-style"]
    });
  }
}
