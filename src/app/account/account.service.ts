import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export class Foo {
    constructor(
      public id: number,
      public name: string) { }
  } 
   
  @Injectable()
  export class AccountService {
    private endpoint: string = "https://api-sandbox.fintecture.com/res/v1/";
    private endpointAis: string = "https://api-sandbox.fintecture.com/ais/v1/";
    private appId: string = "34b74671-a231-44d5-b710-060c8b4afed9";
    private appSecret: string = "aaa3315e-a8f1-46cd-8641-5bebc7014d51";
    private basicToken: string  = btoa(this.appId+':'+this.appSecret);

    constructor(
      private _router: Router, private http: HttpClient, private cookieService: CookieService){}
    
    obtainAccessToken(code: string){
        const httpOptions =  {headers: new HttpHeaders({'Authorization': this.basicToken, 'Accept': 'application/json', 'Content-Type': 'application/x-www-form-urlencoded'})};
        let body = new URLSearchParams();
        body.set('grant_type', 'authorization_code');
        body.set('code', code);
        body.set('scope', 'AIS');
        return this.http.post<any>('https://oauth-sandbox.fintecture.com/oauth/accesstoken', body.toString(), httpOptions).pipe(
          retry(1),
          catchError(this.handleError)
        )
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
          console.log(`failed: ${error.message}`);
          //this.cookieService.delete('access_token');
          //this._router.navigate(['/']);
          return of(result as T);
        };
      }

    saveToken(token){
        this.cookieService.delete('access_token');
      var expireDate = new Date().getTime() + (1000 * token.expires_in);
      this.cookieService.set("access_token", token.access_token, expireDate);
      //this._router.navigate(['/']);
    }
    saveCustomerId(customerId: string) {
        console.log(customerId);
        this.cookieService.set("customer_id", customerId);
    }
    getCustomerId() {
        return this.cookieService.get("customer_id");
    }

    checkCredentials(){
        if (!this.cookieService.get('access_token')){
            //this._router.navigate(['/']);
            return false;
        }else {
            return this.cookieService.get("access_token");
        }
    }

    getAccount(accesstoken: string, customerId: string): Observable<any[]> {
        const httpOptions = {
          headers: new HttpHeaders({'Accept': 'application/json', 'Authorization': 'Bearer '+accesstoken})
        };
        return this.http.get<any[]>(this.endpointAis+'customer/'+customerId+'/accounts/', httpOptions)
          .pipe(
            
            catchError(this.handleError<any[]>('providers', []) )
          )
    }

    getProviders(): Observable<any[]> {
        const httpOptions = {
          headers: new HttpHeaders({'Accept': 'application/json', 'app_id': this.appId })
        };
        return this.http.get<any[]>(this.endpoint+'providers', httpOptions)
          .pipe(
            catchError(this.handleError<any[]>('providers', []))
          )
      }
    
      authorize(providerId: String): Observable<any[]> {
        const httpOptions = {
          headers: new HttpHeaders({'Accept': 'application/json', 'app_id': this.appId }),
          params : new HttpParams().set('response_type', 'code').set('redirect_uri', 'http://localhost:4200/account')
        };
        
        return this.http.get<any[]>(this.endpointAis+'provider/'+providerId+'/authorize',httpOptions)
          .pipe(
            catchError(this.handleError<any[]>('providers', []))
          )
      }

    

  }