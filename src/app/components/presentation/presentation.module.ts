import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SouspresentationComponent } from '../souspresentation/souspresentation.component';
import { PresentationComponent } from '../presentation/presentation.component';
import { ProspectusComponent } from '../prospectus/prospectus.component';
import { EmplacementComponent } from '../emplacement/emplacement.component';
import { ProspectusModule } from '../prospectus/prospectus.module';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [SouspresentationComponent,
    ProspectusComponent,
    EmplacementComponent ],
   
    exports: [RouterModule]
})
export class PresentationModule { }
