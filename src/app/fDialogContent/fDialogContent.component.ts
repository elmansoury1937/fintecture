import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AccountService } from '../account/account.service';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-f-dialog-content',
  templateUrl: './fDialogContent.component.html',
  styleUrls: ['./fDialogContent.component.scss'],
  providers: [AccountService]
})
export class FDialogContentComponent implements OnInit {
  providers: Array<any[]>;
  public selected: any;
  
  constructor(private accountService: AccountService, private cookieService: CookieService) {}

  ngOnInit() {
    this.accountService.getProviders().subscribe(response =>{
      this.providers = response["data"];
    });
  }
  authorize() {
    this.accountService.authorize(this.selected.provider).subscribe(response =>{
      if (!this.cookieService.get('access_token')){
        this.cookieService.delete('access_token');
      }
      const urlParams = new URLSearchParams(response["url"]);
        window.open(response["url"] ,'_blank');
    });
  }
  onOptionsSelected(selected) {
    //this.selected = selected;
  }

}
