import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('toggleanimation', [
      state('small', style({
        height: '0px'
      })),
      state('large', style({
        height: '100px'
      })),
      transition('small <=> large', animate('400ms ease-in' )),
    ]),
  ]
})
export class AppComponent {
  title = 'siteElan';
  state:string ='small';
  animateMe(){
    this.state=(this.state==='small'?'large':'small');
  }

  
  constructor(private router:Router,private vps: ViewportScroller) { }    
  ngOnInit() {    
 
  }    
}
