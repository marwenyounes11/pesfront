import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SouspresentationComponent } from '../souspresentation/souspresentation.component';
import { ProspectusComponent } from '../prospectus/prospectus.component';
import { EmplacementComponent } from '../emplacement/emplacement.component';


@NgModule({
  declarations: [SouspresentationComponent,
    ProspectusComponent,
    EmplacementComponent ],
  imports: [
    CommonModule,
    
  ]
})
export class ProspectusModule { }