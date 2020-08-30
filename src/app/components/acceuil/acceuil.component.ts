import { Component, OnInit } from '@angular/core';
import { NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent implements OnInit {

  constructor( private router : Router) { }

  ngOnInit(): void {
    
  }
  slideActivate(ngbSlideEvent: NgbSlideEvent) {
    console.log(ngbSlideEvent.source);
    console.log(ngbSlideEvent.paused);
    console.log(NgbSlideEventSource.INDICATOR);
    console.log(NgbSlideEventSource.ARROW_LEFT);
    console.log(NgbSlideEventSource.ARROW_RIGHT);
  }
}
