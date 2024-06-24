import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePartnerComponent } from './modals/change-partner/change-partner.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ChangePartnerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    ChangePartnerComponent
  ]
})
export class SharedModule { }
