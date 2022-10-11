import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      token: new FormControl('', Validators.required),
    });
  }

  public onSubmit() {
    // this.authenticationService.login(
    //   this.loginForm.get('username')!.value,
    //   this.loginForm!.get('password')!.value
    // );
  }

}
