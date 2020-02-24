import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CommonModule } from '@angular/common';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClientModule } from '@angular/common/http';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import {MatSelectModule} from '@angular/material/select';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { FDialogContentComponent } from './fDialogContent/fDialogContent.component';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import { AccountModule } from './account/account.module';

@NgModule({
  declarations: [
    AppComponent,
    FDialogContentComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    BrowserAnimationsModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    MatNativeDateModule,
    MatDialogModule,
    MatSelectModule,
    AccountModule,
    ServiceWorkerModule.register('/../ngsw-worker.js', { enabled: environment.production })
  ],
  entryComponents: [WelcomeComponent, FDialogContentComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
