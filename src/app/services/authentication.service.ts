import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationClient } from '../clients/authentication.client';

type AuthResp = {
  message?: string;
}

@Injectable({
  providedIn: 'root',
})

export class AuthenticationService {
  private tokenKey = 'token';

  constructor(
    private authenticationClient: AuthenticationClient,
    private router: Router
  ) {}

  public async login(email: string, password: string, token: number): Promise<any> {
    return await this.authenticationClient.login(email, password, token).subscribe((response: AuthResp) => {
      console.log(response);
      if(response.message === "Status OK") {
      console.log("GOOD LOGIN");
        // localStorage.setItem(this.tokenKey, token);
        document.location.href = "https://www.onecause.com/";
        // this.router.navigate(['/success']);
        return false;
      }
      console.log("BAD LOGIN");
      return response;
    });
    // return false;
  }

  public isLoggedIn(): boolean {
    let token = localStorage.getItem(this.tokenKey);
    return token != null && token.length > 0;
  }

  public getToken(): string | null {
    return this.isLoggedIn() ? localStorage.getItem(this.tokenKey) : null;
  }
}