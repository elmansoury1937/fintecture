import { Component, OnInit, Injectable } from '@angular/core';
import { AccountService } from './account.service';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  providers: [AccountService]
})


@Injectable()
export class AccountComponent implements OnInit {
  public account:any;
  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.account = {iban: '', balance: '', currency: ''};
    const accessToken = this.accountService.checkCredentials();
    console.log()
    if(accessToken) {
      this.accountService.saveCustomerId(this.decodeURLParams(window.location.search).customer_id);
      this.getAccount(accessToken, this.accountService.getCustomerId());
    }else {
      this.accountService.saveCustomerId(this.decodeURLParams(window.location.search).customer_id);
      this.accountService.obtainAccessToken(this.decodeURLParams(window.location.search).code).subscribe((data: {}) => {
        this.accountService.saveToken(data);
        this.getAccount(data["access_token"], this.decodeURLParams(window.location.search).customer_id);
    });
    }
    
  }

  getAccount(accessToken: string, customerId: string) {
    this.accountService.getAccount(accessToken, customerId).subscribe(response =>{
      this.account = response["data"][0].attributes;
      console.log(response);
    });
  }


  private decodeURLParams = search => {
    const hashes = search.slice(search.indexOf("?") + 1).split("&");
    return hashes.reduce((params, hash) => {
      const split = hash.indexOf("=");
      const key = hash.slice(0, split);
      const val = hash.slice(split + 1);
      return Object.assign(params, { [key]: decodeURIComponent(val) });
    }, {});
  };

}
