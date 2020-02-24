import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FDialogContentComponent} from '../fDialogContent/fDialogContent.component';
import { AccountService } from '../account/account.service';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  providers: [AccountService]
})
export class WelcomeComponent {
  
  providers: Array<any[]>;
  
  constructor(public dialog: MatDialog, private accountService: AccountService) {}

  openDialog() {
    this.accountService.checkCredentials();
    const dialogRef = this.dialog.open(FDialogContentComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
