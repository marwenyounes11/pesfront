import { Component, OnInit ,Inject} from '@angular/core';
import { ViewportScroller } from '@angular/common';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatDialogRef } from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { InscrireComponent } from '../inscrire/inscrire.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private vps: ViewportScroller , private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    
    public dialogRef:MatDialogRef<InscrireComponent>,) { }

  ngOnInit(): void {
   
  }
  addoffre(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(InscrireComponent, dialogConfig);
  }
 
 
 
}
