import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { AccountRoutingModule } from './account-routing.module';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from './../shared/shared.module';
import { CookieService } from 'ngx-cookie-service';
@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,
    MatCardModule,
    SharedModule
  ],
  declarations: [
    AccountComponent
  ],
  providers: [ CookieService ]
})
export class AccountModule { }
