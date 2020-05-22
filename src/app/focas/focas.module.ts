import { NgModule } from '@angular/core';
import { FocasHomeComponent } from './home/focas-home.component';
import { FocasGroupComponent } from './focas-group/focas-group.component';
import { FocasConnectComponent } from './focas-connect/focas-connect.component';
import { FocasDetailComponent } from './focas-detail/focas-detail.component';
import { SharedModule } from '../shared/shared.module';
import { FocasRoutingModule } from './focas.routing.module';
import { FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';



@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FocasRoutingModule,
  ],
  declarations: [
    FocasHomeComponent,
    FocasGroupComponent,
    FocasConnectComponent,
    FocasDetailComponent],
  exports: [
    FocasRoutingModule
  ]
})
export class FocasModule { }
